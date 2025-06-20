import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResponsavelCreate() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cracha, setCracha] = useState("");
  const [idfuncao, setIdfuncao] = useState("");
  const [funcoes, setFuncoes] = useState([]);
  const navigate = useNavigate();

  // Buscar funções para popular select
  useEffect(() => {
    fetch("http://localhost:3000/api/funcao")
      .then(res => res.json())
      .then(data => setFuncoes(data))
      .catch(err => console.error("Erro ao buscar funções:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idfuncao) {
      alert("Por favor, selecione uma função.");
      return;
    }

    await fetch("http://localhost:3000/api/responsavel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idfuncao, nome, cracha, telefone }),
    });
    navigate("/responsavel");
  };

  return (
    <div>
      <h2>Cadastrar Novo Responsável</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Crachá"
          value={cracha}
          onChange={e => setCracha(e.target.value)}
        />
        <select
          value={idfuncao}
          onChange={e => setIdfuncao(e.target.value)}
          required
        >
          <option value="">Selecione a Função</option>
          {funcoes.map(f => (
            <option key={f.idfuncao} value={f.idfuncao}>
              {f.tipoFuncao}
            </option>
          ))}
        </select>
        <button type="submit">Salvar</button>
      </form>
      <button onClick={() => navigate("/responsavel")}>Voltar</button>
    </div>
  );
}
