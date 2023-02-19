import Head from "next/head";
import * as React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Strongest MTG</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container h-10 bg-white" />
      <main className="flex h-[calc(100%-40px)] flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {children}
      </main>
    </>
  );
};

export default Layout;
