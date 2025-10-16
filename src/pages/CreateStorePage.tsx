import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // If you have input component
import { Label } from '@/components/ui/label'; // If you have label component
import { useNavigate } from 'react-router-dom';

const CreateStorePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle store creation logic
    console.log('Store creation submitted');
    navigate('/dashboard'); // Redirect after creation
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Create Your Store</h1>
          <p className="text-muted-foreground mb-6 text-center">
            Set up your marketplace store in minutes
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input 
                id="storeName" 
                placeholder="Enter your store name" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="storeDescription">Store Description</Label>
              <Input 
                id="storeDescription" 
                placeholder="Describe your store" 
              />
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full">
                Create Store
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateStorePage;
