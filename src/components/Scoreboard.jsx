// src/components/Scoreboard.tsx

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Scoreboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbzkm85dkp1X4FCboHYczkZ9l3oZkEAw1cZVpLD0fEQWQTVkPxtaKHRno1lfW-XY5e7Z/exec")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.score - a.score);
        setScores(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load scores:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-white mt-8">Loading scores...</div>;
  }

  return (
    <div className="mt-12 max-w-xl mx-auto w-full">
      <Card className="bg-slate-800/90 border-slate-700 shadow-2xl">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
            🏆 Leaderboard
          </h2>
          <table className="w-full text-left border-collapse text-white">
            <thead>
              <tr className="text-yellow-300 text-xl border-b border-slate-600">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((row, index) => (
                <tr
                  key={row.user}
                  className="border-b border-slate-700 hover:bg-slate-700/30"
                >
                  <td className="py-2 px-4 font-mono">{index + 1}</td>
                  <td className="py-2 px-4">{row.user}</td>
                  <td className="py-2 px-4 text-right font-semibold">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
