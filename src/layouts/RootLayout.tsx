import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

export default function RootLayout() {
  return (
    <div>
      <Navigation />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
