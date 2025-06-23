import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PERMISSOES } from "../../constants/permissoes";


export default function FuncaoCreate() {
  const [tipoFuncao, setTipoFuncao] = useState("");
  const [permissao, setPermissao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/funcao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipoFuncao, permissao, ativo: true }),
    });
    navigate("/funcao");
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <h2>Cadastrar Nova Função</h2>
        <input value={tipoFuncao} onChange={e => setTipoFuncao(e.target.value)} placeholder="Tipo da função" />
        <select value={permissao} onChange={e => setPermissao(e.target.value)} required>
          <option value="">Selecione uma permissão</option>
          {PERMISSOES.map((perm) => (
            <option key={perm} value={perm}>
              {perm}
            </option>
          ))}
        </select>
        <button type="submit">Salvar</button>
        </form>

      <button onClick={() => navigate("/funcao")}>Voltar</button>

    </div>
    
  );
};