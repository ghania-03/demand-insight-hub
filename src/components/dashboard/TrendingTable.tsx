import { TrendingSKU } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { TrendingUp, Clock, DollarSign, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TrendingTableProps {
  data: TrendingSKU[];
}

export function TrendingTable({ data }: TrendingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">SKU</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trend Spike</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time to Stockout</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Revenue at Risk</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={item.id} 
              className={cn(
                "border-b border-border/50 hover:bg-muted/50 transition-colors",
                index === 0 && "bg-destructive/5"
              )}
            >
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-foreground text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.sku}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="font-semibold text-success">+{item.trendSpike}%</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-1.5">
                  <Clock className={cn(
                    "w-4 h-4",
                    item.timeUntilStockout.includes('hour') ? "text-destructive" : "text-warning"
                  )} />
                  <span className={cn(
                    "font-medium text-sm",
                    item.timeUntilStockout.includes('hour') ? "text-destructive" : "text-foreground"
                  )}>
                    {item.timeUntilStockout}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">${item.revenueAtRisk.toLocaleString()}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2 min-w-[100px]">
                  <Progress value={item.confidence} className="h-2 flex-1" />
                  <span className="text-xs font-medium text-muted-foreground w-8">{item.confidence}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
