// Mock Data for Sensing Engine Dashboard
// Data structure mirrors Google Trends (US Retail, 7 days, sorted by search volume)
// Source: https://trends.google.com/trending?geo=US&hl=en-US&hours=168&sort=search-volume&category=5

export interface TrendingSKU {
  id: string;
  name: string;
  sku: string;
  searchVolume: number; // Google search volume
  trendSpike: number;
  timeUntilStockout: string;
  revenueAtRisk: number;
  confidence: number;
  category: string;
}

export interface AIAlert {
  id: string;
  message: string;
  status: 'action_required' | 'in_review' | 'approved';
  timestamp: string;
  impactLevel: 'high' | 'medium' | 'low';
}

export interface TrendSignal {
  id: string;
  keyword: string;
  change24h: number;
  change7d: number;
  source: 'tiktok' | 'instagram' | 'twitter' | 'google';
  velocity: number;
  searchVolume: number;
  isActive: boolean;
}

export interface SKUMapping {
  id: string;
  trendKeyword: string;
  skuId: string;
  skuName: string;
  confidence: number;
  searchVolume: number;
}

export interface ForecastData {
  date: string;
  historical: number | null;
  forecast: number | null;
  forecastLow: number | null;
  forecastHigh: number | null;
}

export interface AIRecommendation {
  id: string;
  skuName: string;
  skuId: string;
  action: string;
  quantity: number;
  supplier: string;
  revenueProtected: number;
  status: 'drafted' | 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  items: number;
  totalValue: number;
  status: 'draft' | 'approved' | 'sent' | 'received';
  createdAt: string;
  expectedDelivery: string;
}

// Top Trending SKUs - Retail items sorted by Google Search Volume
// Mock data structured to mirror Google Trends US Retail Category
export const trendingSKUs: TrendingSKU[] = [
  { id: '1', name: 'Stanley Quencher Tumbler', sku: 'STN-040', searchVolume: 2450000, trendSpike: 456, timeUntilStockout: '12 hours', revenueAtRisk: 89200, confidence: 96, category: 'Drinkware' },
  { id: '2', name: 'Dyson Airwrap Complete', sku: 'DYS-AW1', searchVolume: 1820000, trendSpike: 312, timeUntilStockout: '18 hours', revenueAtRisk: 156000, confidence: 94, category: 'Beauty' },
  { id: '3', name: 'Lululemon Define Jacket', sku: 'LLM-DJ2', searchVolume: 1540000, trendSpike: 278, timeUntilStockout: '2 days', revenueAtRisk: 67500, confidence: 92, category: 'Apparel' },
  { id: '4', name: 'Apple AirPods Pro 2', sku: 'APL-AP2', searchVolume: 1380000, trendSpike: 189, timeUntilStockout: '3 days', revenueAtRisk: 245000, confidence: 91, category: 'Electronics' },
  { id: '5', name: 'Nike Dunk Low Panda', sku: 'NKE-DLP', searchVolume: 1120000, trendSpike: 234, timeUntilStockout: '36 hours', revenueAtRisk: 78900, confidence: 89, category: 'Footwear' },
  { id: '6', name: 'Drunk Elephant Protini', sku: 'DE-PRT1', searchVolume: 980000, trendSpike: 167, timeUntilStockout: '4 days', revenueAtRisk: 34500, confidence: 88, category: 'Beauty' },
  { id: '7', name: 'Oura Ring Gen 3', sku: 'OUR-RG3', searchVolume: 845000, trendSpike: 145, timeUntilStockout: '5 days', revenueAtRisk: 89000, confidence: 86, category: 'Wearables' },
  { id: '8', name: 'Skims Soft Lounge Set', sku: 'SKM-SLS', searchVolume: 720000, trendSpike: 198, timeUntilStockout: '2 days', revenueAtRisk: 56200, confidence: 90, category: 'Apparel' },
  { id: '9', name: 'Theragun Prime', sku: 'TG-PRM1', searchVolume: 654000, trendSpike: 123, timeUntilStockout: '6 days', revenueAtRisk: 42300, confidence: 84, category: 'Wellness' },
  { id: '10', name: 'Hoka Bondi 8', sku: 'HKA-B08', searchVolume: 598000, trendSpike: 156, timeUntilStockout: '4 days', revenueAtRisk: 67800, confidence: 87, category: 'Footwear' },
  { id: '11', name: 'Glossier You Perfume', sku: 'GLS-YOU', searchVolume: 534000, trendSpike: 134, timeUntilStockout: '5 days', revenueAtRisk: 28900, confidence: 85, category: 'Beauty' },
  { id: '12', name: 'Yeti Rambler 26oz', sku: 'YET-R26', searchVolume: 487000, trendSpike: 112, timeUntilStockout: '7 days', revenueAtRisk: 31200, confidence: 83, category: 'Drinkware' },
];

export const aiAlerts: AIAlert[] = [
  { id: '1', message: 'Store-Level Demand Surge Detected – Stanley Quencher Tumbler (Chicago & SoHo)', status: 'action_required', timestamp: '2 min ago', impactLevel: 'high' },
  { id: '2', message: 'High Search Volume Alert – Dyson Airwrap trending on Google Search', status: 'in_review', timestamp: '15 min ago', impactLevel: 'high' },
  { id: '3', message: 'Regional Weather Pattern – Winter apparel demand increasing in Northeast', status: 'in_review', timestamp: '1 hour ago', impactLevel: 'medium' },
  { id: '4', message: 'Competitor Stockout Alert – Lululemon Define Jacket unavailable at major retailer', status: 'approved', timestamp: '3 hours ago', impactLevel: 'medium' },
];

// Trend Signals - Only Google is active, others are inactive/zero
export const trendSignals: TrendSignal[] = [
  { id: '1', keyword: 'Stanley cup tumbler', change24h: 245, change7d: 892, source: 'google', velocity: 94, searchVolume: 2450000, isActive: true },
  { id: '2', keyword: 'Dyson airwrap sale', change24h: 178, change7d: 456, source: 'google', velocity: 87, searchVolume: 1820000, isActive: true },
  { id: '3', keyword: 'Lululemon define jacket', change24h: 134, change7d: 312, source: 'google', velocity: 76, searchVolume: 1540000, isActive: true },
  { id: '4', keyword: 'AirPods Pro 2 deal', change24h: 89, change7d: 234, source: 'google', velocity: 68, searchVolume: 1380000, isActive: true },
  { id: '5', keyword: 'Nike Dunk Low', change24h: 156, change7d: 389, source: 'google', velocity: 72, searchVolume: 1120000, isActive: true },
  { id: '6', keyword: 'Drunk Elephant skincare', change24h: 67, change7d: 189, source: 'google', velocity: 58, searchVolume: 980000, isActive: true },
  // Inactive sources - keeping for structure but marked as inactive
  { id: '7', keyword: 'TikTok made me buy it', change24h: 0, change7d: 0, source: 'tiktok', velocity: 0, searchVolume: 0, isActive: false },
  { id: '8', keyword: 'Instagram shopping', change24h: 0, change7d: 0, source: 'instagram', velocity: 0, searchVolume: 0, isActive: false },
  { id: '9', keyword: 'Twitter trends', change24h: 0, change7d: 0, source: 'twitter', velocity: 0, searchVolume: 0, isActive: false },
];

export const skuMappings: SKUMapping[] = [
  { id: '1', trendKeyword: 'Stanley cup tumbler', skuId: 'STN-040', skuName: 'Stanley Quencher Tumbler', confidence: 96, searchVolume: 2450000 },
  { id: '2', trendKeyword: 'Dyson airwrap sale', skuId: 'DYS-AW1', skuName: 'Dyson Airwrap Complete', confidence: 94, searchVolume: 1820000 },
  { id: '3', trendKeyword: 'Lululemon define jacket', skuId: 'LLM-DJ2', skuName: 'Lululemon Define Jacket', confidence: 92, searchVolume: 1540000 },
  { id: '4', trendKeyword: 'AirPods Pro 2 deal', skuId: 'APL-AP2', skuName: 'Apple AirPods Pro 2', confidence: 91, searchVolume: 1380000 },
  { id: '5', trendKeyword: 'Nike Dunk Low', skuId: 'NKE-DLP', skuName: 'Nike Dunk Low Panda', confidence: 89, searchVolume: 1120000 },
];

export const generateForecastData = (days: number = 30): ForecastData[] => {
  const data: ForecastData[] = [];
  const today = new Date();
  const historicalDays = Math.floor(days * 0.6);
  
  for (let i = days; i > 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const isHistorical = i > days - historicalDays;
    
    const baseValue = 120 + Math.sin(i / 5) * 30;
    const noise = Math.random() * 20 - 10;
    
    if (isHistorical) {
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        historical: Math.round(baseValue + noise),
        forecast: null,
        forecastLow: null,
        forecastHigh: null,
      });
    } else {
      const forecastValue = baseValue + 15 + noise;
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        historical: null,
        forecast: Math.round(forecastValue),
        forecastLow: Math.round(forecastValue * 0.85),
        forecastHigh: Math.round(forecastValue * 1.15),
      });
    }
  }
  
  return data;
};

export const aiRecommendations: AIRecommendation[] = [
  { id: '1', skuName: 'Stanley Quencher Tumbler', skuId: 'STN-040', action: 'Emergency Reorder', quantity: 500, supplier: 'Stanley PMI', revenueProtected: 89200, status: 'pending', createdAt: '2024-01-15T10:30:00Z' },
  { id: '2', skuName: 'Dyson Airwrap Complete', skuId: 'DYS-AW1', action: 'Store Transfer', quantity: 150, supplier: 'Chicago DC → SoHo', revenueProtected: 156000, status: 'drafted', createdAt: '2024-01-15T09:15:00Z' },
  { id: '3', skuName: 'Apple AirPods Pro 2', skuId: 'APL-AP2', action: 'Express Restock', quantity: 300, supplier: 'Apple Distribution', revenueProtected: 245000, status: 'approved', createdAt: '2024-01-14T16:45:00Z' },
  { id: '4', skuName: 'Lululemon Define Jacket', skuId: 'LLM-DJ2', action: 'Standard Reorder', quantity: 200, supplier: 'Lululemon Wholesale', revenueProtected: 67500, status: 'pending', createdAt: '2024-01-14T14:20:00Z' },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: '1', poNumber: 'PO-2024-0892', supplier: 'Stanley PMI', items: 8, totalValue: 125000, status: 'approved', createdAt: '2024-01-15', expectedDelivery: '2024-01-22' },
  { id: '2', poNumber: 'PO-2024-0891', supplier: 'Dyson Inc.', items: 12, totalValue: 189000, status: 'sent', createdAt: '2024-01-14', expectedDelivery: '2024-01-25' },
  { id: '3', poNumber: 'PO-2024-0890', supplier: 'Lululemon Wholesale', items: 5, totalValue: 67500, status: 'draft', createdAt: '2024-01-14', expectedDelivery: '2024-01-28' },
  { id: '4', poNumber: 'PO-2024-0889', supplier: 'Apple Distribution', items: 15, totalValue: 345000, status: 'received', createdAt: '2024-01-10', expectedDelivery: '2024-01-17' },
  { id: '5', poNumber: 'PO-2024-0888', supplier: 'Nike Wholesale', items: 20, totalValue: 156000, status: 'approved', createdAt: '2024-01-08', expectedDelivery: '2024-01-20' },
];

export const revenueProjection = {
  protected: 420000,
  atRisk: 85000,
  period: '14 days',
};

export const sourceIcons: Record<string, string> = {
  tiktok: '📱',
  instagram: '📸',
  twitter: '🐦',
  google: '🔍',
};

// Signal source status for Trend Radar page
export const signalSourceStatus = {
  google: { active: true, signals: 6, velocity: 76 },
  tiktok: { active: false, signals: 0, velocity: 0 },
  instagram: { active: false, signals: 0, velocity: 0 },
  twitter: { active: false, signals: 0, velocity: 0 },
};
