
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SearchPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Search Products</h1>
          <p className="text-muted-foreground mb-4">Product search and filtering will be implemented here</p>
          <Button>Filter Results</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchPage;