import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import './Visual.css'

const test={
    "name":"test",
    type:"cloud",
    parent:"",
    link:"",
    children:[
        {
            "name":"vpc_test",
            type:"VPC",
            parent:"test",
            link:"",
            children:[
                {
                    "name":"sn",
                    type:"Subnet",
                    parent:"vpc_test",
                    link:[],
                    children:[
                        {
                            "name":"ec2_1",
                            type:"EC2",
                            parent:"test_sub",
                            children:"",
                            link:["ec2_2","sg"]
                        },
                        {
                            "name":"ec2_2",
                            type:"EC2",
                            parent:"test_sub",
                            children:"",
                            link:["ec2_1","sg"]
                        },
                        {
                            "name":"sg",
                            type:"SecurityGroup",
                            parent:"test_sub",
                            children:"",
                            link:["ec2_1","ec2_2"]
                        }
                    ]
                },
                {
                    "name":"sn1",
                    type:"Subnet",
                    parent:"vpc_test",
                    children:"",
                    link:[]
                }
            ]
        }
    ]
};


class Visual extends Component{

    Draw_graph(name,nodes,links){
        nodes.push({id:name.id,type:name.type})
        for(let tmp=0;tmp<name.children.length;tmp++){
            nodes.push({id:name.children[tmp].id,type:name.children[tmp].type})
            links.push({source:name.children[tmp].id,target:name.id})
            for (let i=0;i<name.children[tmp].link.length;i++){
                if(name.children[tmp].link[i]){
                    links.push({source:name.children[tmp].id,target:name.children[tmp].link[i]})
                }
            }
            if(name.children[tmp].children.length>0){
                nodes.pop()
                this.Draw_graph(name.children[tmp],nodes,links)
            }
        }
        for(let i=0;i<nodes.length;i++){
            if(nodes[i].type==="cloud"){
                nodes[i].svg="data:image/png;base64,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"
            }
            if(nodes[i].type==="EC2"){
                nodes[i].svg="https://upload.wikimedia.org/wikipedia/commons/b/b9/AWS_Simple_Icons_Compute_Amazon_EC2_Instances.svg"
            }
            if(nodes[i].type==="VPC"){
                nodes[i].svg="data:image/png;base64,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"
            }
            if(nodes[i].type==="Subnet"){
                nodes[i].svg="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQstS9tguK-9XV_xeoYIeYyt7qUUU9NNlA-fA&usqp=CAU"
            }
            if(nodes[i].type==="SecurityGroup"){
                nodes[i].svg="https://cdn.onlinewebfonts.com/svg/img_311121.png"
            }
        }
    }

    drawChart() {
        var width = 960,
        height = 600;
      
      //initialising hierarchical data
        var root = d3.hierarchy(test);
      
      var i = 0;
      
      var transform = d3.zoomIdentity;
      
      var nodeSvg, linkSvg, simulation, nodeEnter, linkEnter;
      
      var svg = d3.select("svg")
        .call(d3.zoom().scaleExtent([1 / 2, 8]).on("zoom", zoomed))
        .append("g")
        .attr("transform", "translate(40,0)")
    
        svg.append("svg:defs").selectAll("marker")
            .data(["end"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 22)
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");
      
      function zoomed() {
        svg.attr("transform", d3.event.transform);
      }
      
      simulation = d3.forceSimulation()
        .force("link", d3.forceLink(linkSvg).distance(100))
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);
      
      update();
      
      function update() {
        var nodes = flatten(root);
        var links = root.links();
      
        linkSvg = svg.selectAll(".link")
          .data(links, function(d) {
            return d.target.id;
          })
          
      
        linkSvg.exit().remove();
      
        var linkEnter = linkSvg.enter()
          .append("line")
          .attr("class", "link")
          .attr("marker-end", "url(#end)");
      
        linkSvg = linkEnter.merge(linkSvg)
      
        nodeSvg = svg.selectAll(".node")
          .data(nodes, function(d) {
            return d.id;
          })
      
        nodeSvg.exit().remove();
      
        var nodeEnter = nodeSvg.enter()
          .append("g")
          .attr("class", "node")
          .on("click", click)
          .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
            .on("mouseover", function(d) {
                var thisNode = d.id
            
                d3.selectAll(".circleNode");
                d3.select(this).attr("r", 12);
            
                linkEnter.attr("opacity", function(d) {
                    return (d.source.id == thisNode || d.target.id == thisNode) ? 1 : 0.1
                });
            
            })
            .on("mouseout", function(d) {
                var thisNode = d.id
            
                d3.selectAll(".circleNode")
                d3.select(this).attr("r", 12);
            
                linkEnter.attr("opacity","1");
            
            });
      
        nodeEnter.append("circle")
          .attr("r", 20)
          .append("title")
          .text(function(d) {
            return d.data.name;
          })
      
        nodeEnter.append("text")
          .attr("dy", 30)
          .attr("x", function(d) {
            return d.children ? -8 : 8;
          })
          .style("text-anchor", function(d) {
            return d.children ? "end" : "start";
          })
          .text(function(d) {
            return d.data.name;
          });
      
        nodeSvg = nodeEnter.merge(nodeSvg);
      
        simulation
          .nodes(nodes)
      
        simulation.force("link")
          .links(links);
      
      }
      
      function ticked() {
        linkSvg
          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });
      
        nodeSvg
          .attr("transform", function(d) {
            return "translate(" + d.x + ", " + d.y + ")";
          });
      }
      
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
          update();
          simulation.restart();
        } else {
          d.children = d._children;
          d._children = null;
          update();
          simulation.restart();
        }
      }
      
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        simulation.fix(d);
      }
      
      function dragged(d) {
        simulation.fix(d, d3.event.x, d3.event.y);
      }
      
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        simulation.unfix(d);
      }
      
      function flatten(root) {
        // hierarchical data to flat data for force layout
        var nodes = [];
      
        function recurse(node) {
          if (node.children) node.children.forEach(recurse);
          if (!node.id) node.id = ++i;
          else ++i;
          nodes.push(node);
        }
        recurse(root);
        return nodes;
      }

    }

    componentDidMount(){
        this.drawChart();
    }

    render(){
        return(
            <svg className="Visual">                
            </svg>
        );
    }
}

let mapStateToProps = (state) =>{
    return{
        value:state.SetType.value
    };
}

Visual = connect(mapStateToProps) (Visual);

export default Visual;