import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🛒 Mercado Online</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/produtos" className="nav-link">Produtos</Link>
          <Link to="/carrinho" className="nav-link">Carrinho</Link>
          <Link to="/cadastro" className="nav-link">Cadastro</Link>
          <Link to="/contato" className="nav-link">Contato</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
