// src/store/slices/tableSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Table {
  id: number;
  isReserved: boolean;
}

interface TableState {
  tables: Table[];
}

const initialState: TableState = {
  tables: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, isReserved: false })),
};

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    reserveTable: (state, action: PayloadAction<number>) => {
      const table = state.tables.find(t => t.id === action.payload);
      if (table) table.isReserved = true;
    },
    freeTable: (state, action: PayloadAction<number>) => {
      const table = state.tables.find(t => t.id === action.payload);
      if (table) table.isReserved = false;
    },
  },
});

export const { reserveTable, freeTable } = tableSlice.actions;
export default tableSlice.reducer;
