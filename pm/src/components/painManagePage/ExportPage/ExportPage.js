import {useState} from 'react'
import './ExportPage.scss'

import ExportDownloadFile1Week from '../../../export/Export匯出_1週.csv'
import ExportDownloadFile1Month from '../../../export/Export匯出_1個月.csv'
import ExportDownloadFile3Month from '../../../export/Export匯出_3個月.csv'
import ExportDownloadFile6Month from '../../../export/Export匯出_6個月.csv'
import ExportDownloadFile1Year from '../../../export/Export匯出_一年.csv'

function ExportPage(props) {
  const [exportFile, setExportFile] = useState(ExportDownloadFile1Week);
  const getDuring = ()=>{
    exportData(document.getElementById('during').value)
  };
  const exportData = (state)=>{
    if(state === "1週"){
        setExportFile(ExportDownloadFile1Week);
    }else
    if(state === "1個月"){
        setExportFile(ExportDownloadFile1Month);
    }else
    if(state === "3個月"){
        setExportFile(ExportDownloadFile3Month);
    }else
    if(state === "6個月"){
        setExportFile(ExportDownloadFile6Month);
    }else{
        setExportFile(ExportDownloadFile1Year);
    }
  };
  return (
    <div id="export" className={ props.class }>
        <div className="back" onClick={ ()=> props.setExportPageClassName("") }></div>
        <div className="in">
            <div className="content">
                <div className="title">
                    <span>請選擇匯出期間</span>
                </div>
                <div className="selector">
                    <select id="during" name="during" onChange={ getDuring }>
                        <option value="1週">1週</option>
                        <option value="1個月">1個月</option>
                        <option value="3個月">3個月</option>
                        <option value="6個月">6個月</option>
                        <option value="一年">一年</option>
                    </select>
                </div>
                <div className="button">
                    <a href={ exportFile }>匯出</a>
                    <button onClick={ ()=> props.setExportPageClassName("") }>關閉</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ExportPage;
