import { useState } from 'react';
import { PurchaseOrder } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface NewPOModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePO: (po: PurchaseOrder) => void;
}

const suppliers = [
  'Stanley PMI',
  'Dyson Inc.',
  'Lululemon Wholesale',
  'Apple Distribution',
  'Nike Wholesale',
  'Hoka One One',
  'Glossier',
  'Yeti Holdings',
];

export function NewPOModal({ open, onOpenChange, onCreatePO }: NewPOModalProps) {
  const [supplier, setSupplier] = useState('');
  const [items, setItems] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [expectedDelivery, setExpectedDelivery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supplier || !items || !totalValue || !expectedDelivery) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Generate new PO number
    const poNumber = `PO-2024-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}`;
    
    const newPO: PurchaseOrder = {
      id: `${Date.now()}`,
      poNumber,
      supplier,
      items: parseInt(items),
      totalValue: parseFloat(totalValue),
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      expectedDelivery,
    };

    // Simulate API delay
    setTimeout(() => {
      onCreatePO(newPO);
      setIsSubmitting(false);
      onOpenChange(false);
      
      // Reset form
      setSupplier('');
      setItems('');
      setTotalValue('');
      setExpectedDelivery('');

      toast({
        title: "Purchase Order Created",
        description: `${poNumber} has been created successfully.`,
      });
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Purchase Order</DialogTitle>
          <DialogDescription>
            Create a new purchase order. It will be saved as a draft.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier *</Label>
            <Select value={supplier} onValueChange={setSupplier}>
              <SelectTrigger id="supplier">
                <SelectValue placeholder="Select a supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="items">Number of Items *</Label>
              <Input
                id="items"
                type="number"
                min="1"
                placeholder="e.g., 10"
                value={items}
                onChange={(e) => setItems(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="totalValue">Total Value ($) *</Label>
              <Input
                id="totalValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 50000"
                value={totalValue}
                onChange={(e) => setTotalValue(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedDelivery">Expected Delivery Date *</Label>
            <Input
              id="expectedDelivery"
              type="date"
              value={expectedDelivery}
              onChange={(e) => setExpectedDelivery(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Purchase Order'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
