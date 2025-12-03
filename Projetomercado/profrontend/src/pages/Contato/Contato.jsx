import { useState } from 'react';
import './Contato.css';

function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mensagem enviada:', formData);

    setEnviado(true);
    setTimeout(() => {
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
      setEnviado(false);
    }, 3000);
  };

  return (
    <div className="contato-page">
      <h1>Entre em Contato</h1>

      <div className="contato-container">
        <div className="info-section">
          <div className="info-card">
            <h2>📍 Endereço</h2>
            <p>Rua Exemplo, 123</p>
            <p>Ribeira - Salvador, BA</p>
            <p>CEP: 40420-000</p>
          </div>

          <div className="info-card">
            <h2>📞 Telefones</h2>
            <p>Fixo: (71) 3333-4444</p>
            <p>WhatsApp: (71) 99999-8888</p>
          </div>

          <div className="info-card">
            <h2>📧 Email</h2>
            <p>contato@mercadoonline.com.br</p>
            <p>suporte@mercadoonline.com.br</p>
          </div>

          <div className="info-card">
            <h2>🕐 Horário de Atendimento</h2>
            <p>Segunda a Sexta: 8h às 18h</p>
            <p>Sábado: 9h às 13h</p>
            <p>Domingo: Fechado</p>
          </div>

          <div className="info-card">
            <h2>🌐 Redes Sociais</h2>
            <p>Facebook: /mercadoonline</p>
            <p>Instagram: @mercadoonline</p>
            <p>Twitter: @mercadoonline</p>
          </div>
        </div>

        <div className="form-section">
          <h2>Envie sua Mensagem</h2>

          {enviado && (
            <div className="sucesso">
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-contato">
            <div className="form-group">
              <label htmlFor="nome">Nome *</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="assunto">Assunto *</label>
              <input
                type="text"
                id="assunto"
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensagem">Mensagem *</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows="6"
                required
              />
            </div>

            <button type="submit" className="btn-enviar">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contato;
