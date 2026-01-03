import { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Games() {
  const { token } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [sport, setSport] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      const res = await axios.get(`/games${sport ? "?sport=" + sport : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGames(res.data);
    };
    fetchGames();
  }, [sport, token]);

  const addFavorite = async (id) => {
    await axios.post(`/favorites/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }});
    alert("Added to favorites");
  };

 return (
  <div className="page">
    <div className="card">
      <h2>Games</h2>

      {games.map((game) => (
        <div key={game.id}>
          <p><strong>{game.name}</strong></p>
        </div>
      ))}
    </div>
  </div>
);

}
