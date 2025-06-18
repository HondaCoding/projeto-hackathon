import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function FuncaoList() {
  const [funcoes, setFuncoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/funcao')
      .then((res) => res.json())
      .then((data) => {
        setFuncoes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar funções:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando funções...</p>;

  return (
    <div>
      <h2>Funções</h2>

      <button onClick={() => navigate("/funcao/novo")}>Adicionar Função</button>

      <ul>
        {funcoes.map((funcao) => (
          <div style={{ marginTop: "5px" }}>
             <li key={funcao.idfuncao}>
            {funcao.tipoFuncao} - {funcao.permissao}
              <button onClick={() => navigate(`/funcao/editar/${funcao.idfuncao}`)}>Alterar</button>
              <button onClick={() => navigate(`/funcao/excluir/${funcao.idfuncao}`)}>Excluir</button>
            </li>
          </div>
        ))}
      </ul>

      <button onClick={() => navigate("/")}>Voltar</button>
      
    </div>
  );
}

export default FuncaoList;
