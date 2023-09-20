import { calculateTimeAgo } from '../utils/dateUtils';

export const gridColumnExtensions = [
    { columnName: 'Id', filteringEnabled: false },
    { columnName: 'loadNumber', filteringEnabled: false },
    { columnName: 'product', filteringEnabled: false },
    { columnName: 'origin', filteringEnabled: false },
    { columnName: 'destination', width: 100, filteringEnabled: false },
    { columnName: 'driver', width: 300, filteringEnabled: false },
    { columnName: 'customer', filteringEnabled: true },
    { columnName: 'createdDuration', filteringEnabled: false },
    { columnName: 'assignedDuration', filteringEnabled: false },
]

export const gridColumns = [
    { name: 'Id', title: 'Id', getCellValue: row => row.id },
    { name: 'loadNumber', title: 'Load #', getCellValue: row => row.loadNumber },
    { name: 'product', title: 'Product', getCellValue: row => row.product },
    { name: 'origin', title: 'Origin', getCellValue: row => row.origin },
    { name: 'destination', title: 'Destination', getCellValue: row => row.destination },
    {
        name: 'driver', title: 'Driver', getCellValue: row => `${row.driver?.name} (${row.driver?.carrier?.name})`
    },
    { name: 'customer', title: 'Customer', getCellValue: row => row.customer?.name },
    { name: 'createdDuration', title: 'Duration(Created)', getCellValue: row => calculateTimeAgo(row.createdDateTime) },
    { name: 'assignedDuration', title: 'Duration(Assigned)', getCellValue: row => calculateTimeAgo(row.modifiedDateTime) },
]