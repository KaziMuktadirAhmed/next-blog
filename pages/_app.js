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

    // Retrieve the stored checkout ID if it exists
    const storedCheckoutId = localStorage.getItem(localStorageCheckoutKey);

    // If no stored checkout ID, create a new one
    if (!storedCheckoutId) {
      const input = {
        buyerIdentity: {
          countryCode: "DE", // Or any other value you want
        },
      };
      client.checkout.create(input).then((checkout) => {
        localStorage.setItem(localStorageCheckoutKey, checkout.id); // Save checkout ID to localStorage
        initializeBuyButton(client, checkout.id);
      });
    } else {
      initializeBuyButton(client, storedCheckoutId); // Use the stored checkout ID
    }
  }

  function initializeBuyButton(client, checkoutId) {
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
            popup: true, // Ensure popup mode is enabled
            startOpen: true, // Optionally open the popup automatically
            contents: {
              note: checkoutId ? `Checkout ID: ${checkoutId}` : "New Checkout",
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
