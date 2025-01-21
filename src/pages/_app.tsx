import { Header } from "@/components/header";
import { ReposProvider } from "@/context/reposProvider";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) 
{
  return (
    <ReposProvider>
      <Header/>
      <Component {...pageProps} />
    </ReposProvider>
  )
}
