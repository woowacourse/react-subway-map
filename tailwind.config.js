// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "screen-10": "10vh",
        "screen-20": "20vh",
        "screen-30": "30vh",
        "screen-40": "40vh",
        "screen-50": "50vh",
        "screen-60": "60vh",
        "screen-70": "70vh",
        "screen-80": "80vh",
        "screen-90": "90vh",
      },
      width: {
        104: "26rem",
        112: "28rem",
        120: "30rem",
        128: "32rem",
        136: "34rem",
        144: "36rem",
        152: "38rem",
        160: "40rem",
      },
      zIndex: {
        "-1": "-1",
        "-10": "-10",
        "-20": "-20",
        "-30": "-30",
        "-40": "-40",
        "-50": "-50",
      },
      colors: {
        line1: "#0052A4",
        line2: "#009D3E",
        line3: "#EF7C1C",
        line4: "#00A5DE",
        line5: "#996CAC",
        line6: "#CD7C2F",
        line7: "#747F00",
        line8: "#EA545D",
        line9: "#BDB092",
        lineGyeonguiJungang: "#77C4A3",
        ...colors,
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ["hover"],
      textColor: ["disabled"],
      backgroundColor: ["disabled"],
      ringWidth: ["hover"],
      ringColor: ["hover"],
    },
  },
  plugins: [],
};
