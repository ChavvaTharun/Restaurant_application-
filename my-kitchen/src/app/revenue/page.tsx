"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { removeRevenue } from "@/store/slices/revenueSlice";
import styles from "../revenue.module.css";

export default function RevenuePage() {
  const revenueList = useSelector((state: RootState) => state.revenue.list);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = (orderId: number) => {
    dispatch(removeRevenue(orderId));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Revenue</h1>

      {revenueList.length === 0 ? (
        <p className={styles.empty}>No revenue yet</p>
      ) : (
        <ul className={styles.grid}>
          {revenueList.map((r) => (
            <li key={r.orderId} className={styles.card}>
              <div>
                <p className={styles.billId}>Order ID: {r.orderId}</p>
                <p className={styles.billTable}>Table: {r.tableId}</p>
                <p className={styles.billTotal}>Total: ₹{r.total}</p>
                <p className={styles.billDate}>Date: {r.date}</p>
              </div>
              <button
                onClick={() => handleRemove(r.orderId)}
                className={styles.btn}
              >
                Remove Revenue
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
