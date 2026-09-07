const SUPABASE_URL = 'https://wdyusuhpmefxpbvwewwt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeXVzdWhwbWVmeHBidndld3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MzgzMjUsImV4cCI6MjEwNDMxNDMyNX0.A0jFTH-hqs1mBNZD1tUrhT4LsfbltEdMVq0k-18uXoc';

const supabase = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? 'Fechar' : 'Menu';
    });
  }

  const form = document.querySelector('#contact-form');
  if (!form) return;

  const status = document.querySelector('#form-status');
  const fields = ['nome', 'email', 'servico', 'consentimento'];

  const showError = (fieldName, message) => {
    const error = document.querySelector(
      `[data-error-for="${fieldName}"]`
    );

    const field = document.querySelector(`#${fieldName}`);

    if (error) error.textContent = message;

    if (field) {
      field.setAttribute(
        'aria-invalid',
        message ? 'true' : 'false'
      );
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    fields.forEach((fieldName) => {
      showError(fieldName, '');
    });

    if (status) {
      status.textContent = '';
      status.className = 'form-status';
    }

    const data = new FormData(form);

    const nome = String(data.get('nome') || '').trim();
    const email = String(data.get('email') || '').trim();
    const servico = String(data.get('servico') || '');
    const consentimento =
      document.querySelector('#consentimento')?.checked;

    let isValid = true;

    if (nome.length < 3) {
      showError('nome', 'Informe seu nome completo.');
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Digite um e-mail válido.');
      isValid = false;
    }

    if (!servico) {
      showError('servico', 'Escolha uma opção.');
      isValid = false;
    }

    if (!consentimento) {
      showError(
        'consentimento',
        'O consentimento é necessário para enviar.'
      );
      isValid = false;
    }

    if (!isValid) {
      if (status) {
        status.textContent = 'Revise os campos destacados.';
        status.classList.add('is-error');
      }

      return;
    }

    if (!supabase) {
      if (status) {
        status.textContent =
          'Não foi possível conectar ao serviço. Tente novamente mais tarde.';
        status.className = 'form-status is-error';
      }

      return;
    }

    const contact = {
      nome,
      email,
      telefone: String(data.get('telefone') || '').trim() || null,
      servico,
      mensagem: String(data.get('mensagem') || '').trim() || null,
      consentimento: true,
      consentido_em: new Date().toISOString()
    };

    // Envia para o Supabase
    const { error } = await supabase
      .from('contatos')
      .insert([contact]);

    if (error) {
      console.error('Erro ao salvar contato:', error);

      if (status) {
        status.textContent =
          'Não foi possível enviar sua mensagem. Tente novamente.';

        status.className = 'form-status is-error';
      }

      return;
    }

    // Só limpa o formulário depois que o Supabase confirmar o INSERT
    form.reset();

    if (status) {
      status.textContent =
        'Obrigado! Recebemos sua mensagem e vamos retornar em breve.';

      status.className = 'form-status is-success';
    }
  });
});