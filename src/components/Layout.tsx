import { Outlet } from 'react-router-dom';
import { MadeWithDyad } from './made-with-dyad.tsx';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="mt-auto">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Layout;