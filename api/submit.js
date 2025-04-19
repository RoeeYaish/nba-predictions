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
  
    // Debug log to verify structure
    console.log("Received body:", body);
  
    // Ensure body is an array of arrays (not objects)
    const formatted = body.map((row) => {
      if (Array.isArray(row)) {
        return [...row, timestamp];
      } else {
        return [row.user, row.gameId, row.pick, timestamp];
      }
    });
  
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbywGpFGxuL0rR2A64B7Cmo2BbTSNGbNKamkFmPqoVYhAQW7AhCu2-qOwlpTNFwsPgMw/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatted),
      }
    );
  
    const text = await response.text();
    return res.status(200).send(text);
  }
  