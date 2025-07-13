'use client'
import { UserProvider } from '../context/UserContext.jsx';
import "./globals.css";
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Toaster position="top-center" />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
