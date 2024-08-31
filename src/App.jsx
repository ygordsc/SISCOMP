import './App.css'
import {
  CadastrarProduto,
  ConsultarCotacoes,
  CadastrarFornecedor,
  CadastrarCotacao,
  Home,
  Login,
  Registro
} from './pages'
import { Suspense, useEffect, useState } from 'react'
import { listaFornecedores } from './infra/fornecedores'
import { listaProdutos } from './infra/produtos'
import { listaCotacoes } from './infra/cotacao'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header, Loading } from './components'

export default function App() {

  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);
  const admin = localStorage.getItem("admin") === "true";
  const logado = localStorage.getItem("logado") === "true";

  useEffect(() => {
    async function fetchData() {
      const novoArrFornecedores = await listaFornecedores();
      setFornecedores(novoArrFornecedores);

      const novoArrProdutos = await listaProdutos();
      setProdutos(novoArrProdutos);

      const novoArrCotacoes = await listaCotacoes();
      setCotacoes(novoArrCotacoes);

    }

    fetchData();
  }, [])

  return (
    <Router>
      <Suspense fallback={<Loading />} />
      {
        logado || admin &&
        <Header admin={admin} />
      }
      <Routes>
        <Route path="/" element={logado || admin ? null : <Login />} >
          {
            logado &&
            <>
              <Route path="/home" element={<Home />} />
            </>
            
          }
          {
            admin &&
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/cadastracotacoes" element={<CadastrarCotacao produtos={produtos} fornecedores={fornecedores} />} />
              <Route path="/fornecedores" element={<CadastrarFornecedor fornecedores={fornecedores} />} />
              <Route path="/produtos" element={<CadastrarProduto produtos={produtos} />} />
              <Route path="/cotacoes" element={<ConsultarCotacoes cotacoes={cotacoes} />} />
              <Route path="/registrar" element={<Registro />} />
            </>
          }
        </Route>
      </Routes>
    </Router>
  )
}

