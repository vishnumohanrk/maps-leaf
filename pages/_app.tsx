import '../styles/app.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;
