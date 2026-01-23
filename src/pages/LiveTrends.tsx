import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TrendRadar } from '@/components/dashboard/TrendRadar';
import { SKUMappingCard } from '@/components/dashboard/SKUMappingCard';
import { trendSignals, skuMappings, signalSourceStatus, sourceIcons } from '@/lib/mockData';
import { Radio, Link2, Zap, TrendingUp, Search, AlertCircle } from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend 
} from 'recharts';
import { cn } from '@/lib/utils';

// Updated source data - Only Google is active
const sourceData = [
  { name: 'Google', value: 100, color: 'hsl(var(--chart-3))', active: true },
  { name: 'TikTok', value: 0, color: 'hsl(var(--muted))', active: false },
  { name: 'Instagram', value: 0, color: 'hsl(var(--muted))', active: false },
  { name: 'Twitter/X', value: 0, color: 'hsl(var(--muted))', active: false },
];

const LiveTrends = () => {
  // Filter to only active signals (Google only)
  const activeSignals = trendSignals.filter(s => s.isActive && s.source === 'google');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Radio className="w-6 h-6 text-primary animate-pulse-subtle" />
            Trend Radar
          </h2>
          <p className="text-muted-foreground mt-1">External demand signals driving in-store demand</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {Object.entries(signalSourceStatus).map(([source, status]) => {
            const icon = sourceIcons[source];
            return (
              <div 
                key={source}
                className={cn(
                  "bg-card rounded-xl border p-4 flex items-center gap-4 relative overflow-hidden",
                  !status.active && "opacity-60"
                )}
              >
                {!status.active && (
                  <div className="absolute top-2 right-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      Inactive
                    </span>
                  </div>
                )}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                  status.active ? "bg-primary/10" : "bg-muted"
                )}>
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground capitalize">{source}</p>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-xl font-bold",
                      status.active ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {status.signals}
                    </span>
                    <span className="text-xs text-muted-foreground">signals</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Zap className={cn(
                      "w-3 h-3",
                      status.active ? "text-warning" : "text-muted-foreground"
                    )} />
                    <span className="text-muted-foreground">Avg velocity: {status.velocity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Source Notice */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center gap-3 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <Search className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Google Trends is the active data provider</p>
            <p className="text-xs text-muted-foreground">Data source: trends.google.com/trending (US Retail, Last 7 days, sorted by search volume)</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Trend Radar - 2 columns */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border p-5 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Trend Radar
                  </h3>
                  <p className="text-sm text-muted-foreground">Trending products & keywords with momentum indicators</p>
                </div>
              </div>
              <TrendRadar signals={activeSignals} />
            </div>

            {/* SKU Mapping */}
            <div className="bg-card rounded-xl border p-5 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-primary" />
                    SKU Mapping
                  </h3>
                  <p className="text-sm text-muted-foreground">AI-matched trends to inventory items</p>
                </div>
              </div>
              <SKUMappingCard mappings={skuMappings} />
            </div>
          </div>

          {/* Signal Sources Chart */}
          <div className="bg-card rounded-xl border p-5 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Signal Sources</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value, name) => [
                      `${value}%`,
                      name === 'Google' ? `${name} (Active)` : `${name} (Inactive)`
                    ]}
                  />
                  <Legend 
                    formatter={(value, entry) => (
                      <span className={cn(
                        "text-sm",
                        sourceData.find(s => s.name === value)?.active 
                          ? "text-foreground font-medium" 
                          : "text-muted-foreground"
                      )}>
                        {value}
                        {sourceData.find(s => s.name === value)?.active && ' ✓'}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Data Provider Status</h4>
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <span className={cn(
                    "text-sm",
                    source.active ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {source.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {source.active ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Inactive Sources Notice */}
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    TikTok, Instagram, and Twitter/X are currently inactive. 
                    Google Trends is the sole active data provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveTrends;
