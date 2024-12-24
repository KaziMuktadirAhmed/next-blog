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
 
      const localStorageCheckoutKey = `${client.config.storefrontAccessToken}.${client.config.domain}.checkoutId`;
 
      // Retrieve stored checkout ID if it exists
      const storedCheckoutId = localStorage.getItem(localStorageCheckoutKey);
 
      if (!storedCheckoutId) {
        // Create a new checkout if not already stored
        const input = {
          buyerIdentity: {
            countryCode: "DE", // Specify country if needed
          },
        };
        client.checkout.create(input).then((checkout) => {
          localStorage.setItem(localStorageCheckoutKey, checkout.id); // Save checkout ID
          initializeBuyButton(client, checkout.id, "9753368658263", "product-component-1734934483872");
        });
      } else {
        initializeBuyButton(client, checkout.id, "9753368658263", "product-component-1734934483872"); // Use existing checkout ID
      }
      initializeBuyButton(client, checkout.id, "9753370198359", "product-component-111222333");
    }
 
    function initializeBuyButton(client, checkoutId, productId, containerId) {
      ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: "9753368658263",
          node: document.getElementById("product-component-1734934483872"),
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
              popup: true, // Enable popup cart
              startOpen: false, // Optionally auto-open the popup
              contents: {
                note: `Checkout ID: ${checkoutId}`, // Display checkout ID for reference
              },
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
 
      {/* Shopify Buy Button container */}
 <div id="product-component-1734934483872"></div>
 <div id="product-component-111222333"></div>
</>
  );
}
