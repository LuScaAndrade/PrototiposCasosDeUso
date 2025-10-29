import React, { useState } from "react";

const HomePage: React.FC = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-icon">🌱</div>
        <h1>Bem-vindo ao AgroControl!</h1>
        <p className="welcome-subtitle">Seu sistema completo de gestão rural</p>

        <div className="stats-preview">
          <div className="stat-card">
            <span className="stat-number">Diversos</span>
            <span className="stat-label">Módulos</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Gratuito</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">🌿</span>
            <span className="stat-label">Ecológico</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
