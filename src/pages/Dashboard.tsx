import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { session } = useSession();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
      </div>
      <div className="p-6 bg-white rounded-lg shadow">
        <p className="text-lg">Welcome, <span className="font-semibold">{session?.user?.email}</span>!</p>
        <p className="text-gray-600 mt-2">This is your dashboard. We'll add equipment management and temperature logging features here soon.</p>
      </div>
    </div>
  );
};

export default Dashboard;