import { Mulish } from "next/font/google";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";

const mulish = Mulish({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={`flex min-h-screen w-screen flex-col items-center px-8 pb-8 gap-8 ${mulish.className}`}>
        <main className="flex flex-grow justify-center items-center sm:w-4/5">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
