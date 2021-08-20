import './PainManagePage.scss'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {useEffect} from 'react'

function PainManagePage() {
  useEffect(()=>{
    const scene = new THREE.Scene();
    const camera = new  THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const canvas = document.getElementById("PainCanvas");
    renderer.setSize(canvas.clientWidth*0.75, canvas.clientHeight);
    canvas.appendChild(renderer.domElement)
    camera.position.set(0, 0, 10)
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    scene.add(directionalLight)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const loader = new GLTFLoader();
    loader.load(
      'male_body_base_mesh/scene.gltf',
      function(gltf){
        scene.add(gltf.scene);
      }
    )

    var animate = function () {
      requestAnimationFrame( animate );

      controls.update();

      directionalLight.position.set(camera.position.x, camera.position.y, camera.position.z);

      renderer.render( scene, camera );
    };
    animate();
  }, []);

  return (
    <div id="PainCanvas">
      <div className="recordOperator">
        <h2>疼痛紀錄功能選單</h2>
      </div>
    </div>
  );
}


export default PainManagePage;
  