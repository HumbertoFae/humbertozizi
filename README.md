# zzBiography

Portfólio pessoal de Humberto Zizi que apresenta projetos, experiências digitais, sites, aplicativos e ferramentas em uma interface inspirada em ambiente de desenvolvimento.

> Esta é uma versão pública de portfólio. Os projetos demonstrativos usam dados fictícios e não incluem credenciais, integrações ou informações de ambientes de produção.

## Demonstração

- [Abrir o portfólio](https://humbertozizi.dev)
- [Conhecer o Foto Ímãs Store](https://humbertozizi.dev/#project-f1m4g24)
- [Conhecer o Menor Desconto](https://humbertozizi.dev/#project-m3n0rd5)

## Visão do produto

O portfólio transforma a apresentação profissional em uma experiência interativa:

1. A pessoa conhece o perfil e as áreas de atuação.
2. Explora projetos por meio de estudos de caso visuais.
3. Acompanha etapas, decisões e resultados de cada trabalho.
4. Abre demonstrações funcionais sem sair da experiência principal.
5. Consulta tecnologias, histórico e formas de contato.

## Recursos principais

- Interface responsiva inspirada em editor de código.
- Apresentação profissional com navegação por seções.
- Estudos de caso interativos para projetos selecionados.
- Demonstrações públicas incorporadas ao próprio portfólio.
- Wireframes vetoriais e animações de interface.
- Metadados sociais, domínio próprio e página estática otimizada.
- Testes automatizados sobre o HTML renderizado.
- Exportação estática pronta para GitHub Pages.

## Arquitetura

```text
zzBiography/
├── app/
│   ├── page.tsx           # experiência principal e interações
│   ├── layout.tsx         # metadados e estrutura global
│   └── globals.css        # identidade visual e responsividade
├── public/
│   ├── demos/             # demonstrações públicas dos projetos
│   ├── source/            # código público de demonstração
│   ├── CNAME              # domínio personalizado
│   └── og.png             # imagem de compartilhamento
├── tests/                 # validações do conteúdo renderizado
├── next.config.ts         # exportação estática do Next.js
└── package.json           # scripts e dependências
```

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React e React Icons
- Node.js

## Executar localmente

Requer Node.js `22.13.0` ou superior.

```bash
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

## Validar e gerar a versão final

```bash
npm ci
npm run lint
npm test
```

O teste executa a build do Next.js e valida o HTML renderizado. A configuração `output: "export"` gera a versão estática usada pelo GitHub Pages.

## Segurança da demonstração

- Nenhuma senha, token ou credencial de produção está incluída.
- Os dados apresentados nas demonstrações são fictícios.
- Pagamentos, fretes e integrações externas não operam em produção.
- Arquivos de ambiente, caches e dependências locais não são publicados.
- O conteúdo em `public/source` é limitado ao material preparado para portfólio.

## Autoria

Design e desenvolvimento: **Humberto Zizi**.
