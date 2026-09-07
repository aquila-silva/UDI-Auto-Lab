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
    const error = document.querySelector(`[data-error-for="${fieldName}"]`);
    const field = document.querySelector(`#${fieldName}`);
    if (error) error.textContent = message;
    if (field) field.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    fields.forEach((fieldName) => showError(fieldName, ''));
    if (status) { status.textContent = ''; status.className = 'form-status'; }

    const data = new FormData(form);
    const nome = String(data.get('nome') || '').trim();
    const email = String(data.get('email') || '').trim();
    const servico = String(data.get('servico') || '');
    const consentimento = document.querySelector('#consentimento')?.checked;
    let isValid = true;

    if (nome.length < 3) { showError('nome', 'Informe seu nome completo.'); isValid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'Digite um e-mail válido.'); isValid = false; }
    if (!servico) { showError('servico', 'Escolha uma opção.'); isValid = false; }
    if (!consentimento) { showError('consentimento', 'O consentimento é necessário para enviar.'); isValid = false; }

    if (!isValid) {
      if (status) { status.textContent = 'Revise os campos destacados.'; status.classList.add('is-error'); }
      return;
    }

    // O objeto já está no formato esperado pela tabela "contatos" do Supabase.
    const contact = {
      nome,
      email,
      telefone: String(data.get('telefone') || '').trim() || null,
      servico,
      mensagem: String(data.get('mensagem') || '').trim() || null,
      consentimento: true,
      consentido_em: new Date().toISOString()
    };
    console.info('Cadastro pronto para integração com Supabase:', contact);
    form.reset();
    if (status) { status.textContent = 'Obrigado! Recebemos sua mensagem e vamos retornar em breve.'; status.classList.add('is-success'); }
  });
});
