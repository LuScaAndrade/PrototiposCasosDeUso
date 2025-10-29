// components/UC16AlimentacaoVacinacao.tsx
import React, { useState } from "react";

interface Animal {
  id: string;
  nome: string;
  identificador: string;
  especie: string;
}

interface RegistroAlimentacao {
  id: string;
  data: string;
  animalId: string;
  tipoAlimento: string;
  quantidade: number;
  horario: string;
  observacoes: string;
}

interface RegistroVacinacao {
  id: string;
  data: string;
  animalId: string;
  vacina: string;
  dose: number;
  responsavel: string;
  dataProxima: string;
  lote: string;
}

const UC16AlimentacaoVacinacao: React.FC = () => {
  const [animais] = useState<Animal[]>([
    { id: "1", nome: "Mimosa", identificador: "V001", especie: "Bovino" },
    { id: "2", nome: "Flor", identificador: "V002", especie: "Bovino" },
    { id: "3", nome: "Galo Carijó", identificador: "A001", especie: "Ave" },
    { id: "4", nome: "Berenice", identificador: "S001", especie: "Suíno" },
  ]);

  const [tipoRegistro, setTipoRegistro] = useState<"alimentacao" | "vacinacao">(
    "alimentacao"
  );
  const [mensagem, setMensagem] = useState("");

  // Estado para alimentação
  const [registroAlimentacao, setRegistroAlimentacao] = useState({
    animalId: "",
    data: new Date().toISOString().split("T")[0],
    horario: "08:00",
    tipoAlimento: "ração",
    quantidade: "",
    observacoes: "",
  });

  // Estado para vacinação
  const [registroVacinacao, setRegistroVacinacao] = useState({
    animalId: "",
    data: new Date().toISOString().split("T")[0],
    vacina: "",
    dose: "",
    responsavel: "",
    lote: "",
    dataProxima: "",
  });

  const [registrosAlimentacao, setRegistrosAlimentacao] = useState<
    RegistroAlimentacao[]
  >([]);
  const [registrosVacinacao, setRegistrosVacinacao] = useState<
    RegistroVacinacao[]
  >([]);

  const vacinas = [
    "Vacina Febre Aftosa",
    "Vacina Brucelose",
    "Vacina Raiva",
    "Vacina Clostridiose",
    "Vacina IBR-BVD",
  ];

  const handleAlimentacaoSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!registroAlimentacao.animalId || !registroAlimentacao.quantidade) {
      setMensagem("error: Preencha todos os campos obrigatórios");
      return;
    }

    const novoRegistro: RegistroAlimentacao = {
      id: Date.now().toString(),
      data: registroAlimentacao.data,
      animalId: registroAlimentacao.animalId,
      tipoAlimento: registroAlimentacao.tipoAlimento,
      quantidade: parseFloat(registroAlimentacao.quantidade),
      horario: registroAlimentacao.horario,
      observacoes: registroAlimentacao.observacoes,
    };

    setRegistrosAlimentacao([novoRegistro, ...registrosAlimentacao]);
    setMensagem("success: Registro de alimentação salvo com sucesso!");

    setRegistroAlimentacao({
      ...registroAlimentacao,
      quantidade: "",
      observacoes: "",
    });
  };

  const handleVacinacaoSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !registroVacinacao.animalId ||
      !registroVacinacao.vacina ||
      !registroVacinacao.dose
    ) {
      setMensagem("error: Preencha todos os campos obrigatórios");
      return;
    }

    const novoRegistro: RegistroVacinacao = {
      id: Date.now().toString(),
      data: registroVacinacao.data,
      animalId: registroVacinacao.animalId,
      vacina: registroVacinacao.vacina,
      dose: parseFloat(registroVacinacao.dose),
      responsavel: registroVacinacao.responsavel,
      lote: registroVacinacao.lote,
      dataProxima: registroVacinacao.dataProxima,
    };

    setRegistrosVacinacao([novoRegistro, ...registrosVacinacao]);
    setMensagem("success: Registro de vacinação salvo com sucesso!");

    setRegistroVacinacao({
      ...registroVacinacao,
      vacina: "",
      dose: "",
      responsavel: "",
      lote: "",
      dataProxima: "",
    });
  };

  return (
    <div className="uc-container">
      <div className="card">
        <h2>🌾 Controle de Alimentação e Vacinação</h2>
        <p className="subtitle">
          Registro de cuidados nutricionais e sanitários dos animais
        </p>

        <div className="tabs">
          <button
            className={`tab-btn ${
              tipoRegistro === "alimentacao" ? "active" : ""
            }`}
            onClick={() => setTipoRegistro("alimentacao")}
          >
            🥕 Alimentação
          </button>
          <button
            className={`tab-btn ${
              tipoRegistro === "vacinacao" ? "active" : ""
            }`}
            onClick={() => setTipoRegistro("vacinacao")}
          >
            💉 Vacinação
          </button>
        </div>

        {mensagem && (
          <div
            className={`alert ${
              mensagem.startsWith("success") ? "alert-success" : "alert-error"
            }`}
          >
            {mensagem.split(":")[1]}
          </div>
        )}

        {tipoRegistro === "alimentacao" && (
          <form onSubmit={handleAlimentacaoSubmit}>
            <div className="form-group">
              <label className="form-label">Animal</label>
              <select
                className="form-select"
                value={registroAlimentacao.animalId}
                onChange={(e) =>
                  setRegistroAlimentacao({
                    ...registroAlimentacao,
                    animalId: e.target.value,
                  })
                }
                required
              >
                <option value="">Selecione um animal</option>
                {animais.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.nome} ({animal.identificador}) - {animal.especie}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Data</label>
                <input
                  type="date"
                  className="form-input"
                  value={registroAlimentacao.data}
                  onChange={(e) =>
                    setRegistroAlimentacao({
                      ...registroAlimentacao,
                      data: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Horário</label>
                <input
                  type="time"
                  className="form-input"
                  value={registroAlimentacao.horario}
                  onChange={(e) =>
                    setRegistroAlimentacao({
                      ...registroAlimentacao,
                      horario: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Tipo de Alimento</label>
                <select
                  className="form-select"
                  value={registroAlimentacao.tipoAlimento}
                  onChange={(e) =>
                    setRegistroAlimentacao({
                      ...registroAlimentacao,
                      tipoAlimento: e.target.value,
                    })
                  }
                >
                  <option value="ração">Ração</option>
                  <option value="capim">Capim</option>
                  <option value="silagem">Silagem</option>
                  <option value="milho">Milho</option>
                  <option value="suplemento">Suplemento</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Quantidade (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="form-input"
                  placeholder="Ex: 2.5"
                  value={registroAlimentacao.quantidade}
                  onChange={(e) =>
                    setRegistroAlimentacao({
                      ...registroAlimentacao,
                      quantidade: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Observações</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Observações sobre a alimentação..."
                value={registroAlimentacao.observacoes}
                onChange={(e) =>
                  setRegistroAlimentacao({
                    ...registroAlimentacao,
                    observacoes: e.target.value,
                  })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary">
              💾 Registrar Alimentação
            </button>
          </form>
        )}

        {tipoRegistro === "vacinacao" && (
          <form onSubmit={handleVacinacaoSubmit}>
            <div className="form-group">
              <label className="form-label">Animal</label>
              <select
                className="form-select"
                value={registroVacinacao.animalId}
                onChange={(e) =>
                  setRegistroVacinacao({
                    ...registroVacinacao,
                    animalId: e.target.value,
                  })
                }
                required
              >
                <option value="">Selecione um animal</option>
                {animais.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.nome} ({animal.identificador}) - {animal.especie}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Vacina</label>
              <select
                className="form-select"
                value={registroVacinacao.vacina}
                onChange={(e) =>
                  setRegistroVacinacao({
                    ...registroVacinacao,
                    vacina: e.target.value,
                  })
                }
                required
              >
                <option value="">Selecione a vacina</option>
                {vacinas.map((vacina) => (
                  <option key={vacina} value={vacina}>
                    {vacina}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Data da Aplicação</label>
                <input
                  type="date"
                  className="form-input"
                  value={registroVacinacao.data}
                  onChange={(e) =>
                    setRegistroVacinacao({
                      ...registroVacinacao,
                      data: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dose (ml)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="form-input"
                  placeholder="Ex: 2.0"
                  value={registroVacinacao.dose}
                  onChange={(e) =>
                    setRegistroVacinacao({
                      ...registroVacinacao,
                      dose: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Lote da Vacina</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Número do lote"
                  value={registroVacinacao.lote}
                  onChange={(e) =>
                    setRegistroVacinacao({
                      ...registroVacinacao,
                      lote: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Próxima Dose</label>
                <input
                  type="date"
                  className="form-input"
                  value={registroVacinacao.dataProxima}
                  onChange={(e) =>
                    setRegistroVacinacao({
                      ...registroVacinacao,
                      dataProxima: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Responsável pela Aplicação</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nome do responsável"
                value={registroVacinacao.responsavel}
                onChange={(e) =>
                  setRegistroVacinacao({
                    ...registroVacinacao,
                    responsavel: e.target.value,
                  })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary">
              💾 Registrar Vacinação
            </button>
          </form>
        )}
      </div>

      <div className="card">
        <h3>📋 Histórico Recente</h3>

        <div className="historico-tabs">
          <h4>🥕 Alimentação</h4>
          {registrosAlimentacao.length === 0 ? (
            <p className="texto-vazio">Nenhum registro de alimentação</p>
          ) : (
            <div className="lista-registros">
              {registrosAlimentacao.slice(0, 5).map((reg) => (
                <div key={reg.id} className="registro-item">
                  <div className="registro-info">
                    <strong>
                      {animais.find((a) => a.id === reg.animalId)?.nome}
                    </strong>
                    <span>
                      {reg.tipoAlimento} - {reg.quantidade}kg
                    </span>
                  </div>
                  <div className="registro-data">
                    {new Date(reg.data).toLocaleDateString("pt-BR")} às{" "}
                    {reg.horario}
                  </div>
                </div>
              ))}
            </div>
          )}

          <h4>💉 Vacinação</h4>
          {registrosVacinacao.length === 0 ? (
            <p className="texto-vazio">Nenhum registro de vacinação</p>
          ) : (
            <div className="lista-registros">
              {registrosVacinacao.slice(0, 5).map((reg) => (
                <div key={reg.id} className="registro-item">
                  <div className="registro-info">
                    <strong>
                      {animais.find((a) => a.id === reg.animalId)?.nome}
                    </strong>
                    <span>
                      {reg.vacina} - {reg.dose}ml
                    </span>
                  </div>
                  <div className="registro-data">
                    {new Date(reg.data).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UC16AlimentacaoVacinacao;
