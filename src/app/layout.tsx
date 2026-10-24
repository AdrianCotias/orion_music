import type { ReactNode } from "react";

export const metadata = {
  title: "Orion Music",
  description: "Gravadora e escola de música",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
