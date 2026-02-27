import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: "Grocery | 10 minutes grocery delivery",
  description: " Grocery delivery in 10 minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-gradient-to-b from-green-100 to-white">
        <Provider>
          <StoreProvider>
            <InitUser />
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  borderRadius: "12px",
                  background: "#fff",
                  color: "#333",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }
              }}
            />
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
