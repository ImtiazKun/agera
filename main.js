let scene, camera, renderer, controls;

function init() {
  // * Setting Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );

  const loader = new THREE.FBXLoader();

  // * renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

  // BOX
  //   const geometry = new THREE.BoxGeometry(2, 2, 2);
  //   //   const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  //   const texture = new THREE.TextureLoader().load("crate.gif");
  //   const material = new THREE.MeshBasicMaterial({ map: texture });
  //   cube = new THREE.Mesh(geometry, material);

  //   scene.add(cube);


  // * Model
  loader.load(
    "car.fbx",
    function (obj) {
      obj.scale.set(0.3, 0.3, 0.3)
      obj.position.set(0, -500, -1000)
      scene.add(obj);
    },
    function ( xhr ) {
      document.querySelector('.loading').style.width = `${( xhr.loaded / xhr.total * 100 )}%`
      document.querySelector('.loading').style.backgroundColor = `#06cf1d`
	  },
    function (error) {
      console.error(error);
    }
  );

  // * Light
  const light = new THREE.DirectionalLight(0xffffff, 10)
  light.position.set(2, 2, 5)
  scene.add(light)

  // * Positioned Camera before the scene
  camera.position.z = 500;
  controls.update();
}

// On Resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Rendering the CUBE
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);

// init
init();
//  Calling animate function
animate();
