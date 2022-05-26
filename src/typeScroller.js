import React from 'react';
import { useState, useEffect } from 'react';
function TypeScroller(props) {
    const [type, setType] = useState("");
    const [data, setData] = useState([]);
    const [select,setSelect] = useState([]);
    const [idMode,setIdMode] = useState(false);
    const setLocalStorage = (id) => {
        let arrayData = localStorage.getItem(type)??'[]';
        arrayData = JSON.parse(arrayData);
        if(arrayData.includes(id)){
            let indx = arrayData.indexOf(id);
             arrayData.splice(indx,1)
        }else{
            arrayData.push(id)
        }
        setSelect(arrayData);
        localStorage.setItem(type,JSON.stringify(arrayData))
    }
    useEffect(() => {
        let { typ, arry } = props;
        
        setType(typ);
        setData(arry);
        let arrayData = localStorage.getItem(typ)??'[]';
        // alert(JSON.stringify({arrayData}))
        arrayData = JSON.parse(arrayData);
        setSelect(arrayData);
    }, [])
    return <div class="typeScroller">
      
        {select.length}
        <button className={idMode?'idmode':'namemode'} style={{cursor:'pointer'}} onClick={()=>{setIdMode(!idMode)}}>{idMode?'ID':'NAME'}</button>
        {idMode && data.map(x => {
            return <p className={select.includes(x.id)?'tsactive':'tsinactive'} onClick={()=>{setLocalStorage(x.id)}}>{x.id}</p>
        })}
        {!idMode && data.map(x => {
            return <p style={{fontSize:'19px',padding:'8px 0'}} className={select.includes(x.id)?'tsactive':'tsinactive'} onClick={()=>{setLocalStorage(x.id)}}>{x.name}</p>
        })}
    </div>

}
export default TypeScroller