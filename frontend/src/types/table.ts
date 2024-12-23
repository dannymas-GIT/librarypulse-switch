import React from 'react';

export interface Column<T = any> {
  header: string;
  accessorKey: string;
  cell?: (props: { row: { original: T }; getValue: () => any }) => React.ReactNode;
}

export interface TableProps<T = any> {
  data: T[];
  columns: Column<T>[];
} 