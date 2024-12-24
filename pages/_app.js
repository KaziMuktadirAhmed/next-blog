import React, { useEffect } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const scriptURL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    function loadScript() {
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = ShopifyBuyInit;
    }

    function ShopifyBuyInit() {
      const client = ShopifyBuy.buildClient({
        domain: "a6bcf5-3.myshopify.com",
        storefrontAccessToken: "42b7fc817b2e6e5402de5c0ee7df3b3d",
      });

      // First product: Create and render Buy Button
      ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: "9753368658263", // Product ID for the first button
          node: document.getElementById("product-component-1"),
          moneyFormat: "%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px",
                  },
                },
                button: {
                  "border-radius": "6px",
                  "padding-left": "46px",
                  "padding-right": "46px",
                },
              },
              text: {
                button: "Add to cart",
              },
            },
            cart: {
              popup: true,
              startOpen: false,
              styles: {
                button: {
                  "border-radius": "6px",
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
            },
          },
        });
      });

      // Second product: Create and render Buy Button
      ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: "9753370198359", // Product ID for the second button
          node: document.getElementById("product-component-2"),
          moneyFormat: "%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px",
                  },
                },
                button: {
                  "border-radius": "6px",
                  "padding-left": "46px",
                  "padding-right": "46px",
                },
              },
              text: {
                button: "Add to cart",
              },
            },
            cart: {
              popup: true,
              startOpen: false,
              styles: {
                button: {
                  "border-radius": "6px",
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
            },
          },
        });
      });
    }

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Shopify Buy Button Integration</title>
      </Head>
      <Component {...pageProps} />

      {/* First product container */}
      <div id="product-component-1"></div>

      {/* Second product container */}
      <div id="product-component-2"></div>
    </>
  );
}
