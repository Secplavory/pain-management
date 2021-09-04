import './PainManagePage.scss'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {useEffect, useState} from 'react'

var showRecord = false;

function PainManagePage() {
  const canvasContent = CanvasInit();
  OnCanvasResize(canvasContent);
  const [recordClassName,setRecordClassName] = useState("record");
  const [footerClassName,setFooterClassName] = useState("");
  function showRecordMenu(){
    if(showRecord == false){
      setRecordClassName("record show");
      setFooterClassName(" show");
      showRecord = true;
    }else{
      setRecordClassName("record");
      setFooterClassName("");
      showRecord = false;
    }
  }
  return (
    <div id="PainCanvas">
      <div className={recordClassName}>
        <div className="top">+</div>
        <div className="bottom">紀錄</div>
      </div>
      <footer className={footerClassName}>
        <div className="trigger" onClick={showRecordMenu}></div>
      </footer>
    </div>
  );
}

function CanvasInit(){
  const [canvasContent, setCanvasContent] = useState({
    scene: undefined,
    camera: undefined,
    renderer: undefined,
    canvas: undefined,
    directionalLight: undefined,
    controls: undefined
  });
  useEffect(()=>{
    const canvas = document.getElementById("PainCanvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor('white', 0.3);
    canvas.appendChild(renderer.domElement);
    camera.position.set(3,2,5);
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
    scene.add(directionalLight)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.update();

    const loader = new GLTFLoader();
    var body;
    loader.load(
      'male_body_base_mesh/scene.gltf',
      function(gltf){
        body = gltf.scene;
        body.position.set(0, 1.2, 0);
        body.name = "body";
        scene.add(body);
      }
    )
    var animate = function () {
      requestAnimationFrame( animate );

      controls.update();

      directionalLight.position.set(camera.position.x, camera.position.y, camera.position.z);

      renderer.render( scene, camera );
    };
    animate();
    setCanvasContent({
      scene: scene,
      camera: camera,
      renderer: renderer,
      canvas: canvas,
      directionalLight: directionalLight,
      controls: controls
    });
  }, []);

  return canvasContent;
}
function OnCanvasResize(canvasContent){
  const renderer = canvasContent.renderer;
  const canvas = canvasContent.canvas;
  const camera = canvasContent.camera;
  useEffect(()=>{
    function handleResize(){
      if(renderer !== undefined && canvas !== undefined && camera !== undefined){
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      }
    }
    window.addEventListener("resize", handleResize);
  }, [renderer, canvas, camera]);
}


export default PainManagePage;
  