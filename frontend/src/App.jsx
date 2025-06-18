import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import FuncaoList from './pages/funcao/funcaoList';
import FuncaoCreate from './pages/funcao/funcaoCreate';
import FuncaoEdit from './pages/funcao/funcaoEdt';
import FuncaoDelete from './pages/funcao/funcaoDelete';

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
        

        {/*=========== RESPONSAVEL ============*/}


        {/*=========== RESERVAS ============*/}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
