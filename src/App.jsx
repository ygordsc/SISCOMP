import './App.css'
import {
  Produtos,
  Fornecedores,
  Cotacoes,
  Home,
  Login,
  Registro,
  Contatos,
} from './pages'
import { Suspense, useEffect, useState } from 'react'
import { listaFornecedores } from './infra/fornecedores'
import { listaProdutos } from './infra/produtos'
import { listaContatos } from './infra/contatos'
import { listaRequisicoes } from './infra/requisicoes'
import { listaCotacoes } from './infra/cotacoes'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header, Loading } from './components'

export default function App() {

  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [requisicoes, setRequisicoes] = useState([]);
  const [contatos, setContatos] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);
  const [update, setUpdate] = useState({});
  const [logado, setLogado] = useState(localStorage.getItem("logado") === "true");
  const [admin, setAdmin] = useState(localStorage.getItem("admin") === "true");

  useEffect(() => {
    async function fetchData() {
      const novoArrFornecedores = await listaFornecedores();
      setFornecedores(novoArrFornecedores);

      const novoArrProdutos = await listaProdutos();
      setProdutos(novoArrProdutos);

      const novoArrContatos = await listaContatos();
      setContatos(novoArrContatos);

      const novoArrRequisicoes = await listaRequisicoes();
      setRequisicoes(novoArrRequisicoes);

      const novoArrCotacoes = await listaCotacoes();
      setCotacoes(novoArrCotacoes);
    }

    fetchData();
  }, [update])

  useEffect(() => {
    localStorage.setItem("logado", logado);
    localStorage.setItem("admin", admin);
  }, [logado, admin])


  return (
    <Router>
      <Suspense fallback={<Loading />} />
      {
        admin || logado
          ? <Header admin={admin} />
          : null
      }
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/registrar" element={logado || admin ? <Navigate to="/home" /> : <Registro setLogado={setLogado} />} />
        <Route path="/login" element={logado || admin ? <Navigate to="/home" /> : <Login setLogado={setLogado} setAdmin={setAdmin} />} />
        <Route path="/*" element={logado || admin ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        {
            logado &&
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/requisicoes" element={<Cotacoes produtos={produtos} fornecedores={fornecedores} logado={logado} admin={admin} requisicoes={requisicoes} cotacoes={cotacoes} setUpdate={setUpdate} />} />
            </>
          }
          {
            admin &&
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/requisicoes" element={<Cotacoes produtos={produtos} fornecedores={fornecedores} logado={logado} admin={admin} requisicoes={requisicoes} cotacoes={cotacoes} setUpdate={setUpdate} />} />
              <Route path="/fornecedores" element={<Fornecedores fornecedores={fornecedores} setUpdate={setUpdate} />} />
              <Route path="/produtos" element={<Produtos produtos={produtos} setUpdate={setUpdate} />} />
              <Route path="/contatos" element={<Contatos contatos={contatos} fornecedores={fornecedores} setUpdate={setUpdate} />} />
            </>
          }
      </Routes>
    </Router>
  )
}

