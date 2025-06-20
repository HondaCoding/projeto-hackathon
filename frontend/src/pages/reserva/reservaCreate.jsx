import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReservaCreate() {
  const [dataLocacao, setDataLocacao] = useState("");
  const [horarioLocacao, setHorarioLocacao] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [horarioDevolucao, setHorarioDevolucao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [idtiporecurso, setIdtiporecurso] = useState("");
  const [idresponsavel, setIdresponsavel] = useState("");
  const [ativo, setAtivo] = useState("1"); // ativo por padrão

  const [recursos, setRecursos] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/recurso")
      .then(res => res.json())
      .then(setRecursos)
      .catch(console.error);

    fetch("http://localhost:3000/api/responsavel")
      .then(res => res.json())
      .then(setResponsaveis)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reserva = {
      idresponsavel: Number(idresponsavel),
      idtiporecurso: Number(idtiporecurso),
      descricao,
      quantidade: Number(quantidade),
      dataLocacao,
      horarioLocacao,
      dataDevolucao,
      horarioDevolucao,
      ativo: Number(ativo),
    };

    try {
      const res = await fetch("http://localhost:3000/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva),
      });

      if (!res.ok) {
        const msg = await res.text();
        alert("Erro ao criar reserva: " + msg);
        return;
      }

      navigate("/reserva");
    } catch (error) {
      alert("Erro de rede: " + error.message);
    }
  };

  return (
  <div className="form-container">
    <h2>Nova Reserva</h2>
    <form onSubmit={handleSubmit}>
      <label>Responsável:</label>
      <select value={idresponsavel} onChange={e => setIdresponsavel(e.target.value)} required>
        <option value="">Selecione um responsável</option>
        {responsaveis.map(r => (
          <option key={r.idresponsavel} value={r.idresponsavel}>{r.nome}</option>
        ))}
      </select>

      <label>Tipo de Recurso:</label>
<select value={idtiporecurso} onChange={e => setIdtiporecurso(e.target.value)} required>
  <option value="">Selecione um tipo de recurso</option>
  {recursos.map(r => (
    <option key={r.idtiporecurso} value={r.idtiporecurso}>
      {r.tiporecurso || r.descricao || `Tipo ${r.idtiporecurso}`}
    </option>
  ))}
</select>


      <label>Descrição:</label>
      <textarea value={descricao} onChange={e => setDescricao(e.target.value)} />

      <label>Quantidade:</label>
      <input type="number" min={1} value={quantidade} onChange={e => setQuantidade(e.target.value)} required />

      <label>Data da Locação:</label>
      <input type="date" value={dataLocacao} onChange={e => setDataLocacao(e.target.value)} required />

      <label>Horário de Início:</label>
      <input type="time" value={horarioLocacao} onChange={e => setHorarioLocacao(e.target.value)} required />

      <label>Data da Devolução:</label>
      <input type="date" value={dataDevolucao} onChange={e => setDataDevolucao(e.target.value)} required />

      <label>Horário de Devolução:</label>
      <input type="time" value={horarioDevolucao} onChange={e => setHorarioDevolucao(e.target.value)} required />

      <label>Ativo:</label>
      <select value={ativo} onChange={e => setAtivo(e.target.value)}>
        <option value="1">Sim</option>
        <option value="0">Não</option>
      </select>

      <button type="submit">Salvar</button>
    </form>

    <button className="voltar-btn" onClick={() => navigate("/")}>Voltar</button>
  </div>
);

}
