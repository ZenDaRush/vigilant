import ReactDOM from 'react-dom/client';

import './index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import LoginPage from './app/pages/auth/login';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient({});
root.render(
  <QueryClientProvider client={queryClient}>

  <HashRouter>
    <Routes>
      <Route path="/" Component={LoginPage} />
    </Routes>
  </HashRouter>
</QueryClientProvider>
)
