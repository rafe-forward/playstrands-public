import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/createStrands.css"
const API_URL = import.meta.env.VITE_API_URL;
function CreateStrands() {
  const [inputs, setInputs] = useState(["", "", "", "", "", "", ""]);
  const [wordsLength, setWordsLength] = useState(Array(7).fill(0));
  const [minwordLength, setMinWordLength] = useState(false);
  const [spanagramLength, setSpanagramLength] = useState(0);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    if (index === 0) {
      setSpanagramLength(value.length);
    }
    setInputs(newInputs);

    const allLongEnough = newInputs.every((w) => w.length >= 3);
    setMinWordLength(allLongEnough);
  };

  const totalLength = inputs.reduce((sum, val) => sum + val.length, 0);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent refresh
    if (!title.trim()) {
        alert("Please enter a title for your puzzle.");
        return;
      }

    if (inputs.length !== 7 || !minwordLength || spanagramLength < 7 || totalLength !== 48 || title.length > 100 ) {
      alert("Please fix validation errors before submitting. Make sure your title is less than 100 chars");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/generate-and-save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, words: inputs, is_daily:false }),
      });

      const data = await res.json();

      if (data.gameId) {
        navigate(`/play-linked-strands/${data.gameId}`);
      } else {
        alert("Failed to generate game.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error generating game.");
    }
  };

  return (
    <div className="play-content">
      <h1 className="title-banner">Create a Game of Strands!</h1>


      <h2>Instructions</h2>
      <ul className="strand-params">
        <li>Game must be 7 words</li>
        <li style={{ color: minwordLength ? "green" : "red" }}>
          Words must be three letters or longer
        </li>
        <li style={{ color: spanagramLength >= 7 ? "green" : "red" }}>
          Spanagram must be at least 7 characters
        </li>
        <li style={{ color: totalLength === 48 ? "green" : "red" }}>
          Total Length of All words must add up to 48, current: {totalLength}
        </li>
      </ul>

      <form className="word-input-form" onSubmit={handleSubmit}>
      <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your puzzle"
          style={{ marginBottom: "10px", display: "block" }}
          className="title-input"
        />
        {inputs.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={index === 0 ? "Spanagram" : `Word ${index + 1}`}
            style={{ marginBottom: "10px", display: "block" }}
            className={index === 0 ? "span-input" : "word-input"}
          />
        ))}

        <button type="submit">Generate Game</button>
      </form>
    </div>
  );
}

export default CreateStrands;
