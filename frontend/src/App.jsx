import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import FuncaoList from './pages/funcao/funcaoList';
import FuncaoCreate from './pages/funcao/funcaoCreate';
import FuncaoEdit from './pages/funcao/funcaoEdt';
import FuncaoDelete from './pages/funcao/funcaoDelete';
import RecursoList from './pages/recurso/recursoList';
import ResponsavelList from './pages/responsavel/responsavelList';
import ReservaList from './pages/reserva/reservaList';
import RecursoCreate from './pages/recurso/recursoCreate';
import RecursoEdit from './pages/recurso/recursoEdit';
import RecursoDelete from './pages/recurso/recursoDelete';
import ResponsavelCreate from './pages/responsavel/responsavelCreate';
import ResponsavelEdit from './pages/responsavel/responsavelEdit';
import ResponsavelDelete from './pages/responsavel/responsavelDelete';
import ReservaCreate from './pages/reserva/reservaCreate';
import ReservaEdit from './pages/reserva/reservaEdit';
import ReservaDelete from './pages/reserva/reservaDelete';
import ReservaDevolucao from './pages/devolucao/reservaDevolucao';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/>} />       

        {/*=========== FUNCOES ============*/}
        <Route path='/funcao' element={<FuncaoList/>} />
        <Route path='/funcao/novo' element={<FuncaoCreate/>} />
        <Route path='/funcao/editar/:id' element={<FuncaoEdit/>} />
        <Route path='/funcao/excluir/:id' element={<FuncaoDelete/>} />
        

        {/*=========== RECURSOS ============*/}
        <Route path='/recurso' element={<RecursoList/>} />
        <Route path='/recurso/novo' element={<RecursoCreate/>} />
        <Route path='/recurso/editar/:id' element={<RecursoEdit/>} />
        <Route path='/recurso/excluir/:id' element={<RecursoDelete/>} />

        {/*=========== RESPONSAVEL ============*/}
        <Route path='/responsavel' element={<ResponsavelList/>} />
        <Route path='/responsavel/novo' element={<ResponsavelCreate/>} />
        <Route path='/responsavel/editar/:id' element={<ResponsavelEdit/>} />
        <Route path='/responsavel/excluir/:id' element={<ResponsavelDelete/>} />

        {/*=========== RESERVAS ============*/}
        <Route path='/reserva' element={<ReservaList/>} />
        <Route path='/reserva/novo' element={<ReservaCreate/>} />
        <Route path='/reserva/editar/:id' element={<ReservaEdit/>} />
        <Route path='/reserva/excluir/:id' element={<ReservaDelete/>} />

        {/*=========== DEVOLUCAO ============*/}
        <Route path='/devolucao' element={<ReservaDevolucao/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
