export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
  
    const body = req.body;
  
    const timestamp = new Date().toLocaleString("en-IL", {
      timeZone: "Asia/Jerusalem",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  
    const formatted = body.map((row) => [
      row[0], // user
      row[1], // gameId
      row[2], // pick
      timestamp
    ]);
  
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzBg4pfDsMtjhQaocAZ9n1UFOhNBqJ4Drz6MU_67F7EOgKRHCla1fzeQCZOcFIsiaE/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formatted)
      }
    );
  
    const text = await response.text();
    return res.status(200).send(text);
  }
  