import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select"

const NAMES = ["Roee", "Dagan Harakuvich", "Saban", "Doron"]

function App() {
  const [games, setGames] = useState([])
  const [predictions, setPredictions] = useState({})
  const [userName, setUserName] = useState("")

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzkm85dkp1X4FCboHYczkZ9l3oZkEAw1cZVpLD0fEQWQTVkPxtaKHRno1lfW-XY5e7Z/exec"
    )
      .then((res) => res.json())
      .then((data) => setGames(data))
  }, [])

  function handlePrediction(gameId, team) {
    setPredictions((prev) => ({ ...prev, [gameId]: team }))
  }

  function handleSubmit() {
    if (!userName) return alert("Please select your name")

    const output = games.map((g) => [
      userName,
      g.gameId,
      predictions[g.gameId] || "",
    ])

    console.log("Submitting", output)

    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(output),
    })
      .then((res) => res.text())
      .then((text) => {
        console.log("Response from script:", text)
        alert("Predictions submitted successfully!")
      })
      .catch((err) => {
        console.error("Error submitting predictions:", err)
        alert("Something went wrong.")
      })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 flex flex-col items-center">

      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 w-full max-w-4xl">
        <h1 className="text-5xl font-black mb-10 text-center text-yellow-400 drop-shadow-xl tracking-wide">
          🏀 NBA Playoff Predictions
        </h1>

        <div className="w-full max-w-md mb-8 mx-auto">
          <Select onValueChange={setUserName}>
            <SelectTrigger className="w-full bg-slate-800 text-white text-xl shadow-lg">
              <SelectValue placeholder="Select your name" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white">
              {NAMES.map((n) => (
                <SelectItem key={n} value={n} className="text-lg">
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-8">
          {games.map((g) => (
            <Card
              key={g.gameId}
              className="bg-slate-800/90 border-slate-700 shadow-2xl backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold text-center mb-6">
                  {g.home} <span className="text-yellow-400">vs</span> {g.away}
                </h2>
                <div className="flex justify-center gap-6">
                  <Button
                    onClick={() => handlePrediction(g.gameId, g.home)}
                    className={`text-lg px-6 py-3 rounded-xl font-semibold ${
                      predictions[g.gameId] === g.home
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent border border-yellow-500 text-white hover:bg-yellow-600 hover:text-black"
                    }`}
                  >
                    {g.home}
                  </Button>
                  <Button
                    onClick={() => handlePrediction(g.gameId, g.away)}
                    className={`text-lg px-6 py-3 rounded-xl font-semibold ${
                      predictions[g.gameId] === g.away
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent border border-yellow-500 text-white hover:bg-yellow-600 hover:text-black"
                    }`}
                  >
                    {g.away}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            onClick={handleSubmit}
            className="text-xl px-10 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full shadow-lg"
          >
            Submit Predictions
          </Button>
        </div>
      </div>
    </main>
  )
}

export default App
