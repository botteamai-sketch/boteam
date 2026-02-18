import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("New Lead:", data);

  return NextResponse.json({ success: true });
}
