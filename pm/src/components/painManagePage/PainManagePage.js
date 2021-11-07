import './PainManagePage.scss'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {useEffect, useState} from 'react'
import ReactEcharts from 'echarts-for-react'
import { AiOutlineSearch } from "react-icons/ai";
import RecordPage from './RecordPage/RecordPage.js'

// import icon  
import icon_clock from '../../asserts/PainManagePage/icon-clock.jpg'
// import data  
import record_data from '../../data/record_data.json'

var showRecord = true;

function PainManagePage() {
  const canvasContent = CanvasInit();
  OnCanvasResize(canvasContent);
  const [recordButtonClassName,setRecordButtonClassName] = useState("record_button show");
  const [footerClassName,setFooterClassName] = useState(" show");
  const [formState, setFormState] = useState("");
  const [record, setRecord] = useState(false);
  const [painPart,setPainPart] = useState("");
  var time_during = "1週";
  var target_data;
  // console.log(document.getElementById('painPart').value)
  const options = {
    grid: { top: 50, right: 18, bottom: 24, left: 48 },
    xAxis: {
      type: 'category',
      // data: ['11/1', '11/2', '11/3', '11/4', '11/5', '11/6', '11/7'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        // data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  const getPainPart = (e) =>{
    var pain_Part = document.getElementById('painPart').value;
    setPainPart(pain_Part); 
    // target_data = record_data[painPart][time_during];
    setPainPart(function(prev){
      target_data = record_data[prev][time_during];
      console.log(target_data);
      return prev;
    });
  }
  function showRecordMenu(state){
    if(state === "record_button"){
      setRecordButtonClassName(state);
    }else
    if(state === " show"){
      if(showRecord === false){
        setRecordButtonClassName(function(prev){
          return prev + state;
        });
        showRecord = true;
        setFooterClassName(" show");
      } else{
        setRecordButtonClassName("record_button");
        setFooterClassName("");
        showRecord = false;
      }
    }else{
      setRecordButtonClassName(function(prev){
        return prev + state;
      });
    }
  }
  function filterButton(e){
    var choiceButton = document.querySelectorAll(".choice button");
    choiceButton.forEach(ele=>{
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
    time_during = e.target.textContent;
    if(painPart != ''){
      target_data = record_data[painPart][time_during];
      console.log(target_data);
    }
  }
  const updateRecordState = (newRecordState) => {
    setRecord(newRecordState);
    if(newRecordState){
      setRecordButtonClassName("record_button hide")
      setFooterClassName("");
      showRecord = false;
    }else{
      setRecordButtonClassName("record_button")
    }
  }
  return (
    <div id="PainCanvas">
      <div className={recordButtonClassName} onClick={()=> updateRecordState(true)}>
        <div className="top">+</div>
        <div className="bottom">紀錄</div>
      </div>
      <footer className={footerClassName}>
        <div className="trigger" onClick={()=> showRecordMenu(" show")}></div>
        <div className="pain_des">
        <div className="first">
          <div className="select">
            <span>最痛部位</span>
            <span className="part">{ painPart }</span>
          </div>
          <div className="selector">
            <select id="painPart" value="none" name="painPart" onChange={getPainPart}>
              <option value="none" defaultValue="selected" disabled hidden></option>
              <option value="左大腿">左大腿</option>
              <option value="右大腿">右大腿</option>
              <option value="左小腿">左小腿</option>
              <option value="右小腿">右小腿</option>
              <option value="左手臂">左手臂</option>
              <option value="右手臂">右手臂</option>
            </select>
          </div>
            <div className="select"><span>疼痛等級</span></div>
        </div>
        <div className="second">
          <div className="title">
            <span><AiOutlineSearch />最近歷史紀錄/查詢</span>
            <span className="right">疼痛強度</span>
          </div>
          <ReactEcharts className={formState} option={options} />
          <div className="choice">
            <button className="active" onClick={filterButton}>1週</button>
            <button onClick={filterButton}>1個月</button>
            <button onClick={filterButton}>3個月</button>
            <button onClick={filterButton}>6個月</button>
            <button onClick={filterButton}>1年</button>
          </div>
        </div>
        <div className="third">
          <div className="block">
            <div className="block_content">
              <img src={icon_clock} alt="" />
            </div>
            <span>日期</span>    
          </div>
          <div className="block">
            <div className="block_content">
              
            </div>
            <span>部位名稱</span>
          </div>
          <div className="block">
            <div className="block_content">
              <img src="clock.jpg" alt="" />
            </div>
            <span>症狀</span>
          </div>
          <div className="block">
            <div className="block_content">
              <img src="clock.jpg" alt="" />   
            </div>
            <span>時間</span>
          </div>
        </div>
        <div className="forth">
          <table>
            <tbody>
              <tr>
                  <td className="td_title">持續時間：</td>
                  <td></td>
              </tr>
              <tr>
                  <td className="td_title">其他描述：</td>
                  <td></td>
              </tr>  
            </tbody>
          </table>
        </div>
        </div>
      </footer>
      <RecordPage record={record} updateRecordState={updateRecordState} />
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
  