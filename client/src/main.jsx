import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import {
  ThemeProvider,
  AuthProvider,
  DropdownProvider,
  CartProvider,
  ReservationProvider,
  ToastProvider,
  ProductsProvider
} from '@contexts';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ToastProvider>
            <ProductsProvider>
              <DropdownProvider>
                <ReservationProvider>
                  <CartProvider>
                    <App />
                  </CartProvider>
                </ReservationProvider>
              </DropdownProvider>
            </ProductsProvider>
          </ToastProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
