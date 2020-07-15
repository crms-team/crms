import React from 'react'

// controller
class Test2 extends React.Component {
    render(){
        return (
            <button onClick={()=>{
                this.props.count_func(this.props.count + 1)
            }}>test2: + 1</button>
        )
    }
}

export default Test2
