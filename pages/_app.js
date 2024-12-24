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
      const client1 = ShopifyBuy.buildClient({
        domain: "a6bcf5-3.myshopify.com",
        storefrontAccessToken: "42b7fc817b2e6e5402de5c0ee7df3b3d",
      });

      const client2 = ShopifyBuy.buildClient({
        domain: "a6bcf5-3.myshopify.com",
        storefrontAccessToken: "42b7fc817b2e6e5402de5c0ee7df3b3d",
      });

      // First product setup
      handleCheckout(client1, "checkoutId-DE", "DE", "9753368658263", "product-component-1734934483872");

      // Second product setup
      handleCheckout(client2, "checkoutId-EU", "EU", "9753370198359", "product-component-9753370198359");
    }

    function handleCheckout(client, checkoutKey, countryCode, productId, containerId) {
      const storedCheckoutId = localStorage.getItem(checkoutKey);

      if (!storedCheckoutId) {
        const input = { buyerIdentity: { countryCode } };
        client.checkout.create(input).then((checkout) => {
          localStorage.setItem(checkoutKey, checkout.id);
          initializeBuyButton(client, checkout.id, productId, containerId);
        });
      } else {
        initializeBuyButton(client, storedCheckoutId, productId, containerId);
      }
    }

    function initializeBuyButton(client, checkoutId, productId, containerId) {
      ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: productId,
          node: document.getElementById(containerId),
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
              contents: {
                note: `Checkout ID: ${checkoutId}`,
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

      {/* First product container */}
      <div id="product-component-1734934483872"></div>

      {/* Second product container */}
      <div id="product-component-9753370198359"></div>
    </>
  );
}
