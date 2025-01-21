import "@/styles/globals.scss";
import { Header } from "@/components/header";
import { ReposProvider } from "@/context/reposProvider";
import type { AppProps } from "next/app";
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) 
{
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <ReposProvider>
        <Header/>
        <Component {...pageProps} />
      </ReposProvider>
    </CookiesProvider>
  )
}
