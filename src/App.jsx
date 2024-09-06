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

export default function App() {

  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);
  const [contatos, setContatos] = useState([]);
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

      const novoArrContatos = await listaContatos();
      setContatos(novoArrContatos);
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
              <Route path="/requisicoes" element={<CadastrarCotacao produtos={produtos} fornecedores={fornecedores} />} />
              <Route path="/fornecedores" element={<Fornecedores fornecedores={fornecedores} />} />
              <Route path="/produtos" element={<Produtos produtos={produtos} />} />
              <Route path="/contatos" element={<Contatos contatos={contatos} fornecedores={fornecedores}/>} />
              <Route path="/registrar" element={<Registro />} />
            </>
          }
        </Route>
      </Routes>
    </Router>
  )
}

