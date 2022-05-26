import { useState, useEffect } from "react";
import axios from 'axios';
axios.defaults.timeout = 200000;
const fetchData = (setValue, setLoading,setSuccess,setInitial,cell,showAlert=false) => {
    setInitial(false)
    // let url = `http://24.31.176.88:8088/fcgi/db?cell=${cell}`;
    console.log({cell})
    let ipAddress = localStorage.getItem('ip')
    let extension = `fcgi/db/units=M&resolution=7&cells=${cell.id}`
    let url = ipAddress +"/"+extension;
    setLoading(true)
    axios.get(url).then((res) => {
        console.log('received the data', res.data[0]);
        setValue(res.data[0][cell.id]);
        setSuccess(true)
    }).catch((err)=>{
        if(showAlert){
            alert(JSON.stringify(err))
        }
        setValue('failed,click to retry');
        setSuccess(false)
    }).finally(() => {
        setLoading(false);
    })
}
const getStyle = (loading,success,initial) => {
    let backgroundColor="";
    let color = ""
    if(initial){
        backgroundColor = 'grey';
        color = 'white';
    }else if(loading){
      backgroundColor = 'yellow';
      color = 'black';
    }else if(success){
        backgroundColor = 'green';
        color = "white";
    }else {
        backgroundColor = 'red';
        color = "white";
    }
    return {backgroundColor,color}
}
export default function GetCell(props) {
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(false);
    const [success,setSuccess] = useState('white');
    const [initial,setInitial] = useState(true)
    useEffect(() => { fetchData(setValue, setLoading,setSuccess,setInitial,props.cell) }, [])
    return (
        <div className="getCell"
        style = {getStyle(loading, success,initial)}
            onClick={() => { fetchData(setValue, setLoading,setSuccess, setInitial,props.cell,true); }}>
            { initial === false && loading === false && <p>{value}</p>}
            { initial === false && loading === true && <p>Loading</p>}
            { initial === true && loading === false && <p>Click to read the value</p>}
           
        </div>
    )
}