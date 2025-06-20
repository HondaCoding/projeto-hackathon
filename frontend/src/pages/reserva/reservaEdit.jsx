import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ReservaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idresponsavel, setIdresponsavel] = useState("");
  const [idtiporecurso, setIdtiporecurso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataLocacao, setDataLocacao] = useState("");
  const [horarioLocacao, setHorarioLocacao] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [horarioDevolucao, setHorarioDevolucao] = useState("");
  const [ativo, setAtivo] = useState(true);

  const [responsaveis, setResponsaveis] = useState([]);
  const [tiposRecurso, setTiposRecurso] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/reserva/${id}`)
      .then(res => res.json())
      .then(data => {
        setIdresponsavel(data.idresponsavel);
        setIdtiporecurso(data.idtiporecurso);
        setDescricao(data.descricao || "");
        setQuantidade(data.quantidade);
        setDataLocacao(data.dataLocacao ? data.dataLocacao.split('T')[0] : "");
        setHorarioLocacao(data.horarioLocacao || "");
        setDataDevolucao(data.dataDevolucao ? data.dataDevolucao.split('T')[0] : "");
        setHorarioDevolucao(data.horarioDevolucao || "");
        setAtivo(Boolean(data.ativo));
      })
      .catch(err => console.error("Erro ao buscar reserva:", err));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3000/api/responsavel")
      .then(res => res.json())
      .then(data => setResponsaveis(data))
      .catch(err => console.error("Erro ao buscar responsáveis:", err));

    fetch("http://localhost:3000/api/recurso")
      .then(res => res.json())
      .then(data => setTiposRecurso(data))
      .catch(err => console.error("Erro ao buscar tipos de recurso:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      idresponsavel,
      idtiporecurso,
      descricao,
      quantidade,
      dataLocacao,
      horarioLocacao,
      dataDevolucao,
      horarioDevolucao,
      ativo,
    };

    try {
      const res = await fetch(`http://localhost:3000/api/reserva/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const msg = await res.text();
        alert("Erro ao salvar reserva: " + msg);
        return;
      }

      navigate("/");
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  };

  return (
    <div>
      <h2>Editar Reserva</h2>
      <form onSubmit={handleSubmit}>

        <label>Responsável:</label>
        <select value={idresponsavel} onChange={e => setIdresponsavel(Number(e.target.value))} required>
          <option value="">-- Selecione um responsável --</option>
          {responsaveis.map(r => (
            <option key={r.idresponsavel} value={r.idresponsavel}>{r.nome}</option>
          ))}
        </select>

        <label>Tipo de Recurso:</label>
        <select value={idtiporecurso} onChange={e => setIdtiporecurso(Number(e.target.value))} required>
          <option value="">-- Selecione o tipo de recurso --</option>
          {tiposRecurso.map(t => (
            <option key={t.idtiporecurso} value={t.idtiporecurso}>{t.tiporecurso}</option>
          ))}
        </select>

        <label>Descrição:</label>
        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} />

        <label>Quantidade:</label>
        <input
          type="number"
          value={quantidade}
          min={1}
          onChange={e => setQuantidade(Number(e.target.value))}
          required
        />

        <label>Data Locação:</label>
        <input
          type="date"
          value={dataLocacao}
          onChange={e => setDataLocacao(e.target.value)}
          required
        />

        <label>Horário Locação:</label>
        <input
          type="time"
          value={horarioLocacao}
          onChange={e => setHorarioLocacao(e.target.value)}
          required
        />

        <label>Data Devolução:</label>
        <input
          type="date"
          value={dataDevolucao}
          onChange={e => setDataDevolucao(e.target.value)}
          required
        />

        <label>Horário Devolução:</label>
        <input
          type="time"
          value={horarioDevolucao}
          onChange={e => setHorarioDevolucao(e.target.value)}
          required
        />

        <label>Ativo:</label>
        <select value={ativo ? "1" : "0"} onChange={e => setAtivo(e.target.value === "1")}>
          <option value="1">Sim</option>
          <option value="0">Não</option>
        </select>

        <button type="submit">Salvar</button>
      </form>

      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}
