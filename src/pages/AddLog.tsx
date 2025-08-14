import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Equipment } from '@/types/database';
import { AddLogForm } from '@/components/logs/AddLogForm.tsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const fetchEquipment = async () => {
  const { data, error } = await supabase
    .from('equipment')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data as Equipment[];
};

const AddLogPage = () => {
  const { data: equipment, isLoading, isError } = useQuery({
    queryKey: ['equipment'],
    queryFn: fetchEquipment,
  });

  return (
    <div className="container mx-auto p-4 max-w-2xl">
       <Button variant="outline" size="sm" asChild className="mb-4">
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
        </Button>
      <Card>
        <CardHeader>
          <CardTitle>Add New Temperature Log</CardTitle>
          <CardDescription>Select your equipment and record the current temperature.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading && <Skeleton className="h-64" />}
            {isError && <p className="text-red-500">Failed to load equipment. Please try again.</p>}
            {equipment && <AddLogForm equipment={equipment} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLogPage;