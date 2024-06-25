// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import CadastrarProduto from './pages/CadastrarProduto'
// import Header from './pages/Header'

// function App() {
//   const [route, setRoute] = useState("/");

//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<CadastrarProduto setRoute={setRoute}/>} />
//         <Route path='/header' element={<Header setRoute={setRoute}/>} />
//       </Routes>
//     </Router>
//   )
// }

// export default App

import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import LandingPageLayout from './layouts/LandingPageLayout'
import './App.css'
import CadastrarProduto from './pages/CadastrarProduto'
import ConsultarCotacoes from './pages/ConsultarCotacoes'
import CadastrarCotacao from './pages/CadastrarCotacao'
import CadastrarFornecedor from './pages/CadastrarFornecedor'

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
            element: <CadastrarCotacao />
          },
          {
            path: '/cadastro/fornecedor',
            element: <CadastrarFornecedor />
          },
          {
            path: '/cadastro/produto',
            element: <CadastrarProduto />
          },
        ]
      },
      {
        path: '/cotacoes',
        element: <ConsultarCotacoes />
      }

    ],
  },
])

export default function App() { return (<RouterProvider router={router} />) }
