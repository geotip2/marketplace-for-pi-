
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Added useState import

const CreateStorePage = () => {
  const navigate = useNavigate();
  // Added state to manage form data
  const [formData, setFormData] = useState({
    storeName: '',
    storeDescription: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle store creation logic
    console.log('Store creation submitted', formData);
    
    // Add your store creation API call or logic here
    // For example:
    // createStore(formData).then(() => {
    //   navigate('/dashboard');
    // });
    
    navigate('/dashboard'); // Redirect after creation
  };

  // Added input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
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
                value={formData.storeName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="storeDescription">Store Description</Label>
              <Input 
                id="storeDescription" 
                placeholder="Describe your store" 
                value={formData.storeDescription}
                onChange={handleInputChange}
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
