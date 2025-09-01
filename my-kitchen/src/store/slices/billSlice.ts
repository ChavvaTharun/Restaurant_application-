// src/store/slices/billSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderItem } from "./orderSlice";

export interface Bill {
  id: number;
  tableId: number;
  items: OrderItem[];
  total: number;
}

interface BillState {
  bills: Bill[];
}

const initialState: BillState = { bills: [] };

const billSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<Bill>) => {
      // Remove any existing bill for this table before adding
      state.bills = state.bills.filter(b => b.tableId !== action.payload.tableId);
      state.bills.push(action.payload);
    },
    removeBill: (state, action: PayloadAction<number>) => {
      state.bills = state.bills.filter(b => b.id !== action.payload);
    },
    clearBills: (state) => {
      state.bills = [];
    },
  },
});

export const { addBill, removeBill, clearBills } = billSlice.actions;
export default billSlice.reducer;
