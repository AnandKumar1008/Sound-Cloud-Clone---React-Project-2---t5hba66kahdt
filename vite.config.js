// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from "vite";

export default defineConfig({
  // other config options...
  plugins: [
    // remove the vite:react-swc plugin from the plugins array
    // {
    //   name: 'vite:react-swc',
    //   // other options...
    // },
  ],
});