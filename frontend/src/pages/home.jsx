import { useNavigate } from "react-router-dom";
import ReservaList from "./reserva/reservaList";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="titulo">Sistema CRR</h1>
      <p className="subtitulo">Controle de Reserva e Recursos</p>

      <div className="botoes-navegacao">
  <button className="btn-funcao" onClick={() => navigate("/funcao")}>Funções</button>
  <button className="btn-responsavel" onClick={() => navigate("/responsavel")}>Responsáveis</button>
  <button className="btn-recurso" onClick={() => navigate("/recurso")}>Recursos</button>
  {/* <button className="btn-reserva" onClick={() => navigate("/reserva")}>Reservas</button> */}
  <button className="btn-devolucao" onClick={() => navigate("/devolucao")}>Devolução</button>
</div>


      <ReservaList />
    </div>
  );
}
