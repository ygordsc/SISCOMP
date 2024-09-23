import { useEffect } from "react";
import { logout } from "../../infra/auth";

const Header = ({ admin }) => {

    async function handleClick() {
        await logout();
        window.location.href = '/';
    }

    return (
        <header className="bg-gray-300 w-screen h-16 flex items-center fixed z-50 mb-32">
            {admin ?
                <ul className="flex space-x-10 pl-8 text-black">
                    <li className="mr-14 font-bold"><a href="/home">SISCOMP</a></li>
                    <li><a href="/requisicoes">Requisições de Compra</a></li>
                    <li><a href="/fornecedores">Fornecedores</a></li>
                    <li><a href="/produtos">Produtos</a></li>
                    <li><a href="/contatos">Contatos</a></li>
                    <li><button onClick={handleClick}>Logout</button></li>
                </ul>
                :
                <ul className="flex space-x-10 pl-8 text-black">
                    <li className="mr-14 font-bold"><a href="/home">SISCOMP</a></li>
                    <li><a href="/requisicoes">Requisições de Compra</a></li>
                    <li><button onClick={handleClick}>Logout</button></li>
                </ul>
            }
        </header>
    )
}

export default Header;