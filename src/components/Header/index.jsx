import { useEffect } from "react";
import { logout } from "../../infra/auth";

const Header = ({ admin }) => {

    async function handleClick() {
        await logout();
        window.location.href = '/';
    }

    return (
        <header className="bg-orange-700 w-screen h-16 flex items-center">
            {admin ?
                <ul className="flex space-x-8 pl-8 text-neutral-300 font-bold">
                    <li className="mr-14"><a href="/home">SISCOMP</a></li>
                    <li><a href="/fornecedores">Cadastrar Fornecedor</a></li>
                    <li><a href="/produtos">Cadastrar Produto</a></li>
                    <li><a href="/cadastracotacoes">Cadastrar Cotação</a></li>
                    <li><a href="/cotacoes">Cotações</a></li>
                    <li><button onClick={handleClick}>Logout</button></li>
                </ul>
                :
                <ul className="flex space-x-8 pl-8 text-neutral-300 font-bold">
                    <li className="mr-14"><a href="/home">SISCOMP</a></li>
                    <li><a href="/fornecedores">Abrir Requisição</a></li>
                    <li><a href="/produtos">Minhas Requisições</a></li>
                    <li><button onClick={handleClick}>Logout</button></li>
                </ul>
            }
        </header>
    )
}

export default Header;