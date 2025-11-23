import MainProvider from '@/components/Layouts/MainProvider';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Goalzzz | Home',
  description: 'Goalzzz',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        id="jw-player"
        strategy="afterInteractive"
        src="https://cdn.jwplayer.com/libraries/XhGm52Nv.js"
      ></Script>
      <Script src="https://unpkg.com/react-media-player/dist/react-media-player.js"></Script>
      <body className={inter.className}>
        <MainProvider>{children}</MainProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerClassName="toast-container"
          toastOptions={{
            className: 'toast',
            error: {
              className: 'toast-error',
            },
            success: {
              className: 'toast-success',
            },
          }}
        />
      </body>
    </html>
  );
}
