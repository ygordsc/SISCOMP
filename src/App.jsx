import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import LandingPageLayout from './layouts/LandingPageLayout'
import './App.css'
import CadastrarProduto from './pages/CadastrarProduto'
import ConsultarCotacoes from './pages/ConsultarCotacoes'
import CadastrarCotacao from './pages/CadastrarCotacao'
import CadastrarFornecedor from './pages/CadastrarFornecedor'
import { useEffect, useState } from 'react'
import { listaFornecedores } from './infra/fornecedores'
import { listaProdutos } from './infra/produtos'
import { listaCotacoes } from './infra/cotacao'

export default function App() { 

  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPageLayout />,
      children: [
        {
          path: '/cadastro',
          children: [
            {
              path: '/cadastro/cotacao',
              element: <CadastrarCotacao produtos={produtos} fornecedores={fornecedores}/>
            },
            {
              path: '/cadastro/fornecedor',
              element: <CadastrarFornecedor fornecedores={fornecedores}/>
            },
            {
              path: '/cadastro/produto',
              element: <CadastrarProduto produtos={produtos}/>
            },
          ]
        },
        {
          path: '/cotacoes',
          element: <ConsultarCotacoes cotacoes={cotacoes}/>
        }
  
      ],
    },
  ])

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

  return (<RouterProvider router={router} />) 
}

