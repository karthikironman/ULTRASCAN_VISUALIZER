
import './App.css';
import { useState, useEffect } from 'react'
import Table from "./table"
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
      let defaultIp = 'http://24.31.176.88:8088';
      localStorage.setItem('ip', defaultIp);
      setIp(defaultIp)
    }
  })
  return (
    <div className="App">
      <div className="app-header"><h1>Ultrascan DB Visualizer</h1>
        <h2 style={{ color: 'black',alignSelf:'center' }}>Address of the gauge</h2>
        <div className="ip-block">
          {edit_mode === false && <div onMouseEnter={() => { setEditMode(true) }} style={{ display: 'inline-block', color: 'red', textDecoration: 'underline' }}>  {ip} </div>}
          {edit_mode === true && <input onBlur={() => { setEditMode(false) }} onMouseLeave={() => { setEditMode(false) }} value={ip} onChange={(e) => { setAddress(e.target.value) }} style={{}} />}
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
