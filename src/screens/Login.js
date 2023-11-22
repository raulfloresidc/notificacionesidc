import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { Navigate, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { jwtDecode } from "jwt-decode";
import {
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Switch,
    useColorMode,
    useColorModeValue,
    Box,
    Image,
    Text,
    Center, 
    Stack, 
  } from '@chakra-ui/react';
  import logoIDC  from '../assets/idclogo.png'
const Login = () => {
    const navigate = useNavigate();
    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const login = useGoogleLogin({
        onSuccess: credentialResponse => {
            var decoded = jwtDecode(credentialResponse.credential)
            sessionStorage.setItem('userToken', decoded.jti)
            sessionStorage.setItem('userName', decoded.given_name)
            sessionStorage.setItem('userImage', decoded.picture)
            navigate('/')
        },
        flow: 'auth-code',
      });
//   const handleGoogleLogin = async () => {
//     try {
//       const clientId = '';
//       const redirectUri = '/';

//       const response = await GoogleOAuthProvider.signIn({
//         clientId,
//         redirectUri,
//       });

//       if (response.status === 'success') {
//         // Redirige a la ruta '/ruta-deseada' después de iniciar sesión exitosamente
//         navigate('/');
//       } else {
//         console.error('Error al iniciar sesión con Google');
//       }
//     } catch (error) {
//       console.error('Error al iniciar sesión con Google', error);
//     }
//   };

  return (
    <Box h="100vh"  display='flex' alignItems="center" justifyContent='center' flexDirection={'column'} background={'linear-gradient(#CC2C53,#871630)'}>
        <Flex
            flexDirection="column"
            background='#212529'
            p={10}
            w={'40vh'}
            h={'60vh'}
            // height={30}
            borderRadius={13}
            boxShadow="dark-lg"
            textAlign='center'
        >
            <Box alignSelf={'center'} m={10} flexShrink={0} >
                <Image src={logoIDC} alt='IDC Logo' width={{ md: 60 }} />
            </Box>
            <Heading mb={8} alignSelf={'center'} color={'#fff'}>Notificaciones APP IDC</Heading>
            <Text fontSize='xs' alignSelf={'center'} color={'#fff'} mb={8}>Ingresa para continuar</Text>
            <Box alignSelf={'center'}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            var decoded = jwtDecode(credentialResponse.credential)
                            sessionStorage.setItem('userToken', decoded.jti)
                            sessionStorage.setItem('userName', decoded.given_name)
                            sessionStorage.setItem('userImage', decoded.picture)
                            navigate('/')
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        width='100'
                        theme='filled_black'
                        type='standard'
                    />
                    {/* <Button w={'full'} variant={'solid'} leftIcon={<FcGoogle />} onClick={()=>{login()}}>
                        <Center>
                            <Text>Inicia Sesion con Google</Text>
                        </Center>
                    </Button> */}
            </Box>
            {/* <Button colorScheme="teal" mb={8}>
            Log In
            </Button> */}
            {/* <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="dark_mode" mb="0">
                Enable Dark Mode?
            </FormLabel>
            <Switch
                id="dark_mode"
                colorScheme="teal"
                size="lg"
                onChange={toggleColorMode}
            />
            </FormControl> */}
        </Flex>
    </Box>
   
  );
};

export default Login;
