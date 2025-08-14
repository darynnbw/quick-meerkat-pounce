import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/contexts/AuthContext';
import { showSuccess, showError } from '@/utils/toast';
import { PlusCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['cold_holding', 'freezer', 'hot_holding']),
  location: z.string().optional(),
  safe_min: z.coerce.number().optional().nullable(),
  safe_max: z.coerce.number().optional().nullable(),
});

type EquipmentFormValues = z.infer<typeof formSchema>;

interface AddEquipmentDialogProps {
  onSuccess: () => void;
}

export const AddEquipmentDialog = ({ onSuccess }: AddEquipmentDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useSession();
  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
      safe_min: null,
      safe_max: null,
    },
  });

  const equipmentType = form.watch('type');

  useEffect(() => {
    switch (equipmentType) {
      case 'cold_holding':
        form.setValue('safe_min', null);
        form.setValue('safe_max', 4);
        break;
      case 'freezer':
        form.setValue('safe_min', null);
        form.setValue('safe_max', -18);
        break;
      case 'hot_holding':
        form.setValue('safe_min', 60);
        form.setValue('safe_max', null);
        break;
      default:
        form.setValue('safe_min', null);
        form.setValue('safe_max', null);
    }
  }, [equipmentType, form]);

  const onSubmit = async (values: EquipmentFormValues) => {
    if (!session?.user) {
      showError('You must be logged in to add equipment.');
      return;
    }

    const { error } = await supabase.from('equipment').insert({
      ...values,
      user_id: session.user.id,
    });

    if (error) {
      showError(error.message);
    } else {
      showSuccess('Equipment added successfully!');
      onSuccess();
      setIsOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Equipment</DialogTitle>
          <DialogDescription>
            Fill in the details for your new equipment. Safe ranges are pre-filled based on type.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fridge 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an equipment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cold_holding">Cold Holding</SelectItem>
                      <SelectItem value="freezer">Freezer</SelectItem>
                      <SelectItem value="hot_holding">Hot Holding</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Kitchen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="safe_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Safe Min Temp (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="safe_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Safe Max Temp (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save Equipment'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};