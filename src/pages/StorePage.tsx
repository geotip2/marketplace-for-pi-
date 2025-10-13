
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StorePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Store Page</h1>
          <p className="text-muted-foreground mb-4">Store details and products will be displayed here</p>
          <Button>Browse Products</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorePage;