/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */
 
var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)
 
 function mod(n, m) {
        return ((n % m) + m) % m;
}
	
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

			var lights = [];
			lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 1 ] = new THREE.PointLight( 0xff00ff, 1, 0 );
			lights[ 2 ] = new THREE.PointLight( 0x00ffff, 1, 0 );

			lights[ 0 ].position.set( 0,  101,  50 );
			//lights[ 1 ].position.set( 10,  10, -10 );
			lights[ 2 ].position.set( 10, -10,  100 );

			scene.add( lights[ 0 ] );
			scene.add( lights[ 1 ] );
			scene.add( lights[ 2 ] );


var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshStandardMaterial( { color: 0xAAAAAA } );

var shapes = [];	

for(var i = 0; i < 4096; i++){

	//if(mod(i,3) == 0 || mod(i,5) == 0){
	
		if(mod(i, 6) > 2  && mod(i, 7) > 1){// && mod(i, )){
	
		var geometry = new THREE.BoxGeometry( Math.sin(i/3) * 1 +1.6 + i/20, Math.sin(i/2) * 3 +1.6 + i/20, Math.sin(i/13) * mod(i, 14) +1 + Math.cos(i/5) * mod(i, 7)+ i / 8);

		shapes[i] =  new THREE.Mesh( geometry, material );

		shapes[i].position.set((mod(i,64)-32) * 3 + i/16,(Math.floor(i/64)-32) * 3 + i /16,0)
		scene.add( shapes[i] );
		}
	//}

}
	
//shape.position.set(5,5,-5)
//scene.add( shape );


camera.position.z = 50;

var controls = new OrbitControls( camera );

var count = 0

function animate() {
	requestAnimationFrame( animate );

	//shape.rotation.x += 0.01;
	//shape.rotation.y += 0.01;
	
	count++
	
	//geometry = new THREE.TorusKnotGeometry( 10, count + 1, mod(count / 80, 300), 16 );
	//shape = new THREE.Mesh( geometry, material );
	//scene.add( shape );
	
	for(var i = 0; i < 4096; i++){

		if(mod(i, 6) > 2  && mod(i, 7) > 1){
	
			shapes[i].translateY(Math.cos(count/9.1) * Math.sin(i) * Math.sin(i/3) * .8)
			shapes[i].translateZ(Math.cos(count/11.2) * Math.sin(i)  * Math.sin(i/5) * .8)
			shapes[i].translateX(Math.cos(count/7.4) * Math.cos(i)  * Math.sin(i/2) * .8)
	
			//shapes[i].rotation.y += Math.sin(i * count) / 300
	
		/*
		if(mod(i,9) == 0){

			shapes[i].rotation.y += 0.05
			shapes[i].rotation.x += 0.015
		
			shapes[i].translateX(Math.sin(count/10) * .05)
			shapes[i].translateY(Math.cos(count/7) * .05)

		}
		
		if(mod(i,11) == 0){
		
			shapes[i].rotation.x += 0.06
			shapes[i].rotation.y += 0.01

			shapes[i].translateY(Math.cos(count/13) * .05)
			shapes[i].translateZ(Math.cos(count/10) * .05)

		}
		
		if(mod(i,7) == 0){
		
			shapes[i].rotation.x += 0.03
			shapes[i].rotation.y += 0.02

			shapes[i].translateX(Math.cos(count/3) * .05)
			shapes[i].translateZ(Math.cos(count/5) * .05)

		}
		
		if(mod(i,8) == 0){

			shapes[i].rotation.y += 0.04
			shapes[i].rotation.x += 0.005
		
			shapes[i].translateY(Math.cos(count/9) * .05)
			shapes[i].translateZ(Math.cos(count/11) * .05)

		}*/
		}
		
	}
	
	controls.update();
	
	//lights[ 2 ].position.set( Math.sin(count / 10)* 20, Math.sin(count / 9)*  - 20 ,  Math.sin(count / 11)* 20 );
	lights[ 1 ].position.set( Math.sin(count / 130)* - 20, Math.sin(count / 70)*   20 ,  Math.sin(count / 100)* 20 );
	
	renderer.render( scene, camera );
}
animate();
 
 /*
import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import SeedScene from './objects/Scene.js';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(6,3,-10);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );
*/


