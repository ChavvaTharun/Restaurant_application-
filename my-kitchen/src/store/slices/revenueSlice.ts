// src/store/slices/revenueSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Revenue {
  orderId: number;    // required
  tableId: number;
  total: number;
  date: string;
}

interface RevenueState {
  list: Revenue[];
}

const initialState: RevenueState = { list: [] };

const revenueSlice = createSlice({
  name: "revenue",
  initialState,
  reducers: {
    addRevenue: (state, action: PayloadAction<Revenue>) => {
      const revenue = action.payload;
      if (!revenue.orderId) return;  // ignore invalid entries
      const exists = state.list.find(r => r.orderId === revenue.orderId);
      if (!exists) state.list.push(revenue);
    },
    removeRevenue: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(r => r.orderId !== action.payload);
    },
    clearRevenue: (state) => {
      state.list = [];
    },
  },
});

export const { addRevenue, removeRevenue, clearRevenue } = revenueSlice.actions;
export default revenueSlice.reducer;
