export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
  
    const response = await fetch("https://script.google.com/macros/s/AKfycbxdr6YeDcs_NogJ_l7Mu09mpl1BildJ4A9Kvjg3WRqQuUVeiC9TuSqmeI9ARidJIxmW/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
  
    const text = await response.text();
    return res.status(200).send(text);
  }
  