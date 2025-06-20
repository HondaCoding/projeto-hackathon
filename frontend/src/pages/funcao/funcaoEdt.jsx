import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FuncaoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [oldData, setOldData] = useState({ tipoFuncao: "", permissao: "" });
  const [tipoFuncao, setTipoFuncao] = useState("");
  const [permissao, setPermissao] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/funcao/${id}`)
      .then(res => res.json())
      .then(data => {
        setOldData({ tipoFuncao: data.tipoFuncao, permissao: data.permissao });
        // setTipoFuncao(data.tipoFuncao);
        // setPermissao(data.permissao);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/funcao/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipoFuncao, permissao, ativo: true }),
    });
    navigate("/funcao");
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h2>Editar Função</h2>

            <p><strong>Função atual:</strong> {oldData.tipoFuncao}</p>
            <input value={tipoFuncao} onChange={e => setTipoFuncao(e.target.value)} />

            <p><strong>Permissão atual:</strong> {oldData.permissao}</p>
            <input value={permissao} onChange={e => setPermissao(e.target.value)} />
            
            <button type="submit">Salvar</button>
        </form>
        <button onClick={() => navigate("/funcao")}>Voltar</button>
    </div>

  );
}
