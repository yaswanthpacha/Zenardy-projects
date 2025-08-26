import "./globals.css";
import LayoutClient from "./components/LayoutClient";

export const metadata = {
  title: "Alliance Partner Spotlight",
  description: "Dashboard, Projects and Add Project"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
