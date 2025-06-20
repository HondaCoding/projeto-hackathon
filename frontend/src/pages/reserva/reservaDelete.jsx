import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ReservaDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/reserva/${id}`)
      .then(res => res.json())
      .then(data => setReserva(data));
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/api/reserva/${id}`, {
      method: "DELETE",
    });
    navigate("/reserva");
  };

  if (!reserva) return <p>Carregando dados...</p>;

  return (
    <div>
      <h2>Excluir Reserva</h2>
      <p>Tem certeza que deseja excluir a reserva de <strong>{reserva.datareserva}</strong>?</p>
      <button onClick={handleDelete}>Sim, excluir</button>
      <button onClick={() => navigate("/")}>Cancelar</button>
    </div>
  );
}
