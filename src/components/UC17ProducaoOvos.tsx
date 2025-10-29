// components/UC17ProducaoOvos.tsx
import React, { useState } from "react";

interface Galinheiro {
  id: string;
  nome: string;
  localizacao: string;
  capacidade: number;
}

interface Ave {
  id: string;
  nome: string;
  identificador: string;
  raca: string;
  galinheiroId: string;
}

interface RegistroOvos {
  id: string;
  data: string;
  galinheiroId?: string;
  aveId?: string;
  quantidade: number;
  ovosQuebrados: number;
  ehColetivo: boolean;
}

const UC17ProducaoOvos: React.FC = () => {
  const [galinheiros] = useState<Galinheiro[]>([
    {
      id: "G1",
      nome: "Galinheiro Principal",
      localizacao: "Setor A",
      capacidade: 50,
    },
    {
      id: "G2",
      nome: "Galinheiro de Cria",
      localizacao: "Setor B",
      capacidade: 30,
    },
  ]);

  const [aves] = useState<Ave[]>([
    {
      id: "A1",
      nome: "Pintadinha",
      identificador: "GA001",
      raca: "Caipira",
      galinheiroId: "G1",
    },
    {
      id: "A2",
      nome: "Cocota",
      identificador: "GA002",
      raca: "Leghorn",
      galinheiroId: "G1",
    },
    {
      id: "A3",
      nome: "Amarelinha",
      identificador: "GA003",
      raca: "Rhode Island",
      galinheiroId: "G2",
    },
  ]);

  const [registro, setRegistro] = useState({
    data: new Date().toISOString().split("T")[0],
    tipoRegistro: "coletivo",
    galinheiroId: "G1",
    aveId: "",
    quantidade: "",
    ovosQuebrados: "0",
  });

  const [registros, setRegistros] = useState<RegistroOvos[]>([]);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const quantidade = parseInt(registro.quantidade);
    const quebrados = parseInt(registro.ovosQuebrados);

    if (!quantidade || quantidade < 0) {
      setMensagem("error: Quantidade deve ser um número válido");
      return;
    }

    if (quebrados < 0 || quebrados > quantidade) {
      setMensagem("error: Número de ovos quebrados inválido");
      return;
    }

    if (registro.tipoRegistro === "individual" && !registro.aveId) {
      setMensagem("error: Selecione uma ave");
      return;
    }

    const novoRegistro: RegistroOvos = {
      id: Date.now().toString(),
      data: registro.data,
      galinheiroId:
        registro.tipoRegistro === "coletivo"
          ? registro.galinheiroId
          : undefined,
      aveId:
        registro.tipoRegistro === "individual" ? registro.aveId : undefined,
      quantidade,
      ovosQuebrados: quebrados,
      ehColetivo: registro.tipoRegistro === "coletivo",
    };

    setRegistros([novoRegistro, ...registros]);
    setMensagem("success: Registro de produção de ovos salvo com sucesso!");

    setRegistro({
      ...registro,
      quantidade: "",
      ovosQuebrados: "0",
    });
  };

  const calcularTotalDiario = () => {
    const hoje = registro.data;
    const registrosHoje = registros.filter((r) => r.data === hoje);

    return {
      total: registrosHoje.reduce((sum, r) => sum + r.quantidade, 0),
      quebrados: registrosHoje.reduce((sum, r) => sum + r.ovosQuebrados, 0),
      taxaQuebra:
        registrosHoje.reduce((sum, r) => sum + r.quantidade, 0) > 0
          ? (registrosHoje.reduce((sum, r) => sum + r.ovosQuebrados, 0) /
              registrosHoje.reduce((sum, r) => sum + r.quantidade, 0)) *
            100
          : 0,
    };
  };

  const totais = calcularTotalDiario();

  return (
    <div className="uc-container">
      <div className="card">
        <h2>🥚 Controle de Produção de Ovos</h2>
        <p className="subtitle">
          Acompanhamento diário da produção no galinheiro
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
            <label className="form-label">Data da Coleta</label>
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
                  value="coletivo"
                  checked={registro.tipoRegistro === "coletivo"}
                  onChange={(e) =>
                    setRegistro({ ...registro, tipoRegistro: e.target.value })
                  }
                />
                🏠 Por Galinheiro
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="individual"
                  checked={registro.tipoRegistro === "individual"}
                  onChange={(e) =>
                    setRegistro({ ...registro, tipoRegistro: e.target.value })
                  }
                />
                🐔 Por Ave Individual
              </label>
            </div>
          </div>

          {registro.tipoRegistro === "coletivo" && (
            <div className="form-group">
              <label className="form-label">Selecionar Galinheiro</label>
              <select
                className="form-select"
                value={registro.galinheiroId}
                onChange={(e) =>
                  setRegistro({ ...registro, galinheiroId: e.target.value })
                }
                required
              >
                {galinheiros.map((galinheiro) => (
                  <option key={galinheiro.id} value={galinheiro.id}>
                    {galinheiro.nome} - {galinheiro.localizacao} (Capacidade:{" "}
                    {galinheiro.capacidade})
                  </option>
                ))}
              </select>
            </div>
          )}

          {registro.tipoRegistro === "individual" && (
            <div className="form-group">
              <label className="form-label">Selecionar Ave</label>
              <select
                className="form-select"
                value={registro.aveId}
                onChange={(e) =>
                  setRegistro({ ...registro, aveId: e.target.value })
                }
                required
              >
                <option value="">Selecione uma ave</option>
                {aves.map((ave) => (
                  <option key={ave.id} value={ave.id}>
                    {ave.nome} ({ave.identificador}) - {ave.raca}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Quantidade de Ovos</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="Número total de ovos"
                value={registro.quantidade}
                onChange={(e) =>
                  setRegistro({ ...registro, quantidade: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ovos Quebrados</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="Ovos danificados"
                value={registro.ovosQuebrados}
                onChange={(e) =>
                  setRegistro({ ...registro, ovosQuebrados: e.target.value })
                }
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            💾 Registrar Produção
          </button>
        </form>
      </div>

      <div className="card">
        <h3>📊 Estatísticas do Dia</h3>
        <div className="estatisticas-grid">
          <div className="estatistica-item">
            <div className="estatistica-icon">🥚</div>
            <div className="estatistica-info">
              <span className="estatistica-valor">{totais.total}</span>
              <span className="estatistica-label">Ovos Produzidos</span>
            </div>
          </div>
          <div className="estatistica-item">
            <div className="estatistica-icon">💔</div>
            <div className="estatistica-info">
              <span className="estatistica-valor">{totais.quebrados}</span>
              <span className="estatistica-label">Ovos Quebrados</span>
            </div>
          </div>
          <div className="estatistica-item">
            <div className="estatistica-icon">📈</div>
            <div className="estatistica-info">
              <span className="estatistica-valor">
                {totais.taxaQuebra.toFixed(1)}%
              </span>
              <span className="estatistica-label">Taxa de Quebra</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>📋 Histórico de Produção</h3>
        {registros.length === 0 ? (
          <p className="texto-vazio">Nenhum registro de produção encontrado</p>
        ) : (
          <div className="tabela-container">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Local/Ave</th>
                  <th>Ovos</th>
                  <th>Quebrados</th>
                  <th>Taxa</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((reg) => {
                  const taxaQuebra =
                    reg.quantidade > 0
                      ? (reg.ovosQuebrados / reg.quantidade) * 100
                      : 0;
                  return (
                    <tr key={reg.id}>
                      <td>{new Date(reg.data).toLocaleDateString("pt-BR")}</td>
                      <td>{reg.ehColetivo ? "Galinheiro" : "Individual"}</td>
                      <td>
                        {reg.ehColetivo
                          ? galinheiros.find((g) => g.id === reg.galinheiroId)
                              ?.nome
                          : aves.find((a) => a.id === reg.aveId)?.nome}
                      </td>
                      <td>{reg.quantidade}</td>
                      <td>{reg.ovosQuebrados}</td>
                      <td>{taxaQuebra.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <h3>📤 Exportar Dados</h3>
        <p>
          Exporte os registros para planilhas ou órgãos de controle agrícola:
        </p>
        <div className="botoes-exportacao">
          <button className="btn btn-secondary">📄 Exportar para Excel</button>
          <button className="btn btn-secondary">📊 Gerar Relatório PDF</button>
        </div>
      </div>
    </div>
  );
};

export default UC17ProducaoOvos;
