import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Progress Forge Lang",
  description: "Learn languages with spaced repetition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <main>{children}</main>
      </body>
    </html>
  );
}
