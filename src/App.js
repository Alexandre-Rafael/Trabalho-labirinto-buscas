import React, { useState, useEffect } from "react";
import "./App.css";

const maze = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, "A"],
  [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  ["B", 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const directions = [
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
];

const getPosition = (maze, target) => {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === target) {
        return { x: i, y: j };
      }
    }
  }
  return null;
};

function bfsWithTraversal(maze, start, goal) {
  const queue = [];
  const explored = new Set();
  const traversalOrder = [];

  queue.push({ x: start.x, y: start.y, path: [] });
  explored.add(`${start.x},${start.y}`);

  while (queue.length > 0) {
    const current = queue.shift();
    traversalOrder.push({ x: current.x, y: current.y });

    console.log(`Explorando nó: (${current.x}, ${current.y})`);

    if (current.x === goal.x && current.y === goal.y) {
      console.log("Objetivo alcançado!");
      return { path: current.path, traversalOrder };
    }

    for (const dir of directions) {
      const nextX = current.x + dir.x;
      const nextY = current.y + dir.y;
      const key = `${nextX},${nextY}`;

      if (
        nextX >= 0 &&
        nextX < maze.length &&
        nextY >= 0 &&
        nextY < maze[0].length &&
        (maze[nextX][nextY] === 1 || maze[nextX][nextY] === "B") &&
        !explored.has(key)
      ) {
        queue.push({
          x: nextX,
          y: nextY,
          path: [...current.path, { x: nextX, y: nextY }],
        });
        explored.add(key);
        console.log(`Adicionado à fila: (${nextX}, ${nextY})`);
      }
    }
  }

  console.log("Nenhum caminho encontrado!");
  return { path: [], traversalOrder };
}

function dfsWithTraversal(maze, start, goal) {
  const stack = [];
  const explored = new Set();
  const traversalOrder = [];

  stack.push({ x: start.x, y: start.y, path: [] });

  while (stack.length > 0) {
    const current = stack.pop();

    if (explored.has(`${current.x},${current.y}`)) {
      continue;
    }

    explored.add(`${current.x},${current.y}`);
    traversalOrder.push({ x: current.x, y: current.y });

    console.log(`Explorando nó: (${current.x}, ${current.y})`);

    if (current.x === goal.x && current.y === goal.y) {
      console.log("Objetivo alcançado!");
      return { path: current.path, traversalOrder };
    }

    for (const dir of directions) {
      const nextX = current.x + dir.x;
      const nextY = current.y + dir.y;
      const key = `${nextX},${nextY}`;

      if (
        nextX >= 0 &&
        nextX < maze.length &&
        nextY >= 0 &&
        nextY < maze[0].length &&
        (maze[nextX][nextY] === 1 || maze[nextX][nextY] === "B") &&
        !explored.has(key)
      ) {
        stack.push({
          x: nextX,
          y: nextY,
          path: [...current.path, { x: nextX, y: nextY }],
        });
        console.log(`Adicionado à pilha: (${nextX}, ${nextY})`);
      }
    }
  }

  console.log("Nenhum caminho encontrado!");
  return { path: [], traversalOrder };
}


function euclideanSearch(maze, start, goal) {
  const priorityQueue = [];
  const explored = new Set();
  const traversalOrder = [];

  // Função heurística (distância euclidiana)
  const heuristic = (x, y) => Math.sqrt((x - goal.x) ** 2 + (y - goal.y) ** 2);

  priorityQueue.push({ x: start.x, y: start.y, path: [], cost: heuristic(start.x, start.y) });

  while (priorityQueue.length > 0) {
    // Ordena a fila de prioridade com base no custo
    priorityQueue.sort((a, b) => a.cost - b.cost);

    const current = priorityQueue.shift();
    traversalOrder.push({ x: current.x, y: current.y });

    console.log(`Explorando nó: (${current.x}, ${current.y})`);

    if (current.x === goal.x && current.y === goal.y) {
      console.log("Objetivo alcançado!");
      return { path: current.path, traversalOrder };
    }

    for (const dir of directions) {
      const nextX = current.x + dir.x;
      const nextY = current.y + dir.y;
      const key = `${nextX},${nextY}`;

      if (
        nextX >= 0 &&
        nextX < maze.length &&
        nextY >= 0 &&
        nextY < maze[0].length &&
        (maze[nextX][nextY] === 1 || maze[nextX][nextY] === "B") &&
        !explored.has(key)
      ) {
        priorityQueue.push({
          x: nextX,
          y: nextY,
          path: [...current.path, { x: nextX, y: nextY }],
          cost: heuristic(nextX, nextY),
        });
        explored.add(key);
        console.log(`Adicionado à fila de prioridade: (${nextX}, ${nextY})`);
      }
    }
  }

  console.log("Nenhum caminho encontrado!");
  return { path: [], traversalOrder };
}

function App() {
  const initialPosition = getPosition(maze, "A");
  const goalPosition = getPosition(maze, "B");
  const [agentPosition, setAgentPosition] = useState(initialPosition);
  const [visited, setVisited] = useState([]);
  const [path, setPath] = useState([]);
  const [stepsTaken, setStepsTaken] = useState(0);
  const [algorithm, setAlgorithm] = useState("BFS");
  const [running, setRunning] = useState(false);

  const calculatePath = () => {
    setAgentPosition(initialPosition);
    setVisited([]);
    setStepsTaken(0);
    setRunning(true);

    let solution;
    if (algorithm === "BFS") {
      solution = bfsWithTraversal(maze, initialPosition, goalPosition);
    } else if (algorithm === "DFS") {
      solution = dfsWithTraversal(maze, initialPosition, goalPosition);
    } else if (algorithm === "Euclidean") {
      solution = euclideanSearch(maze, initialPosition, goalPosition);
    }

    if (solution) {
      setPath(solution.traversalOrder); 
    } else {
      setRunning(false);
      alert("Nenhum caminho encontrado!");
    }
  };

  useEffect(() => {
    if (running && path.length > 0) {
      let index = 0;

      const interval = setInterval(() => {
        if (index < path.length) {
          const currentNode = path[index];
          setAgentPosition(currentNode);
          setVisited((prev) => [...prev, currentNode]);
          console.log(`Agente movido para: (${currentNode.x}, ${currentNode.y})`);
          setStepsTaken(index + 1);
          index++;
        } else {
          clearInterval(interval);
          setRunning(false);
          alert(`Labirinto concluído em ${index} passos!`);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [running, path]);

  return (
    <div className="App">
      <h1>Labirinto</h1>
      <div>
        <label>Selecione o algoritmo:</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={running}
        >
          <option value="BFS">Busca em Largura</option>
          <option value="DFS">Busca em Profundidade</option>
          <option value="Euclidean">Busca Euclidiana</option>
        </select>
        <button onClick={calculatePath} disabled={running}>
          Iniciar
        </button>
      </div>
      <div className="maze">
        {maze.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`cell ${
                cell === 0 ? "wall" : visited.some((v) => v.x === i && v.y === j) ? "visited" : ""
              } ${
                agentPosition.x === i && agentPosition.y === j ? "agent" : ""
              }`}
            />
          ))
        )}
      </div>
      <p>Passos realizados: {stepsTaken}</p>
    </div>
  );
}

export default App;
