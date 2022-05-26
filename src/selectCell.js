import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TypeScroller from './typeScroller';
function SelectCell() {
    const [showModal, setShowModal] = useState(false);
    const [ENUM,setEnum] = useState([]);
    const [FLOAT,setFloat] = useState([]);
    const [INT,setInt] = useState([]);
    const [PACKETS,setPackets] = useState([]);
    const [STRING,setString] = useState([]);
    const toggleShow = () => {
        setShowModal(!showModal);
        if(showModal == true){
            window.location.reload();
        }
    }
    const getData = () => {
        fetch('database.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                setEnum(myJson.enum)
                setFloat(myJson.float)
                setInt(myJson.int)
                setPackets(myJson.packets)
                setString(myJson.string)
            });
    }
    useEffect(() => {
        getData()
    }, [])
    return <>
        {!showModal && <h1 className="addCell" onClick={() => { toggleShow() }}>➕</h1>}
        {showModal && <h1 className="addCell" onClick={() => { toggleShow() }}>✖️</h1>}

        {showModal &&
            <div className="select-cell">
               <div className="sc-table-head">
                 <p>ENUM</p>
                 <p>FLOAT</p>
                 <p>INT</p>
                 <p>PACKETS</p>
                 <p>STRING</p>
               </div>
               <div className="sc-table-body">
                   <TypeScroller typ='enum' arry={ENUM}/>
                   <TypeScroller typ='float' arry={FLOAT}/>
                   <TypeScroller typ='int' arry={INT}/>
                   <TypeScroller typ='packets' arry={PACKETS}/>
                   <TypeScroller typ='string' arry={STRING}/>
               </div>
            </div>
        }

    </>


}
export default SelectCell;