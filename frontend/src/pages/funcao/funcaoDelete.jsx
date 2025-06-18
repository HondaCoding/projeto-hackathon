import { useParams, useNavigate } from "react-router-dom";

export default function FuncaoDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/api/funcao/${id}`, {
      method: "DELETE",
    });
    navigate("/funcao");
  };

  return (
    <div>
      <h2>Excluir Função</h2>
      <p>Tem certeza que deseja excluir a função ID {id}?</p>
      <button onClick={handleDelete}>Sim, excluir</button>
      <button onClick={() => navigate("/funcao")}>Cancelar</button>
    </div>
  );
}
