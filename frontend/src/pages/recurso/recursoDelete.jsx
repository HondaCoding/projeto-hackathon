import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecursoDelete() {
  const { id } = useParams();
  const [confirmacao, setConfirmacao] = useState("");
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirmacao.toLowerCase() === "sim") {
      await fetch(`http://localhost:3000/api/recurso/${id}`, {
        method: "DELETE",
      });
      navigate("/recurso");
    } else {
      alert("Digite 'sim' para confirmar a exclusão.");
    }
  };

  return (
    <div>
      <h2>Excluir Recurso</h2>
      <p>Tem certeza que deseja excluir o recurso com ID {id}? Digite "sim" para confirmar:</p>
      <form onSubmit={handleDelete}>
        <input
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
        />
        <button type="submit">Excluir</button>
      </form>
      <button onClick={() => navigate("/recurso")}>Cancelar</button>
    </div>
  );
}
