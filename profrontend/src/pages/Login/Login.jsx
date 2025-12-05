import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarioService } from '../../services/api';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const response = await usuarioService.login(formData);

      // Salvar dados do usuário no localStorage
      localStorage.setItem('usuario', JSON.stringify(response));

      // Redirecionar para home
      navigate('/');
      window.location.reload(); // Recarrega para atualizar o header

    } catch (error) {
      setErro('Email ou senha inválidos');
      console.error('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <p className="subtitle">Bem-vindo ao Mercado Online</p>

        {erro && <div className="erro">{erro}</div>}

        <form onSubmit={handleSubmit} className="form-login">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              placeholder="******"
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="cadastro-link">
          <p>Não tem uma conta? <a href="/cadastro">Cadastre-se aqui</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
