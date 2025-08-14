import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LogWithEquipment } from '@/types/database';
import { LogList } from '@/components/logs/LogList';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const fetchLogs = async () => {
  const { data, error } = await supabase
    .from('logs')
    .select('*, equipment(name)')
    .order('logged_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as LogWithEquipment[];
};

const LogsPage = () => {
  const { data: logs, isLoading, isError } = useQuery({
    queryKey: ['logs'],
    queryFn: fetchLogs,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
          </Button>
          <h1 className="text-3xl font-bold">Log History</h1>
          <p className="text-muted-foreground">A complete record of all temperature logs.</p>
        </div>
      </div>

      {isLoading && <Skeleton className="h-80" />}
      {isError && <p className="text-red-500">Failed to load logs.</p>}
      {logs && <LogList logs={logs} />}
    </div>
  );
};

export default LogsPage;