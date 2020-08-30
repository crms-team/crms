import React, { Component } from "react";
import {
    Button,
    Modal,
    ListGroup,
    Tab,
    Row,
    Col,
    Form,
    Pagination,
} from "react-bootstrap";
import * as d3 from "d3";
import "./visual.css";
import { DataFormat, CreateVisualDataFormat } from "../resource";
import CreateModal from '../create'
import MInfo from "../summary/button";
import MButton from "../summary";
import { resourceSvg, resourceState } from "../resource-params";
import { IconContext } from "react-icons";
import { GrFormRefresh } from "react-icons/gr";

const CIRCLE_SIZE_L1 = 50
const CIRCLE_SIZE_L2 = 65
const CIRCLE_SIZE_L3 = 80
const CIRCLE_SIZE_L4 = 95
const CIRCLE_SIZE_L5 = 120
const CIRCLE_SIZE_L6 = 135
const CIRCLE_SIZE_L7 = 150

const IMAGE_TYPE={
    ebs:{
        image:"/images/ebs.svg", circle_size: CIRCLE_SIZE_L1
    },
    ec2:{
        image:"/images/compute.svg", circle_size:CIRCLE_SIZE_L2
    },
    rds:{
        image:"/images/rds group.svg", circle_size:CIRCLE_SIZE_L2
    },
    s3:{
        image:"/images/storage.svg", circle_size:CIRCLE_SIZE_L2
    },
    subnet:{
        image:"/images/ec2-container-registry.svg", circle_size: CIRCLE_SIZE_L3
    },
    internetgateway: {
        image:"/images/internet-gateway.svg", circle_size: CIRCLE_SIZE_L3
    },
    securitygroup:{
        image:"/images/security_group.svg", circle_size: CIRCLE_SIZE_L3
    },
    s3_group:{
        image:"/images/s3 group.svg", circle_size: CIRCLE_SIZE_L3
    },
    rds_group:{
        image:"/images/rds group.svg", circle_size: CIRCLE_SIZE_L3
    },
    securitygroups:{
        image:"/images/securityGroup group.svg", circle_size: CIRCLE_SIZE_L4
    },
    subnets:{
        image:"/images/subnet group.svg", circle_size: CIRCLE_SIZE_L4
    },
    vpc:{
        image:"/images/VPC.svg", circle_size: CIRCLE_SIZE_L5
    },
    aws: {
        image:"/images/cloud.svg", circle_size: CIRCLE_SIZE_L6
    },
    CRMS: {
        image:"/images/CRMS.svg", circle_size: CIRCLE_SIZE_L7
    }
}

function getLinkOpacity(source,target){
    for(let i=0;i<source.children.length;i++){
        if(source.children[i].id==target.id){
            return 1
        }
    }
}

class Visual extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataset: undefined,
            keyList: undefined,
            time: undefined,
            isFirst: true,
            showHide: false,
            instanceData: undefined,
        }
        this.drawChart = this.drawChart.bind(this);
        this.setState = this.setState.bind(this)
    }

    async getKeyData() {
        let response = await (await fetch("http://localhost:4000/api/cloud/key/list")).json()
        let key_id = Object.keys(response.keys);
        for (let i = 0; i < key_id.length; i++) {
            key_id[i] = {
                "key": key_id[i],
                "vendor": response.keys[key_id[i]].vendor
            }
        }
        localStorage.setItem('key', JSON.stringify(key_id))
        return response.keys
    }

    async getVisualData(type = undefined) {
        let result = []
        for (let key in this.state.keyList) {
            let ep = `http://localhost:4000/api/cloud/data?key_id=${key}` + (type ? `&type=${type}` : '')
            let response = await fetch(ep)
            let data = await response.json()
            this.setState({ time: data.time })
            result.push(CreateVisualDataFormat(key, this.state.keyList[key].vendor, data.data))
        }
        return result;
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide });
    }

    drawChart() {
        if (this.state.dataset != undefined) {
            let width = parseInt(window.getComputedStyle(document.querySelector("#root")).width),
                height = parseInt(window.getComputedStyle(document.querySelector("#root")).height) - 200;

            let visualdata = [];

            for (let dataset of this.state.dataset) {
                let cloud = dataset.filter(item => item.type.toLowerCase() == "aws")
                let vpc = dataset.filter(item => item.type.toLowerCase() == "vpc")
                let sgs = dataset.filter(item => item.type.toLowerCase() == "securitygroups")
                let sg = dataset.filter(item => item.type.toLowerCase() == "securitygroup")
                let subnets = dataset.filter(item => item.type.toLowerCase() == "subnets")
                let subnet = dataset.filter(item => item.type.toLowerCase() == "subnet")
                let ec2 = dataset.filter(item => item.type.toLowerCase() == "ec2")
                let ebs = dataset.filter(item => item.type.toLowerCase() == "ebs")
                let ig = dataset.filter(item => item.type.toLowerCase() == "internetgateway")
                let s3_group = dataset.filter(item => item.type.toLowerCase() == "s3_group")
                let s3 = dataset.filter(item => item.type.toLowerCase() == "s3")
                let rds_group = dataset.filter(item => item.type.toLowerCase() == "rds_group")
                let rds = dataset.filter(item => item.type.toLowerCase() == "rds")


                for (let tmp of cloud) {
                    tmp.children = [];
                    for (let tmp_vpc of vpc) {
                        tmp_vpc.children = [];
                        if (tmp.id == tmp_vpc.link[0]) {
                            for (let tmp_subs of subnets) {
                                tmp_subs.children = [];
                                if (tmp_vpc.id == tmp_subs.link[0]) {
                                    for (let tmp_sub of subnet) {
                                        tmp_sub.children = [];

                                        if (tmp_subs.id == tmp_sub.link[0]) {
                                            for (let tmp_ec2 of ec2) {
                                                for (let i = 0; i < tmp_ec2.link.length; i++) {
                                                    if (tmp_ec2.link[i] == tmp_sub.id) {
                                                        for (let tmp_ebs of ebs) {
                                                            for (let j = 0; j < tmp_ebs.link.length; j++) {
                                                                if (tmp_ebs.link[j] == tmp_ec2.id) {
                                                                    tmp_ec2.children = [];
                                                                    tmp_ec2.children.push(
                                                                        tmp_ebs
                                                                    );
                                                                }
                                                            }
                                                        }
                                                        tmp_sub.children.push(
                                                            tmp_ec2
                                                        );
                                                    }
                                                }
                                            }
                                            tmp_subs.children.push(tmp_sub);
                                        }
                                    }

                                    tmp_vpc.children.push(tmp_subs);
                                }
                            }
                            for (let tmp_sgs of sgs) {
                                tmp_sgs.children = [];
                                if (tmp_vpc.id == tmp_sgs.link[0]) {
                                    for (let tmp_sg of sg) {
                                        if (tmp_sgs.id == tmp_sg.link[0]) {
                                            tmp_sgs.children.push(tmp_sg);
                                        }
                                    }
                                    tmp_vpc.children.push(tmp_sgs);
                                }
                            }
                            tmp.children.push(tmp_vpc);
                        }
                        for (let tmp_ig of ig) {
                            if (tmp_vpc.id == tmp_ig.link[0]) {
                                tmp_vpc.children.push(tmp_ig)
                            }
                        }
                        for (let tmp_rds_group of rds_group) {
                            tmp_rds_group.children = []
                            if (tmp_vpc.id == tmp_rds_group.link[0]) {
                                for (let tmp_rds of rds) {
                                    for (let i = 0; i < tmp_rds.link.length; i++) {
                                        if (tmp_rds.link[i] == tmp_rds_group.id) {
                                            tmp_rds_group.children.push(tmp_rds)
                                        }
                                    }
                                }
                                tmp_vpc.children.push(tmp_rds_group);
                            }
                        }
                    }
                    for (let tmp_s3_group of s3_group) {
                        tmp_s3_group.children = []
                        if (tmp.id == tmp_s3_group.link[0]) {
                            for (let tmp_s3 of s3) {
                                for (let i = 0; i < tmp_s3.link.length; i++) {
                                    if (tmp_s3.link[i] == tmp_s3_group.id) {
                                        tmp_s3_group.children.push(tmp_s3)
                                    }
                                }
                            }
                            tmp.children.push(tmp_s3_group);
                        }
                    }
                    visualdata = visualdata.concat(tmp);
                }
            }

            let aroot = {
                id: "CRMSRootId",
                name: "CRMS",
                type: "CRMS",
                link: [],
                children: visualdata,
            };

            let root = d3.hierarchy(aroot);
            let i = 0;
            let nodeSvg, linkSvg, simulation;

            let svg = d3.select(".Visual")
                .call(d3.zoom().scaleExtent([1 / 100, 8]).on("zoom", zoomed))
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


            function zoomed() {
                svg.attr("transform", d3.event.transform);

            }

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
                .on("tick", ticked);

            const stateFunc = this.setState.bind(this);

            update(stateFunc, this.state);

            function update(stateFunc, preState) {

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
                            try{
                                for(let j=0;j<thislink.children.length;j++){
                                    if(thislink.children[j].id==d.id){
                                        return 1
                                    }
                                }
                                for(let i=0;i<d.children.length;i++){
                                    if(d.children[i].id==thislink.id){
                                        return 1
                                    }
                                }
                                return 0.2
                            }
                            catch{
                                return 0.2
                            }
                            /**/
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
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended))

                nodeEnter.append("circle")
                    .attr("stroke", function (d) {
                        let data = d.data
                        let rType = d.data.type
                        try {
                            let status = resourceState[rType](data.data)
                            if (rType == "ebs") {
                                status -= 6;
                            }
                            let colors = ["#6c9aff", "#9298b1", "#9298b1", "#9298b1", "#ff5a76", "#93c900"]
                            return colors[status]
                        } catch (e) {
                            return "#ffc14d";
                        }
                    })
                    .attr("stroke-width", "3")
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
                    .on("click", (d) => { click(d, stateFunc, preState) });

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

            function ticked() {
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
            }

            const clickFunc = stateFunc.bind(this);

            function click(d, clickFunc, preState) {
                try{
                    clickFunc({
                        instanceData: d.data,
                        showHide: !preState.showHide
                    })
                }catch(e){
                    return;
                }
            }

            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
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
                let nodes = [];

                function recurse(node) {
                    if (node.children) node.children.forEach(recurse);
                    if (!node.id) node.id = node.data.name;
                    else ++i;
                    nodes.push(node);
                }
                recurse(root);
                return nodes;
            }

        }
    }

    async componentDidMount() {
        this.setState({ keyList: await this.getKeyData() });
        this.setState({ dataset: await this.getVisualData() });

        if (this.state.isFirst) {
            this.drawChart();
            this.setState({ isFirst: false })
        }
    }

    render() {
        return (
            <>
                <CreateModal/>
                <Modal
                    show={this.state.showHide}
                    size="lg"
                    dialogClassName="width :50%"
                    dialogClassName="height:50%"
                    centered
                    scrollable={true}
                >
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>{this.state.instanceData ? this.state.instanceData.type : ''}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <MInfo data={this.state.instanceData} />
                    </Modal.Body>
                    <Modal.Footer>
                        <MButton data={this.state.instanceData} />
                    </Modal.Footer>
                </Modal>
                <svg className="Visual">
                    <g></g>
                </svg>
                <div className="time">
                    <h className="timetext">{this.state.time}</h>
                    <button
                        className="refresh"
                        onClick={async () => {
                            this.setState({
                                dataset: await this.getVisualData("data"),
                            });
                            this.drawChart();
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
}

export default Visual;
