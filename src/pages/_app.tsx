import "@/styles/globals.scss";
import { Header } from "@/components/header";
import { ReposProvider } from "@/context/reposProvider";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) 
{
  return (
    <ReposProvider>
      <Header/>
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          removeDelay: 1000,
        }}
      />
    </ReposProvider>
  )
}
