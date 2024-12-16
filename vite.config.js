// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: process.env.VITE_BASE_URL,
//         changeOrigin: true,
//         secure: true,
//         cookieDomainRewrite: {
//           "*": "" // rewrite domain to enable cross-domain cookies
//         }
//       }
//     }
//   }
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BASE_URL, // Replace with your backend URL
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', process.env.VITE_FRONTEND_URL); // Replace with your frontend URL
          });
        },
      },
    },
  },
});
