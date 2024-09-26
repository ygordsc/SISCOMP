import { Button } from "..";
import { logout } from "../../infra/auth";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';

const Header = ({ admin }) => {

    async function handleClick() {
        await logout();
        window.location.href = '/';
    }

    return (
        <header className="w-screen h-16 flex items-center fixed z-50 mb-32">
            <ul className="flex space-x-10 pl-8 text-black text-lg">
                <li className="mr-14 font-bold"><a href="/home">SISCOMP</a></li>
                <li><a href="/requisicoes">Requisições de Compra <InventoryOutlinedIcon fontSize="small" /></a></li>
                {admin ?
                    <>
                        <li><a href="/fornecedores">Fornecedores <StoreOutlinedIcon fontSize="small" /></a></li>
                        <li><a href="/produtos">Produtos <Inventory2OutlinedIcon fontSize="small" /></a></li>
                        <li><a href="/contatos">Contatos <ContactsOutlinedIcon fontSize="small" /></a></li>
                    </>
                    : null}
            </ul>
            <Button sx={{
                position: "absolute", 
                right: "20px"
                }} 
                variant="contained"
                onClick={handleClick}>Logout</Button>
        </header>
    )
}

export default Header;