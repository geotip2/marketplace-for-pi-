
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <p className="text-muted-foreground mb-4">Pi Coin payment processing will be implemented here</p>
          <Button>Pay with Pi Coin</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;