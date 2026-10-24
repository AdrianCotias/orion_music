import type { ReactNode } from "react";
import { SiteHeader } from "../presentation/layout/site-header";
import "./globals.css";

export const metadata = {
  title: "Orion Music",
  description: "Gravadora e escola de música",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
