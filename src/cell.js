import { useEffect, useState } from 'react';
import GetCellWidget from "./getCell"
import PostCellWidget  from './postCell';
const getWidth = (width) => {
    let result = width + 'rem';
    return result
}
const GetSortInfo =()=> {
    let key = 'sortInfo';
    let readStorage = localStorage.getItem(key);
    console.log({readStorage})
    let template = {
            name:'',
            direction:1
        }
    
    if(readStorage){
        //already loaded
        return JSON.parse(readStorage);
    }else{
       localStorage.setItem(key,JSON.stringify(template));
       return template;
    }
}
const GetArrow=(props)=>{
    let name = props.name;
    let SortInfo = GetSortInfo();
    if(name && name === SortInfo.name && SortInfo.direction === 1){
        return "🡩"
    }else if(name && name === SortInfo.name && SortInfo.direction === 2){
        return "🡫"
    }else return ""
}
const setSorting = (name) => {
    // let SortInfo = GetSortInfo();
    // if(name === SortInfo.name){
    //     //sorting on the already selected element
    //     SortInfo.direction = SortInfo.direction === 1 ? 2: 1 ; //toggle the direction
    // }else{
    //     SortInfo.name = name;
    //     SortInfo.direction = 1;
    // }
    // let key = 'sortInfo';
    // localStorage.setItem(key,JSON.stringify(SortInfo));
    // window.location.reload(false);
}
function GetCell(props) {
    let { header, x,  data ,highlight,setHighlight } = props;
    if (header) {
        return (
            <span  onClick={() => {setSorting(x.name)}}  className="header-cell" style={{ 'width': getWidth(x.width) }}>
                {x.name}<GetArrow name={x.name} />
            </span>
        );
    } else {
        if (x.name === 'GET') {
            return <span className="data-cell"><GetCellWidget cell={data}/></span>
        } else if (x.name === 'POST') {
            return <span className="data-cell"><PostCellWidget cell={data} /></span>
        } else {
            return (
                <span onClick={()=>{setHighlight(!highlight)}} className="data-cell" style={{ 'width': getWidth(x.width), background: (x.name && highlight?'pink':'none') }}>
                    {data[x.name]}
                </span>
            );
        }

    }

}
export default function Cell(props) {
    const [highlight,setHighlight] = useState(false)
    useEffect(() => {
        console.log('from useeffect function in the cell component', props)
    }, [])
    return (
        <>
            <div className="t-rows">
                {
                    props.tableStructure.map((x, index) => <GetCell header={props.header} x={x} key={index} highlight = {highlight} setHighlight={setHighlight} data={props.data} />)
                }

            </div>
        </>
    )
}
