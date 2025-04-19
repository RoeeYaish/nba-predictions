export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
  
    const body = await req.json();
  
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
      timestamp,
    ]);
  
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzMBBeRuXUZ87mLCXSea_sAMaG6jaKrDH2YYyvxZqUFlhbY5CUoLOIXmpLH-3yy2im_/exec",
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
  