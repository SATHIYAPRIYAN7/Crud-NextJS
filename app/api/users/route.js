import { NextResponse } from "next/server"

// In-memory storage for demo purposes
let users = []

export async function GET() {
  return NextResponse.json(users)
}

export async function POST(request) {
  const user = await request.json()
  users.push(user)
  return NextResponse.json(user, { status: 201 })
}

export async function PUT(request) {
  const user = await request.json()
  const index = users.findIndex((u) => u.id === user.id)
  if (index !== -1) {
    users[index] = user
    return NextResponse.json(user)
  }
  return NextResponse.json({ error: "User not found" }, { status: 404 })
}

export async function DELETE(request) {
  const { id } = await request.json()
  users = users.filter((u) => u.id !== id)
  return NextResponse.json({ success: true })
}
