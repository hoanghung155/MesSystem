import { reactive } from 'vue';

export interface InventoryItem {
  id: string;
  type: string;
  moldNo: string;
  shoeName: string;
  partName: string;
  size: string;
  total: number;
  warehouse: string;
  updateTime: string;
}

export interface HistoryItem {
  id: number;
  transactionNo: string;
  type: 'Inbound' | 'Outbound';
  moldNo: string;
  quantity: number;
  warehouse: string;
  location: string;
  operator: string;
  time: string;
}

// Generate some mock history data
const initialHistory: HistoryItem[] = [
  { id: 1, transactionNo: 'IN-20240419-001', type: 'Inbound', moldNo: '11-015-M-MID', quantity: 30, warehouse: 'Kho khuôn dập', location: 'B-02-01', operator: '864524', time: '2026-03-10 10:00' },
  { id: 2, transactionNo: 'OUT-20240419-002', type: 'Outbound', moldNo: '11-015-M-MID', quantity: -30, warehouse: 'Kho khuôn dập', location: 'B-02-01', operator: '754254', time: '2026-03-13 15:30' },
  { id: 3, transactionNo: 'IN-20240419-003', type: 'Inbound', moldNo: '11-015-M-MID', quantity: 15, warehouse: 'Kho khuôn dập', location: 'B-02-01', operator: '864524', time: '2026-04-15 10:00' },
  { id: 4, transactionNo: 'OUT-20240419-004', type: 'Outbound', moldNo: '11-015-M-MID', quantity: -15, warehouse: 'Kho khuôn dập', location: 'B-02-01', operator: '754254', time: '2026-04-18 15:30' },
];

// Generate some mock inventory summary data
const initialSummary: InventoryItem[] = [
  { id: '1', type: 'Khuôn dập', moldNo: '11-015-M-MID', shoeName: 'Cloud Spike...', partName: '', size: '7#', total: 150, warehouse: 'Kho khuôn dập', updateTime: '2026-04-20 08:00' },
  { id: '2', type: 'Khuôn dập', moldNo: '11-015-M-MID', shoeName: 'Cloud Spike...', partName: '', size: '8#', total: 150, warehouse: 'Kho khuôn dập', updateTime: '2026-04-20 08:00' },
  { id: '3', type: 'Khuôn dập', moldNo: '11-015-M-MID', shoeName: 'Cloud Spike...', partName: '', size: '9#', total: 150, warehouse: 'Kho khuôn dập', updateTime: '2026-04-20 08:00' },
  { id: '4', type: 'Khuôn dập', moldNo: '11-015-M-MID', shoeName: 'Cloud Spike...', partName: '', size: '10#', total: 150, warehouse: 'Kho khuôn dập', updateTime: '2026-04-20 08:00' },
];

export const globalStore = reactive({
  inventorySummary: [...initialSummary],
  inventoryHistory: [...initialHistory],

  processTransaction(items: any[], isOutbound: boolean, warehouse: string, location: string, operator: string = 'User') {
    const now = new Date();
    const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const prefix = isOutbound ? 'OUT' : 'IN';
    const transactionNo = `${prefix}-${now.getFullYear()}${String(now.getMonth()+1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    items.forEach(item => {
      // 1. Add to history
      const historyRecord: HistoryItem = {
        id: this.inventoryHistory.length + 1,
        transactionNo,
        type: isOutbound ? 'Outbound' : 'Inbound',
        moldNo: item.shoeName || 'Unknown', // Using shoeName as moldNo temporarily or whatever the item holds
        quantity: isOutbound ? -item.quantity : item.quantity,
        warehouse,
        location,
        operator,
        time: timeString
      };
      // For proper tracking, let's use the actual mold no if provided, or shoe name
      this.inventoryHistory.unshift(historyRecord);

      // 2. Update summary
      const existingItem = this.inventorySummary.find(s => s.shoeName === item.shoeName && s.size === item.size);
      if (existingItem) {
        existingItem.total += historyRecord.quantity;
        existingItem.updateTime = timeString;
      } else {
        this.inventorySummary.unshift({
          id: String(this.inventorySummary.length + 1),
          type: item.moldType || 'Unknown',
          moldNo: item.shoeName || 'Unknown',
          shoeName: item.shoeName || 'Unknown',
          partName: item.partName || '',
          size: item.size,
          total: historyRecord.quantity,
          warehouse,
          updateTime: timeString
        });
      }
    });
  }
});
