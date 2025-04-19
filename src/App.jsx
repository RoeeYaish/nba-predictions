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
      "https://script.google.com/macros/s/AKfycbzMBBeRuXUZ87mLCXSea_sAMaG6jaKrDH2YYyvxZqUFlhbY5CUoLOIXmpLH-3yy2im_/exec"
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
      <h1 className="text-4xl font-extrabold mb-8 text-center text-yellow-400 drop-shadow-lg">
        🏀 NBA Playoff Predictions
      </h1>

      <div className="w-full max-w-md mb-6">
        <Select onValueChange={setUserName}>
          <SelectTrigger className="w-full bg-slate-800 text-white text-lg">
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

      <div className="w-full max-w-3xl grid gap-6">
        {games.map((g) => (
          <Card
            key={g.gameId}
            className="bg-slate-800 border-slate-700 shadow-xl"
          >
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-center mb-4">
                {g.home} <span className="text-yellow-400">vs</span> {g.away}
              </h2>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => handlePrediction(g.gameId, g.home)}
                  variant={
                    predictions[g.gameId] === g.home ? "default" : "outline"
                  }
                >
                  {g.home}
                </Button>
                <Button
                  onClick={() => handlePrediction(g.gameId, g.away)}
                  variant={
                    predictions[g.gameId] === g.away ? "default" : "outline"
                  }
                >
                  {g.away}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-10 px-8 py-4 text-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
      >
        Submit Predictions
      </Button>
    </main>
  )
}

export default App
