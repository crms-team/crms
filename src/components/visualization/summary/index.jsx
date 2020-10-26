import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class InstanceInfo extends React.Component{

    info(){  
        try{
            return Object.keys(this.props.data.data).filter(dt=>{              
                return typeof(this.props.data.data[dt]) != "object" 
            }).map(v=>{
                let d = this.props.data.data[v]
                return <tr> <th>{v}</th><td>{d != undefined? d.toString() : ''}</td> </tr>
            })
        }
        catch(e){
            console.log(e)
            return <>
                <tr> <th>ID</th><td>{this.props.data.id}</td> </tr>
                <tr> <th>Name</th><td>{this.props.data.name}</td> </tr>
                <tr> <th>Type</th><td>{this.props.data.type}</td> </tr>
            </>
            
        }
    }

    render(){
        return(
            <table>
                {        
                    this.info()
                }
            </table>            
        )
    }
}

export default InstanceInfo;
