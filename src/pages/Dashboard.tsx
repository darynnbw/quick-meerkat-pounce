import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Refrigerator, PlusCircle, History } from "lucide-react";

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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Manage Equipment</CardTitle>
            <CardDescription>Add or view your equipment.</CardDescription>
          </CardHeader>
          <CardContent>
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
            <CardDescription>Record a new temperature reading.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/add-log">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Log
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>View Log History</CardTitle>
            <CardDescription>Review all past temperature logs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/logs">
                <History className="mr-2 h-4 w-4" />
                View History
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;