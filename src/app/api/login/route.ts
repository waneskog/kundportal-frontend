import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email, password } = await request.json()
  // Enkel mock: godkänn bara en specifik användare
  if (email === "test@kund.se" && password === "hemligt") {
    // Här kan du returnera en token eller användardata
    return NextResponse.json({ success: true, token: "mock-token" })
  }
  return NextResponse.json({ success: false, message: "Fel e-post eller lösenord" }, { status: 401 })
}
