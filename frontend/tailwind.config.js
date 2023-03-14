module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      ssp: ['Poppins', 'Source Sans Pro', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        banner_img: "url('/public/assets/images/bg1.png')",
        footer_img: "url('/public/assets/images/footer.png')",
        footer_bg_img: "url('/public/assets/images/footer_bg.png')"
      },
      animation: {
        banner: 'movel 5s infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
}
