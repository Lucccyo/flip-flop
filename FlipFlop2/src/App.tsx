import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Home from './pages/Home';
import ListPage from './pages/ListPage';
import AddPage from './pages/AddPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
