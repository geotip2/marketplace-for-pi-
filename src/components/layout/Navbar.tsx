
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Store, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">π</span>
            </div>
            <span className="text-xl font-bold text-foreground">PiMarket</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products, stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                {user.hasStore ? (
                  <Link to="/manage-store">
                    <Button variant="ghost" size="sm">
                      <Store className="w-4 h-4 mr-2" />
                      My Store
                    </Button>
                  </Link>
                ) : (
                  <Link to="/create-store">
                    <Button variant="outline" size="sm">
                      <Store className="w-4 h-4 mr-2" />
                      Create Store
                    </Button>
                  </Link>
                )}
                <Link to="/orders" className="relative">
                  <Button variant="ghost" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                    {totalItems > 0 && (
                      <Badge variant="destructive" className="ml-2 px-1 py-0 text-xs">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products, stores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  {user.hasStore ? (
                    <Link to="/manage-store" className="block">
                      <Button variant="ghost" className="w-full justify-start">
                        <Store className="w-4 h-4 mr-2" />
                        My Store
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/create-store" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Store className="w-4 h-4 mr-2" />
                        Create Store
                      </Button>
                    </Link>
                  )}
                  <Link to="/orders" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart
                      {totalItems > 0 && (
                        <Badge variant="destructive" className="ml-auto px-1 py-0 text-xs">
                          {totalItems}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block">
                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                  </Link>
                  <Link to="/register" className="block">
                    <Button className="w-full justify-start">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;