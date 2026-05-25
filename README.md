# 📑 Revise.e

> Plataforma Web Fullstack para otimização de aprendizado utilizando técnicas de revisão ativa e filtragem por omissão de palavras.

🚀 **[CLIQUE AQUI PARA ACESSAR A APLICAÇÃO](https://revise-theta.vercel.app)**

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

O **Revise.e** foi desenvolvido para substituir os resumos estáticos e passivos por um ecossistema de aprendizado ativo e dinâmico. A plataforma transforma anotações convencionais em cartões de estudo automatizados através do método de *Cloze Deletion* (omissão de palavras-chave), otimizando a curva de esquecimento e garantindo a retenção do conhecimento.

---

## 📸 Demonstração da Interface

Ambiente de Estudos

CRUD de anotações | Filtro que busca por títulos

<img width="1919" height="970" alt="Captura de tela 2026-05-24 204931" src="https://github.com/user-attachments/assets/7615037e-601a-40ba-92c4-f5365d50a2e2" />


Módulo de Revisão Ativa

Renderização com Omissão (*Cloze Deletion*) | Mecanismo de Revelação Controlada

<img width="1919" height="971" alt="Captura de tela 2026-05-24 205002" src="https://github.com/user-attachments/assets/95e806b5-b1ad-405b-bd07-4eddccfd9c2a" />


---

## 🏗️ Arquitetura e Estrutura do Projeto

A aplicação foi projetada seguindo os princípios de uma Single Page Application (SPA) robusta, dividindo de forma estrita as responsabilidades de renderização, validação de dados e comunicação assíncrona.

⚡ Engenharia e Soluções para os Desafios Técnicos

Como esta plataforma lida com entrada constante de dados e fluxos sequenciais de revisão, tomei decisões de engenharia focadas em performance de renderização, consistência de dados e experiência do usuário (UX):
1. Otimização de I/O em Tempo Real via Debounce Pattern

Salvar cada caractere digitado diretamente na API causaria um gargalo severo de infraestrutura (HTTP Overhead). Para mitigar isso, implementei o padrão de projeto Debounce. O sistema aguarda uma pausa na digitação do usuário (ex: 800ms) antes de disparar uma única requisição de persistência em segundo plano. Isso garante o comportamento de *autosave* contínuo sem comprometer a performance do cliente ou do servidor.

2. Validação Estática e de Runtime Unificada (Zod + React Hook Form)

Para evitar o envio de payloads malformados para a API e interceptar erros antes do disparo de requisições, unifiquei a validação de formulários. Utilizando o Zod, defini esquemas rígidos que validam tipos de dados no runtime do JavaScript, enquanto o TypeScript fornece segurança em tempo de compilação. Os formulários rejeitam entradas inválidas instantaneamente no lado do cliente.

3. Motor de Renderização Cloze Deletion customizado via Regex

O coração do projeto exige transformar a sintaxe simples {{palavra}} em elementos de interface interativos em tempo de execução. Desenvolvi um interpretador baseado em Expressões Regulares (Regex) que fatia a string de texto original, isola os termos envelopados pelas chaves duplas e os substitui de forma dinâmica por componentes de omissão de texto, preservando a integridade do restante do conteúdo didático.

---

## 🚀 Principais Funcionalidades

📝 Módulo de Escrita Avançado

* Marcação Simplificada: Envolva qualquer palavra em {{ }} para criar um ponto de ocultação para estudo.

* Filtro de Preview: Visualização limpa dos blocos de notas, escondendo os marcadores de código para leitura corrida.

* *Autosave*: Salvamento transparente em background para prevenção contra perda de dados.

🧠 Painel de Aprendizado Ativo

* Modo Revisão: Renderização com lacunas ocultas que desafiam o cérebro a recuperar a informação (Active Recall).

* Interface Semidirecionada: Controle total do estudante para revelar respostas uma a uma ou em bloco.

* Tema Customizável: Suporte a Dark/Light Mode adaptativo para sessões longas de estudo noturno.

## 🛠️ Stack Tecnológica

**Core**: React, Node.JS, TypeScript.

**Form & Validation**: React Hook Form, Zod.

**Estilização & Layout**: CSS3 Vanilla (Custom Properties, Flexbox, Grid), Design Responsivo Fluido (Breakpoints: 1100px / 900px / 600px).

**Comunicação**: Axios (Interceptors de requisição e gerenciamento de Tokens JWT).

👥 Desenvolvedor

*   [William Furquim](https://github.com/williamfurquim)
