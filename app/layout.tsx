import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider } from "./context/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//
//   TODO: change the doamins and social media handles..
//
export const metadata: Metadata = {
  title:
    "VCARD - AI Visiting Card Designer & Printing Service | Create in Minutes",
  description:
    "Design professional visiting cards instantly with AI and order premium prints. VCARD offers smart templates, custom designs, and fast delivery. Make perfect business cards effortlessly.",
  applicationName: "VCARD",
  authors: [{ name: "VARD Team", url: "https://vcard.itemsfind.com" }],
  creator: "VCARD",
  classification: "Printing & Design Services",
  alternates: {
    canonical: "https://vcard.itemsfind.com",
  },
  openGraph: {
    title: "VCARD: AI-Powered Business Card Design & Printing Platform",
    description:
      "Create stunning visiting cards with AI and order premium prints. Custom designs, multiple paper options, and fast delivery - all in one platform.",
    type: "website",
    url: "https://x.com/@VARD",
    siteName: "VCARD",
    locale: "en_In",
  },
  twitter: {
    card: "summary_large_image",
    site: "@vcardofficial",
    creator: "@vcardofficial",
    title: "VCARD: AI-Powered Business Card Design & Printing Platform",
    description:
      "Create stunning visiting cards with AI and order premium prints. Custom designs, multiple paper options, and fast delivery - all in one platform.",
  },
  category: "Business Services",
  keywords: [
    "AI visiting card design",
    "online business cards",
    "custom visiting cards",
    "print visiting cards online",
    "instant business card maker",
    "professional visiting cards",
    "visiting card printing service",
    "digital business card maker",
    "premium visiting cards",
    "same day business cards",
    "visiting card creator",
    "smart card designer",
    "print ready business cards",
    "corporate visiting cards",
    "affordable business cards",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col realtive min-h-screen `}
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
