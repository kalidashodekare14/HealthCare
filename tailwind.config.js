/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'banner_img': "url('/image/banner.png')",
        'checkUp': "url('/image/check_up.png')",
        'doctor1': "url('/image/meetDoctors/doctor1.jpg')",
        'doctor2': "url('/image/meetDoctors/doctor2.jpg')",
        'doctor3': "url('/image/meetDoctors/doctor3.jpg')",
        'about_banner': "url(/image/about_page/banner.png)"
      },
      fontFamily: {
        "poppins": "Poppins, serif",
        "rubik": "Rubik, serif"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
