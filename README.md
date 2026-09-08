# Udi Auto Lab

Landing page estática fictícia para uma empresa de estética automotiva em Uberlândia.

## Estrutura

- `index.html`: página inicial
- `servicos.html`: serviços oferecidos
- `quem-somos.html`: história e valores
- `contato.html`: formulário com consentimento LGPD
- `css/styles.css`: estilos responsivos
- `js/main.js`: menu móvel, validação e envio do formulário
- `js/supabase-client.js`: configuração do cliente Supabase e chave anon pública
- `assets/logo.svg`: logotipo em SVG
- `supabase/schema.sql`: tabela e política inicial para integração com Supabase

## Publicação

O projeto não depende de processo de compilação. Basta importar a pasta no GitHub e selecionar a raiz do projeto ao criar um projeto na Vercel.

O formulário valida os dados no navegador e envia o objeto para a tabela `contatos` usando a chave anon pública do Supabase. A tabela usa RLS e permite somente inserções com consentimento. A chave anon pode ficar no frontend; nunca exponha uma chave `service_role` ou outra credencial privilegiada no navegador.

Para configurar a integração, execute `supabase/schema.sql` no projeto Supabase e atualize `js/supabase-client.js` com a URL e a chave anon do projeto. Sem essas credenciais ou sem a biblioteca do Supabase carregada, o formulário informa que não foi possível conectar ao serviço.

## Métricas

Não há um identificador de Google Analytics incluído por padrão. Antes de ativar métricas, configure um ID próprio e publique uma política de privacidade compatível com a LGPD.
