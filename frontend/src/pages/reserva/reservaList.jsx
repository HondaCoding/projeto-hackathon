import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ReservaList() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleDateString("pt-BR");
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    return timeStr.slice(0, 5);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/reserva")
      .then(res => res.json())
      .then(data => {
        setReservas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar reservas:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando reservas...</p>;

  return (
  <div className="reserva-list-container">
    <h2>Reservas</h2>
    <button className="btn-primary" onClick={() => navigate("/reserva/novo")}>Nova Reserva</button>

    {/* Tabela tradicional (visível só em telas grandes) */}
    <div className="table-responsive">
      <table className="reserva-table">
        <thead>
          <tr>
            <th>Data Locação</th>
            <th>Horário Locação</th>
            <th>Data Devolução</th>
            <th>Horário Devolução</th>
            <th>Responsável</th>
            <th>Tipo de Recurso</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(r => (
            <tr key={r.idrecurso}>
              <td>{formatDate(r.dataLocacao)}</td>
              <td>{formatTime(r.horarioLocacao)}</td>
              <td>{formatDate(r.dataDevolucao)}</td>
              <td>{formatTime(r.horarioDevolucao)}</td>
              <td>{r.nomeResponsavel}</td>
              <td>{r.nomeTipoRecurso}</td>
              <td>{r.descricao || "N/A"}</td>
              <td>{r.quantidade}</td>
              <td>{r.ativo ? "Sim" : "Não"}</td>
              <td className="acoes">
                <button onClick={() => navigate(`/reserva/editar/${r.idrecurso}`)}>Alterar</button>
                <button onClick={() => navigate(`/reserva/excluir/${r.idrecurso}`)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Lista mobile (aparece só em telas pequenas) */}
    <div className="reserva-mobile-list">
      {reservas.map(r => (
        <div key={r.idrecurso} className="reserva-mobile-item">
          <p><strong>Data Locação:</strong> {formatDate(r.dataLocacao)}</p>
          <p><strong>Horário Locação:</strong> {formatTime(r.horarioLocacao)}</p>
          <p><strong>Data Devolução:</strong> {formatDate(r.dataDevolucao)}</p>
          <p><strong>Horário Devolução:</strong> {formatTime(r.horarioDevolucao)}</p>
          <p><strong>Responsável:</strong> {r.nomeResponsavel}</p>
          <p><strong>Tipo de Recurso:</strong> {r.nomeTipoRecurso}</p>
          <p><strong>Descrição:</strong> {r.descricao || "N/A"}</p>
          <p><strong>Quantidade:</strong> {r.quantidade}</p>
          <p><strong>Ativo:</strong> {r.ativo ? "Sim" : "Não"}</p>
          <div className="acoes">
            <button onClick={() => navigate(`/reserva/editar/${r.idrecurso}`)}>Alterar</button>
            <button onClick={() => navigate(`/reserva/excluir/${r.idrecurso}`)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default ReservaList;
