import { Link } from 'react-router-dom';
import './stylle.css';

function Header(){
    return(
        <header className="Header">
            <div className="container">
                <Link to="/" className="logo">T4 SHOP</Link>
                <nav className="nav">
                    <Link to="/cadastro" className="navLink">Cadastrar Usuário</Link>
                    <Link to="/contato" className="navLink">Listar Contatos</Link>
                    <Link to="/carrinho" className="navLink">Carrinho</Link>
                    <Link to="/categoria" className="navLink">Listar Categorias</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header