var scene;
var renderer;
var camera;
var controls;
var container;
var clock;

var WIDTH = 1024;
var HEIGHT = 768;

function setupScene() {
    container = $('#container');

    renderer = new THREE.WebGLRenderer();
    
    scene = new THREE.Scene();

    renderer.setSize(WIDTH, HEIGHT);
    
    clock = new THREE.Clock();

    container.append(renderer.domElement);
}

function addLights() {    
    var ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    var dl = new THREE.DirectionalLight(0x666060);
    dl.position.set(0, -45, 0).normalize();
    scene.add(dl);
    
    dl = new THREE.DirectionalLight(0x606666);
    dl.position.set(180, 45, 0).normalize();
    scene.add(dl);
    
    dl = new THREE.DirectionalLight(0x606060);
    dl.position.set(90, -45, 0).normalize();
    scene.add(dl);
    
    dl = new THREE.DirectionalLight(0x626262);
    dl.position.set(-90, 45, 0).normalize();
    scene.add(dl);
}

function addCamera() {
    var VIEW_ANGLE = 45;
    var ASPECT = WIDTH / HEIGHT;
    var NEAR = 0.1;
    var FAR = 10000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.z = 300;
    scene.add(camera);
}

function addControls() {
    controls = new THREE.FirstPersonControls( camera );
    controls.movementSpeed = 500;
    controls.domElement = container;
}

function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    controls.update(delta);
    renderer.render( scene, camera );
}

function duckLoaded( geometry ) {
    var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( "models/duck/duck.jpg" ) } );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.scale.set(100, 100, 100);
    scene.add(mesh);
}

function init() {
    setupScene();
    addLights();
    addCamera();
    addControls();
    
    /*var loader = new THREE.ColladaLoader();
    
    loader.load(
            'http://open3dhub.com/download/ccb5e214fc44f8b5985456d4496f6086d8b799bc7963ba6b9b788194bf6c710b/GibsonGuitar.dae',
            //'http://open3dhub.com/download/c7d6bae9872dc9730e7343eb36b02d21a4f1861522ed137f14d03712ddf970cf/COLLADA.dae',
            //'http://open3dhub.com/download/6cf8a48175ef3fb8e4a3cd4cb066164d3f9606a9f60a4db6249ddbec53ecb24d/multimtl.dae',
            //'http://open3dhub.com/download/8bbe77a45c6125a9aa465258679463bbba89755cb2826f5524563bf00f9a1c08/cube_triangulate.dae',
            function colladaReady( collada ) {
        dae = collada.scene;
        dae.scale = new THREE.Vector3(0.5, 0.5, 0.5);
        scene.add(dae);
    });*/
    
    var loader = new THREE.UTF8Loader();
    
    loader.load('models/duck/duck.utf8', duckLoaded,
      { offsets: [-0.000000,-0.000000,-0.000000,-0.001953,-0.001465,1.000000,1.000000,1.000000],
        scales: [1000.000000,1000.000000,1000.000000,0.995117,0.997559,2.000000,2.000000,2.000000],
        bits: [14,14,14,10,10,10,10,10] }
    );
    
    animate();
}

$(document).ready(init);
