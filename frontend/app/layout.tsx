import type { Metadata } from 'next'

import './globals.css'

import {
  MathJaxContext
} from 'better-react-mathjax'

export const metadata: Metadata = {

  title: 'Tensor Calculator',

  description:
    'General Relativity Tensor Calculations',

}

export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode

}>) {

  return (

    <html lang="en">

      <body>

        <MathJaxContext>

          {children}

        </MathJaxContext>

      </body>

    </html>

  )

}