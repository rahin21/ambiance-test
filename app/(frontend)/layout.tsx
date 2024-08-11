import type { Metadata } from "next";
import localfont from "next/font/local";
import image from "/public/og-image.png";
import "../globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scrollToTop";

const dipotic = localfont({
  src: [
    {
      path: "../../assets/fonts/dipotic/Didot-Italic.otf",
    },
  ],
  variable: "--font-dipotic",
});
const openSans = localfont({
  src: [
    {
      path: "../../assets/fonts/open-sans/OpenSans-VariableFont_wdth,wght.ttf",
    },
  ],
  variable: "--font-openSans",
});
const palatino = localfont({
  src: [
    {
      path: "../../assets/fonts/palatino/Palatino LT Bold.ttf",
    },
  ],
  variable: "--font-palatino",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://ambiance-sigma.vercel.app`),
  title: {
    default: "Home - Ambiance",
    template: "%s - Ambiance",
  },
  description: "The Interior Design",
  openGraph: {
    title: "Ambiance",
    images: [{ url: image.src }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dipotic.variable} ${openSans.variable} ${palatino.variable}`}
      >
        <Nav />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
