import './App.css'
import {
  Produtos,
  Fornecedores,
  CadastrarCotacao,
  Home,
  Login,
  Registro,
  Contatos
} from './pages'
import { Suspense, useEffect, useState } from 'react'
import { listaFornecedores } from './infra/fornecedores'
import { listaProdutos } from './infra/produtos'
import { listaCotacoes } from './infra/cotacao'
import { listaContatos } from './infra/contatos'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header, Loading } from './components'
import Cotacoes from './pages/Cotações'
import { listaRequisicoes } from './infra/requisicoes'

export default function App() {

  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);
  const [requisicoes, setRequisicoes] = useState([]);
  const [contatos, setContatos] = useState([]);
  const [update, setUpdate] = useState({});
  const [logado, setLogado] = useState(localStorage.getItem("logado") === "true");
  const [admin, setAdmin] = useState(localStorage.getItem("admin") === "true");

  useEffect(() => {
    async function fetchData() {
      const novoArrFornecedores = await listaFornecedores();
      setFornecedores(novoArrFornecedores);

      const novoArrProdutos = await listaProdutos();
      setProdutos(novoArrProdutos);

      const novoArrCotacoes = await listaCotacoes();
      setCotacoes(novoArrCotacoes);

      const novoArrContatos = await listaContatos();
      setContatos(novoArrContatos);

      const novoArrRequisicoes = await listaRequisicoes();
      setRequisicoes(novoArrRequisicoes);
    }

    fetchData();
  }, [update])

  useEffect(() => {
    localStorage.setItem("logado", logado);
    localStorage.setItem("admin", admin);
  }, [logado, admin])

  //TODO: Implementar a rota default (path="*")

  return (
    <Router>
      <Suspense fallback={<Loading />} />
      {
        admin || logado
          ? <Header admin={admin} />
          : null
      }
      <Routes>
        <Route path="/" element={logado || admin ? null : <Login setLogado={setLogado} setAdmin={setAdmin} />} >
          {
            logado &&
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/requisicoes" element={<Cotacoes produtos={produtos} fornecedores={fornecedores} logado={logado} admin={admin} cotacoes={cotacoes} requisicoes={requisicoes} setUpdate={setUpdate} />} />
            </>
          }
          {
            admin &&
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/requisicoes" element={<Cotacoes produtos={produtos} fornecedores={fornecedores} logado={logado} admin={admin} cotacoes={cotacoes} requisicoes={requisicoes} setUpdate={setUpdate} />} />
              <Route path="/fornecedores" element={<Fornecedores fornecedores={fornecedores} setUpdate={setUpdate} />} />
              <Route path="/produtos" element={<Produtos produtos={produtos} setUpdate={setUpdate} />} />
              <Route path="/contatos" element={<Contatos contatos={contatos} fornecedores={fornecedores} setUpdate={setUpdate} />} />
              <Route path="/registrar" element={<Registro />} />
            </>
          }
        </Route>
      </Routes>
    </Router>
  )
}

