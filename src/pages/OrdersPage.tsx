
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const OrdersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">My Orders</h1>
          <p className="text-muted-foreground mb-4">Order history and tracking will be displayed here</p>
          <Button>View Order Details</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;