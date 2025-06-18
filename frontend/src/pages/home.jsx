import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();


  return(
    <div>
      <h1>Bem-vindo ao Sistema CRR (Controle de Reserva e Recursos)</h1>
      <button onClick={() => navigate("/funcao")}>Funcoes</button>
      <button onClick={() => navigate("/funcao")}>Responsaveis</button>
      <button onClick={() => navigate("/funcao")}>Recursos</button>
      <button onClick={() => navigate("/funcao")}>Reservas</button>
    
    </div>
    
  );
}
