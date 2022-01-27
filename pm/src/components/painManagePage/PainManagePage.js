import './PainManagePage.scss'
import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {useEffect, useState, useRef} from 'react'
import ReactEcharts from 'echarts-for-react'
import { AiOutlineSearch } from "react-icons/ai";
import RecordPage from './RecordPage/RecordPage.js'
import ExportPage from './ExportPage/ExportPage.js'

// import icon  
import icon_clock from '../../asserts/PainManagePage/icon-clock.jpg'
// import data  
import record_data from '../../data/record_data.json'


var showRecord = true;
var canvasContent;

function PainManagePage() {
  canvasContent = CanvasInit();
  OnCanvasResize(canvasContent);
  const [recordButtonClassName,setRecordButtonClassName] = useState("record_button show");
  const [exportButtonClassName,setExportButtonClassName] = useState("export_button show");
  const [footerClassName,setFooterClassName] = useState(" show");
  // const [formState, setFormState] = useState("");
  const [record, setRecord] = useState(false);
  const [painPart,setPainPart] = useState("部位名稱");
  const [painLevel,setPainLevel] = useState();
  const [painDate,setPainDate] = useState("日期");
  const [painKind,setPainKind] = useState("症狀");
  const [painTime,setPainTime] = useState("時間");
  const [painContinue,setPainContinue] = useState(" ");
  const [painOther,setPainOther] = useState(" ");
  const [exportPageClassName,setExportPageClassName] = useState("");

  const changeExportPageClassName = (state)=>{
    setExportPageClassName(state);
  };
  const chart = useRef(null);
  var time_during = "1週";
  var target_data;

  const options = {
    grid: { top: 50, right: 18, bottom: 24, left: 48 },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  const options2 = {
    grid: { top: 50, right: 18, bottom: 24, left: 48 },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  const resetChartData = (e) =>{

    if (chart && chart.current) {
      options2.series[0].data = target_data['疼痛等級'];
      options2.xAxis.data = target_data['日期'];
      chart.current.getEchartsInstance().dispose();
      chart.current.getEchartsInstance().setOption(options2);
      chart.current.getEchartsInstance().on('click', function (params) {
        setPainDetail(target_data[params.name])
      });
    }
  }
  const setPainDetail = (data) =>{
    console.log(data)
    setPainLevel(data['疼痛等級'])
    setPainDate(data['時間'])
    setPainKind(data['性質'])
    setPainTime(data['時段'])
    setPainContinue(data['持續時間'])
    setPainOther(data['其他描述'])
  }
  const initPainDetail = () =>{
    setPainLevel()
    setPainDate("日期")
    setPainKind("症狀")
    setPainTime("時間")
    setPainContinue("  ")
    setPainOther("  ")
  }
  const getPainPart = (e) =>{
    var pain_Part = document.getElementById('painPart').value;
    setPainPart(pain_Part);
    setPainPart(function(prev){
      target_data = record_data[prev][time_during];
      resetChartData();
      initPainDetail();
      return prev;
    });
    setCamera(pain_Part)
  }
  function setCamera(pain_Part){
    const setPosition = (camera, body) => {
      canvasContent.camera.position.set(camera.x, camera.y, camera.z)
      canvasContent.scene.getObjectByName("body").position.set(
        body.x, body.y, body.z
      )
    }
    switch(pain_Part){
      case '下顎':
        setPosition({x:0,y:1,z:3}, {x:0,y:-0.1,z:0})
        break
      case '肩胛骨':
        setPosition({x:0,y:3,z:3})
        break
      case '肩膀':
        setPosition({x:0,y:3,z:3})
        break
      default:
        setPosition({x:0,y:3,z:3})
        break
    }
    
  }
  function showRecordMenu(state){
    if(state === "record_button"){
      setRecordButtonClassName(state);
      setExportButtonClassName("export_button");
    }else
    if(state === " show"){
      if(showRecord === false){
        setRecordButtonClassName(function(prev){
          return prev + state;
        });
        setExportButtonClassName(function(prev){
          return prev + state;
        });
        showRecord = true;
        setFooterClassName(" show");
      } else{
        setRecordButtonClassName("record_button");
        setExportButtonClassName("export_button");
        setFooterClassName("");
        showRecord = false;
      }
    }else{
      setRecordButtonClassName(function(prev){
        return prev + state;
      });
      setExportButtonClassName(function(prev){
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
    if(painPart !== '部位名稱'){
      target_data = record_data[painPart][time_during];
      resetChartData();
      initPainDetail();
    }
  }
  const updateRecordState = (newRecordState) => {
    setRecord(newRecordState);
    if(newRecordState){
      setRecordButtonClassName("record_button hide")
      
      setExportButtonClassName("export_button hide");
      setFooterClassName("");
      showRecord = false;
    }else{
      setRecordButtonClassName("record_button")
      setExportButtonClassName("export_button");
    }
  }
  return (
    <div id="PainCanvas">
      <div className={exportButtonClassName} onClick={()=> changeExportPageClassName("show") } >
        <div className="top">-</div>
        <div className="bottom">匯出</div>
      </div>
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
              <option value="下顎">下顎</option>
              <option value="肩胛骨">肩胛骨</option>
              <option value="肩膀">肩膀</option>
              <option value="胸部">胸部</option>
              <option value="右手肘">右手肘</option>
              <option value="右手腕">右手腕</option>
              <option value="右手">右手</option>
              <option value="左手肘">左手肘</option>
              <option value="左手腕">左手腕</option>
              <option value="左手">左手</option>
              <option value="右臀">右臀</option>
              <option value="左臀">左臀</option>
              <option value="右膝">右膝</option>
              <option value="左膝">左膝</option>
              <option value="右踝">右踝</option>
              <option value="左踝">左踝</option>
              <option value="右腳跟">右腳跟</option>
              <option value="左腳跟">左腳跟</option>
              <option value="右腳">右腳</option>
              <option value="左腳">左腳</option>
            </select>
          </div>
            <div className="select">
              <span>疼痛等級</span>
              <h1 className="level">{ painLevel }</h1>
            </div>
        </div>
        <div className="second">
          <div className="title">
            <span><AiOutlineSearch />最近歷史紀錄/查詢</span>
            <span className="right">疼痛強度</span>
          </div>
          {/* <ReactEcharts className={formState} option={options} ref={chart} /> */}
          <ReactEcharts option={options} ref={chart} />
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
            <span>{ painDate }</span>    
          </div>
          <div className="block">
            <div className="block_content">
              
            </div>
            <span>{ painPart }</span>
          </div>
          <div className="block">
            <div className="block_content">
              <img src="clock.jpg" alt="" />
            </div>
            <span>{ painKind }</span>
          </div>
          <div className="block">
            <div className="block_content">
              <img src="clock.jpg" alt="" />   
            </div>
            <span>{ painTime }</span>
          </div>
        </div>
        <div className="forth">
          <table>
            <tbody>
              <tr>
                  <td className="td_title">持續時間：</td>
                  <td>{ painContinue }</td>
              </tr>
              <tr>
                  <td className="td_title">其他描述：</td>
                  <td>{ painOther }</td>
              </tr>  
            </tbody>
          </table>
        </div>
        </div>
      </footer>
      <ExportPage class={ exportPageClassName } setExportPageClassName={ changeExportPageClassName } />
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
  