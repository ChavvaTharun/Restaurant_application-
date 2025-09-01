import Providers from "../store/providers";
import Header from "./components/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import './page.module.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Global Header */}
          <Header />

          {/* Page Content */}
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
