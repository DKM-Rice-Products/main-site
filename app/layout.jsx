import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const publicPath = process.env.PAGES_CUSTOM_DOMAIN === "true" ? "" : "/main-site";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Sri Durai Kannammal Rice Products",
  description:
    "Premium quality rice direct from our mill — Ponni, Basmati, Raw, Boiled and more at direct company prices. Serving Tamil Nadu since 1998.",
  keywords: [
    "rice",
    "ponni rice",
    "basmati rice",
    "rice distributor",
    "Tamil Nadu rice mill",
    "Arani rice",
  ],
  icons: {
    icon: `${publicPath}/logo.png`,
    shortcut: `${publicPath}/logo.png`,
    apple: `${publicPath}/logo.png`,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
