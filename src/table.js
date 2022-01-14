import Cell from "./cell"
import { useState } from "react";
import  {database}  from "./database.js"
export default function table() {
    const tableStructure = [
        {  
            name: "id",
            width: 2
        },
        {
            name: "name",
            width: 20
        },
        // {
        //     name: "maxLen",
        //     width: 5
        // },
        // {
        //     name: "type",
        //     width: 5
        // },
        {
            name: "GET",
            width: 25
        },
        {
            name: "POST",
            width: 25
        }
    ]
    const dataStructure = [
        {
            id:1,
            name:'1test1',
            maxLen:'345',
            type:'string'
        },
        {
            id:2,
            name:'5test0',
            maxLen:'345',
            type:'string'
        },
        {
            id:3,
            name:'0test4',
            maxLen:'345',
            type:'string'
        },
        {
            id:4,
            name:'1test2',
            maxLen:'345',
            type:'string'
        }
    ]
    const sortData = () => {
        // let sortData = localStorage.getItem('sortInfo');
        let processedData = database;
        // if(sortData){
        //    sortData = JSON.parse(sortData);
        //    let fieldName = sortData.name;
        //    if(sortData.direction === 1){
        //        console.log('1-sorting')
        //     // processedData = dataStructure.sort((x,y)=>{ return x[fieldName]-y[fieldName]})
        //     processedData = database.sort();
        //    }else{
        //        console.log('2-sorting')
        //     // processedData = dataStructure.sort((x,y)=>{ return y[fieldName]-x[fieldName]})
        //     processedData = database.reverse();
        //    }
        // }
        console.log("____h___",sortData)
        console.log(processedData)
        return processedData;
    }
    
    return (
        <>
        <div className="tableWrapper">
        <Cell header={true} tableStructure={tableStructure}/>
       
        <div className="tableBody">
        {
                sortData().map((x,index)=>{
                    return(
                        <Cell key={index} header={false} data={x} tableStructure={tableStructure}/>
                    )
                })
            }
        </div>
        </div>
           
        </>
    )
}