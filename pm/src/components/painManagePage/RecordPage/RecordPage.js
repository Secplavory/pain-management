import './RecordPage.scss'
import {useState} from 'react'

// import icon
import pain_level from '../../../asserts/PainManagePage/pain_level.jpg'

function RecordPage(props) {
  const [recordClassName,setRecordClassName] = useState("record");
  const [painLevel,setPainLevel] = useState(0);
  const createRecord = (state)=>{
    // props.updateRecordState(false);
    setRecordClassName(function(prev){
      return prev + state;
    });
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
          <button onClick={()=>createRecord(" show")}>確認</button>
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
            <img src={pain_level}></img>
          </div>
          <div className="level_text">
            <span>完全不痛</span>
            <span>極度疼痛</span>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default RecordPage;