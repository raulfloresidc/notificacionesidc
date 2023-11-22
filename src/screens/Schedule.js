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
  AlertDescription,
  Select

} from '@chakra-ui/react'
import React, { useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
export default function Schedule() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bigUrl, setBigUrl] = useState('');
  const [error, setError] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('system'); // Establece una zona horaria predeterminada
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message || !selectedDate || !selectedTime) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    console.log('Nombre:', name);
    console.log('Mensaje:', message);
    console.log('URL:', bigUrl);
    console.log('Tiempo:', selectedTime);
    console.log('Fecha:', selectedDate);
    const scheduledDateTime = DateTime.fromFormat(
      `${selectedDate} ${selectedTime}`,
      'yyyy-MM-dd HH:mm',
      { zone: selectedTimezone }
    );

    const currentDateTime = DateTime.local().setZone(selectedTimezone);

    if (scheduledDateTime <= currentDateTime) {
      setError('La fecha y hora seleccionadas deben ser futuras.');
      return;
    }

    setIsLoading(true);

    const timeDiff = scheduledDateTime.diff(currentDateTime).as('milliseconds');

    setTimeout(async () => {
      try {
        axios
          .post("https://app.nativenotify.com/api/notification", {
            appId: 14986,
            appToken: 'xfyFThQZUbUWx2yMOTiS79',
            title: name, 
            body: message, 
            dateSent: scheduledDateTime, 
            // pushData: { yourProperty: 'yourPropertyValue' },
            // bigPictureURL: bigUrl, 
          })
          .then((response) => {
            console.log(response);
            setIsLoading(false);
            setError('');
    
            // Cerrar el modal
            onClose();
          })
          .catch((error) => {
            console.error('Error al enviar el formulario:', error);
            setIsLoading(false);
            setError('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
          });
      
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setIsLoading(false);
        setError('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
      }
    }, timeDiff);
  };
return (
  <Box ml={{ base: 0, md: 50 }} p="4">
      <Stack spacing={3}>
        <form >
        <FormControl id="timezone" mb={4}>
          <FormLabel>Zona Horaria</FormLabel>
          <Select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
          >
            <option value="system">Default</option>
          </Select>
        </FormControl>
        <FormControl id="date" mb={4}>
          <FormLabel>Fecha</FormLabel>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </FormControl>
        <FormControl id="time" mb={4}>
          <FormLabel>Hora</FormLabel>
          <Input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </FormControl>
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
          </FormControl>
        </form>
      </Stack>
  </Box>
)
}
