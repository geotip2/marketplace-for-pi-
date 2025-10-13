
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CreateStorePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Create Your Store</h1>
          <p className="text-muted-foreground mb-4">Store creation form will be implemented here</p>
          <Button>Create Store</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateStorePage;