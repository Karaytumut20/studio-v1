import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import Noise from "@/components/ui/Noise";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { AudioProvider } from "@/components/ui/AudioProvider";
import AudioToggle from "@/components/ui/AudioToggle";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Studio V1",
  description: "Creative Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        <AudioProvider>
          <SmoothScroll>
            <Noise />
            <ScrollProgress />
            <CustomCursor />
            <Preloader />
            <Header />
            <AudioToggle />
            <main className="min-h-screen pt-20">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </AudioProvider>
      </body>
    </html>
  );
}