// import './globals.css'
import "../../styles/style.css";

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/app/header";
import React from "react";
import Providers from "@/app/redux/Providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '오늘의 명언',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="/images/opengraph.png" />
        <meta property="og:title" content="오늘의 명언" />
        <meta property="og:description" content="오늘의 명언" />
        {/* Page Description */}
        <meta name="description" content="오늘의 명언" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />
      </head>
      <body className={"container"}>
        <Header />
        {/* 추후 명언, 글귀, 한마디 등 메뉴 추가 시 활용*/}
        {/*<Navigator />*/}
        {/* 추후 여러 메뉴 생성 시 활용 */}
        {/* eslint-disable-next-line react/no-children-prop,react/jsx-no-undef */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
