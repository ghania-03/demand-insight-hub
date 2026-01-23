import { useState } from 'react';
import { TrendingSKU } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { TrendingUp, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopTrendingSKUsProps {
  data: TrendingSKU[];
  initialCount?: number;
}

export function TopTrendingSKUs({ data, initialCount = 5 }: TopTrendingSKUsProps) {
  const [showAll, setShowAll] = useState(false);
  
  // Sort by search volume (highest first)
  const sortedData = [...data].sort((a, b) => b.searchVolume - a.searchVolume);
  const displayData = showAll ? sortedData : sortedData.slice(0, initialCount);

  const formatSearchVolume = (volume: number): string => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    }
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(0)}K`;
    }
    return volume.toString();
  };

  return (
    <div className="space-y-1">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">SKU / Item Name</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1 justify-end">
                  <Search className="w-3 h-3" />
                  Google Search Volume
                </div>
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((item, index) => (
              <tr 
                key={item.id} 
                className={cn(
                  "border-b border-border/50 hover:bg-muted/50 transition-colors",
                  index === 0 && "bg-primary/5"
                )}
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-foreground text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.sku}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">{item.category}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-primary" 
                        style={{ 
                          width: `${Math.min((item.searchVolume / sortedData[0].searchVolume) * 100, 100)}%` 
                        }} 
                      />
                    </div>
                    <span className="font-semibold text-foreground min-w-[60px] text-right">
                      {formatSearchVolume(item.searchVolume)}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="font-semibold text-success">+{item.trendSpike}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedData.length > initialCount && (
        <div className="flex justify-center pt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-primary hover:text-primary/80"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                Show All {sortedData.length} Items
                <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      )}
      
      <div className="pt-2 border-t border-border/50">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Search className="w-3 h-3" />
          Data source: Google Trends (US Retail, Last 7 days)
        </p>
      </div>
    </div>
  );
}
