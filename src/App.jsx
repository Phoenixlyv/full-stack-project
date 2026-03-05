import { useEffect, useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [number, setNumber] = useState("");

  const loadPlayers = () => {

    fetch("http://localhost:3000/players")
    .then((res) => res.json())
    .then((data) => setPlayers(data));
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const addPlayer = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, position, number }),
    });
    loadPlayers();
  };

  const deletePlayer = async (id) => {
    await fetch(`http://localhost:3000/players/${id}`, {
      method: "DELETE",
    });

    loadPlayers();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Squad Manager</h1>
      <form onSubmit={addPlayer}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button>Add Player</button>
      </form>
      <h2>Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            #{player.number} {player.name} – {player.position}
            <button onClick={() => deletePlayer(player.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
