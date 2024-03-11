// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [react()],
// 	server: {
// 		port: 3000,
// 		proxy: {
// 			"/api": {
// 				target: "http://localhost:5000",
// 			},
// 		},
// 	},
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "prompt",
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
			manifest: {
				name: pkg.name,
				short_name: pkg.short_name || pkg.name,
				description: pkg.description,
				theme_color: '#ffffff',
				background_color: '#ffffff',
				start_url: '/',
				display: 'standalone',
				orientation: "portrait",
				icons: [
					{
						src: "/pwa-64x64.png",
						sizes: "64x64",
						type: "image/png"
					},
					{
						src: "/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png"
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: "/apple-touch-icon-180x180.png",
						sizes: "180x180",
						type: "image/png",
						purpose: "apple touch icon"
					},
					{
						src: "/maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable"
					}
				],
				// Add more properties as needed
			},

		}),
	],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:5000',
			},
		},
	},
});
