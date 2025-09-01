// src/app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";

// Example GET handler
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Orders fetched successfully" });
}

// Example POST handler
export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ message: "Order created", data: body });
}
