import { Mulish } from "next/font/google";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";

const mulish = Mulish({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={`flex min-h-screen flex-col items-center px-4 pb-8 gap-8 ${mulish.className}`}>
        <main className="flex flex-grow w-full justify-center items-center">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
