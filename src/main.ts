import * as PIXI from 'pixi.js'
import { GlowFilter } from '@pixi/filter-glow'

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x0a0a0f,
  antialias: true
})

document.body.appendChild(app.view as HTMLCanvasElement)

// ================= CONTAINERS =================
const world = new PIXI.Container()
app.stage.addChild(world)

const cityLayer = new PIXI.Container()
world.addChild(cityLayer)

const rainLayer = new PIXI.Container()
world.addChild(rainLayer)

// ================= CITY =================
const buildings: PIXI.Graphics[] = []

function createCity(){

  const buildingWidth = 60
  const spacing = 20
  const total = Math.ceil(app.screen.width / (buildingWidth + spacing)) + 2

  for(let i = 0; i < total; i++){

    const height = 150 + Math.random() * 200

    const building = new PIXI.Graphics()
    building.beginFill(0x111122)
    building.drawRect(0, 0, buildingWidth, height)
    building.endFill()

    building.x = i * (buildingWidth + spacing)
    building.y = app.screen.height - height

    // Glow sutil no contorno
    building.filters = [
      new GlowFilter({
        distance: 10,
        outerStrength: 1,
        innerStrength: 0,
        color: 0xff00ff,
        quality: 0.3
      })
    ]

    cityLayer.addChild(building)
    buildings.push(building)

    // Janelas
    for(let y = 10; y < height - 10; y += 20){
      for(let x = 10; x < buildingWidth - 10; x += 15){

        if(Math.random() > 0.5){
          const windowLight = new PIXI.Graphics()
          windowLight.beginFill(0x00ffff, Math.random())
          windowLight.drawRect(0,0,6,10)
          windowLight.endFill()

          windowLight.x = building.x + x
          windowLight.y = building.y + y

          cityLayer.addChild(windowLight)
        }
      }
    }
  }
}

createCity()

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

// ================= RAIN =================
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

    rainLayer.addChild(drop)
    rainDrops.push(drop)
  }
}

createRainLayer(120, 1, 2, 1, 8, 0.3)
createRainLayer(80, 2, 4, 2, 10, 0.6)
createRainLayer(50, 4, 7, 2, 14, 0.9)

// ================= GAME LOOP =================
app.ticker.add((delta) => {

  if(keys['ArrowUp']) ship.y -= speed
  if(keys['ArrowDown']) ship.y += speed
  if(keys['ArrowLeft']) ship.x -= speed
  if(keys['ArrowRight']) ship.x += speed

  rainDrops.forEach(d=>{
    ;(d as any).y += (d as any).speed * delta

    if((d as any).y > app.screen.height){
      d.y = -20
      d.x = Math.random() * app.screen.width
    }
  })

})
