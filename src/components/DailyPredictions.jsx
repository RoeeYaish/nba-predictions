import React, { useEffect, useState } from "react"

const USERS = ["Roee", "Dagan Harakuvich", "Saban", "Doron"]

export default function DailyPredictions() {
  const [predictions, setPredictions] = useState([])
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchPredictions = () => {
      fetch("/api/dailyPredictions")
        .then((res) => res.json())
        .then((data) => setPredictions(data))
        .catch((err) => console.error("❌ Failed to fetch predictions", err))
    }

    fetchPredictions()
    const interval = setInterval(fetchPredictions, 30000)

    fetch("/api/submit") // לא ישירות ל־Google Script
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("❌ Failed to fetch games", err))

    return () => clearInterval(interval)
  }, [])

  const gameMap = new Map()
  games.forEach((g) => {
    gameMap.set(g.gameId, `${g.home} vs ${g.away}`)
  })

  const grouped = USERS.map((user) => {
    const userPreds = predictions.filter((p) => p.user === user)
    return {
      user,
      picks: userPreds.length > 0
        ? userPreds.map((p) => ({
            pick: p.pick,
          }))
        : null,
    }
  })

  return (
    <div className="mt-12 bg-slate-800 rounded-xl shadow-lg p-6 w-full overflow-x-auto">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
        📋 Today's Predictions
      </h2>
      <table className="w-full table-auto text-sm md:text-base text-white border-collapse">
        <thead>
          <tr className="bg-slate-700">
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Pick(s)</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map((row, idx) => (
            <tr key={idx} className="border-b border-slate-600">
              <td className="p-2 font-medium">{row.user}</td>
              <td className="p-2">
                {row.picks ? (
                  row.picks.map((p, i) => (
                    <div key={i} className="text-white">{p.pick}</div>
                  ))
                ) : (
                  <span className="text-red-500 font-semibold">No prediction submitted</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
