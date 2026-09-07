# Udi Auto Lab

Landing page estática fictícia para uma empresa de estética automotiva em Uberlândia.

## Estrutura

- `index.html`: página inicial
- `servicos.html`: serviços oferecidos
- `quem-somos.html`: história e valores
- `contato.html`: formulário com consentimento LGPD
- `css/styles.css`: estilos responsivos
- `js/main.js`: menu móvel e validação do formulário
- `assets/logo.svg`: logotipo em SVG
- `supabase/schema.sql`: tabela e política inicial para integração com Supabase

## Publicação

O projeto não depende de processo de compilação. Basta importar a pasta no GitHub e selecionar a raiz do projeto ao criar um projeto na Vercel.

O formulário valida os dados no navegador e monta o objeto esperado pela tabela `contatos`. Para persistir os cadastros, conecte uma função de servidor ou uma API segura do Supabase; nunca exponha uma chave de serviço no navegador.

## Métricas

Não há um identificador de Google Analytics incluído por padrão. Antes de ativar métricas, configure um ID próprio e publique uma política de privacidade compatível com a LGPD.
