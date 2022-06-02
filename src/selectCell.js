import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TypeScroller from './typeScroller';
import Switch from "react-switch";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
function SelectCell() {
    const [refresh, setRefresh] = useState(false);//new
    const [refreshInt, setRefreshInt] = useState(15);//new
    const [showModal, setShowModal] = useState(false);
    const [ENUM, setEnum] = useState([]);
    const [FLOAT, setFloat] = useState([]);
    const [INT, setInt] = useState([]);
    const [PACKETS, setPackets] = useState([]);
    const [STRING, setString] = useState([]);
    let timerVar = null;
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
                // console.log(response)
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
    const conSToBool = (val) => {
        if (typeof (val) == 'string') {
            if (val == 'true') {
                return true
            } else {
                return false
            }
        }
    }
    useEffect(() => {
        getData();
        initializeRefreshRoutine();
    }, [])
    const toggleShow = (value) => {
        localStorage.setItem('modal', value)
        setShowModal(value);
         if (value === false) {
            window.location.reload();
        //     initializeRefreshRoutine();
         }
       
    }
    const initializeRefreshRoutine = () => {
        let rfrh = localStorage.getItem('refresh') ?? refresh;
        rfrh = conSToBool(rfrh)
        setRefresh(rfrh);
        if (rfrh) {
            let frequency = localStorage.getItem('frequency') ?? refreshInt;
            setRefreshInt(frequency)
            //stop any timer if runningg
            clearInterval(timerVar);
            console.log('timer mounted', frequency)
            timerVar = setInterval(() => {
                let modalStatus = localStorage.getItem('modal') ?? showModal;
                modalStatus = conSToBool(modalStatus);
                if (!modalStatus) { //the modal must be closed
                    console.log('refreshing---------', showModal, typeof (showModal))
                    window.location.reload();
                }
            }, frequency*1000)
            //start the timer
        } else {
            //stop the timer
            clearInterval(timerVar);
        }
    }
    const changeToggleHandler = (state) => {
        console.log('changeToggleHandler')
        localStorage.setItem('refresh', state);
        setRefresh(state);
        initializeRefreshRoutine();
    }
    const changeFrequencyHandler = (freq) => {
        console.log('changeFreq handler')
        localStorage.setItem('frequency', freq);
        setRefreshInt(freq);
        initializeRefreshRoutine();
    }
    return <>
        {!showModal && <h1 className="addCell" onClick={() => { toggleShow(true) }}>➕</h1>}
        {showModal && <h1 className="addCell" onClick={() => { toggleShow(false) }}>✖️</h1>}
        <div className="refresh-box">
            {
                refresh && 
                <CountdownCircleTimer
                size={35}
                strokeWidth={4}
                isPlaying = {!showModal}
                duration={refreshInt }
                colors={['#eb3d34','#00ff00', '#00ff00', '#A30000']}
                colorsTime={[4,3,2,1]}
            > </CountdownCircleTimer>
            }
        
            <div>
            <div className="refresh-row"> <p>Auto Refresh</p> <Switch handleDiameter={18} width={50} height={20} onChange={(e) => { changeToggleHandler(e) }} checked={refresh} /></div>
            {refresh && <div className="refresh-row"> <p>every</p><input value={refreshInt} onChange={(e) => { changeFrequencyHandler(e.target.value) }} className="freq-input" type="number"></input><p>sec</p></div>}
            </div>
          
           
        </div>

        {({ remainingTime }) => remainingTime}

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
                    <TypeScroller typ='enum' arry={ENUM} />
                    <TypeScroller typ='float' arry={FLOAT} />
                    <TypeScroller typ='int' arry={INT} />
                    <TypeScroller typ='packets' arry={PACKETS} />
                    <TypeScroller typ='string' arry={STRING} />
                </div>
            </div>
        }

    </>


}
export default SelectCell;