// src/store/slices/orderSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface TableOrder {
  tableId: number;
  items: OrderItem[];
  total: number;
}

export interface OrderState {
  list: TableOrder[];
}

const initialState: OrderState = {
  list: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TableOrder>) => {
      if (!state.list) state.list = [];
      state.list.push(action.payload);
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(o => o.tableId !== action.payload);
    },
    clearOrders: (state) => {
      state.list = [];
    },
  },
});

export const { addOrder, deleteOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
