import React,{Component} from 'react';
import { Graph } from "react-d3-graph";
import './Visual.css'

const config = {
    nodeHighlightBehavior: true,
    node: {
        color: "lightgreen",
        size: 200,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    }
}

class Visual extends Component{
    make_d3_graph_data () {
        let nodes = []
        let links = []

        for (let i = 0; i < 26; i++){
            nodes.push({ id:String.fromCharCode(65 + i) })
        }

        for (let i = 0; i < 26; i++){
            for (let j = i + 1; j < 26; j++){
                links.push({source: String.fromCharCode(65 + i), target: String.fromCharCode(65 + j)})
            }
        }

        return {
            nodes: nodes,
            links: links
        }
    }

    constructor (props) {
        super(props)
        this.state = {
            data: this.make_d3_graph_data()
        }

    }

    render(){
        return(
            <div className="Visual">
                <Graph 
                    height="700px"
                    id="graph-id"
                    data={this.state.data}
                    config={config}
                />
            </div>
        );
    }
}

export default Visual;