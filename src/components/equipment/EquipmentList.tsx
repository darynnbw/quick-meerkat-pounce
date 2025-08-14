import { Equipment } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Snowflake, Flame } from 'lucide-react';

interface EquipmentListProps {
  equipment: Equipment[];
}

const typeDisplay = {
  cold_holding: { label: 'Cold Holding', icon: <Snowflake className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' },
  freezer: { label: 'Freezer', icon: <Snowflake className="h-4 w-4" />, color: 'bg-sky-100 text-sky-800' },
  hot_holding: { label: 'Hot Holding', icon: <Flame className="h-4 w-4" />, color: 'bg-orange-100 text-orange-800' },
};

export const EquipmentList = ({ equipment }: EquipmentListProps) => {
  if (equipment.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <h3 className="text-xl font-semibold">No Equipment Found</h3>
        <p className="text-muted-foreground mt-2">Click "Add Equipment" to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {equipment.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {item.name}
              <Badge variant="secondary" className={typeDisplay[item.type].color}>
                {typeDisplay[item.type].icon}
                <span className="ml-1.5">{typeDisplay[item.type].label}</span>
              </Badge>
            </CardTitle>
            {item.location && <CardDescription>{item.location}</CardDescription>}
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Thermometer className="mr-2 h-4 w-4" />
              <span>
                Safe Range: {item.safe_min !== null ? `≥ ${item.safe_min}°C` : ''} {item.safe_max !== null ? `≤ ${item.safe_max}°C` : ''}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};