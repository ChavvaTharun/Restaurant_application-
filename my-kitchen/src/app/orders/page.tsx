"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addBill } from "@/store/slices/billSlice";
import { deleteOrder } from "@/store/slices/orderSlice";
import styles from "../orders.module.css";

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.orders?.list || []);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToBill = (tableId: number) => {
    const order = orders.find(o => o.tableId === tableId);
    if (!order) return;

    const bill = {
      id: Date.now(),
      tableId: order.tableId,
      total: order.total,
    };

    dispatch(addBill(bill));
    dispatch(deleteOrder(tableId));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orders</h1>

      {orders.length === 0 ? (
        <p className={styles.empty}>No orders yet</p>
      ) : (
        <div className={styles.grid}>
          {orders.map((order) => (
            <div key={order.tableId} className={styles.card}>
              <h2 className={styles.cardTitle}>Table {order.tableId}</h2>
              <ul className={styles.itemList}>
                {order.items.map(item => (
                  <li key={item.id} className={styles.item}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹ {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.total}>Total: ₹ {order.total}</p>
              <button
                onClick={() => handleAddToBill(order.tableId)}
                className={styles.btn}
              >
                Add to Bill
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
