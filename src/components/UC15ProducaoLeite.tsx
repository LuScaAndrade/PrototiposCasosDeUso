// components/UC15ProducaoLeite.tsx
import React, { useState } from "react";

interface Animal {
  id: string;
  nome: string;
  identificador: string;
  raca: string;
}

interface RegistroLeite {
  id: string;
  data: string;
  animalId?: string;
  rebanhoId?: string;
  quantidade: number;
  ehColetivo: boolean;
}

const UC15ProducaoLeite: React.FC = () => {
  const [animais] = useState<Animal[]>([
    { id: "1", nome: "Mimosa", identificador: "V001", raca: "Holandesa" },
    { id: "2", nome: "Flor", identificador: "V002", raca: "Jersey" },
    { id: "3", nome: "Estrela", identificador: "V003", raca: "Girolando" },
  ]);

  const [rebanhos] = useState([
    { id: "R1", nome: "Rebanho Principal" },
    { id: "R2", nome: "Rebanho Secundário" },
  ]);

  const [registro, setRegistro] = useState({
    data: new Date().toISOString().split("T")[0],
    tipoRegistro: "individual",
    animalId: "",
    rebanhoId: "",
    quantidade: "",
    ehColetivo: false,
  });

  const [registros, setRegistros] = useState<RegistroLeite[]>([]);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!registro.quantidade || parseFloat(registro.quantidade) <= 0) {
      setMensagem("error: Quantidade deve ser maior que zero");
      return;
    }

    if (registro.tipoRegistro === "individual" && !registro.animalId) {
      setMensagem("error: Selecione um animal");
      return;
    }

    if (registro.tipoRegistro === "coletivo" && !registro.rebanhoId) {
      setMensagem("error: Selecione um rebanho");
      return;
    }

    const novoRegistro: RegistroLeite = {
      id: Date.now().toString(),
      data: registro.data,
      animalId:
        registro.tipoRegistro === "individual" ? registro.animalId : undefined,
      rebanhoId:
        registro.tipoRegistro === "coletivo" ? registro.rebanhoId : undefined,
      quantidade: parseFloat(registro.quantidade),
      ehColetivo: registro.tipoRegistro === "coletivo",
    };

    setRegistros([novoRegistro, ...registros]);
    setMensagem("success: Registro de produção salvo com sucesso!");

    // Limpar formulário
    setRegistro({
      ...registro,
      quantidade: "",
      animalId: "",
      rebanhoId: "",
    });
  };

  const calcularTotalDiario = () => {
    return registros
      .filter((r) => r.data === registro.data)
      .reduce((total, r) => total + r.quantidade, 0);
  };

  return (
    <div className="uc-container">
      <div className="card">
        <h2>🥛 Registro de Produção de Leite</h2>
        <p className="subtitle">
          Controle diário da produção por animal ou rebanho
        </p>

        {mensagem && (
          <div
            className={`alert ${
              mensagem.startsWith("success") ? "alert-success" : "alert-error"
            }`}
          >
            {mensagem.split(":")[1]}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Data do Registro</label>
            <input
              type="date"
              className="form-input"
              value={registro.data}
              onChange={(e) =>
                setRegistro({ ...registro, data: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Registro</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="individual"
                  checked={registro.tipoRegistro === "individual"}
                  onChange={(e) =>
                    setRegistro({ ...registro, tipoRegistro: e.target.value })
                  }
                />
                🐄 Por Animal Individual
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="coletivo"
                  checked={registro.tipoRegistro === "coletivo"}
                  onChange={(e) =>
                    setRegistro({ ...registro, tipoRegistro: e.target.value })
                  }
                />
                👥 Por Rebanho
              </label>
            </div>
          </div>

          {registro.tipoRegistro === "individual" && (
            <div className="form-group">
              <label className="form-label">Selecionar Animal</label>
              <select
                className="form-select"
                value={registro.animalId}
                onChange={(e) =>
                  setRegistro({ ...registro, animalId: e.target.value })
                }
                required
              >
                <option value="">Selecione um animal</option>
                {animais.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.nome} ({animal.identificador}) - {animal.raca}
                  </option>
                ))}
              </select>
            </div>
          )}

          {registro.tipoRegistro === "coletivo" && (
            <div className="form-group">
              <label className="form-label">Selecionar Rebanho</label>
              <select
                className="form-select"
                value={registro.rebanhoId}
                onChange={(e) =>
                  setRegistro({ ...registro, rebanhoId: e.target.value })
                }
                required
              >
                <option value="">Selecione um rebanho</option>
                {rebanhos.map((rebanho) => (
                  <option key={rebanho.id} value={rebanho.id}>
                    {rebanho.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Quantidade de Leite (litros)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="form-input"
              placeholder="Ex: 12.5"
              value={registro.quantidade}
              onChange={(e) =>
                setRegistro({ ...registro, quantidade: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            💾 Registrar Produção
          </button>
        </form>
      </div>

      <div className="card">
        <h3>📊 Resumo do Dia</h3>
        <div className="resumo-grid">
          <div className="resumo-item">
            <span className="resumo-valor">
              {calcularTotalDiario().toFixed(1)}L
            </span>
            <span className="resumo-label">Total Hoje</span>
          </div>
          <div className="resumo-item">
            <span className="resumo-valor">{registros.length}</span>
            <span className="resumo-label">Registros</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>📋 Histórico de Registros</h3>
        {registros.length === 0 ? (
          <p className="texto-vazio">Nenhum registro encontrado</p>
        ) : (
          <div className="tabela-container">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Identificação</th>
                  <th>Quantidade (L)</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((reg) => (
                  <tr key={reg.id}>
                    <td>{new Date(reg.data).toLocaleDateString("pt-BR")}</td>
                    <td>{reg.ehColetivo ? "Rebanho" : "Individual"}</td>
                    <td>
                      {reg.ehColetivo
                        ? rebanhos.find((r) => r.id === reg.rebanhoId)?.nome
                        : animais.find((a) => a.id === reg.animalId)?.nome}
                    </td>
                    <td>{reg.quantidade.toFixed(1)}L</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UC15ProducaoLeite;
