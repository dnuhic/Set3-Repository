import ListItem from './ListItem'

import { useState, useEffect } from 'react';

function List(props) {

    const [sampleData, setSampleData] = useState([])


    useEffect(() => {
        setSampleData(props.sampleData)
    }, [])

    function handleSort() {
        const sortedData = [...sampleData].sort((a, b) => {
            return a.first > b.first ? 1: -1
        })

        setSampleData(sortedData);  
    }

    function handleSort1() {
        const sortedData = [...sampleData].sort((a, b) => {
            return a.first < b.first ? 1 : -1
        })

        setSampleData(sortedData);
    }

    const listComponents = sampleData.map((object) => {
        return <ListItem first={object.first} last={object.last} />
    })


    return (
        <> 
            <button onClick={handleSort} id="sorta-z"> A-Z  </button>
            <button onClick={handleSort1} id="sortz-a"> Z-A </button>

             <ul>
               {listComponents}
              </ul>

        </>
    )
}

export default List