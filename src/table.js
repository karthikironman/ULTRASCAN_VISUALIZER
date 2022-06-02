import Cell from "./cell"
import { useState } from "react";
import { database } from "./database.js"
import { useEffect } from "react";
export default function Table() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
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
            name: "READ",
            width: 25
        },
        {
            name: "WRITE",
            width: 25
        }
    ]
    const dataStructure = [
        {
            id: 1,
            name: '1test1',
            maxLen: '345',
            type: 'string'
        },
        {
            id: 2,
            name: '5test0',
            maxLen: '345',
            type: 'string'
        },
        {
            id: 3,
            name: '0test4',
            maxLen: '345',
            type: 'string'
        },
        {
            id: 4,
            name: '1test2',
            maxLen: '345',
            type: 'string'
        }
    ]
    useEffect(async() => { 
        setLoading(true);
        let dta = await database();
        setData(dta);
        setLoading(false)
    }, [])
    return (
        <>
            <div className="tableWrapper">
                <Cell header={true} tableStructure={tableStructure} />
                {loading == false &&
                    <div className="tableBody">
                        {
                            data.map((x, index) => {
                                return (
                                    <Cell key={index} header={false} data={x} tableStructure={tableStructure} />
                                )
                            })
                        }
                    </div>}

            </div>

        </>
    )
}