export async function POST(req) {
    const body = await req.json()
  
    // בדוק אם body הוא מערך של אובייקטים עם user, gameId, pick
    const isValid = Array.isArray(body) && body.length && body[0].user
  
    if (!isValid) {
      console.error("Invalid body:", body)
      return new Response("Invalid data", { status: 400 })
    }
  
    const timestamp = new Date().toLocaleString("en-IL", {
      timeZone: "Asia/Jerusalem",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  
    const formatted = body.map((row) => [
      row.user,
      row.gameId,
      row.pick,
      timestamp,
    ])
  
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbzBg4pfDsMtjhQaocAZ9n1UFOhNBqJ4Drz6MU_67F7EOgKRHCla1fzeQCZOcFIsiaE/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatted),
      }
    )
  
    return new Response("OK")
  }
  