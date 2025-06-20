import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ReservaDevolucao.css'; // lembre de criar e importar esse CSS

export default function ReservaDevolucao() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/reserva")
      .then(res => res.json())
      .then(data => {
        const ativas = data.filter(r => r.ativo === 1);
        setReservas(ativas);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar reservas:", err);
        setLoading(false);
      });
  }, []);

  const handleDevolucao = async (idrecurso) => {
    const confirm = window.confirm("Confirmar devolução do recurso?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/reserva/${idrecurso}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ativo: 0 }),
      });

      if (!res.ok) {
        const msg = await res.text();
        alert("Erro ao devolver: " + msg);
        return;
      }

      setReservas(prev => prev.filter(r => r.idrecurso !== idrecurso));
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  };

  if (loading) return <p>Carregando reservas ativas...</p>;

  return (
    <div className="reserva-devolucao-container">
      <h2>Devolução de Reservas</h2>
      {reservas.length === 0 ? (
        <p>Nenhuma reserva ativa encontrada.</p>
      ) : (
        <>
          {/* Tabela para desktop */}
          <div className="table-wrapper">
            <table className="reserva-devolucao-table">
              <thead>
                <tr>
                  <th>Responsável</th>
                  <th>Recurso</th>
                  <th>Data Devolução</th>
                  <th>Horário Devolução</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(r => (
                  <tr key={r.idrecurso}>
                    <td>{r.nomeResponsavel}</td>
                    <td>{r.nomeTipoRecurso}</td>
                    <td>{r.dataDevolucao?.split("T")[0]}</td>
                    <td>{r.horarioDevolucao}</td>
                    <td>
                      <button onClick={() => handleDevolucao(r.idrecurso)}>Devolver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lista/card para mobile */}
          <div className="reserva-devolucao-card-list">
            {reservas.map(r => (
              <div className="reserva-devolucao-card" key={r.idrecurso}>
                <p><strong>Responsável:</strong> {r.nomeResponsavel}</p>
                <p><strong>Recurso:</strong> {r.nomeTipoRecurso}</p>
                <p><strong>Data Devolução:</strong> {r.dataDevolucao?.split("T")[0]}</p>
                <p><strong>Horário Devolução:</strong> {r.horarioDevolucao}</p>
                <button onClick={() => handleDevolucao(r.idrecurso)}>Devolver</button>
              </div>
            ))}
          </div>
        </>
      )}

      <button className="btn-secondary" onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}
