import { RouterProvider } from 'react-router';
import { routes } from './routes';
import { AppProviders } from '@/context/AppProvider';

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={routes} />
    </AppProviders>
  );
}
