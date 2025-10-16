import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Search, Star, Filter, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  piPrice: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

const StorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<Product[]>([]);

  // Sample products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      piPrice: 3.33,
      description: 'High-quality wireless headphones with noise cancellation',
      image: '/api/placeholder/300/300',
      category: 'electronics',
      rating: 4.5,
      inStock: true
    },
    {
      id: '2',
      name: 'Smartphone Case',
      price: 25.00,
      piPrice: 0.83,
      description: 'Durable protective case for smartphones',
      image: '/api/placeholder/300/300',
      category: 'accessories',
      rating: 4.2,
      inStock: true
    },
    {
      id: '3',
      name: 'Laptop Backpack',
      price: 59.99,
      piPrice: 2.00,
      description: 'Water-resistant backpack with laptop compartment',
      image: '/api/placeholder/300/300',
      category: 'accessories',
      rating: 4.7,
      inStock: true
    },
    {
      id: '4',
      name: 'Mechanical Keyboard',
      price: 129.99,
      piPrice: 4.33,
      description: 'RGB mechanical keyboard with blue switches',
      image: '/api/placeholder/300/300',
      category: 'electronics',
      rating: 4.8,
      inStock: false
    },
    {
      id: '5',
      name: 'Wireless Mouse',
      price: 35.00,
      piPrice: 1.17,
      description: 'Ergonomic wireless mouse with long battery life',
      image: '/api/placeholder/300/300',
      category: 'electronics',
      rating: 4.3,
      inStock: true
    },
    {
      id: '6',
      name: 'Phone Stand',
      price: 15.99,
      piPrice: 0.53,
      description: 'Adjustable aluminum phone stand',
      image: '/api/placeholder/300/300',
      category: 'accessories',
      rating: 4.1,
      inStock: true
    }
  ];

  const categories = ['all', 'electronics', 'accessories'];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    // In a real app, you might want to use a context or state management
  };

  const getCartCount = () => cart.length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Our Store</h1>
          <p className="text-muted-foreground mt-2">
            Discover amazing products and pay with Pi Coin
          </p>
        </div>
        
        {/* Cart Button */}
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          {getCartCount() > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 bg-primary text-primary-foreground"
            >
              {getCartCount()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="category" className="whitespace-nowrap">Category:</Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="aspect-square w-full bg-muted rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">Product Image</span>
              </div>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge 
                  variant={product.inStock ? "default" : "secondary"}
                  className={product.inStock ? "bg-green-500" : ""}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  ({product.rating})
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="pb-3">
              <p className="text-muted-foreground text-sm mb-4">
                {product.description}
              </p>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">${product.price}</p>
                  <p className="text-sm text-primary font-medium">
                    π {product.piPrice}
                  </p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full"
                disabled={!product.inStock}
                onClick={() => addToCart(product)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No products found</p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pi Payment Promotion */}
      <Card className="mt-8 bg-primary text-primary-foreground">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Pay with Pi Coin</h3>
          <p className="opacity-90">
            Get 5% bonus when you pay with Pi Coin! Secure, fast, and easy payments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorePage;
