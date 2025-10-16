import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // or your router

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your account overview.</p>
      </div>

      {/* Stats Cards - unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* ... your existing stat cards ... */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your marketplace presence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full justify-start"
              onClick={() => handleNavigation('/create-store')}
            >
              <Store className="mr-2 h-4 w-4" />
              Create New Store
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleNavigation('/add-product')}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleNavigation('/analytics')}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity Card - unchanged */}
        <Card>
          {/* ... your existing recent activity ... */}
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
