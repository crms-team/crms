import React from 'react'
import Sidebar from '../sidebar'
import Visual from './d3-crms'

class Visualization extends React.Component {
    render () {
        return (
            <>
                <Sidebar/>
                <div className="visaulization-container" style={{
                    height: "100%",
                    width: "85%",
                    margin: "0 auto",
                    float: "right"
                }}>
                    <Visual />
                </div>
            </>
        )
    }
}

export default Visualization