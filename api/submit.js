export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
  
    const body = req.body; // ⛳️ ← זה מה שנכון כאן (ולא await req.json())
  
    const timestamp = new Date().toLocaleString("en-IL", {
      timeZone: "Asia/Jerusalem",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  
    const formatted = body.map((row) => [
      row.user,
      row.gameId,
      row.pick,
      timestamp
    ]);
  
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbywGpFGxuL0rR2A64B7Cmo2BbTSNGbNKamkFmPqoVYhAQW7AhCu2-qOwlpTNFwsPgMw/exec",
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
  