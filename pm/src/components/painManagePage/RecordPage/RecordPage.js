import './RecordPage.scss'
import {useState} from 'react'

// import icon
import pain_level from '../../../asserts/PainManagePage/pain_level.jpg'
import hot_pain from '../../../asserts/PainManagePage/hot_pain.jpg'
import paralysis_pain from '../../../asserts/PainManagePage/paralysis_pain.jpg'
import cut_pain from '../../../asserts/PainManagePage/cut_pain.jpg'
import stuffy_pain from '../../../asserts/PainManagePage/stuffy_pain.jpg'
import throbbing_pain from '../../../asserts/PainManagePage/throbbing_pain.jpg'
import tingling_pain from '../../../asserts/PainManagePage/tingling_pain.jpg'
import record_img from '../../../asserts/PainManagePage/record.jpg'
import record_unactive from '../../../asserts/PainManagePage/record_unactive.jpg'
import record_active from '../../../asserts/PainManagePage/record_active.jpg'
import icon_clock from '../../../asserts/PainManagePage/icon-clock.jpg'

function RecordPage(props) {
  const [recordClassName,setRecordClassName] = useState("record");
  const [painLevel,setPainLevel] = useState();
  const [painTime,setPainTime] = useState();

  const updatePainTime = (time)=>{
    var update_y = time.slice(0,4);
    var update_m = time.slice(5,7);
    var update_d = time.slice(8,10);
    var update_h = time.slice(11,13);
    var update_mm = time.slice(14,16);
    var updateTime = update_y + " " + update_m + "/" + update_d + "　" + update_h + "：" + update_mm;
    setPainTime(updateTime)
  }
  const setNowDate = ()=>{
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().length === 1 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1;
    var date = now.getDate().toString().length === 1 ? '0' + (now.getDate()).toString() : now.getDate();
    var hours = now.getHours().toString().length === 1 ? '0' + now.getHours().toString() : now.getHours();
    var minutes = now.getMinutes().toString().length === 1 ? '0' + now.getMinutes().toString() : now.getMinutes();
    var formattedDateTime = year + '-' + month + '-' + date + 'T' + hours + ':' + minutes;
    document.getElementById('pain_time_picker').value = formattedDateTime;
    updatePainTime(formattedDateTime)
  }
  const controlRecord = (state)=>{
    // props.updateRecordState(false);
    if(state === ' show'){
      setRecordClassName(function(prev){
        return prev + state;
      });
      setNowDate();
    }else{
      props.updateRecordState(false);
      setRecordClassName('record');
    }

  }
  const painLevelBar = (e)=>{
    var pain_level_value = Math.round(e.target.value/10);
    setPainLevel(pain_level_value);
    e.target.value = pain_level_value * 10;
  }
  return (
    <div id="record_page" className={props.record ? 'show' : ''}>
      <div id="selection">
        <div className="first">
          <div className="select">
            <span>最痛部位</span>
            <span className="part">右大腿</span>
          </div>
          <div className="select">
            <span>疼痛等級</span>
          </div>
        </div>
        <div className="group_buttons">
          <button onClick={()=>controlRecord(" show")}>確認</button>
          <button onClick={props.updateRecordState.bind(this, false)}>取消</button>
        </div>
      </div>
      <div className={recordClassName}>
        <div className="first">
          <div className="select">
            <span>最痛部位</span>
            <span className="part">右大腿</span>
          </div>
          <div className="select">
            <span>疼痛等級</span>
            <h1 className="level">{ painLevel }</h1>
          </div>
        </div>
        <div className="pain_level">
          <div className="level_bar">
            <input type="range" className="slider" id="level_bar" onChange={painLevelBar} />
            <img src={pain_level} alt=""></img>
          </div>
          <div className="level_text">
            <span>完全不痛</span>
            <span>極度疼痛</span>
          </div>
        </div>
        <div className="pain_nature">
          <div className="title">疼痛性質<span>( 請點選您的疼痛感覺 )</span></div>
          <div className="nature_list">
            <div className="nature_row">
              <div className="nature">
                <img src={ hot_pain } alt="" />
                <h2 className="nature_name">灼熱痛</h2>
              </div>
              <div className="nature">
                <img src={ paralysis_pain } alt="" />
                <h2 className="nature_name">麻痛</h2>
              </div>
              <div className="nature">
                <img src={ cut_pain } alt="" />
                <h2 className="nature_name">刀割痛</h2>
              </div>
              <div className="nature">
                <img src={ stuffy_pain } alt="" />
                <h2 className="nature_name">悶痛</h2>
              </div>
            </div>
            <div className="nature_row">
              <div className="nature">
                <img src={ throbbing_pain } alt="" />
                <h2 className="nature_name">灼熱痛</h2>
              </div>
              <div className="nature">
                <img src={ tingling_pain } alt="" />
                <h2 className="nature_name">麻痛</h2>
              </div>
              <div className="other">
                <div className="active_record">
                  <img src={ record_img } alt="" />
                  <h2 className="nature_name">其他疼痛</h2>
                </div>
                <div>
                  <img src={ record_unactive } alt="" />
                  <h2 className="nature_name">語音紀錄</h2>
                </div>
              </div>
            </div>           
          </div>
        </div>
        <div className="pain_time">
          <div className="title">疼痛時間<span>( 請點選您的疼痛時間點 )</span></div>
          <div className="time">
            <div className="time_picker">
              <div className="clock"><img src={icon_clock} alt=""></img></div>
              <span id="pain_time_show">{ painTime }</span>
              <input type="datetime-local" id="pain_time_picker" onChange={(e)=>updatePainTime(e.target.value)}></input> 
            </div>
            <div className="continued">
              <h1>持續多久</h1>
              <div className="continued_button_row">
                <div className="continued_button"><button>一陣一陣</button></div>
                <div className="continued_button"><button>持續一整天</button></div>
                <div className="continued_button"><button>不固定</button></div>
              </div>
              <div className="continued_button_row">
                <div className="continued_button"><button>每次1小時以內</button></div>
                <div className="continued_button"><button>1-2小時</button></div>
                <div className="continued_button"><button>3-5小時</button></div>
                <div className="continued_button"><button>6小時以上</button></div>
              </div>
            </div>
          </div>
        </div>
        <div className="other_des">
          <div className="title">其他描述</div>
          <div className="input_des">
            <input type="text"></input>
          </div>
        </div>
        <div className="record_buttons">
          <button>完成送出</button>
          <button onClick={()=>controlRecord("")}>取消</button>
        </div>
      </div>
    </div>
  );
}
  
export default RecordPage;