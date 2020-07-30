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
                    "name":"test_sub",
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


    drawChart() {
        var width = parseInt(window.getComputedStyle(document.querySelector("#root > div > main > div.Content > svg")).width),
        height = parseInt(window.getComputedStyle(document.querySelector("#root > div > main > div.Content > svg")).height)-200;
      
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
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");
      
      function zoomed() {
        svg.attr("transform", d3.event.transform);
      }
      
      simulation = d3.forceSimulation()
        .force("link", d3.forceLink(linkSvg).distance(150))
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("colide",d3.forceCollide().radius(d=>d.r*100))
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
          .style("border","1")
          .style("stroke","black")
          .on("mouseover", function(d) {
                var thisNode = d.id
                var thislink=d
                d3.selectAll(".link").attr("opacity", function(d) {
                    return (d.source.id == thisNode || d.target.id == thisNode) ? 1 : 0.1
                });
                d3.selectAll(".node").attr("opacity", function(d) {
                    if(d.data.name==thislink.data.parent||d.id==thisNode||d.data.parent==thislink.data.name)
                        return "1";
                    else
                        return "0.1";
                });
                    
            })
          .on("mouseout", function(d) {
                d3.selectAll(".link").attr("opacity","1");
                d3.selectAll(".node").attr("opacity","1");
          })
          .on("click", click)
          .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
      
        nodeEnter.append("svg:image")
        .attr("xlink:href",function(d){
            if(d.data.type=="EC2")
                return "./../../../images/compute.svg";
            if(d.data.type=="SecurityGroup")
                return "./../../../images/security_group.svg";
            if(d.data.type=="Subnet")
                return "./../../../images/ec2-container-registry.svg";
            if(d.data.type=="VPC")
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/AWS_Simple_Icons_Virtual_Private_Cloud.svg/640px-AWS_Simple_Icons_Virtual_Private_Cloud.svg.png";
            if(d.data.type=="cloud")
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/AWS_Simple_Icons_AWS_Cloud.svg/1200px-AWS_Simple_Icons_AWS_Cloud.svg.png";
        })
        .attr("x", function(d) { return -35;})
        .attr("y", function(d) { return -35;})
        .attr("height", 70)
        .attr("width", 70);
      
        nodeEnter.append("text")
          .attr("dy", 40)
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
            var angle=Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
            var length=50*Math.cos(angle);
            return d.source.x+length;
          })
          .attr("y1", function(d) {
            var angle=Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
            var length=50*Math.sin(angle);
            return d.source.y+length;
          })
          .attr("x2", function(d) {
            var angle=Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
            var length=50*Math.cos(angle);
            return d.target.x-length;
          })
          .attr("y2", function(d) {
            var angle=Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
            var length=50*Math.sin(angle);
            return d.target.y-length;
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