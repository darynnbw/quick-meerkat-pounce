import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Refrigerator, PlusCircle } from "lucide-react";

const Dashboard = () => {
  const { session } = useSession();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {session?.user?.email}!</p>
        </div>
        <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Manage Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">Add or view your temperature-controlled equipment like fridges and freezers.</p>
            <Button asChild>
              <Link to="/equipment">
                <Refrigerator className="mr-2 h-4 w-4" />
                Go to Equipment
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Log a Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">Record a new temperature reading for one of your pieces of equipment.</p>
            <Button disabled>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Log (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;