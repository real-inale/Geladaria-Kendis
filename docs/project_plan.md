# Plano de Projeto - Plataforma Digital KENDIS

## 1. Objetivo Principal
Criar uma plataforma digital completa para a Geladaria & Hamburgeria KENDIS que:
- Venda mais (Pedidos Online, Delivery).
- Automatize processos (Reservas, Fidelização).
- Gere dados estratégicos.
- Ofereça uma experiência "Premium" e moderna.

## 2. Escopo do Projeto

### 2.1 Módulos Principais
1.  **Website Institucional Premium** (Next.js + Tailwind CSS)
    - Página Inicial, História, Galeria, Localização.
    - Design Vibrante, Micro-animações.
2.  **Cardápio Digital Inteligente**
    - Categorias: Gelados, Bebidas, Bolos & Salgados, Hamburgueria.
    - Filtros: Mais vendidos, Promoções.
    - Fotos reais e Descrições.
3.  **Sistema de Encomenda Online (Delivery + Retirada)**
    - Carrinho de compras.
    - Checkout com Pagamentos (Multicaixa Express, Transferência, Entrega).
4.  **Sistema de Reservas**
    - Seleção de Data/Hora/Pessoas.
    - Confirmação Automática (Integração WhatsApp - futuro).
5.  **Área do Cliente & Fidelização**
    - Login/Registro.
    - Histórico, Cupons, Pontos.
6.  **Painel Administrativo (Backoffice)**
    - Gestão de Vendas, Estoque, Produtos, Clientes.
    - Relatórios Financeiros.

### 2.2 Arquitetura Tecnológica
- **Backend:** Java (Spring Boot) - Robusto e Escalável.
- **Frontend:** Next.js (TypeScript) + ShadCN UI / Tailwind CSS.
- **Banco de Dados:** Supabase (PostgreSQL).
- **Integrações:** WhatsApp (Notificações), Email.

## 3. Cronograma e Fases (Estimativa)

### Fase 1: MVP Frontend (Fundação Visual)
- Setup do Next.js + Design System.
- Página Inicial e Navegação.
- Cardápio Digital (Visualização).
- Integração Básica de Backend (Estrutura).

### Fase 2: Backend e Funcionalidades Core
- Configuração do Spring Boot.
- CRUD Produtos e Categorias.
- Integração Básica Frontend-Backend.

### Fase 3: E-commerce (Pedidos e Pagamentos)
- fluxo de Carrinho e Checkout.
- Integração de Pagamentos.
- Gestão de Pedidos no Admin.

### Fase 4: Fidelização e Reservas
- Módulo de Reservas.
- Sistema de Pontos.
- Área do Cliente.

### Fase 5: Refinamento e Deploy
- Otimização SEO.
- Testes de Usabilidade.
- Lançamento.

## 4. Próximos Passos Imediatos
1.  Inicializar Repositório Frontend (Next.js).
2.  Configurar Tailwind CSS e Design Tokens.
3.  Criar Estrutura do Backend (Spring Boot).
