import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const anoAtual = new Date().getFullYear();
  const location = useLocation();

  // Não mostrar footer nas páginas de login e cadastro
  if (location.pathname === '/login' || location.pathname === '/cadastro') {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {anoAtual} Mercado Online - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;
