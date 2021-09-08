import './Login.scss'
import {useEffect, useState} from 'react'

function Login(props) {

    function submit(){
        props.toggleLogin();
    }

    return (
      <div id="login">
        <div className="title">
            <span>3D慢性疼痛管理系統</span>
        </div>
        <div className="form">
            <span>姓名</span>
            <input type="text" />
            <span>性別</span>
            <select className="sex" name="sex" id="sex-select">
                <option value=""></option>
                <option value="male">男性</option>
                <option value="female">女性</option>
            </select>
            <span>年齡</span>
            <input className="age" type="text" />
        </div>
        <div className="login_button">
            <button onClick={ submit }>完成送出</button>
        </div>
        <div className="notice">
            <table>
                <tbody>
                    <tr>
                        <td className="td_title">注意事項：</td>
                        <td>請先登入姓名、性別、年齡之後，才可以記錄哦！</td>
                    </tr>
                    <tr>
                        <td className="td_title">服務電話：</td>
                        <td>09123123132</td>
                    </tr>  
                </tbody>
            </table>

        </div>
      </div>
    );
  }
  
  export default Login;