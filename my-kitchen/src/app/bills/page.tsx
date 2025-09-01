"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { freeTable } from "@/store/slices/tableSlice";
import { removeBill } from "@/store/slices/billSlice";
import { addRevenue } from "@/store/slices/revenueSlice";
import styles from "../bills.module.css";

export default function BillsPage() {
  const bills = useSelector((state: RootState) => state.bills?.bills || []);
  const dispatch = useDispatch<AppDispatch>();

const handlePayment = (billId: number, tableId: number, total: number) => {
  dispatch(freeTable(tableId));
  dispatch(removeBill(billId));
  dispatch(addRevenue({
    orderId: billId,   // must include unique orderId
    tableId,
    total,
    date: new Date().toLocaleDateString(),
  }));
};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bills</h1>

      {bills.length === 0 ? (
        <p className={styles.empty}>No bills yet</p>
      ) : (
        <ul className={styles.grid}>
          {bills.map((bill) => (
            <li key={bill.id} className={styles.card}>
              <div>
                <p className={styles.billId}>Bill ID: {bill.id}</p>
                <p className={styles.billTable}>Table: {bill.tableId}</p>
                <p className={styles.billTotal}>Total: ₹{bill.total}</p>
              </div>
              <button
                onClick={() => handlePayment(bill.id, bill.tableId, bill.total)}
                className={styles.btn}
              >
                Make Payment
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
