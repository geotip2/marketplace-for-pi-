import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Shield, CreditCard, Users, Store, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <Users className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Marketplace for Pioneers</span>
            </div>
            <p className="text-muted-foreground text-sm">
              The first decentralized marketplace powered by pioneers, for pioneers. Buy, sell, and trade with the Pi community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Marketplace</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-muted-foreground hover:text-primary transition-colors">
                  Featured Items
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-muted-foreground hover:text-primary transition-colors">
                  Sell Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/seller-guide" className="text-muted-foreground hover:text-primary transition-colors">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link to="/buyer-guide" className="text-muted-foreground hover:text-primary transition-colors">
                  Buyer Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-muted-foreground hover:text-primary transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center space-x-1">
                <Store className="w-4 h-4" />
                <span>Decentralized Marketplace</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for the Pi Community</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Marketplace for Pioneers. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
