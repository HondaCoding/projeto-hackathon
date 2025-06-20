import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResponsavelDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [responsavel, setResponsavel] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/responsavel/${id}`)
      .then(res => res.json())
      .then(data => setResponsavel(data));
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/api/responsavel/${id}`, {
      method: "DELETE",
    });
    navigate("/responsavel");
  };

  if (!responsavel) return <p>Carregando dados...</p>;

  return (
    <div>
      <h2>Excluir Responsável</h2>
      <p>Tem certeza que deseja excluir <strong>{responsavel.nome}</strong>?</p>
      <button onClick={handleDelete}>Sim, excluir</button>
      <button onClick={() => navigate("/responsavel")}>Cancelar</button>
    </div>
  );
}
