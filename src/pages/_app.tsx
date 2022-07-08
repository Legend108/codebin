import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  );
}
