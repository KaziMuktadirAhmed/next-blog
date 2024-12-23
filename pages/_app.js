import "../styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";

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
        local: "en-DE"
      });

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
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px",
                  },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
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
            option: {},
            cart: {
              styles: {
                button: {
                  "border-radius": "6px",
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
              popup: false,
            },
            toggle: {},
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
    </>
  );
}
