import './Footer.css';

function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {anoAtual} Mercado Online - Todos os direitos reservados</p>
        <p>Desenvolvido com React + Spring Boot</p>
      </div>
    </footer>
  );
}

export default Footer;
