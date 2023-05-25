import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        '-1': '-1'
      },
      colors: {
        primary: '#1890ff',
        success: '#52C41A',
        error: '#FF4D4F'
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px'
      }
    }
  }
})
