import type { Metadata } from "next";
import "./reset.css";
export const metadata: Metadata = {
  title: "Minha rota de usuários",
  description: "Seu aplicativo para calcular rotas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
