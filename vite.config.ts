import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
//import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin' 
import { nitro } from 'nitro/vite'

const config = defineConfig({
  plugins: [
    tanstackStart({}),
    //nitroV2Plugin({preset: "aws-lambda", awsLambda: {streaming: true, }}),
    nitro({config: {preset: "aws-lambda" }}),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    viteReact(),
    tailwindcss(),
  ],
})

export default config
