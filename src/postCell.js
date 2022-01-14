import { useState } from 'react';
import axios from 'axios'
export default function PostCell(props) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [value, setValue] = useState('')
    const writeValue = () => {
        console.log({props})
        let ipAddress = localStorage.getItem('ip')
        let extension = `fcgi/db`
        let url = ipAddress + "/" + extension;
        // alert(url)
        setLoading(true);
        const data = `units=M&${props.cell.name}=${value}`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            url
        };
        axios(options).then(() => {
            flashSuccess()
        }).catch(() => {
            flashFailure()
        })
        .finally(() => {

        })


    }
    const flashSuccess = () => {
        setValue("")
        setLoading(false);
        setSuccess(true);
        setFailure(false);
        setTimeout(() => {
            inputMode()
        }, 1000)
    }
    const flashFailure = () => {
        setValue(value)
        setLoading(false);
        setSuccess(false);
        setFailure(true);
        setTimeout(() => {
            inputMode()
        }, 1000)
    }
    const inputMode = () => {
        setLoading(false);
        setSuccess(false);
        setFailure(false);
    }
    return (
        <div className="postCell">
            <div className="post-content">
                {loading === false && success === false && failure === false && <>
                    <input value={value} onChange={(e) => { setValue(e.target.value) }}></input>
                </>}
                {loading === true && success === false && failure === false &&
                    <p>writing..</p>}
                {loading === false &&
                    success === true && failure === false &&
                    <p>success..☺😃</p>}
                {loading === false &&
                    success === false && failure === true &&
                    <p>failed..☹😞</p>}
            </div>


            <button onClick={()=>{writeValue()}}>OK</button>
        </div>
    )
}