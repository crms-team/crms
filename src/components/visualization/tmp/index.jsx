import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import * as d3 from "d3";
import "./index.css";
import { CreateVisualDataFormat } from "../resource";
import CreateModal from '../create'
import MButton from "../summary/button";
import MInfo from "../summary";
import { VisualStructure, IMAGE_TYPE, resourceState, LINE_TYPE } from "../resource-params";
import { Dropdown, Tabs, Tab, Form, Button } from "react-bootstrap"


let nodeSvg, linkSvg, simulation, svg;

function drawChart(dataSet, handleModalShowHide, handleInstanceDataset, showHide, visualSetting) {
    let width = parseInt(window.getComputedStyle(document.querySelector("#root")).width),
        height = parseInt(window.getComputedStyle(document.querySelector("#root")).height) - 200;

    let root;

    if (dataSet != undefined) {
        let visualDataset = [];

        let i = 0;

        for (let dataset of dataSet) {
            
            let divideGroup = {
                server: {
                    id: "servergroups",
                    name: "servergroups",
                    type: "servergroups",
                    link: [],
                    children: []
                },
                volume: {
                    id: "volumegroups",
                    name: "volumegroups",
                    type: "volumegroups",
                    link: [],
                    children: []
                },
                vpc: {
                    id: "vpcgroups",
                    name: "vpcgroups",
                    type: "vpcgroups",
                    link: [],
                    children: []
                },
                subnet: {
                    id: "subnetgroups",
                    name: "subnetgroups",
                    type: "subnetgroups",
                    link: [],
                    children: []
                },
                internetgateway: {
                    id: "interenetgroups",
                    name: "interenetgroups",
                    type: "interenetgroups",
                    link: [],
                    children: []
                },
                securitygroup: {
                    id: "securitygroups",
                    name: "securitygroups",
                    type: "securitygroups",
                    link: [],
                    children: []
                },
                storage: {
                    id: "storagegroups",
                    name: "storagegroups",
                    type: "storagegroups",
                    link: [],
                    children: []
                },
                database: {
                    id: "databasegroups",
                    name: "databasegroups",
                    type: "databasegroups",
                    link: [],
                    children: []
                },
            }

            let datasets = {
                cloud: dataset.filter(item => item.type.toLowerCase() == "aws" || item.type.toLowerCase() == "azure" ),
                vpc: dataset.filter(item => item.type.toLowerCase() == "vpc"),
                security_groups: dataset.filter(item => item.type.toLowerCase() == "securitygroups"),
                security_group: dataset.filter(item => item.type.toLowerCase() == "securitygroup"),
                subnet_groups: dataset.filter(item => item.type.toLowerCase() == "subnets"),
                subnet: dataset.filter(item => item.type.toLowerCase() == "subnet"),
                server: dataset.filter(item => item.type.toLowerCase() == "server"),
                volume: dataset.filter(item => item.type.toLowerCase() == "volume"),
                ig: dataset.filter(item => item.type.toLowerCase() == "internetgateway"),
                s3_groups: dataset.filter(item => item.type.toLowerCase() == "s3_group"),
                bucket: dataset.filter(item => item.type.toLowerCase() == "bucket"),
                networkinterface: dataset.filter(item => item.type.toLowerCase() == "networkinterface" ),
                database_groups: dataset.filter(item => item.type.toLowerCase() == "database_groups"),
                database: dataset.filter(item => item.type.toLowerCase() == "database")
            }

            let nouse = {
                id:  dataset[0].id+":nouse",
                name: dataset[0].id + ":nouse",
                type: "nouse",
                link: dataset[0].id,
                children: []
            }

            function make_dataset(resource, parent, vs, check_link, is_init, nouse) {
                for (let element of resource) {
                    if (check_link) {
                        for (let link of element.link) {
                            if (parent.id == link) {
                                for (let child of Object.keys(vs)) {
                                    make_dataset(datasets[child], element, vs[child], true, is_init, nouse)
                                }
                                if (is_init) {
                                    parent.children.push(element)
                                }
                            }
                        }
                        if (element.link.length == 0) {
                            if (visualSetting.type[element.type]) {
                                divideGroup[element.type].id = dataset[0].id + ":" + divideGroup[element.type].id 
                                divideGroup[element.type].name = dataset[0].name + ":" + divideGroup[element.type].name 
                                divideGroup[element.type].children.push(element)
                            }
                        }
                    } else {
                        for (let child of Object.keys(vs)) {
                            make_dataset(datasets[child], element, vs[child], true, is_init, nouse)
                        }
                        parent.push(element)
                    }
                }
                for (let tmp in divideGroup) {
                    if (divideGroup[tmp].children.length > 0) {
                        nouse.children.push(divideGroup[tmp])
                    }
                }
            }

            if (visualSetting.status.inuse) {
                make_dataset(datasets.cloud, visualDataset, VisualStructure[dataset[0].type], false, datasets.cloud[0].children.length == 0, nouse)
                if (visualSetting.status.nouse) {
                    let isNouse = true
                    for (let tmp of visualDataset[i].children) {
                        if (tmp.id == nouse.id) {
                            isNouse = false
                        }
                    }
                    for(let tmp of dataset){
                        if(tmp.link.length == 0 && (tmp.type != "aws" && tmp.type != "azure")){
                            nouse.children.push(tmp)
                        }
                    }
                    if (isNouse) {
                        visualDataset[i].children.push(nouse)
                    }
                }
            }
            else if (visualSetting.status.nouse) {
                let tmpText = {
                    id: "",
                    vendor: "",
                }
                for (let tmp of dataset) {
                    if (tmp.type == "aws") {
                        tmpText.id = tmp.id;
                        tmpText.vendor = tmp.type
                    }
                    else if (tmp.type == "azure") {
                        tmpText.id = tmp.id;
                        tmpText.vendor = tmp.type
                    }
                    else if (tmp.link.length == 0 ) {
                        nouse.children.push(tmp)
                    }
                }
                visualDataset[i] = {
                    id: tmpText.id,
                    name: tmpText.id,
                    type: tmpText.vendor,
                    link: [],
                    children: []
                }
                visualDataset[i].children.push(nouse)
            }
            i += 1
        }

        if (visualDataset.length == 1) {
            root = d3.hierarchy(visualDataset[0])
        }

        else {
            root = d3.hierarchy({
                id: "CRMSRootId",
                name: "CRMS",
                type: "CRMS",
                link: [],
                children: visualDataset,
            })
        }

    }
    else {
        root = d3.hierarchy({
            id: "CRMSRootId",
            name: "CRMS",
            type: "CRMS",
            link: [],
            children: [],
        })
    }
    svg = d3.select(".Visual")
        .call(d3.zoom().scaleExtent([1 / 100, 8]).on("zoom", () => {
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
        .on("tick", () => {
            linkSvg
                .attr("x1", function (d) {
                    let angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                    let length = LINE_TYPE[d.source.data.type]* Math.cos(angle) * 1.25;
                    return d.source.x + length;
                })
                .attr("y1", function (d) {
                    let angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                    let length = LINE_TYPE[d.source.data.type] * Math.sin(angle) * 1.25;
                    return d.source.y + length;
                })
                .attr("x2", function (d) {
                    let angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                    let length = LINE_TYPE[d.target.data.type] * Math.cos(angle) * 1.28;
                    return d.target.x - length;
                })
                .attr("y2", function (d) {
                    let angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                    let length = LINE_TYPE[d.target.data.type] * Math.sin(angle) * 1.28;
                    return d.target.y - length;
                });

            nodeSvg.attr("transform", function (d) {
                return "translate(" + d.x + ", " + d.y + ")";
            });
        });
    
    update(handleInstanceDataset, handleModalShowHide, showHide, root);
}

function update(handleInstanceDataset, handleModalShowHide, showHide, root) {

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
        .style("stroke-width", "2.5")
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
            let tmp = 0;

            function compareId(list, target) {
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
                if (thislink.id == d.data.id || thislink.id == d.data.name) {
                    return 1;
                }
                else {
                    try {
                        return compareList(thislink, d)
                    }
                    catch {
                        try {
                            return compareList(d, thislink)
                        }
                        catch {
                            try {
                                for (let i = 0; i < thislink.data.link.length; i++) {
                                    if (thislink.data.link[i] == d.data.id) {
                                        return 1;
                                    }
                                }
                                for (let i = 0; i < d.data.link.length; i++) {
                                    if (d.data.link[i] == thislink.data.id) {
                                        return 1;
                                    }
                                }
                            }
                            catch {
                                for (let i = 0; i < d.data.link.length; i++) {
                                    if (d.data.link[i] == thislink.data.id) {
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
            if (d.data.type == "CRMS") {
                return
            }
            else if (d.children) {
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
                update(handleInstanceDataset, handleModalShowHide, showHide, root);
                simulation.restart();
                if (check != 0) {
                    for (let i = 0; i < check; i++) {
                        d.data.link.pop();
                    }
                }
            } else {
                d.children = d._children;
                d._children = null;
                update(handleInstanceDataset, handleModalShowHide, showHide, root);
                simulation.restart();
            }

        })
        .call(d3.drag()
            .on("start", (d) => {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                simulation.fix(d);
            })
            .on("drag", (d) => {
                simulation.fix(d, d3.event.x, d3.event.y);
            })
            .on("end", (d) => {
                if (!d3.event.active) simulation.alphaTarget(0);
                simulation.unfix(d);
            }))

    nodeEnter.append("circle")
        .attr("stroke", function (d) {
            let data = d.data
            let rType = d.data.type
            try {
                let status = resourceState[rType](data.data)
                if (rType == "volume") {
                    status -= 6;
                }
                let colors = ["#93c900", "#ff5a76", "#ff5a76", "#ff5a76", "#9298b1", "#6c9aff"]
                return colors[status]
            } catch (e) {
                return "#ffc14d";
            }
        })
        .attr("stroke-width", "10")
        .attr("fill", "none")
        .attr("r", function (d) {
            return LINE_TYPE[d.data.type]
        });

    nodeEnter
        .append("svg:image")
        .attr("xlink:href", function (d) {     
            let tmpName=d.data.id.split(":")[0]
            let keyVendor;
            if(tmpName!="CRMS"){
                let keyTmp=JSON.parse(localStorage.getItem("key"))
                for(let tmp in keyTmp){
                    if(keyTmp[tmp].key==tmpName){
                        keyVendor=keyTmp[tmp].vendor
                        break
                    }
                }
            }      
            return d.data.type=="CRMS"? IMAGE_TYPE[d.data.type] : IMAGE_TYPE[keyVendor][d.data.type]
        })
        .attr("height", function (d) {
            return (LINE_TYPE[d.data.type] * (1.5))
        })
        .attr("width", function (d) {
            return (LINE_TYPE[d.data.type] * (1.5))
        })
        .attr("x", function (d) {
            return -(LINE_TYPE[d.data.type] * (1.5)) / 2
        })
        .attr("y", function (d) {
            return -(LINE_TYPE[d.data.type] * (1.5)) / 2
        })
        .on("click", (d) => {
            try {
                handleInstanceDataset(d.data);
                handleModalShowHide(!showHide)
            } catch (e) {
                return;
            }
        });

    nodeEnter
        .append("text")
        .attr("dy", (d) => {
            return (LINE_TYPE[d.data.type] * (1.5)) / 2 + 3
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

function specifyNode(visualSet, dataSet, handleModalShowHide, handleInstanceDataset, showHide) {
    let specifyData = []

    for (let cloud in visualSet.cloudlist) {
        for (let key of dataSet) {
            if (visualSet.cloudlist[cloud]) {
                if (key[0].id == cloud) {
                    specifyData.push(key)
                }
            }
        }
    }

    d3.selectAll(".link").remove()
    d3.selectAll(".node").remove()

    if (specifyData.length == 0) {
        specifyData = undefined
    }

    drawChart(specifyData, handleModalShowHide, handleInstanceDataset, showHide, visualSet)
}


function Visual() {

    const visualRef = useRef();

    const [visualSetting, setVisualSetting] = React.useState(undefined);
    const [showHide, setShowhide] = React.useState(false);
    const [instanceData, setInstanceData] = React.useState(undefined);
    const [keyList, setKeyList] = React.useState(undefined);
    const [dataSet, setDataset] = React.useState(undefined);
    const [showDataSet, setShowDataset] = React.useState(undefined);

    async function getVisualData(keys, type = undefined) {
        let result = []
        let cloudList = {}
        for (let key of keys) {
            let ep = `${process.env.REACT_APP_SERVER_URL}/api/cloud/data?key_id=${key.key}`
            let response = await fetch(ep).then((res) => res.json())
            cloudList[key.key] = true
            result.push(CreateVisualDataFormat(key.key, key.vendor, response.data))
        }

        setVisualSetting({
            cloudlist: cloudList,
            status: {
                inuse: true,
                nouse: false
            },
            type: {
                server: true,
                volume: true,
                vpc: true,
                subnet: true,
                securitygroup: true,
                internetgateway: true,
                storage: true,
                database: true,
            }
        })
        setDataset(result);
    }

    async function temp(params) {
        let keys = JSON.parse(localStorage.getItem("key"))
        setKeyList(keys)
        await getVisualData(keys, "data")
    }

    useEffect(() => {
        temp()
    }, [])

    useEffect(() => {
        visualRef.current = visualSetting
        drawChart(dataSet, handleModalShowHide, handleInstanceDataset, showHide, visualSetting)
    }, [dataSet])

    const handleInstanceDataset = (d) => {
        setInstanceData(d)
    }

    const handleModalShowHide = () => {
        setShowhide(!showHide);
    }

    const handleCloudList = (key) => {
        visualRef.current.cloudlist[key] = !visualRef.current.cloudlist[key]
    }

    const handleStatus = (key) => {
        visualRef.current.status[key] = !visualRef.current.status[key]
    }

    const handleType = (key) => {
        visualRef.current.type[key] = !visualRef.current.type[key]
    }

    return (
        <>
            <CreateModal />
            <Modal
                show={showHide}
                onHide={handleModalShowHide}
                size="lg"
                dialogClassName="width :50%"
                dialogClassName="height:50%"
                centered
                scrollable={true}
            >
                <Modal.Header closeButton >
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
                <Dropdown>
                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Tabs defaultActiveKey="cloudlist" id="controlled-tab-example">
                            <Tab eventKey="cloudlist" title="Cloud List">
                                {localStorage.getItem("key") &&
                                    JSON.parse(localStorage.getItem("key")).map(
                                        (v) => {
                                            return (
                                                <Form.Check key={v.key} type="checkbox" label={v.key} defaultChecked onChange={() => { handleCloudList(v.key) }} />
                                            );
                                        }
                                    )}
                            </Tab>
                            <Tab eventKey="status" title="Status">
                                <Form.Check type="checkbox" key="inuse" label="In use" defaultChecked onChange={() => { handleStatus("inuse") }} />
                                <Form.Check type="checkbox" key="nouse" label="No use" onChange={() => { handleStatus("nouse") }} />
                            </Tab>
                            <Tab eventKey="type" title="Type">
                                <Form.Check type="checkbox" key="server" label="Server" defaultChecked onChange={() => { handleType("server") }} />
                                <Form.Check type="checkbox" key="volume" label="Volume" defaultChecked onChange={() => { handleType("volume") }} />
                                <Form.Check type="checkbox" key="vpc" label="VPC" defaultChecked onChange={() => { handleType("vpc") }} />
                                <Form.Check type="checkbox" key="subnet" label="Subnet" defaultChecked onChange={() => { handleType("subnet") }} />
                                <Form.Check type="checkbox" key="internetgateway" label="InternetgateWay" defaultChecked onChange={() => { handleType("internetgateway") }} />
                                <Form.Check type="checkbox" key="securitygroup" label="SecurityGroup" defaultChecked onChange={() => { handleType("securitygroup") }} />
                                <Form.Check type="checkbox" key="storage" label="Storage" defaultChecked onChange={() => { handleType("storage") }} />
                                <Form.Check type="checkbox" key="database" label="Database" defaultChecked onChange={() => { handleType("database") }} />
                            </Tab>
                        </Tabs>
                        <Button variant="primary" onClick={() => {
                            specifyNode(visualRef.current, dataSet, handleModalShowHide, handleInstanceDataset, showHide)
                        }}>
                            Setting
                    </Button>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
}

export default Visual;