import React,{useState, useEffect} from "react";
import {Modal} from "react-bootstrap";
import * as d3 from "d3";
import "./index.css";
import { CreateVisualDataFormat } from "../resource";
import CreateModal from '../create'
import MButton from "../summary/button";
import MInfo from "../summary";
import { VisualStructure, IMAGE_TYPE, resourceState } from "../resource-params";
import { IconContext } from "react-icons";
import { GrFormRefresh } from "react-icons/gr";
import {Form} from "react-bootstrap"

let nodeSvg, linkSvg, simulation, svg;

function drawChart(dataSet,handleModalShowHide,handleInstanceDataset,showHide){
    if (dataSet != undefined) {
        let width = parseInt(window.getComputedStyle(document.querySelector("#root")).width),
            height = parseInt(window.getComputedStyle(document.querySelector("#root")).height) - 200;

        let visualDataset = [];

        for (let dataset of dataSet) {

            let datasets = {
                cloud: dataset.filter(item => item.type.toLowerCase() == "aws"),
                vpc: dataset.filter(item => item.type.toLowerCase() == "vpc"),
                security_groups: dataset.filter(item => item.type.toLowerCase() == "securitygroups"),
                security_group: dataset.filter(item => item.type.toLowerCase() == "securitygroup"),
                subnet_groups: dataset.filter(item => item.type.toLowerCase() == "subnets"),
                subnet: dataset.filter(item => item.type.toLowerCase() == "subnet"),
                ec2: dataset.filter(item => item.type.toLowerCase() == "ec2"),
                ebs: dataset.filter(item => item.type.toLowerCase() == "ebs"),
                ig: dataset.filter(item => item.type.toLowerCase() == "internetgateway"),
                s3_groups: dataset.filter(item => item.type.toLowerCase() == "s3_group"),
                s3: dataset.filter(item => item.type.toLowerCase() == "s3"),
                rds_groups: dataset.filter(item => item.type.toLowerCase() == "rds_group"),
                rds: dataset.filter(item => item.type.toLowerCase() == "rds")
            }

            function make_dataset(resource, parent, vs, check_link){
                for (let element of resource) {
                    if (check_link) {
                        for (let link of element.link) {
                            if (parent.id == link) {
                                for (let child of Object.keys(vs)) {
                                    make_dataset(datasets[child], element, vs[child], true)
                                }
                                parent.children.push(element)  
                            }
                        } 
                    } else {
                        for (let child of Object.keys(vs)) {
                            make_dataset(datasets[child], element, vs[child], true)
                        }
                        parent.push(element)   
                    }                 
                }

            }
            make_dataset(datasets.cloud, visualDataset, VisualStructure, false)
        }

        let root = d3.hierarchy({
            id: "CRMSRootId",
            name: "CRMS",
            type: "CRMS",
            link: [],
            children: visualDataset,
        })

        svg = d3.select(".Visual")
            .call(d3.zoom().scaleExtent([1 / 100, 8]).on("zoom", ()=>{
                svg.attr("transform", d3.event.transform);

            }))
            .style("background-color", "#27262b")
            .on("dblclick.zoom", null)
            .on("contextmenu", function (d, i) {
                d3.event.preventDefault();
            })
            .select("g")

        svg.append("svg:defs").selectAll("marker")
            .data(["end"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .style("stroke", "#ffc14d")
            .style("fill", "#ffc14d")
            .attr("viewBox", "0 -5 10 10")
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");

        simulation = d3
            .forceSimulation()
            .alpha(0.5)
            .alphaDecay(0.001)
            .force("link", d3.forceLink(linkSvg).distance(400))
            .force("charge", d3.forceManyBody().strength(-2000))
            .force(
                "center",
                d3.forceCenter(width / 2 + 100, height / 2 + 100)
            )
            .on("tick", ()=>{
                linkSvg
                .attr("x1", function (d) {
                    let angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                    let length = IMAGE_TYPE[d.source.data.type].circle_size * Math.cos(angle)*1.25;
                    return d.source.x + length;
                })
                .attr("y1", function (d) {
                    let angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                    let length = IMAGE_TYPE[d.source.data.type].circle_size * Math.sin(angle)*1.25;
                    return d.source.y + length;
                })
                .attr("x2", function (d) {
                    let angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                    let length = IMAGE_TYPE[d.target.data.type].circle_size * Math.cos(angle)*1.28;
                    return d.target.x - length;
                })
                .attr("y2", function (d) {
                    let angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                    let length = IMAGE_TYPE[d.target.data.type].circle_size * Math.sin(angle)*1.28;
                    return d.target.y - length;
                });

                nodeSvg.attr("transform", function (d) {
                    return "translate(" + d.x + ", " + d.y + ")";
                });
            });

        update(handleInstanceDataset,handleModalShowHide,showHide,root);

    }
}

function update(handleInstanceDataset,handleModalShowHide,showHide,root) {
            
    let nodes = flatten(root);
    let links = root.links();

    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].data.link.length > 0) {
            for (let j = 0; j < nodes[i].data.link.length; j++) {
                for (let h = 0; h < nodes.length; h++) {
                    if (nodes[i].data.link[j] == nodes[h].data.id) {
                        links.push({ source: i, target: h });
                    }
                }
            }
        }
    }

    linkSvg = svg.selectAll(".link").data(links, function (d) {
        return d.target.id;
    });

    linkSvg.exit().remove();

    let linkEnter = linkSvg.enter()
        .append("line")
        .attr("class", "link")
        .style("stroke-width","2.5")
        .style("stroke", "#ffc14d")
        .attr("marker-end", "url(#end)");

    linkSvg = linkEnter.merge(linkSvg);

    nodeSvg = svg.selectAll(".node").data(nodes, function (d) {
        return d.id;
    });

    nodeSvg.exit().remove();

    let nodeEnter = nodeSvg.enter()
        .append("g")
        .attr("class", "node")
        .on("mouseover", function (d) {
            let thisNode = d.id
            let thislink = d
            let tmp=0;

            function compareId(list, target){
                for (let child of list) {
                    if (child.data.id == target.data.id) {
                        return true
                    }
                }
                return false
            }

            function compareList(source, target) {
                return compareId(source.children, target) || 
                compareId(target.children, source) || 
                compareId(source.data.link, target) || 
                compareId(target.link, source) ? 1 : 0.2
            }

            d3.selectAll(".link").attr("opacity", function (d) {
                return d.source.id == thisNode ||
                    d.target.id == thisNode
                    ? 1
                    : 0.2;
            });
            d3.selectAll(".node").attr("opacity", function (d) {
                if(thislink.id==d.data.id||thislink.id==d.data.name){
                    return 1;
                }
                else{
                    try{
                        return compareList(thislink, d)
                    }
                    catch{
                        try{
                            return compareList(d, thislink)
                        }
                        catch{
                            try{
                                for(let i=0;i<thislink.data.link.length;i++){
                                    if(thislink.data.link[i]==d.data.id){
                                        return 1;
                                    }
                                }
                                for(let i=0;i<d.data.link.length;i++){
                                    if(d.data.link[i]==thislink.data.id){
                                        return 1;
                                    }
                                }
                            }
                            catch{
                                for(let i=0;i<d.data.link.length;i++){
                                    if(d.data.link[i]==thislink.data.id){
                                        return 1;
                                    }
                                }
                            }
                        }
                        return 0.2;
                    }
                }          
            });
        })
        .on("mouseout", function (d) {
            d3.selectAll(".link").attr("opacity", "1");
            d3.selectAll(".node").attr("opacity", "1");
        })
        .on("contextmenu", function (d) {
            d3.event.preventDefault();
            if (d.children) {
                let check = 0;
                if (d.data.type == "subnet") {
                    for (let i = 0; i < d.children.length; i++) {
                        for (let j = 0; j < d.children[i].data.link.length; j++) {
                            if (d.children[i].data.link[j].includes(":securitygroup:")) {
                                d.data.link.push(d.children[i].data.link[j]);
                                check++;
                            }
                        }
                    }
                }
                d._children = d.children;
                d.children = null;
                update();
                simulation.restart();
                if (check != 0) {
                    for (let i = 0; i < check; i++) {
                        d.data.link.pop();
                    }
                }
            } else {
                d.children = d._children;
                d._children = null;
                update();
                simulation.restart();
            }

        })
        .call(d3.drag()
            .on("start", (d)=>{
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                simulation.fix(d);
            })
            .on("drag", (d)=>{
                simulation.fix(d, d3.event.x, d3.event.y);
            })
            .on("end", (d)=>{
                if (!d3.event.active) simulation.alphaTarget(0);
                simulation.unfix(d);
            }))

    nodeEnter.append("circle")
        .attr("stroke", function (d) {
            let data = d.data
            let rType = d.data.type
            try {
                let status = resourceState[rType](data.data)
                if (rType == "ebs") {
                    status -= 6;
                }
                let colors = ["#93c900", "#ff5a76", "#ff5a76", "#ff5a76", "#9298b1","#6c9aff"]
                return colors[status]
            } catch (e) {
                return "#ffc14d";
            }
        })
        .attr("stroke-width", "10")
        .attr("fill", "none")
        .attr("r", function (d) {
            return IMAGE_TYPE[d.data.type].circle_size
        });

    nodeEnter
        .append("svg:image")
        .attr("xlink:href", function (d) {
            return IMAGE_TYPE[d.data.type].image
        })
        .attr("height", function(d){
            return (IMAGE_TYPE[d.data.type].circle_size*(1.5))
        })
        .attr("width", function(d){
            return (IMAGE_TYPE[d.data.type].circle_size*(1.5))
        })
        .attr("x", function(d){
            return -(IMAGE_TYPE[d.data.type].circle_size*(1.5))/2
        })
        .attr("y", function(d){
            return -(IMAGE_TYPE[d.data.type].circle_size*(1.5))/2
        })
        .on("click", (d) => { 
            try{
                handleInstanceDataset(d.data);
                handleModalShowHide(!showHide)
            }catch(e){
                return;
            }
         });

    nodeEnter
        .append("text")
        .attr("dy", (d)=>{
            return (IMAGE_TYPE[d.data.type].circle_size*(1.5))/2+3
        })
        .style("fill", "#ffc14d")
        .attr('stroke', 'white')
        .attr("stroke-width", "0.2")
        .style("font-family", "NanumSquare")
        .style("font-weight", "bold")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.name;
        });

    nodeSvg = nodeEnter.merge(nodeSvg);

    simulation.nodes(nodes);

    simulation.force("link").links(links);
}

function flatten(root) {
    let nodes = [];

    function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        if (!node.id) node.id = node.data.name;
        nodes.push(node);
    }
    recurse(root);
    return nodes;
}

function specifyNode(cloud){
    
}


function Visual(){

    const [showHide,setShowhide]=React.useState(false);
    const [instanceData,setInstanceData]=React.useState(undefined);
    const [keyList,setKeyList]=React.useState(undefined);
    const [dataSet,setDataset]=React.useState(undefined);
    const [showDataSet,setShowDataset]=React.useState(undefined);

    async function getVisualData(keys, type = undefined) {
        let result = []
        for (let key of keys) {
            let ep = `${process.env.REACT_APP_SERVER_URL}/api/cloud/data?key_id=${key.key}` + (type ? `&type=${type}` : '')
            let response = await fetch(ep).then((res)=>res.json())
            result.push(CreateVisualDataFormat(key.key, key.vendor, response.data))
        }
        setDataset(result);
    }

    async function temp(params) {
        let keys = JSON.parse(localStorage.getItem("key"))
        await getVisualData(keys, "data")
        setKeyList(keys)
    }

    useEffect(()=>{
        temp()
    },[])

    useEffect(()=> {
        drawChart(dataSet,handleModalShowHide,handleInstanceDataset,showHide)
    },[dataSet])

    const handleInstanceDataset = (d) =>{
        setInstanceData(d.data)
    }

    const handleModalShowHide = () =>{
        setShowhide(!showHide);
    }

    return(
        <>
            <CreateModal/>
            <Modal
                show={showHide}
                size="lg"
                dialogClassName="width :50%"
                dialogClassName="height:50%"
                centered
                scrollable={true}
            >
                <Modal.Header closeButton onClick={() => handleModalShowHide()}>
                    <Modal.Title>{instanceData ? instanceData.type : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <MInfo data={instanceData} />
                </Modal.Body>
                <Modal.Footer>
                    <MButton data={instanceData} />
                </Modal.Footer>
            </Modal>
            <svg className="Visual">
                <g></g>
            </svg>
            <div className="selectKey">
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select">
                        <option>All Cloud</option>
                        {localStorage.getItem("key") &&
                                    JSON.parse(localStorage.getItem("key")).map(
                                        (v) => {
                                            return (
                                                <option value={v.key}>
                                                    {v.key}
                                                </option>
                                            );
                                        }
                        )}
                        <option>In Use</option>
                        <option>No Use</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
            <div className="time">
                <button
                    className="refresh"
                    onClick={async () => {
                        await getVisualData("data")
                    }}
                >
                    <IconContext.Provider value={{ className: "icon" }}>
                        <GrFormRefresh
                            className="refresh-icon"
                            color="red"
                        />
                    </IconContext.Provider>
                </button>
            </div>
        </>
    );
}

export default Visual;