import "../styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shopify Buy Button Integration</title>
      </Head>
      <Component {...pageProps} />
      {/* Shopify Buy Button container */}
      <div id="product-component-1732613041618"></div>
    </>
  );
}
