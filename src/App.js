import './App.css';

import LoginPage from './screens/Login';
import HomePage from './screens/Home';
import { useEffect } from 'react';
import Router from './auth/router'
import { ChakraProvider, Heading, extendTheme } from '@chakra-ui/react';
import Fonts from './components/Fonts'
import theme from './components/theme'
import Navbar from './components/Navbar';
import { GoogleOAuthProvider} from '@react-oauth/google';
function App() {

  return (
    <ChakraProvider theme={theme}>
       <Fonts />
       <GoogleOAuthProvider clientId="109239142306-im6bmk0c1sclvc8qta2qinnta74bul91.apps.googleusercontent.com">
        <Router />
       </GoogleOAuthProvider>
    </ChakraProvider>
  );
}

export default App;
