import { FAmbientLight, FComponentEmpty, FCuboid, FDirectionalLight, FOrbitCamera, FRigidBodyType, FScene } from '@fibbojs/3d'
import { fDebug } from '@fibbojs/devtools'
import './style.css'
import { CustomController } from '../../src'

(async () => {
  // Initialize the scene
  const scene = new FScene({
    shadows: true,
  })
  scene.init()
  await scene.initPhysics()
  // Debug the scene
  if (import.meta.env.DEV)
    fDebug(scene)

  // Add directional light to represent the sun
  new FDirectionalLight({
    position: { x: 20, y: 20, z: 0 },
    color: 0xFFFFFF,
    intensity: 3,
    shadowQuality: 12
  })
  // Add ambient light
  new FAmbientLight({
    color: 0x404040,
    intensity: 20,
  })

  // Create a ground
  const ground = new FCuboid({
    position: { x: 0, y: -0.1, z: 0 },
    scale: { x: 15, y: 0.1, z: 15 },
    color: 0x348C31,
  })
  ground.initRigidBody({
    rigidBodyType: FRigidBodyType.FIXED,
  })
  scene.addComponent(ground)

  // Create a cube
  const cube = new FCuboid({
    position: { x: 0, y: 1, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
  })
  cube.initRigidBody({
    rigidBodyType: FRigidBodyType.FIXED,
  })
  cube.addController(new CustomController({ component: cube }))
  scene.addComponent(cube)

  // Add orbital camera controls
  scene.camera = new FOrbitCamera({
    target: new FComponentEmpty(),
  })
})()
