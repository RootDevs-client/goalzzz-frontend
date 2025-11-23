import Footer2 from './Footer2';
import Header from './Header';

export default function ClientLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <Header />
      {/* Content */}
      <main className="flex-1 sm:pt-4 overflow-hidden lg:px-2">{children}</main>

      {/* Footer */}
      <Footer2 />
    </div>
  );
}
