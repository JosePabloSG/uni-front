import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-20">
          {children}
        </div>
      </body>
    </html>
  );
}
