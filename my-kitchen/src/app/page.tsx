"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import styles from './home.module.css';

export default function Home() {
  const tables = useSelector((state: RootState) => state.tables.tables);
  const router = useRouter();

  const handleTableClick = (tableId: number, isReserved: boolean) => {
    if (isReserved) {
      router.push(`/orders?table=${tableId}`);
    } else {
      router.push(`/menu?table=${tableId}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Tables</h2>
      <div className={styles.grid}>
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => handleTableClick(table.id, table.isReserved)}
            className={`${styles.card} ${table.isReserved ? styles.reserved : styles.available}`}
          >
            <h5 className={styles.cardTitle}>Table {table.id}</h5>
            <p className={styles.cardStatus}>{table.isReserved ? "Reserved" : "Available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
