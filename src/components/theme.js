import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/caveat';
import '@fontsource/roboto';
import '@fontsource-variable/montserrat';

const theme = extendTheme({
  fonts: {
    heading: "Montserrat Variable",
    body: "Montserrat Variable",
  },
})

export default theme