import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading

const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/normal_map.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture

material.color = new THREE.Color(0xEAE9E5)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const ligth1 = gui.addFolder('Light 1')

const redLight = new THREE.PointLight(0xff0000, 10)
redLight.position.set(-1.86, 1, -1.65)
scene.add(redLight)

ligth1.add(redLight.position, 'z').min(-3).max(3).step(0.01)
ligth1.add(redLight.position, 'y').min(-3).max(3).step(0.01)
ligth1.add(redLight.position, 'x').min(-3).max(3).step(0.01)
ligth1.add(redLight, 'intensity').min(-3).max(3).step(0.01)

const ligth2 = gui.addFolder('Light 2')

const blueLight = new THREE.PointLight(0x0000ff, 10)
blueLight.position.set(1.86, 1, -1.65)
scene.add(blueLight)

ligth2.add(blueLight.position, 'z').min(-3).max(3).step(0.01)
ligth2.add(blueLight.position, 'y').min(-3).max(3).step(0.01)
ligth2.add(blueLight.position, 'x').min(-3).max(3).step(0.01)
ligth2.add(blueLight, 'intensity').min(-3).max(3).step(0.01)

const light2Color = {
    color: 0xff0000
}

ligth2.addColor(light2Color, 'color').onChange(() => {
    blueLight.color.set(light2Color.color)
})


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(e) {
    mouseX = e.clientX - windowHalfX
    mouseY = e.clientY - windowHalfY
}


function updateSphere(e) {
    sphere.position.y = window.screenY * .001
}

window.addEventListener('scroll', updateSphere)



const clock = new THREE.Clock()

const tick = () => {

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
