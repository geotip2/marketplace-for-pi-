
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <p className="text-muted-foreground mb-4">Profile management will be implemented here</p>
          <Button>Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;