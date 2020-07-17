import React,{Component} from 'react';
import { Graph } from "react-d3-graph";
import './Visual.css'

interface CloudResourceObject {
    id: string,
    attr?: object,
    parent?: CloudResourceObject,
    children?: CloudResourceObject[],
    links?: string[]
}

interface Dataset {
    cloudName: string,
    cloudArchitecture: CloudResourceObject
}

const test={
    id:"test",
    attr:"cloud",
    parent:"",
    link:"",
    children:[
        {
            id:"vpc_test",
            attr:"VPC",
            parent:"test",
            link:"",
            children:[
                {
                    id:"sn",
                    attr:"Subnet",
                    parent:"vpc_test",
                    link:["sn1"],
                    children:[
                        {
                            id:"ec2_1",
                            attr:"EC2",
                            parent:"test_sub",
                            children:"",
                            link:["ec2_2","sg"]
                        },
                        {
                            id:"ec2_2",
                            attr:"EC2",
                            parent:"test_sub",
                            children:"",
                            link:["ec2_1","sg"]
                        },
                        {
                            id:"sg",
                            attr:"SecurityGroup",
                            parent:"test_sub",
                            children:"",
                            link:["ec2_1","ec2_2"]
                        }
                    ]
                },
                {
                    id:"sn1",
                    attr:"Subnet",
                    parent:"vpc_test",
                    children:"",
                    link:["sn"]
                }
            ]
        }
    ]
}

const config = {
    nodeHighlightBehavior: true,
    width:1600,
    height:800,
    node: {
        color: "lightgreen",
        size: 500,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    }
}

class Visual extends Component{

    Draw_graph(id,nodes,links){
        nodes.push({id:id.id,attr:id.attr})
        for(let tmp=0;tmp<id.children.length;tmp++){
            nodes.push({id:id.children[tmp].id,attr:id.children[tmp].attr})
            links.push({source:id.children[tmp].id,target:id.id})
            for (let i=0;i<id.children[tmp].link.length;i++){
                if(id.children[tmp].link[i]){
                    links.push({source:id.children[tmp].id,target:id.children[tmp].link[i]})
                }
            }
            if(id.children[tmp].children.length>0){
                this.Draw_graph(id.children[tmp])
            }
        }
    }

    make_d3_graph_data (max) {
        let nodes = []
        let links = []
        nodes.push({id:test.id,attr:test.attr})
        for(let tmp=0;tmp<test.children.length;tmp++){
            nodes.push({id:test.children[tmp].id,attr:test.children[tmp].attr})
            links.push({source:test.children[tmp].id,target:test.id})
            for(let tmp1=0;tmp1<test.children[tmp].children.length;tmp1++){
                nodes.push({id:test.children[tmp].children[tmp1].id,attr:test.children[tmp].children[tmp1].attr})
                links.push({source:test.children[tmp].children[tmp1].id,target:test.children[tmp].id})
                for (let i=0;i<test.children[tmp].children[tmp1].link.length;i++){
                    if(test.children[tmp].children[tmp1].link[i]){
                        links.push({source:test.children[tmp].children[tmp1].id,target:test.children[tmp].children[tmp1].link[i]})
                    }
                }
                for(let tmp2=0;tmp2<test.children[tmp].children[tmp1].children.length;tmp2++){
                    nodes.push({id:test.children[tmp].children[tmp1].children[tmp2].id,attr:test.children[tmp].children[tmp1].children[tmp2].attr})
                    links.push({source:test.children[tmp].children[tmp1].children[tmp2].id,target:test.children[tmp].children[tmp1].id})
                }
            }
        }
        /*for (let i = 0; i < max; i++){
            nodes.push({ id:String.fromCharCode(65 + i) })
        }

        for (let i = 0; i < max; i++){
            for (let j = i + 1; j < max; j++){
                links.push({source: String.fromCharCode(65 + i), target: String.fromCharCode(65 + j)})
            }
        }*/

        return {
            nodes: nodes,
            links: links
        }
    }

    constructor (props) {
        super(props)
        this.state = {
            data: this.make_d3_graph_data(1)
        }

    }

    render(){
        return(
            <div className="Visual">
                <button
                    onClick={()=>{
                        this.setState({
                            data: this.make_d3_graph_data(26)
                        })
                        console.log(test)
                    }}
                >adsfhajfda</button>
                
                <Graph
                    id="graph-id"
                    data={this.state.data}
                    config={config}
                />
            </div>
        );
    }
}

export default Visual;