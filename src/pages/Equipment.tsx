import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EquipmentList } from '@/components/equipment/EquipmentList';
import { AddEquipmentDialog } from '@/components/equipment/AddEquipmentDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Equipment } from '@/types/database';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const fetchEquipment = async () => {
  const { data, error } = await supabase
    .from('equipment')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as Equipment[];
};

const EquipmentPage = () => {
  const queryClient = useQueryClient();
  const { data: equipment, isLoading, isError } = useQuery({
    queryKey: ['equipment'],
    queryFn: fetchEquipment,
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['equipment'] });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
          </Button>
          <h1 className="text-3xl font-bold">Equipment Management</h1>
          <p className="text-muted-foreground">Add and view your temperature-controlled equipment.</p>
        </div>
        <AddEquipmentDialog onSuccess={handleSuccess} />
      </div>

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      )}
      {isError && <p className="text-red-500">Failed to load equipment.</p>}
      {equipment && <EquipmentList equipment={equipment} />}
    </div>
  );
};

export default EquipmentPage;