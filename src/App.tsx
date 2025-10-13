
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import StorePage from '@/pages/StorePage';
import ProductPage from '@/pages/ProductPage';
import DashboardPage from '@/pages/DashboardPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrdersPage from '@/pages/OrdersPage';
import CreateStorePage from '@/pages/CreateStorePage';
import ManageStorePage from '@/pages/ManageStorePage';
import SearchPage from '@/pages/SearchPage';
import ProfilePage from '@/pages/ProfilePage';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { PiProvider } from '@/contexts/PiContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <PiProvider>
            <CartProvider>
              <Router>
                <div className="min-h-screen bg-background text-foreground">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/store/:storeId" element={<StorePage />} />
                      <Route path="/product/:productId" element={<ProductPage />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/orders" element={<OrdersPage />} />
                      <Route path="/create-store" element={<CreateStorePage />} />
                      <Route path="/manage-store" element={<ManageStorePage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                  </main>
                  <Footer />
                  <Toaster />
                </div>
              </Router>
            </CartProvider>
          </PiProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;