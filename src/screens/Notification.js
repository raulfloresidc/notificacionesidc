import { Heading, 
    Input, 
    Stack, 
    FormLabel, 
    FormHelperText, 
    Divider, 
    Box, 
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Textarea,
    FormErrorMessage,
    FormControl,
    Spinner,
    Alert,
    AlertIcon, 
    AlertTitle,
    AlertDescription

} from '@chakra-ui/react'
import React, { useState } from 'react';
import { DateTime } from 'luxon';
import axios from 'axios';
export default function Notification() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [bigUrl, setBigUrl] = useState('');
    const [error, setError] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!name || !message) {
        setError('Por favor, completa todos los campos.');
        return;
      }
      const scheduledDateTime = DateTime.local().toFormat('MM-dd-yyyy hh:mma');
      setIsLoading(true);
      axios
        .post("https://app.nativenotify.com/api/notification", {
          appId: 12290,
          appToken: 'NUU1zD6mlYTqs9y6NYrH5T',
          title: name, 
          body: message, 
          dateSent: scheduledDateTime, 
          // pushData: { yourProperty: 'yourPropertyValue' },
          ...(bigUrl && {bigUrl: bigUrl})
        })
        .then((response) => {
          setIsFormSubmitted(true);
          setIsLoading(false);
          setError('');
          setName('')
          setMessage('')
          setBigUrl('')
          onClose();
        })
        .catch((error) => {
          console.error('Error al enviar el formulario:', error);
          setIsLoading(false);
          setError('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
        });
    };
  return (
    <Box ml={{ base: 0, md: 50 }} p="4">
        <Stack spacing={3}>
          <form >
            <FormControl id="name" mb={4} isRequired>
              <FormLabel>Titulo de la Notificacion</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="message" mb={4} isRequired>
              <FormLabel>Mensaje</FormLabel>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
            </FormControl>
            <FormControl>
              <Accordion  allowMultiple>
                <AccordionItem>
                  <h2>
                  <AccordionButton color='#000'>
                      <Box as="span" flex='1' textAlign='left'>
                      Opciones Avanzadas..
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                      <FormLabel>URL de la imagen</FormLabel>
                      <Input type='url' value={bigUrl} onChange={(e) => setBigUrl(e.target.value)}/>
                      <FormHelperText>Las imagenes solo funcionan para Android de momento.</FormHelperText>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </FormControl>
            <FormControl>
            <Button onClick={onOpen} isLoading={isLoading} loadingText='Enviando...'  mt={10} variant='solid' bg='lightgray'>Enviar Notificacion</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay>
              <ModalContent>
                  <ModalHeader>Enviar Notificacion</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                  {error && (
                    <Alert status="error" mb={4} rounded="md">
                      <AlertIcon />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Text> Estas apunto de enviar la notificacion a todos los usuarios de App IDC, ¿Estas seguro?</Text>
                  </ModalBody>
                  <ModalFooter>
                  {isLoading && <Spinner size="md" color="teal.500" mr={3} />}
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Cancelar
                  </Button>
                  <form onSubmit={handleSubmit}>
                    <Button variant="ghost" type='submit'>Enviar</Button>
                  </form>
                  </ModalFooter>
              </ModalContent>
              </ModalOverlay>
            </Modal>
            <Modal isOpen={isFormSubmitted} onClose={() => setIsFormSubmitted(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Éxito</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>La notificación fue enviada con éxito.</Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" onClick={() => setIsFormSubmitted(false)}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            </FormControl>
          </form>
        </Stack>
    </Box>
  )
}
