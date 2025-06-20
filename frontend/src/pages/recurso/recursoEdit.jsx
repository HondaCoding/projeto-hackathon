import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecursoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [oldData, setOldData] = useState({ tiporecurso: "", descricao: "" });
  const [tiporecurso, setTiporecurso] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/recurso/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOldData({ tiporecurso: data.tiporecurso, descricao: data.descricao });
        // Não preenche os inputs, só mostra os dados antigos
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/recurso/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tiporecurso, descricao }),
    });
    navigate("/recurso");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Editar Recurso</h2>

        <p><strong>Recurso atual:</strong> {oldData.tiporecurso}</p>
        <input
          placeholder="Novo tipo de recurso"
          value={tiporecurso}
          onChange={(e) => setTiporecurso(e.target.value)}
        />

        <p><strong>Descrição atual:</strong> {oldData.descricao}</p>
        <input
          placeholder="Nova descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>
      <button onClick={() => navigate("/recurso")}>Voltar</button>
    </div>
  );
}
