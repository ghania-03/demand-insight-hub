import { PurchaseOrder } from './mockData';

export function exportPurchaseOrdersToCSV(orders: PurchaseOrder[], filename: string = 'purchase-orders'): void {
  // Define CSV headers
  const headers = [
    'PO Number',
    'Supplier',
    'Items',
    'Total Value ($)',
    'Status',
    'Created At',
    'Expected Delivery'
  ];

  // Map orders to CSV rows
  const rows = orders.map(order => [
    order.poNumber,
    order.supplier,
    order.items.toString(),
    order.totalValue.toString(),
    order.status.charAt(0).toUpperCase() + order.status.slice(1),
    order.createdAt,
    order.expectedDelivery
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
