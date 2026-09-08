document.addEventListener('DOMContentLoaded', () => {
  const whatsappNumber = '5534999999999';
  const whatsappMessage = encodeURIComponent(
    'Olá! Gostaria de solicitar um orçamento para meu carro.'
  );

  const whatsappButton = document.createElement('a');
  whatsappButton.className = 'whatsapp-button';
  whatsappButton.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  whatsappButton.target = '_blank';
  whatsappButton.rel = 'noopener noreferrer';
  whatsappButton.setAttribute('aria-label', 'Falar no WhatsApp');
  whatsappButton.title = 'Falar no WhatsApp';
  whatsappButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20.5 3.5A11.85 11.85 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.15 1.6 5.96L.05 24l6.27-1.64a11.9 11.9 0 0 0 5.74 1.46h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.24-6.17-3.47-8.41ZM12.07 21.8h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.88 9.88 0 1 1 8.36 4.61Zm5.42-7.4c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35Z"/>
    </svg>
    <span>Agende pelo WhatsApp</span>`;
  document.body.append(whatsappButton);

  document.querySelectorAll('.main-nav').forEach((nav) => {
    if (!nav.querySelector('a[href="portfolio.html"]')) {
      const portfolioLink = document.createElement('a');
      portfolioLink.href = 'portfolio.html';
      portfolioLink.textContent = 'Portfólio';
      nav.insertBefore(portfolioLink, nav.querySelector('.nav-cta'));
    }
  });

  document.querySelectorAll('.site-footer').forEach((footer) => {
    if (footer.querySelector('.footer-contact')) return;
    const contact = document.createElement('div');
    contact.className = 'container footer-contact';
    contact.innerHTML = '<span>Av. Rondon Pacheco, 2.500 · Uberlândia - MG</span><span>(34) 99999-9999 · contato@udiautolab.com.br</span><span class="footer-social" aria-label="Redes sociais"><a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a><a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a></span><iframe title="Mapa da Udi Auto Lab" src="https://www.google.com/maps?q=Uberlândia%20MG&output=embed" loading="lazy"></iframe>';
    footer.append(contact);
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? 'Fechar' : 'Menu';
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Menu';
      }
    });
  }

  document.querySelectorAll('details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('details[open]').forEach((otherItem) => {
        if (otherItem !== item) otherItem.removeAttribute('open');
      });
    });
  });

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('[data-lightbox-close]');

  document.querySelectorAll('[data-gallery-image]').forEach((image) => {
    image.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = image.dataset.galleryImage || image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('is-visible');
      document.body.classList.add('lightbox-open');
    });
  });

  const closeLightbox = () => {
    lightbox?.classList.remove('is-visible');
    document.body.classList.remove('lightbox-open');
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });

  const comparison = document.querySelector('.comparison');
  const comparisonRange = comparison?.querySelector('input[type="range"]');
  comparisonRange?.addEventListener('input', () => {
    comparison?.style.setProperty(
      '--comparison-position',
      `${comparisonRange.value}%`
    );
  });

  const portfolioItems = document.querySelectorAll('.portfolio-grid .gallery-item');
  const portfolioCategories = ['polimento', 'protecao', 'interior', 'polimento', 'protecao', 'interior'];
  portfolioItems.forEach((item, index) => {
    item.dataset.category = portfolioCategories[index] || 'polimento';
  });
  document.querySelectorAll('.filter-button').forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      document.querySelectorAll('.filter-button').forEach((button) => {
        button.classList.toggle('is-selected', button === filterButton);
      });
      const filter = filterButton.textContent.trim().toLowerCase();
      portfolioItems.forEach((item) => {
        item.hidden = filter !== 'todos' && item.dataset.category !== filter;
      });
    });
  });

  const form = document.querySelector('#contact-form');
  if (!form) return;

  const status = document.querySelector('#form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const fields = ['nome', 'email', 'servico', 'consentimento'];
  const supabaseClient = window.UdiAutoLabSupabase?.getClient() || null;

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

    if (!supabaseClient) {
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

    if (submitButton) submitButton.disabled = true;

    let error;

    try {
      ({ error } = await supabaseClient
        .from('contatos')
        .insert([contact]));
    } catch (requestError) {
      console.error('Erro ao salvar contato:', requestError);
      error = requestError;
    }

    if (error) {
      console.error('Erro ao salvar contato:', error);

      if (status) {
        status.textContent =
          'Não foi possível enviar sua mensagem. Tente novamente.';

        status.className = 'form-status is-error';
      }

      if (submitButton) submitButton.disabled = false;

      return;
    }

    form.reset();

    if (status) {
      status.textContent =
        'Obrigado! Recebemos sua mensagem e vamos retornar em breve.';

      status.className = 'form-status is-success';
    }

    if (submitButton) submitButton.disabled = false;
  });
});