/// <reference types="vite/client" />

import React from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
 

import appCss from '@/styles.css?url'
import { Providers } from '@/providers/Providers'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="h-dvh w-dvw bg-gray-800 flex flex-col items-center justify-center"> 
        <Providers>
          {children}
        </Providers>
        
        <Scripts />
      </body>
    </html>
  )
}
