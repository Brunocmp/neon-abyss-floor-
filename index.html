import * as PIXI from 'pixi.js'
import { GlowFilter } from '@pixi/filter-glow'

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x0f0f0f,
  antialias: true
})

document.body.appendChild(app.view as HTMLCanvasElement)

// ================= CONTAINERS =================
const world = new PIXI.Container()
app.stage.addChild(world)

const rainLayer = new PIXI.Container()
world.addChild(rainLayer)

// ================= SHIP =================
const ship = new PIXI.Graphics()
ship.beginFill(0x00ffff)
ship.drawPolygon([
  -20, 0,
  20, -15,
  20, 15
])
ship.endFill()

ship.x = app.screen.width / 2
ship.y = app.screen.height / 2

// Glow na nave
ship.filters = [
  new GlowFilter({
    distance: 15,
    outerStrength: 3,
    innerStrength: 1,
    color: 0x00ffff,
    quality: 0.5
  })
]

world.addChild(ship)

// ================= MOVEMENT =================
const keys: Record<string, boolean> = {}

window.addEventListener('keydown', (e) => keys[e.key] = true)
window.addEventListener('keyup', (e) => keys[e.key] = false)

const speed = 5

// ================= RAIN (MULTI LAYER) =================
const rainDrops: PIXI.Graphics[] = []

function createRainLayer(count:number, speedMin:number, speedMax:number, width:number, height:number, alpha:number){

  for(let i=0;i<count;i++){

    const drop = new PIXI.Graphics()
    drop.beginFill(0x00ffff, alpha)
    drop.drawRect(0,0,width,height)
    drop.endFill()

    drop.x = Math.random() * app.screen.width
    drop.y = Math.random() * app.screen.height
    ;(drop as any).speed = Math.random() * (speedMax - speedMin) + speedMin

    // Glow leve na chuva
    drop.filters = [
      new GlowFilter({
        distance: 6,
        outerStrength: 2,
        innerStrength: 0,
        color: 0x00ffff,
        quality: 0.3
      })
    ]

    rainLayer.addChild(drop)
    rainDrops.push(drop)
  }
}

// Longe
createRainLayer(120, 1, 2, 1, 8, 0.3)

// Médio
createRainLayer(80, 2, 4, 2, 10, 0.6)

// Próximo
createRainLayer(50, 4, 7, 2, 14, 0.9)

// ================= GAME LOOP =================
app.ticker.add((delta) => {

  // Movimento normal (não diagonal)
  if(keys['ArrowUp']) ship.y -= speed
  if(keys['ArrowDown']) ship.y += speed
  if(keys['ArrowLeft']) ship.x -= speed
  if(keys['ArrowRight']) ship.x += speed

  // Atualiza chuva
  rainDrops.forEach(d=>{
    ;(d as any).y += (d as any).speed * delta

    if((d as any).y > app.screen.height){
      d.y = -20
      d.x = Math.random() * app.screen.width
    }
  })

})
