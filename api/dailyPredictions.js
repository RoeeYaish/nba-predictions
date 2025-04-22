export default async function handler(req, res) {
  const url = "https://script.google.com/macros/s/AKfycbzkm85dkp1X4FCboHYczkZ9l3oZkEAw1cZVpLD0fEQWQTVkPxtaKHRno1lfW-XY5e7Z/exec?action=dailyPredictions";

  try {
    const response = await fetch(url);
    const text = await response.text(); // 👈 חשוב! כי ייתכן שהתגובה אינה JSON
    const json = JSON.parse(text); // ננסה לפענח כ־JSON
    return res.status(200).json(json);
  } catch (err) {
    console.error("❌ Failed to proxy daily predictions:", err);
    return res.status(500).send("Proxy failed");
  }
}
