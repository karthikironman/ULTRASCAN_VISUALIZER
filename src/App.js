
import './App.css';
import { useState, useEffect } from 'react'
import Table from "./table"
import SelectCell from './selectCell';
import JsonTable from "./json"
function App() {
  const [ip, setIp] = useState('');
  const [edit_mode, setEditMode] = useState(false)
  const setAddress = (address) => {
    localStorage.setItem('ip', address);
    setIp(address)
  }
  useEffect(() => {
    let ip = localStorage.getItem('ip');
    if (ip) {
      setIp(ip)
    } else {
      let defaultIp = 'http://xxx.xxx.xxx.xxx';
      localStorage.setItem('ip', defaultIp);
      setIp(defaultIp)
    }
  })
  return (
    <div className="App">
      <SelectCell/>
      <div className="app-header">
        <div>
        <h1 style={{textAlign:'left'}}>Ultrascan DB Visualizer</h1>
        <p>
          Download and install this 
          &nbsp;
          <a target='_blank' href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en">Cors extension</a>
          &nbsp;
          into chrome/edge/mozilla to disable <a target='_blank' href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">Cors</a> if any
        </p>
        </div>
        
        <div>
          <h2 style={{ color: 'black', alignSelf: 'center' }}>Address of the gauge</h2>
         
          <div className="ip-block">
          📻 &nbsp;
            {edit_mode === false && <div onMouseEnter={() => { setEditMode(true) }} style={{ display: 'inline-block', color: 'red', textDecoration: 'underline' }}>  {ip} </div>}
            {edit_mode === true && <input onBlur={() => { setEditMode(false) }} onMouseLeave={() => { setEditMode(false) }} value={ip} onChange={(e) => { setAddress(e.target.value) }} style={{}} />}
          </div>
        </div>

      </div>

      <hr />
      <div className="app-body">
        {/* <JsonTable/> */}
        <Table />
        
      </div>
    </div>
  );
}

export default App;
