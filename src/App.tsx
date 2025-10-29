// App.tsx
import React, { useState } from "react";
import "./App.css";
import "./styles.css";
import HomePage from "./components/HomePage";
import UC15ProducaoLeite from "./components/UC15ProducaoLeite";
import UC16AlimentacaoVacinacao from "./components/UC16AlimentacaoVacinacao";
import UC17ProducaoOvos from "./components/UC17ProducaoOvos";

type CasoUso = "leite" | "alimentacao" | "ovos" | "inicio";

function App() {
  const [casoUsoAtivo, setCasoUsoAtivo] = useState<CasoUso>("inicio");

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🏠 AgroControl - Gestão Rural</h1>
          <p>Sistema de gestão para pequenos agricultores</p>
        </div>
      </header>

      <nav className="navigation">
        <button
          className={`nav-btn ${casoUsoAtivo === "inicio" ? "active" : ""}`}
          onClick={() => setCasoUsoAtivo("inicio")}
        >
          🏠 Página Inicial
        </button>
        <button
          className={`nav-btn ${casoUsoAtivo === "leite" ? "active" : ""}`}
          onClick={() => setCasoUsoAtivo("leite")}
        >
          🥛 Produção de Leite
        </button>
        <button
          className={`nav-btn ${
            casoUsoAtivo === "alimentacao" ? "active" : ""
          }`}
          onClick={() => setCasoUsoAtivo("alimentacao")}
        >
          🌾 Alimentação & Vacinação
        </button>
        <button
          className={`nav-btn ${casoUsoAtivo === "ovos" ? "active" : ""}`}
          onClick={() => setCasoUsoAtivo("ovos")}
        >
          🥚 Produção de Ovos
        </button>
      </nav>

      <main className="main-content">
        {casoUsoAtivo === "inicio" && <HomePage />}
        {casoUsoAtivo === "leite" && <UC15ProducaoLeite />}
        {casoUsoAtivo === "alimentacao" && <UC16AlimentacaoVacinacao />}
        {casoUsoAtivo === "ovos" && <UC17ProducaoOvos />}
      </main>

      <footer className="app-footer">
        <p>© 2024 AgroControl - Desenvolvido para pequenos produtores</p>
      </footer>
    </div>
  );
}

export default App;
