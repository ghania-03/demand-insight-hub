import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { TrendingTable } from '@/components/dashboard/TrendingTable';
import { DemandChart } from '@/components/dashboard/DemandChart';
import { 
  trendingSKUs, 
  aiAlerts, 
  revenueProjection 
} from '@/lib/mockData';
import { 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Shield,
  Package,
  BarChart3
} from 'lucide-react';

const Overview = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground">Executive Overview</h2>
          <p className="text-muted-foreground mt-1">Real-time demand insights and AI-powered recommendations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <StatCard
            title="Revenue Protected"
            value={`$${(revenueProjection.protected / 1000).toFixed(0)}K`}
            subtitle={`Next ${revenueProjection.period}`}
            icon={Shield}
            variant="success"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Revenue at Risk"
            value={`$${(revenueProjection.atRisk / 1000).toFixed(0)}K`}
            subtitle="Requires immediate action"
            icon={AlertTriangle}
            variant="danger"
          />
          <StatCard
            title="Active AI Alerts"
            value={aiAlerts.filter(a => a.status === 'action_required').length}
            subtitle={`${aiAlerts.length} total alerts`}
            icon={TrendingUp}
            variant="warning"
          />
          <StatCard
            title="SKUs Monitored"
            value="2,847"
            subtitle="Across 12 categories"
            icon={Package}
            variant="primary"
            trend={{ value: 8.2, isPositive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Trending SKUs - Takes 2 columns */}
          <div className="xl:col-span-2 bg-card rounded-xl border p-5 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Trending SKUs at Risk
                </h3>
                <p className="text-sm text-muted-foreground">Top 5 products requiring attention</p>
              </div>
              <span className="status-badge status-action-required">
                <AlertTriangle className="w-3 h-3" />
                {trendingSKUs.filter(s => s.timeUntilStockout.includes('hour')).length} Critical
              </span>
            </div>
            <TrendingTable data={trendingSKUs} />
          </div>

          {/* AI Alerts */}
          <div className="bg-card rounded-xl border p-5 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Today's AI Alerts</h3>
              <span className="text-xs font-medium text-primary cursor-pointer hover:underline">View All</span>
            </div>
            <div className="space-y-3">
              {aiAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <DemandChart />
        </div>

        {/* Revenue Impact Card */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20 p-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Projected Revenue Impact</h3>
              <p className="text-muted-foreground">Next 14 days projection based on AI analysis</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-3xl font-bold text-success">${(revenueProjection.protected / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">revenue protected through early detection</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
