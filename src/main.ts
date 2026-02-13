import * as PIXI from 'pixi.js';
import { create } from 'zustand';
import { GlowFilter } from 'pixi-filters/glow';

interface CameraState {
  x: number;
  y: number;
  zoom: number;
  setPosition: (x: number, y: number) => void;
  setZoom: (zoom: number) => void;
}

const useCamera = create<CameraState>((set) => ({
  x: 0,
  y: 0,
  zoom: 1,
  setPosition: (x, y) => set({ x, y }),
  setZoom: (zoom) => set({ zoom: Math.max(0.5, Math.min(3, zoom)) }),
}));

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x0a001f,
  resizeTo: window,
  antialias: true,
});

document.body.appendChild(app.view as HTMLCanvasElement);

const mapContainer = new PIXI.Container();
app.stage.addChild(mapContainer);

function cartToIso(x: number, y: number, tileWidth = 64, tileHeight = 32) {
  return {
    x: (x - y) * tileWidth / 2,
    y: (x + y) * tileHeight / 2,
  };
}

function createNeonBuilding(x: number, y: number) {
  const isoPos = cartToIso(x, y);
  const building = new PIXI.Graphics();
  building.beginFill(0x1a0033);
  building.drawRect(-32, -96, 64, 128);
  building.endFill();

  const neon = new PIXI.Graphics();
  neon.lineStyle(4, 0x00ffff, 0.8);
  neon.drawRect(-30, -94, 60, 124);
  building.addChild(neon);

  const glowFilter = new GlowFilter({
    distance: 15,
    outerStrength: 2,
    color: 0x00ffff,
    quality: 0.1,
  });
  building.filters = [glowFilter];

  app.ticker.add(() => {
    neon.alpha = 0.8 + Math.sin(app.ticker.lastTime * 0.005) * 0.2;
  });

  building.position.set(isoPos.x + app.screen.width / 2, isoPos.y + app.screen.height / 2 - 200);
  mapContainer.addChild(building);
  return building;
}

for (let ix = -5; ix <= 5; ix++) {
  for (let iy = -5; iy <= 5; iy++) {
    if (Math.abs(ix) + Math.abs(iy) < 8) {
      createNeonBuilding(ix, iy);
    }
  }
}

let isDragging = false;
let lastMouse = { x: 0, y: 0 };

app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;

app.stage.on('pointerdown', (e) => {
  isDragging = true;
  lastMouse = { x: e.global.x, y: e.global.y };
});

app.stage.on('pointermove', (e) => {
  if (isDragging) {
    const dx = e.global.x - lastMouse.x;
    const dy = e.global.y - lastMouse.y;
    useCamera.getState().setPosition(
      useCamera.getState().x - dx / useCamera.getState().zoom,
      useCamera.getState().y - dy / useCamera.getState().zoom
    );
    lastMouse = { x: e.global.x, y: e.global.y };
  }
});

app.stage.on('pointerup', () => { isDragging = false; });
app.stage.on('pointerupoutside', () => { isDragging = false; });

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  useCamera.getState().setZoom(useCamera.getState().zoom + delta);
});

app.ticker.add(() => {
  const { x, y, zoom } = useCamera.getState();
  mapContainer.position.set(-x * zoom + app.screen.width / 2, -y * zoom + app.screen.height / 2);
  mapContainer.scale.set(zoom);
});

window.addEventListener('resize', () => app.renderer.resize(window.innerWidth, window.innerHeight));
