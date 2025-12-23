import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    console.log("BODY:", body);

    return NextResponse.json({
        status: "success",
        message: "Lead received",
    });
}
