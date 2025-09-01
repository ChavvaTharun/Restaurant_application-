import { NextResponse } from "next/server";
import { readJSON } from "../../../lib/fileUtils";

export async function GET() {
  try {
    const tables = readJSON("tables.json");
    return NextResponse.json(tables);
  } catch (err) {
    return NextResponse.json({ error: "Failed to load tables" }, { status: 500 });
  }
}
