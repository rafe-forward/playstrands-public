import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PlayLinkedStrands.css";
import Navbar from "./Navbar";
const API_URL = import.meta.env.VITE_API_URL;
function PlayLinkedStrands() {
  const [board, setBoard] = useState([]);
  const [input, setInput] = useState("");

  const [draggedPath, setDraggedPath] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [validPaths, setValidPaths] = useState([]);
  const [lockedCells, setLockedCells] = useState([]);
  const {game_id} = useParams();
  const [spanagramPath, setSpanagramPath] = useState([]);
  const [spanagramLockedCells, setSpanagramLockedCells] = useState([]);
  const [gameCode,setGameCode] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
      if (isMobile) {
        navigate("/mobile");
      }
    }, [navigate]);

  useEffect(() => {
    const FetchGame = async () => {
      try {
        const res = await fetch(`${API_URL}/api/game/${game_id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setTitle(data.title);
        setBoard(data.board);
        setValidPaths([
          ...data.side1_paths,
          ...data.side2_paths,
          data.spanagram_path,
        ]);
        setSpanagramPath(data.spanagram_path);
        setDraggedPath([]);
        setLockedCells([]);
      } catch (error) {
        console.error("Error loading game:", error);
      }
    };
  
    if (game_id) FetchGame();
  }, [game_id]);

    useEffect(() => {
  const handleMouseUp = () => {
    setIsDragging(false);

    const normalizePath = (path) =>
      path.map((p) => `${p.row},${p.col}`).join("-");

    const draggedStr = normalizePath(draggedPath);

    const isMatch = validPaths.some(
      (vp) =>
        normalizePath(vp.map(([r, c]) => ({ row: r, col: c }))) === draggedStr
    );

    const isSpanagramMatch =
      normalizePath(spanagramPath.map(([r, c]) => ({ row: r, col: c }))) === draggedStr;

    if (isMatch) {
      const newCells = draggedPath.filter(
        (cell) => !lockedCells.some((p) => p.row === cell.row && p.col === cell.col)
      );

      setLockedCells((prev) => [...prev, ...newCells]);

      if (isSpanagramMatch) {
        setSpanagramLockedCells((prev) => [...prev, ...newCells]);
      }
    } else {
    }

    setDraggedPath([]);
  };

  window.addEventListener("mouseup", handleMouseUp);
  return () => window.removeEventListener("mouseup", handleMouseUp);
}, [draggedPath, validPaths, spanagramPath, lockedCells]);

function copyText() {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("Game link copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy:", err);
      });
  }
  return (
    <>
    <Navbar />
    <div className="play-content">
        <h1 className="title-banner">My-Strands</h1>
        <button onClick={copyText}>Copy Game Link</button>
        <h2 className="game-title">{title || "Daily Puzzle"}</h2>
        <div className="board-wrapper">
        <div className="board" style={{ marginTop: "20px" }}>
            {board.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
                {row.map((cell, cellIndex) => {
                const isSelected = draggedPath.some(
                    (p) => p.row === rowIndex && p.col === cellIndex
                );
                const isLocked = lockedCells.some(
                    (p) => p.row === rowIndex && p.col === cellIndex
                );

                return (
                    <Cell
                    key={cellIndex}
                    letter={cell}
                    locked={isLocked}
                    spanagram={spanagramLockedCells.some(
                        (p) => p.row === rowIndex && p.col === cellIndex
                    )}
                    isSelected={isSelected}
                    row={rowIndex}
                    col={cellIndex}
                    onMouseDown={() => {
                        if (!isLocked) {
                        setDraggedPath([
                            { row: rowIndex, col: cellIndex, letter: cell },
                        ]);
                        setIsDragging(true);
                        }
                    }}
                    onMouseEnter={() => {
                        if (isDragging && !isLocked) {
                        setDraggedPath((prev) => {
                            const alreadyIncluded = prev.some(
                            (p) => p.row === rowIndex && p.col === cellIndex
                            );
                            if (alreadyIncluded) return prev;

                            if (prev.length > 0) {
                            const last = prev[prev.length - 1];
                            const isAdjacent =
                                Math.abs(last.row - rowIndex) +
                                Math.abs(last.col - cellIndex) ===
                                1;
                            if (!isAdjacent) return prev;
                            }

                            return [
                            ...prev,
                            { row: rowIndex, col: cellIndex, letter: cell },
                            ];
                        });
                        }
                    }}
                    />
                );
                })}
            </div>
            ))}
        </div>
        </div>
      </div>
    </>
  );
}

export default PlayLinkedStrands;
