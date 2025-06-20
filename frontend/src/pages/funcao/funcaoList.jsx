import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FuncaoList() {
  const [funcoes, setFuncoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/funcao")
      .then(res => res.json())
      .then(data => {
        setFuncoes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar funções:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando funções...</p>;

  return (
    <div className="funcao-list-container">
      <h2>Funções</h2>
      <button className="btn-primary" onClick={() => navigate("/funcao/novo")}>Nova Função</button>

      {/* Tabela para telas grandes */}
      <div className="table-wrapper">
        <table className="funcao-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome da Função</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcoes.map((f) => (
              <tr key={f.idfuncao}>
                <td>{f.idfuncao}</td>
                <td>{f.tipoFuncao}</td>
                <td className="acoes">
                  <button onClick={() => navigate(`/funcao/editar/${f.idfuncao}`)}>Editar</button>
                  <button onClick={() => navigate(`/funcao/excluir/${f.idfuncao}`)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lista para telas pequenas */}
      <div className="funcao-card-list">
        {funcoes.map((f) => (
          <div className="funcao-card" key={f.idfuncao}>
            <p><strong>ID:</strong> {f.idfuncao}</p>
            <p><strong>Nome:</strong> {f.tipoFuncao}</p>
            <div className="acoes">
              <button onClick={() => navigate(`/funcao/editar/${f.idfuncao}`)}>Editar</button>
              <button onClick={() => navigate(`/funcao/excluir/${f.idfuncao}`)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}
