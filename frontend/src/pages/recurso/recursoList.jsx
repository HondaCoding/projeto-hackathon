import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecursoList.css'; // certifique-se de criar este arquivo

function RecursoList() {
  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/recurso')
      .then((res) => res.json())
      .then((data) => {
        setRecursos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar recursos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando recursos...</p>;

  return (
    <div className="recurso-list-container">
      <h2>Recursos</h2>
      <button className="btn-primary" onClick={() => navigate("/recurso/novo")}>Adicionar Recurso</button>

      {/* Tabela para desktop */}
      <div className="table-wrapper">
        <table className="recurso-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo de Recurso</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recursos.map((recurso) => (
              <tr key={recurso.idtiporecurso}>
                <td>{recurso.idtiporecurso}</td>
                <td>{recurso.tiporecurso || `Tipo ${recurso.idtiporecurso}`}</td>
                <td>{recurso.descricao || "-"}</td>
                <td className="acoes">
                  <button onClick={() => navigate(`/recurso/editar/${recurso.idtiporecurso}`)}>Editar</button>
                  <button onClick={() => navigate(`/recurso/excluir/${recurso.idtiporecurso}`)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para mobile */}
      <div className="recurso-card-list">
        {recursos.map((recurso) => (
          <div className="recurso-card" key={recurso.idtiporecurso}>
            <p><strong>ID:</strong> {recurso.idtiporecurso}</p>
            <p><strong>Tipo:</strong> {recurso.tiporecurso || `Tipo ${recurso.idtiporecurso}`}</p>
            <p><strong>Descrição:</strong> {recurso.descricao || "-"}</p>
            <div className="acoes">
              <button onClick={() => navigate(`/recurso/editar/${recurso.idtiporecurso}`)}>Editar</button>
              <button onClick={() => navigate(`/recurso/excluir/${recurso.idtiporecurso}`)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-secondary" onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default RecursoList;
