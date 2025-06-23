import { useParams, useNavigate } from "react-router-dom";

export default function FuncaoDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/funcao/${id}`, {
      method: "DELETE",
    });

    const texto = await res.text();
    console.log("Resposta da API:", texto);

    if (res.ok) {
      navigate("/funcao");
    } else {
      alert("Erro ao excluir função: " + texto);
    }
  } catch (error) {
    console.error("Erro de rede:", error);
    alert("Erro de rede ao excluir.");
  }
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
