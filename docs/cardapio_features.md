# 🎨 Página de Cardápio Interativa - Kendis

## ✨ Funcionalidades Implementadas

### 🔄 Pré-loader Animado
- **Duração:** 2 segundos
- **Design:** Gradiente laranja com logo KENDIS
- **Elementos:**
  - Logo com efeito pulse
  - Texto "Preparando o cardápio..."
  - Spinner rotativo
  - Barra de progresso animada

### 🎬 Animações GSAP

#### 1. **Animação de Entrada do Título**
- Fade in + slide from bottom
- Stagger nos elementos filhos
- Duração: 1s com ease power3.out

#### 2. **Animação dos Botões de Categoria**
- Scale up com back ease (efeito elástico)
- Stagger de 0.1s entre cada botão
- Delay de 0.5s após carregamento

#### 3. **Animação dos Cards de Produto**
- Scroll trigger ativado em 90% da viewport
- Fade in + slide up + rotação sutil
- Animação reversa ao fazer scroll para cima

### 🌐 Efeitos Three.js

#### Componente ThreeBackground
- **3 Esferas Flutuantes 3D:**
  - Esfera laranja (#FF4500)
  - Esfera dourada (#FFD700)
  - Esfera vermelho-tomate (#FF6347)
  
- **Efeitos:**
  - MeshDistortMaterial para distorção orgânica
  - Rotação contínua em X e Y
  - Movimento vertical sinusoidal (flutuação)
  - Iluminação ambiente + point lights

- **Otimização:**
  - Import dinâmico (SSR disabled)
  - Renderizado em background (-z-10)
  - Opacidade reduzida (30%)
  - Sem interação (pointer-events-none)

### 📂 Organização do Cardápio

#### Navegação por Categorias
- Botão "Todos" para ver tudo
- Botões individuais por categoria:
  - 🍦 Gelados
  - 🥤 Bebidas
  - 🥨 Bolos & Salgados
  - 🍔 Hamburgueria

#### Layout dos Produtos
- Exibição em grid responsivo
- Título da categoria com ícone grande
- Contador de produtos
- Linha divisória com gradiente

### 🎯 Elementos Decorativos

#### Background Floating Elements
- 3 círculos blur animados
- Efeito pulse com delays diferentes
- Cores brand e accent
- Fixo com z-index negativo

## 📦 Dependências Instaladas

```json
{
  "gsap": "^3.x",
  "three": "^0.x",
  "@react-three/fiber": "^8.x",
  "@react-three/drei": "^9.x"
}
```

## 🚀 Performance

### Otimizações Aplicadas
- ✅ Dynamic imports para Three.js (evita SSR)
- ✅ ScrollTrigger cleanup no unmount
- ✅ Throttle automático do GSAP
- ✅ GPU acceleration via transform/opacity
- ✅ Pré-loader durante carregamento inicial

## 🎨 UX/UI

### Estados Interativos
- Hover nos botões de categoria (scale up)
- Ícones animados com scale em hover
- Seleção visual clara (bg laranja + shadow)
- Transições suaves (300ms)

### Responsividade
- Grid adaptativo: 1-2-3-4 colunas
- Botões de categoria em flex-wrap
- Título responsivo (5xl - 7xl)
- Padding/margens otimizados

## 📍 Estrutura de Arquivos

```
frontend/src/
├── app/
│   └── cardapio/
│       └── page.tsx          # Página principal
├── components/
│   ├── menu/
│   │   └── ProductCard.tsx   # Card de produto
│   └── three/
│       └── ThreeBackground.tsx  # Background 3D
└── data/
    └── products.ts           # Dados dos produtos
```

## 🔗 Acesso

URL: `http://localhost:3000/cardapio`

## 🎯 Próximos Passos

- [ ] Adicionar sistema de busca/filtro
- [ ] Implementar zoom nas imagens dos produtos
- [ ] Adicionar mais efeitos Three.js (partículas)
- [ ] Sistema de favoritos
- [ ] Animações de transição entre categorias
