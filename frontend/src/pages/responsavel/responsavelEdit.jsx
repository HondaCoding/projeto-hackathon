import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResponsavelEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cracha, setCracha] = useState("");
  const [idfuncao, setIdfuncao] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [funcoes, setFuncoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar funções para popular o select
  useEffect(() => {
    fetch("http://localhost:3000/api/funcao")
      .then(res => res.json())
      .then(data => setFuncoes(data))
      .catch(err => console.error("Erro ao buscar funções:", err));
  }, []);

  // Buscar dados do responsável para preencher o formulário
  useEffect(() => {
    fetch(`http://localhost:3000/api/responsavel/${id}`)
      .then(res => res.json())
      .then(data => {
        setNome(data.nome);
        setTelefone(data.telefone || "");
        setCracha(data.cracha || "");
        setIdfuncao(data.idfuncao || "");
        setAtivo(data.ativo === 1 || data.ativo === true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idfuncao) {
      alert("Selecione uma função.");
      return;
    }

    await fetch(`http://localhost:3000/api/responsavel/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idfuncao, nome, cracha, telefone, ativo }),
    });
    navigate("/responsavel");
  };

  if (loading) return <p>Carregando dados do responsável...</p>;

  return (
    <div>
      <h2>Editar Responsável</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </label>

        <label>
          Telefone:
          <input
            type="text"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
          />
        </label>

        <label>
          Crachá:
          <input
            type="text"
            value={cracha}
            onChange={e => setCracha(e.target.value)}
          />
        </label>

        <label>
          Função:
          <select
            value={idfuncao}
            onChange={e => setIdfuncao(e.target.value)}
            required
          >
            <option value="">Selecione a função</option>
            {funcoes.map(f => (
              <option key={f.idfuncao} value={f.idfuncao}>
                {f.tipoFuncao}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ativo:
          <input
            type="checkbox"
            checked={ativo}
            onChange={e => setAtivo(e.target.checked)}
          />
        </label>

        <button type="submit">Salvar</button>
      </form>

      <button onClick={() => navigate("/responsavel")}>Voltar</button>
    </div>
  );
}
