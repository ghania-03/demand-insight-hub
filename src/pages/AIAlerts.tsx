import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AIAlert } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Bell,
  TrendingUp,
  MapPin,
  Calendar,
} from 'lucide-react';

// Extended mock alerts for pagination
const extendedAlerts: AIAlert[] = [
  { id: '1', message: 'Store-Level Demand Surge Detected – Green Silk Scarf (Chicago & SoHo)', status: 'action_required', timestamp: '2 min ago', impactLevel: 'high' },
  { id: '2', message: 'Influencer Campaign Impact – Pearl Drop Earrings trending on TikTok', status: 'in_review', timestamp: '15 min ago', impactLevel: 'high' },
  { id: '3', message: 'Regional Weather Pattern – Winter accessories demand increasing in Northeast', status: 'in_review', timestamp: '1 hour ago', impactLevel: 'medium' },
  { id: '4', message: 'Competitor Stockout Alert – Similar denim products unavailable at major retailer', status: 'approved', timestamp: '3 hours ago', impactLevel: 'medium' },
  { id: '5', message: 'Supply Chain Delay – Milano Textiles shipment delayed by 2 days', status: 'action_required', timestamp: '4 hours ago', impactLevel: 'high' },
  { id: '6', message: 'Seasonal Trend Alert – Cashmere products demand expected to rise 40%', status: 'in_review', timestamp: '5 hours ago', impactLevel: 'medium' },
  { id: '7', message: 'Flash Sale Opportunity – Competitor running 50% off on similar products', status: 'approved', timestamp: '6 hours ago', impactLevel: 'low' },
  { id: '8', message: 'Inventory Alert – 3 SKUs approaching minimum stock levels', status: 'action_required', timestamp: '8 hours ago', impactLevel: 'high' },
  { id: '9', message: 'New Store Opening Impact – Expected 25% demand increase in Austin region', status: 'in_review', timestamp: '12 hours ago', impactLevel: 'medium' },
  { id: '10', message: 'Returns Pattern Detected – Vintage Denim Jacket sizing issues reported', status: 'action_required', timestamp: '1 day ago', impactLevel: 'medium' },
  { id: '11', message: 'Social Media Spike – Brand mention increased by 200% after celebrity post', status: 'approved', timestamp: '1 day ago', impactLevel: 'high' },
  { id: '12', message: 'Price Optimization Alert – Margin opportunity detected for Pearl accessories', status: 'in_review', timestamp: '2 days ago', impactLevel: 'low' },
];

const statusConfig = {
  action_required: {
    label: 'Action Required',
    icon: AlertTriangle,
    className: 'status-action-required',
  },
  in_review: {
    label: 'In Review',
    icon: Clock,
    className: 'status-in-review',
  },
  approved: {
    label: 'Approved',
    icon: CheckCircle,
    className: 'status-approved',
  },
};

const ITEMS_PER_PAGE = 6;

const AIAlerts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlert, setSelectedAlert] = useState<AIAlert | null>(null);

  const filteredAlerts = useMemo(() => {
    let result = [...extendedAlerts];

    // Search filter
    if (searchQuery) {
      result = result.filter(alert =>
        alert.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(alert => alert.status === statusFilter);
    }

    // Sort
    if (sortOrder === 'oldest') {
      result.reverse();
    }

    return result;
  }, [searchQuery, statusFilter, sortOrder]);

  const totalPages = Math.ceil(filteredAlerts.length / ITEMS_PER_PAGE);
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            AI Alerts
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor and manage AI-generated alerts and recommendations
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="action_required">Action Required</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-card rounded-xl border p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {extendedAlerts.filter(a => a.status === 'action_required').length}
              </p>
              <p className="text-sm text-muted-foreground">Action Required</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {extendedAlerts.filter(a => a.status === 'in_review').length}
              </p>
              <p className="text-sm text-muted-foreground">In Review</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {extendedAlerts.filter(a => a.status === 'approved').length}
              </p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          {paginatedAlerts.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground">No alerts found</p>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          ) : (
            paginatedAlerts.map((alert) => {
              const config = statusConfig[alert.status];
              const Icon = config.icon;

              return (
                <div
                  key={alert.id}
                  className="p-4 rounded-xl border bg-card hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                        alert.status === 'action_required' && 'bg-destructive/10',
                        alert.status === 'in_review' && 'bg-warning/10',
                        alert.status === 'approved' && 'bg-success/10'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-5 h-5',
                          alert.status === 'action_required' && 'text-destructive',
                          alert.status === 'in_review' && 'text-warning',
                          alert.status === 'approved' && 'text-success'
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-snug">
                        {alert.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className={cn('status-badge', config.className)}>
                          {config.label}
                        </span>
                        <span
                          className={cn(
                            'text-xs px-2 py-0.5 rounded-full',
                            alert.impactLevel === 'high' && 'bg-destructive/10 text-destructive',
                            alert.impactLevel === 'medium' && 'bg-warning/10 text-warning',
                            alert.impactLevel === 'low' && 'bg-muted text-muted-foreground'
                          )}
                        >
                          {alert.impactLevel.charAt(0).toUpperCase() + alert.impactLevel.slice(1)} Impact
                        </span>
                        <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredAlerts.length)} of{' '}
              {filteredAlerts.length} alerts
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-8"
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Alert Details Dialog */}
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedAlert && (
                  <>
                    {selectedAlert.status === 'action_required' && (
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    )}
                    {selectedAlert.status === 'in_review' && (
                      <Clock className="w-5 h-5 text-warning" />
                    )}
                    {selectedAlert.status === 'approved' && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                    Alert Details
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {selectedAlert?.message}
              </DialogDescription>
            </DialogHeader>
            {selectedAlert && (
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      Time
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedAlert.timestamp}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <TrendingUp className="w-4 h-4" />
                      Impact Level
                    </div>
                    <p className="text-sm font-medium text-foreground capitalize">{selectedAlert.impactLevel}</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    Affected Areas
                  </div>
                  <p className="text-sm font-medium text-foreground">Chicago, SoHo, Northeast Region</p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">Recommended Actions:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground">Review affected SKU inventory levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground">Consider expedited reorder if stock is critical</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground">Monitor social media trends for demand signals</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1" onClick={() => setSelectedAlert(null)}>
                    Take Action
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedAlert(null)}>
                    Dismiss
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AIAlerts;
