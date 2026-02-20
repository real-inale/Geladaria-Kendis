# Guia de Gestão de Imagens - Kendis

## 📁 Estrutura de Pastas

```
frontend/public/images/
├── README.md (este ficheiro)
├── placeholder.svg (imagem padrão temporária)
└── [nome-produto].jpg (imagens reais dos produtos)
```

## 🎨 Imagens Placeholder Atuais

O sistema usa **placeholders coloridos em SVG** automaticamente enquanto as imagens reais não são carregadas:

- 🍦 **Gelados**: Fundo vermelho-tomate com ícone de gelado
- 🥤 **Bebidas**: Fundo azul com ícone de bebida
- 🥨 **Bolos & Salgados**: Fundo laranja com ícone de pretzel
- 🍔 **Hamburgueria**: Fundo vermelho-fogo com ícone de hambúrguer

## 📸 Como Adicionar Imagens Reais

### Opção 1: Manual (Agora)
1. Tire fotos profissionais dos produtos
2. Renomeie seguindo a nomenclatura abaixo
3. Coloque nesta pasta (`public/images/`)
4. Os placeholders serão substituídos automaticamente

### Opção 2: Painel Administrativo (Futuro)
Quando o painel admin estiver implementado, será possível:
- Fazer upload de imagens diretamente
- Editar produtos existentes
- Adicionar novos produtos com fotos

## 📝 Nomenclatura Obrigatória

### GELADOS
- `bola-gelado.jpg`
- `picole.jpg`
- `tigela.jpg`
- `iogurte.jpg`

### BEBIDAS
- `copo-papel.jpg`
- `cha.jpg`
- `cafe.jpg`
- `galao.jpg`
- `agua-pequena.jpg`
- `refrigerante-lata.jpg`
- `gasosa.jpg`
- `sumo-pequeno.jpg`

### BOLOS & SALGADOS
- `bolo-caseiro.jpg`
- `bolo-inteiro.jpg`
- `bolo-chocolate.jpg`
- `bolo-chocolate-fatia.jpg`
- `biscoitos.jpg`
- `bolacha-pote.jpg`
- `bola-berlim.jpg`
- `argolas.jpg`
- `pao-chourico.jpg`
- `pasteis.jpg`
- `rissois.jpg`
- `chamussa-pequena.jpg`
- `chamussa-grande.jpg`
- `mini-pizza.jpg`
- `pizza-grande.jpg`

### HAMBURGUERIA
- `hamburguer-simples.jpg`
- `hamburguer-composto.jpg`
- `batata.jpg`
- `cachorro.jpg`
- `cachorro-composto.jpg`
- `faita.jpg`

## ✅ Especificações Recomendadas

- **Formato:** JPG ou WebP (melhor compressão)
- **Dimensões:** 800x800px (quadrado) ou 800x600px (paisagem)
- **Tamanho máximo:** 500KB por imagem
- **Qualidade:** 80-90% (balanço entre qualidade e velocidade)
- **Estilo:** 
  - Fundo branco ou limpo
  - Boa iluminação
  - Produto centralizado
  - Ângulo apetitoso
  
## 🚀 Dicas para Fotos Profissionais

1. **Iluminação Natural**: Fotografe perto de uma janela durante o dia
2. **Fundo Limpo**: Use fundo branco, madeira clara ou superfície neutra
3. **Ângulo**: 45° para alimentos, frontal para bebidas
4. **Contexto**: Pode adicionar elementos decorativos (talheres, guardanapos)
5. **Edição Leve**: Ajuste brilho e contraste se necessário

## 🔄 Atualização Automática

O sistema detecta automaticamente:
- ✅ Se a imagem existe, exibe a foto real
- ❌ Se não existe, exibe o placeholder colorido da categoria

Não precisa reiniciar o servidor após adicionar as imagens!
