import { Link, useNavigate, useLocation } from 'react-router-dom';
import carrinhoIcon from '../../assets/images/carrinho-de-compras.png';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  // Não mostrar header nas páginas de login e cadastro
  if (location.pathname === '/login' || location.pathname === '/cadastro') {
    return null;
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={carrinhoIcon} alt="Carrinho" className="logo-icon" />
          <h1>Mercado Online</h1>
        </Link>
        <nav className="nav">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/carrinho" className="nav-link carrinho-link">
            <img src={carrinhoIcon} alt="Carrinho" className="carrinho-icon" />
            <span>Carrinho</span>
          </Link>
          {usuario && usuario.tipo === 'ADMIN' && (
            <Link to="/gerenciar-produtos" className="nav-link admin-link">Gerenciar Produtos</Link>
          )}
          <Link to="/contato" className="nav-link">Contato</Link>

          {usuario ? (
            <div className="user-info">
              <span className="user-name">Olá, {usuario.nome}</span>
              <button onClick={handleLogout} className="btn-logout">Sair</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login-header">Entrar</Link>
              <Link to="/cadastro" className="btn-cadastro-header">Cadastrar</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
