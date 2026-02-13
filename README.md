# Neon Abyss Floor

Uma estação orbital cyberpunk abandonada, hackeada por entidades alienígenas e dominada por neon, crypto-hologramas e naves voando no vazio.  
Explore um mapa isométrico infinito (ou quase), clique em elementos para descobrir lores glitchados, miners robôs, portais bio-luminescentes e easter eggs crypto.  
Inspirado no lendário Floor796, mas com a minha cara: Grimes vibes + cyberpunk BR + alien art + crypto chaos.

<p align="center">
  <img src="https://via.placeholder.com/800x450/0a001f/00ffff?text=Neon+Abyss+Floor+(em+desenvolvimento)" alt="Screenshot do mapa isométrico neon" width="800"/>
  <!-- Troca por GIF real depois: <img src="./assets/demo.gif" alt="Demo" width="800"/> -->
</p>

## Features (MVP atual)

- Mapa isométrico 2D scrollável e zoomável (mouse drag + wheel)
- Prédios neon com glow e animação de piscar (GlowFilter do PixiJS)
- Grid procedural simples para sensação de "abismo infinito"
- Tema cyberpunk dark: neon teal/pink/purple + background void
- Pan e zoom suave (com Zustand para state da câmera)
- Responsivo + touch support (mobile ok)
- Preparado para PWA (instala e roda offline)

## Roadmap (o que vem por aí)

- Partículas de chuva neon + hologramas glitch
- Naves/drones voando no background
- Popups interativos com lore (clique → modal com meme/crypto/alien story)
- Minimap + hotspots tooltips
- Editor básico in-browser (arrastar sprites)
- Som ambiente + SFX (Howler.js)
- Procedural generation leve para rooms infinitos
- Quest mode: encontre 10 easter eggs crypto

## Tech Stack

- **Frontend**: Vite + TypeScript
- **Render**: PixiJS v8 (canvas performático, filters glow/CRT)
- **State**: Zustand (leve e simples)
- **Extras**: @pixi/filter-glow, @pixi/filter-pixelate (pra vibe retro-futurista)
- **Deploy**: Vercel / GitHub Pages (demo ao vivo em breve)

## Demo Ao Vivo

🔗 [https://neon-abyss-floor.vercel.app](https://neon-abyss-floor.vercel.app) (atualiza quando deployar)

## Como Rodar Localmente

```bash
# Clone o repo
git clone https://github.com/SEU_USER/neon-abyss-floor.git
cd neon-abyss-floor

# Instala dependências
npm install

# Roda em dev (http://localhost:5173)
npm run dev

# Build pra produção
npm run build
