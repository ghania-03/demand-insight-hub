import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TrendRadar } from '@/components/dashboard/TrendRadar';
import { SKUMappingCard } from '@/components/dashboard/SKUMappingCard';
import { trendSignals, skuMappings, sourceIcons } from '@/lib/mockData';
import { Radio, Link2, Zap, TrendingUp } from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend 
} from 'recharts';

const sourceData = [
  { name: 'TikTok', value: 45, color: 'hsl(var(--chart-1))' },
  { name: 'Instagram', value: 28, color: 'hsl(var(--chart-4))' },
  { name: 'Twitter/X', value: 15, color: 'hsl(var(--chart-5))' },
  { name: 'Google', value: 12, color: 'hsl(var(--chart-3))' },
];

const LiveTrends = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Radio className="w-6 h-6 text-primary animate-pulse-subtle" />
            Live Trends
          </h2>
          <p className="text-muted-foreground mt-1">External demand signals driving in-store demand</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {Object.entries(sourceIcons).map(([source, icon], index) => {
            const signalCount = trendSignals.filter(s => s.source === source).length;
            const avgVelocity = Math.round(
              trendSignals
                .filter(s => s.source === source)
                .reduce((acc, s) => acc + s.velocity, 0) / (signalCount || 1)
            );
            return (
              <div 
                key={source}
                className="bg-card rounded-xl border p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground capitalize">{source}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">{signalCount}</span>
                    <span className="text-xs text-muted-foreground">signals</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Zap className="w-3 h-3 text-warning" />
                    <span className="text-muted-foreground">Avg velocity: {avgVelocity}</span>
                  </div>
                </div>
              </div>
            );
          })}
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
              <TrendRadar signals={trendSignals} />
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
                  />
                  <Legend 
                    formatter={(value) => (
                      <span className="text-sm text-muted-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Influencer Velocity Score</h4>
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{source.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${source.value * 2}%`,
                          backgroundColor: source.color 
                        }} 
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground w-6">{source.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveTrends;
