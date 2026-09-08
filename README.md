# Udi Auto Lab

Site institucional estático para uma empresa fictícia de estética automotiva em
Uberlândia. O projeto apresenta a marca, seus serviços, informações
institucionais e um formulário de contato conectado ao Supabase.

## Sumário

- [Visão geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Estrutura de diretórios](#estrutura-de-diretórios)
- [Páginas e recursos](#páginas-e-recursos)
- [Funcionamento do formulário](#funcionamento-do-formulário)
- [Modelo de dados e segurança](#modelo-de-dados-e-segurança)
- [Execução local](#execução-local)
- [Configuração do Supabase](#configuração-do-supabase)
- [Publicação](#publicação)
- [Manutenção](#manutenção)

## Visão geral

### Tecnologias

- HTML5 semântico para as páginas públicas.
- CSS3 para identidade visual, layout responsivo e estados de foco.
- JavaScript moderno executado diretamente no navegador, sem build.
- [Supabase JavaScript v2](https://supabase.com/docs/reference/javascript/introduction), carregado via CDN somente na página de contato.
- Supabase Postgres e Row Level Security (RLS) para receber contatos.

### Características

- Navegação compartilhada entre as páginas públicas.
- Menu móvel com atributos ARIA e suporte à tecla `Escape`.
- Validação no navegador com mensagens associadas aos campos.
- Consentimento explícito para tratamento dos dados conforme a LGPD.
- Feedback de validação, carregamento, sucesso e erro no formulário.
- Página 404, `robots.txt`, `sitemap.xml` e configuração para URLs limpas na Vercel.

## Arquitetura

O projeto é organizado em camadas simples, sem framework e sem processo de
compilação:

1. **Apresentação:** os arquivos HTML definem conteúdo, navegação e formulário.
2. **Estilo:** `css/styles.css` concentra a identidade visual e os componentes compartilhados.
3. **Comportamento:** `js/main.js` inicializa o menu e o formulário quando os elementos existem na página.
4. **Integração:** `js/supabase-client.js` cria o cliente Supabase com a chave pública `anon`.
5. **Persistência:** `supabase/schema.sql` cria a tabela de contatos, permissões e política de inserção.

## Estrutura de diretórios

```text
.
├── 404.html                 # Página exibida para rotas inexistentes
├── contato.html             # Dados de contato e formulário
├── index.html               # Página inicial
├── quem-somos.html          # História, valores e posicionamento
├── servicos.html            # Catálogo de serviços
├── robots.txt               # Regras para robôs de busca
├── sitemap.xml              # URLs públicas para indexação
├── vercel.json              # URLs limpas e configuração de trailing slash
├── assets/
│   └── logo.svg             # Logotipo da marca
├── css/
│   └── styles.css           # Estilos globais e responsivos
├── js/
│   ├── main.js              # Menu, validação e envio do formulário
│   └── supabase-client.js   # Fábrica do cliente Supabase
└── supabase/
		└── schema.sql           # Tabela, grants e política RLS
```

## Páginas e recursos

As páginas permanecem na raiz para preservar URLs simples em hospedagens
estáticas:

- `/` ou `/index.html`: apresentação principal da Udi Auto Lab.
- `/servicos.html`: serviços de estética automotiva.
- `/quem-somos.html`: história e valores da empresa.
- `/contato.html`: formulário e informações de contato.
- `/404.html`: fallback visual para páginas inexistentes.

O arquivo `js/main.js` pode ser carregado em todas as páginas porque verifica a
existência dos elementos antes de registrar eventos. A integração do Supabase
é carregada apenas em `contato.html`.

## Funcionamento do formulário

O fluxo de envio em `js/main.js` é:

1. Interceptar o `submit` para evitar o envio HTML padrão.
2. Limpar mensagens anteriores e validar nome, e-mail, serviço e consentimento.
3. Mostrar os erros nos campos correspondentes e interromper o envio inválido.
4. Obter o cliente por `window.UdiAutoLabSupabase.getClient()`.
5. Inserir os dados na tabela `contatos`.
6. Exibir confirmação e limpar o formulário quando o Supabase responder com sucesso.
7. Restaurar o botão e mostrar uma mensagem de erro se a operação falhar.

O objeto enviado possui este formato:

```js
{
	nome,
	email,
	telefone,
	servico,
	mensagem,
	consentimento: true,
	consentido_em
}
```

## Modelo de dados e segurança

O arquivo `supabase/schema.sql` cria `public.contatos` com:

- `id`: identificador autogerado.
- `nome`, `email` e `servico`: campos obrigatórios.
- `telefone` e `mensagem`: campos opcionais.
- `consentimento`: obrigatório e limitado a `true`.
- `consentido_em` e `criado_em`: datas geradas pelo banco.

O RLS permanece habilitado. A role `anon` recebe apenas permissão de inserção,
e a política exige `consentimento = true`. Não há leitura pública dos contatos.

A URL do projeto e a chave `anon` ficam em `js/supabase-client.js`. Essa chave
é própria para uso no frontend e não deve ser confundida com uma chave
`service_role`, que nunca deve ser publicada. A proteção dos dados depende das
políticas RLS e das restrições do banco.

## Execução local

O projeto não exige Node.js, npm ou processo de build. Qualquer servidor de
arquivos estáticos é suficiente. Com Python instalado:

```bash
python3 -m http.server 8000
```

Depois, abra <http://localhost:8000>. Evite abrir os arquivos diretamente com
`file://`, pois navegadores podem restringir recursos locais e requisições
entre origens nesse modo.

### Verificações rápidas

```bash
node --check js/main.js
node --check js/supabase-client.js
git diff --check
```

Também teste manualmente o menu móvel, os estados de validação e um envio real
do formulário em um projeto Supabase configurado.

## Configuração do Supabase

Para configurar uma nova instância:

1. Crie um projeto no [Supabase](https://supabase.com/).
2. Execute `supabase/schema.sql` no SQL Editor.
3. Confira a URL e a chave pública `anon` em **Project Settings → API**.
4. Atualize os valores correspondentes em `js/supabase-client.js`.
5. Faça um envio de teste e confirme a inserção em `public.contatos`.

O SDK é carregado de `https://cdn.jsdelivr.net` em `contato.html`. Se uma
Content Security Policy for adicionada futuramente, esse domínio e o domínio
do projeto Supabase deverão ser permitidos.

## Publicação

O site pode ser publicado na Vercel, GitHub Pages, Netlify ou em qualquer
hospedagem que sirva arquivos estáticos. Na Vercel, importe o repositório e
use a raiz do projeto como diretório de publicação; o arquivo `vercel.json`
já configura URLs limpas.

Antes do lançamento:

1. Atualize o domínio em `sitemap.xml` e `robots.txt`.
2. Configure HTTPS e escolha a versão canônica do domínio.
3. Aplique e valide o schema no projeto Supabase de produção.
4. Revise a política de privacidade, retenção dos contatos e atendimento conforme a legislação aplicável.
5. Substitua informações fictícias e confirme os dados reais de contato.

## Manutenção

- Mantenha as páginas públicas na raiz para não quebrar os links existentes.
- Ao alterar o formulário, atualize `contato.html`, `js/main.js` e `supabase/schema.sql` juntos.
- Versione alterações de banco com migrations quando o schema sair da fase inicial.
- Nunca adicione chaves administrativas, tokens privados ou credenciais de serviço ao frontend.
- Antes de ativar métricas, configure um identificador próprio e uma política de privacidade compatível com a LGPD.

## Licença

O código e a estrutura do projeto são de autoria de Aquila Fernando Alves Silva
e estão sob a licença [MIT](LICENSE). O projeto é fictício e os dados de
contato exibidos nas páginas devem ser substituídos antes de uma publicação
real.
