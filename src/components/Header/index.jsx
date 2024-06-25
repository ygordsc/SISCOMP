const Header = () => {
    return (
        <header className="bg-orange-700 w-screen h-16 flex items-center">
            <ul className="flex space-x-8 pl-8 text-neutral-300 font-bold">
                <li><a href="/cadastro/fornecedor">Cadastrar Fornecedor</a></li>
                <li><a href="/cadastro/produto">Cadastrar Produto</a></li>
                <li><a href="/cadastro/cotacao">Cadastrar Cotação</a></li>
                <li><a href="/cotacoes">Cotações</a></li>
            </ul>
        </header>
    )
}

export default Header;