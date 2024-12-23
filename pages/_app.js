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
        domain: "bs-partner-program.myshopify.com",
        storefrontAccessToken: "7c8b94ba7d07859285db1e17c10580b7",
      });

      ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: "8224382615857",
          node: document.getElementById("product-component-1734934014636"),
          moneyFormat: "Tk%20%7B%7Bamount%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0",
                    "margin-bottom": "50px",
                  },
                  "text-align": "left",
                },
                title: {
                  "font-size": "26px",
                },
                price: {
                  "font-size": "18px",
                },
                compareAt: {
                  "font-size": "15.3px",
                },
                unitPrice: {
                  "font-size": "15.3px",
                },
              },
              layout: "horizontal",
              contents: {
                img: false,
                imgWithCarousel: true,
                description: true,
              },
              width: "100%",
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
                title: {
                  "font-family": "Helvetica Neue, sans-serif",
                  "font-weight": "bold",
                  "font-size": "26px",
                  color: "#4c4c4c",
                },
                price: {
                  "font-family": "Helvetica Neue, sans-serif",
                  "font-weight": "normal",
                  "font-size": "18px",
                  color: "#4c4c4c",
                },
                compareAt: {
                  "font-family": "Helvetica Neue, sans-serif",
                  "font-weight": "normal",
                  "font-size": "15.3px",
                  color: "#4c4c4c",
                },
                unitPrice: {
                  "font-family": "Helvetica Neue, sans-serif",
                  "font-weight": "normal",
                  "font-size": "15.3px",
                  color: "#4c4c4c",
                },
              },
              text: {
                button: "Add to cart",
              },
            },
            option: {},
            cart: {
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
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
      <div id="product-component-1734934014636"></div>
    </>
  );
}
