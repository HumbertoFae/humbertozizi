# Foto Ímãs Store

E-commerce responsivo para criação e compra de ímãs personalizados. A experiência conecta catálogo, envio e recorte de fotos, carrinho, checkout, acompanhamento de pedidos e painel administrativo em uma única aplicação.

> Esta é a versão pública de portfólio. Os dados são fictícios e pagamentos, fretes e serviços externos são simulados.

## Demonstração

- [Abrir a demonstração no portfólio](https://humbertozizi.dev/demos/foto-imas-store/)
- [Abrir diretamente o dashboard](https://humbertofae.github.io/foto-imas-store/#/dashboard)
- [Ver o estudo de caso completo](https://humbertozizi.dev/#project-f1m4g24)

## Visão do produto

O projeto transforma uma compra com muitas decisões em uma jornada simples:

1. O cliente escolhe um ímã ou combo.
2. Envia a quantidade exata de fotografias.
3. Ajusta enquadramento, zoom e rotação.
4. Confere o carrinho e informa a entrega.
5. Simula o pagamento e recebe um código de pedido.
6. Acompanha produção, envio e entrega.

## Recursos principais

- Loja responsiva com produtos personalizados e temáticos.
- Página de produto com preço, oferta e detalhes.
- Configurador de fotografias com prévia e recorte.
- Carrinho lateral com atualização e exclusão de itens.
- Checkout visual com endereço, frete e Mercado Pago simulado.
- Rastreamento de pedido por código e e-mail.
- Dashboard com pedidos, clientes, produtos, analytics e SEO.
- Navegação por hash pronta para hospedagem no GitHub Pages.

## Arquitetura

```text
foto-imas-store/
├── public/             # imagens e produtos da demonstração
├── src/
│   ├── main.tsx        # inicialização do React
│   ├── App.tsx         # loja, checkout, rastreamento e dashboard
│   ├── data.ts         # catálogo e registros fictícios
│   └── styles.css      # identidade visual e responsividade
├── index.html          # documento inicial do Vite
├── package.json        # scripts e dependências
├── tsconfig.json       # configuração TypeScript
└── vite.config.ts      # build estático com base relativa
```

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Executar localmente

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

## Validar e gerar a versão final

```bash
npm ci
npm run build
```

O comando executa a verificação do TypeScript e gera os arquivos estáticos em `dist/`. A configuração `base: "./"` e as rotas por hash permitem publicar a mesma saída em qualquer caminho do GitHub Pages.

## Segurança da demonstração

- Nenhuma credencial, token ou integração de produção está incluída.
- Fotografias selecionadas permanecem somente no navegador.
- Pedidos, clientes, métricas, endereços e valores são ilustrativos.
- Nenhum pagamento ou cálculo de frete real é executado.
- Alterações do painel duram somente durante a navegação.

## Autoria

Design e desenvolvimento: **Humberto Zizi**.
