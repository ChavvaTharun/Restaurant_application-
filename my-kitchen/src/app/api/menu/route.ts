// src/app/api/menu/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "menu.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const menuItems = JSON.parse(jsonData);

    return NextResponse.json(menuItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}
