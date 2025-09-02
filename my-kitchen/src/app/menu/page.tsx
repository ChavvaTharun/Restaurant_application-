"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addOrder } from "../../store/slices/orderSlice";
import { reserveTable } from "../../store/slices/tableSlice";
import { addBill } from "../../store/slices/billSlice";
import { addRevenue } from "../../store/slices/revenueSlice";
import menuData from "../../data/menu.json";
import styles from '../menu.module.css';
import { AppDispatch } from "../../store/store";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  type: string;  // veg, non-veg, drinks etc.
  image: string;
}

interface SelectedItem extends MenuItem {
  quantity: number;
}

export default function Menu() {
  const searchParams = useSearchParams();
  const tableId = Number(searchParams.get("table"));
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [filterType, setFilterType] = useState<string>("all"); // 👈 filter state

  useEffect(() => setMenuItems(menuData), []);

  const handleAddItem = (item: MenuItem) => {
    setSelectedItems(prev => {
      const exist = prev.find(i => i.id === item.id);
      if (exist) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id: number) => setSelectedItems(prev => prev.filter(i => i.id !== id));

  const handlePlaceOrder = () => {
    if (selectedItems.length === 0) return;
    const total = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    dispatch(addOrder({ tableId, items: selectedItems, total }));
    dispatch(reserveTable(tableId));
    dispatch(addBill({ id: Date.now(), tableId, total }));
    dispatch(addRevenue({ orderId: Date.now(), tableId, total, date: new Date().toLocaleDateString() }));

    router.push(`/orders?table=${tableId}`);
  };

  // 👇 filter menu items
  const filteredItems = filterType === "all"
    ? menuItems
    : menuItems.filter(item => item.type.toLowerCase() === filterType.toLowerCase());

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Menu - Table {tableId}</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Type:</label>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="Main">Main</option>
          <option value="Burger">Burger</option>
          <option value="Drink">Drinks</option>
          <option value="Snacks">Snacks</option>
          <option value="Sandwich">Sandwich</option>
          <option value="French Fries">French Fries</option>
          <option value="Tiffins">Tiffins</option>
          <option value="Bread">Bread</option>
          <option value="Pastha">Pastha</option>
          <option value="Noodles">Noodles</option>
        </select>
      </div>

      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className={styles.grid}>
            {filteredItems.map(item => (
              <div key={item.id} className={styles.card}>
                <img src={item.image} alt={item.name} />
                <div className={styles.cardContent}>
                  <h5 className={styles.cardTitle}>{item.name}</h5>
                  <p className={styles.cardPrice}>₹ {item.price}</p>
                  <button
                    className={`${styles.btn} ${styles.btnBlue}`}
                    onClick={() => handleAddItem(item)}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4 col-md-12">
          {selectedItems.length > 0 && (
            <div className="mt-8">
              <h4 className={styles.subtitle}>Selected Items</h4>
              <ul className={styles.selectedList}>
                {selectedItems.map(item => (
                  <li key={item.id} className={styles.selectedItem}>
                    <span>
                      {item.name} x {item.quantity} - ₹ {item.price * item.quantity}
                    </span>
                    <button
                      className={`${styles.btn} ${styles.btnRed}`}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className={`${styles.btn} ${styles.btnGreen}`}
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
