module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      rob: ["Roboto", "sans-serif"],
      pop: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "2k": "1920px",
        "4k": "2560px",
      },
      colors: {
        ev: {
          dark: {
            DEFAULT: "#25364F",
          },
          red: {
            DEFAULT: "#FE4D5F",
          },
          gray: "#A6A6A6",
          sky: "#5AC8D2",
          lightgray: "#aaaaaa",
        },
        chatlook: {
          dark: {
            DEFAULT: "#242427",
          },
          sky: {
            DEFAULT: "#5AC8D2",
          },
          sky: "#5AC8D2",
          gray: "#888888",
          grayLight: "#F0F0F0",
          skyLight: "#D1EFF2",
          red: "#FC5858",
        },
      },
      boxShadow: {
        one: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        "inset-main": "-2px 0px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  }
};
