# Foto Ímãs Store

E-commerce responsivo para criação e compra de ímãs personalizados. A experiência conecta catálogo, envio e recorte de fotos, carrinho, checkout, acompanhamento de pedidos e painel administrativo em uma única aplicação.

> Esta é a versão pública de portfólio. Os dados são fictícios e pagamentos, fretes e serviços externos são simulados.

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
- Checkout visual com endereço, frete e Mercado Pago.
- Rastreamento de pedido por código e e-mail.
- Dashboard com pedidos, clientes, produtos, analytics e SEO.
- Navegação por hash pronta para hospedagem no GitHub Pages.

## Arquitetura

```text
foto-imas-store/
├── index.html          # documento inicial do Vite
├── package.json        # scripts e dependências
├── vite.config.ts      # build estático e base relativa
├── tsconfig.json       # configuração TypeScript
└── src/
    ├── main.tsx        # inicialização do React
    ├── App.tsx         # loja, checkout, rastreamento e dashboard
    ├── data.ts         # catálogo e registros fictícios
    └── styles.css      # identidade visual e responsividade
```

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Executar localmente

```bash
npm install
npm run dev
```

## Gerar a versão final

```bash
npm run build
```

O resultado é criado em `dist/`. A configuração `base: "./"` e as rotas por hash permitem publicar a mesma saída em qualquer caminho do GitHub Pages.

## Segurança da demonstração

- Nenhuma credencial ou token de produção está incluído.
- Fotografias selecionadas permanecem somente no navegador.
- Pedidos, clientes, métricas e valores são ilustrativos.
- Nenhum pagamento ou cálculo de frete real é executado.

## Autoria

Design e desenvolvimento: Humberto Zizi.
