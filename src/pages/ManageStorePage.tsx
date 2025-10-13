
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ManageStorePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Manage Store</h1>
          <p className="text-muted-foreground mb-4">Store management tools will be implemented here</p>
          <Button>Add Product</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageStorePage;