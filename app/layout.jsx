import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "چای املش | چای اصیل شمال ایران",
  description: "لندینگ‌پیج رسمی برند چای املش؛ چای اصیل، طبیعی و باکیفیت از باغ‌های سرسبز گیلان.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
