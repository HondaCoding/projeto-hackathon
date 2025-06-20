import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecursoCreate() {
  const [tiporecurso, setTiporecurso] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/recurso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tiporecurso, descricao }),
    });
    navigate("/recurso");
  };

  return (
    <div>
      <h2>Novo Recurso</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tipo de Recurso"
          value={tiporecurso}
          onChange={(e) => setTiporecurso(e.target.value)}
        />
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
      <button onClick={() => navigate("/recurso")}>Voltar</button>
    </div>
  );
}
