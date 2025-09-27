# BloomWatch - Monitoramento Ambiental da África Austral



## 🎯 Sobre o Projeto

O **BloomWatch** é um dashboard interativo projetado para o monitoramento em tempo real da vegetação e das condições climáticas na região da África Austral. A plataforma utiliza dados simulados de satélite para fornecer insights visuais sobre a saúde da vegetação (NDVI), riscos ambientais e tendências climáticas, ajudando na tomada de decisões para agricultura, gestão de recursos hídricos e prevenção de desastres.

Este projeto foi desenvolvido como parte do **NASA Space Apps Challenge 2025**, utilizando Next.js, TypeScript e Tailwind CSS para criar uma experiência de usuário moderna, responsiva e rica em dados.

---

## ✨ Funcionalidades Principais

*   **Mapa Interativo:** Visualização geoespacial com marcadores dinâmicos que representam pontos de coleta de dados.
*   **Sistema de Alertas:** Notificações automáticas sobre anomalias, como quedas bruscas de NDVI, seca ou risco de incêndio.
*   **Análise de Dados Climáticos:** Gráficos e tabelas interativas para explorar o histórico de temperatura, umidade do solo e precipitação.
*   **Interface Consistente e Intuitiva:** Um design coeso e moderno em todas as páginas, focado na clareza e facilidade de uso.

---

## 🛠️ Tecnologias Utilizadas

*   **Framework:** [Next.js](https://nextjs.org/) (com App Router)
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
*   **Componentes de UI:** [shadcn/ui](https://ui.shadcn.com/) (Card, Button, Badge, Input)
*   **Mapas:** [React Leaflet](https://react-leaflet.js.org/)
*   **Gráficos:** [Recharts](https://recharts.org/)
*   **Ícones:** [Lucide React](https://lucide.dev/)

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto localmente.

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão 18.x ou superior)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://[URL_DO_SEU_REPOSITORIO].git
    cd frontend_bloomwatch
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## 📂 Estrutura e Lógica do Projeto

O projeto segue a estrutura do App Router do Next.js, onde cada pasta dentro de `src/app/` representa uma rota.


### Lógica das Páginas

#### 1. `app/map/page.tsx` - Mapa Interativo

*   **Propósito:** Fornecer uma visão geral da saúde da vegetação na África Austral.
*   **Lógica:**
    *   A página carrega um conjunto de dados simulados de vegetação (`VegetationDataItem`), cada um com coordenadas, valor de NDVI, temperatura, etc.
    *   O **Painel de Controle (`MapSidebar.tsx`)** à esquerda permite ao usuário filtrar os dados exibidos no mapa por tipo de vegetação, nível de risco e período.
    *   O mapa (`InteractiveMap.tsx`) é renderizado usando **React Leaflet**. Ele recebe os dados já filtrados e exibe um marcador para cada ponto.
    *   A cor de cada marcador é determinada pelo `risk_level`.
    *   Ao clicar em um marcador, os detalhes desse ponto são exibidos no painel lateral, criando uma experiência totalmente interativa.
    *   O mapa possui controles de zoom e um modo de tela cheia para melhor visualização.

#### 2. `app/alerts/page.tsx` - Sistema de Alertas

*   **Propósito:** Listar e detalhar eventos críticos que exigem atenção, como secas ou riscos de incêndio.
*   **Lógica:**
    *   Carrega uma lista de alertas (`Alert`), cada um com severidade, tipo, status e localização.
    *   O **Painel de Filtros** à esquerda permite ao usuário buscar e filtrar alertas por severidade, tipo, status e período.
    *   A **Lista de Alertas** no centro da tela exibe os alertas filtrados. Clicar em um alerta o seleciona.
    *   O **Mapa de Visualização** e os **Detalhes do Alerta** na parte inferior são atualizados dinamicamente quando um alerta é selecionado.
    *   O mapa foca automaticamente na localização do alerta selecionado, e os marcadores no mapa correspondem apenas aos alertas visíveis na lista filtrada.

#### 3. `app/climate/page.tsx` - Dados Climáticos

*   **Propósito:** Permitir a análise de tendências climáticas históricas para entender o contexto por trás dos alertas e do estado da vegetação.
*   **Lógica:**
    *   A página utiliza um conjunto de dados históricos simulados (`ClimateRecord`) para diferentes regiões.
    *   O **Painel de Filtros** permite ao usuário selecionar uma **Região**, um **Tipo de Dado** (Temperatura, Umidade, Precipitação ou NDVI) e um **Período** (7 ou 30 dias).
    *   O **Gráfico de Linha**, renderizado com **Recharts**, exibe a evolução do dado selecionado ao longo do tempo, atualizando-se instantaneamente com a mudança dos filtros.
    *   **Cartões de Estatísticas** mostram a média, máxima e mínima do dado no período selecionado.
    *   Uma **Tabela de Dados Detalhados** na parte inferior exibe os valores diários, incluindo o nível de risco calculado, para uma análise mais profunda.

---










This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
