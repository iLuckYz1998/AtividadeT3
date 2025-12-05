import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Carrinho from './pages/Carrinho/Carrinho';
import Contato from './pages/Contato/Contato';
import GerenciarProdutos from './pages/GerenciarProdutos/GerenciarProdutos';
import './App.css';

// Componente para proteger apenas rotas de admin
function RotaAdmin({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario) {
    alert('Você precisa estar logado como administrador para acessar esta página');
    return <Navigate to="/login" />;
  }

  if (usuario.tipo !== 'ADMIN') {
    alert('Apenas administradores podem acessar esta página');
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/gerenciar-produtos" element={
              <RotaAdmin>
                <GerenciarProdutos />
              </RotaAdmin>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
