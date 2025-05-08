/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "ul > li": {
              "--tw-prose-bullets": "var(--color-yellow)",
            },
            hr: {
              "border-top": "2px solid var(--color-yellow)",
            },
            code: {
              backgroundColor: "var(--color-sand)",
              padding: "0 0.25rem",
              borderRadius: "0",
              "&::before": {
                content: '""!important',
              },
              "&::after": {
                content: '""!important',
              },
            },
            pre: {
              "background-color": "var(--color-sand)",
              "border-radius": "0",
              border: "2px solid black",
              margin: "0",
            },
          },
        },
      },
    },
  },
};
