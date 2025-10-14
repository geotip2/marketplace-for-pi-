
import { Link } from 'react-router-dom';
import { ArrowRight, Store, ShoppingBag, Users, TrendingUp, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HomePage = () => {
  const featuredProducts = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 25.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      store: 'TechHub',
      rating: 4.8,
      sales: 234
    },
    {
      id: '2',
      name: 'Organic Coffee Beans',
      price: 12.50,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
      store: 'Bean & Brew',
      rating: 4.9,
      sales: 156
    },
    {
      id: '3',
      name: 'Handmade Ceramic Mug',
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop',
      store: 'Artisan Corner',
      rating: 4.7,
      sales: 89
    },
    {
      id: '4',
      name: 'Fitness Tracker',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
      store: 'FitGear Pro',
      rating: 4.6,
      sales: 312
    }
  ];

  const featuredStores = [
    {
      id: '1',
      name: 'TechHub',
      description: 'Latest gadgets and electronics',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      products: 45,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Artisan Corner',
      description: 'Handcrafted goods and art',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      products: 23,
      rating: 4.9
    },
    {
      id: '3',
      name: 'Green Living',
      description: 'Eco-friendly products',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
      products: 67,
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Powered by Marketplace for pi
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  The Future of
                  <span className="gradient-primary bg-clip-text text-transparent"> Decentralized</span>
                  <br />Commerce
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Buy, sell, and trade with Pi Coin on the world's first Pi-powered marketplace. 
                  Join thousands of pioneers building the new economy.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Selling
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/search">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Browse Products
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Stores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">25K+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                  alt="Marketplace"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 gradient-primary rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose PiMarket?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the benefits of decentralized commerce with Pi Coin integration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Secure Transactions</CardTitle>
                <CardDescription>
                  All payments are secured by Pi Network's blockchain technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Store className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Easy Store Setup</CardTitle>
                <CardDescription>
                  Create your store in minutes and start selling to the Pi community
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Low Fees</CardTitle>
                <CardDescription>
                  Only 5% commission on sales - much lower than traditional platforms
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Discover trending items from our community</p>
            </div>
            <Link to="/search">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.store}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">π {product.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stores */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Featured Stores</h2>
            <p className="text-muted-foreground">Explore popular stores in our marketplace</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStores.map((store) => (
              <Card key={store.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {store.name}
                    </h3>
                    <p className="text-muted-foreground">{store.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{store.products} products</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-muted-foreground">{store.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Pi Business?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs building the future of commerce with Pi Coin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create-store">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Store className="mr-2 w-4 h-4" />
                  Create Your Store
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Users className="mr-2 w-4 h-4" />
                  Join as Buyer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
