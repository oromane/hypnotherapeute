export async function POST(request: Request) {
  const body = await request.json()
  const { password } = body

  const correctPassword = process.env.ADMIN_PASSWORD || "Lefi2^10£0qk#F5jvTc"

  if (password === correctPassword) {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    return Response.json(
      { token, message: "Connexion réussie" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
        },
      },
    )
  }

  return Response.json({ error: "Mot de passe incorrect" }, { status: 401 })
}
