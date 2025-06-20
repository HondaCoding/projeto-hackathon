import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResponsavelList.css"; // certifique-se de criar este CSS

export default function ResponsavelList() {
  const [responsaveis, setResponsaveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/responsavel")
      .then((res) => res.json())
      .then((data) => {
        setResponsaveis(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar responsáveis:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando responsáveis...</p>;

  return (
    <div className="responsavel-list-container">
      <h2>Responsáveis</h2>
      <button className="btn-primary" onClick={() => navigate("/responsavel/novo")}>
        Adicionar Responsável
      </button>

      {/* Tabela para desktop */}
      <div className="table-wrapper">
        <table className="responsavel-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Crachá</th>
              <th>Telefone</th>
              <th>Função</th>
              <th>Ativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {responsaveis.map((r) => (
              <tr key={r.idresponsavel}>
                <td>{r.idresponsavel}</td>
                <td>{r.nome}</td>
                <td>{r.cracha || "N/A"}</td>
                <td>{r.telefone || "N/A"}</td>
                <td>{r.nomeFuncao}</td>
                <td>{r.ativo ? "Sim" : "Não"}</td>
                <td className="acoes">
                  <button onClick={() => navigate(`/responsavel/editar/${r.idresponsavel}`)}>Editar</button>
                  <button onClick={() => navigate(`/responsavel/excluir/${r.idresponsavel}`)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para mobile */}
      <div className="responsavel-card-list">
        {responsaveis.map((r) => (
          <div className="responsavel-card" key={r.idresponsavel}>
            <p><strong>ID:</strong> {r.idresponsavel}</p>
            <p><strong>Nome:</strong> {r.nome}</p>
            <p><strong>Crachá:</strong> {r.cracha || "N/A"}</p>
            <p><strong>Telefone:</strong> {r.telefone || "N/A"}</p>
            <p><strong>Função:</strong> {r.nomeFuncao}</p>
            <p><strong>Ativo:</strong> {r.ativo ? "Sim" : "Não"}</p>
            <div className="acoes">
              <button onClick={() => navigate(`/responsavel/editar/${r.idresponsavel}`)}>Editar</button>
              <button onClick={() => navigate(`/responsavel/excluir/${r.idresponsavel}`)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-secondary" onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}
