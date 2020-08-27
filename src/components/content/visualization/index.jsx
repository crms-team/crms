import React, { Component } from 'react';
import { Button, Modal, ListGroup, Tab, Row, Col, Form, Pagination } from 'react-bootstrap';
import * as d3 from 'd3';
import './Visual.css'
import { DataFormat, CreateVisualDataFormat } from "./resource";
import MInfo from './modal/info'
import MButton from './modal/button'
import { resourceSvg, resourceState } from './resource-params'
import CreateIns from './create-instance';

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
        return result
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide });
    }

    drawChart() {
        if (this.state.dataset != undefined) {
            var width = parseInt(window.getComputedStyle(document.querySelector("#root")).width),
                height = parseInt(window.getComputedStyle(document.querySelector("#root")).height) - 200;

            let visualdata = [];

            for (let dataset of this.state.dataset) {

                var cloud = dataset.filter(item => item.type.toLowerCase() == "aws")
                var vpc = dataset.filter(item => item.type.toLowerCase() == "vpc")
                var sgs = dataset.filter(item => item.type.toLowerCase() == "securitygroups")
                var sg = dataset.filter(item => item.type.toLowerCase() == "securitygroup")
                var subnets = dataset.filter(item => item.type.toLowerCase() == "subnets")
                var subnet = dataset.filter(item => item.type.toLowerCase() == "subnet")
                var ec2 = dataset.filter(item => item.type.toLowerCase() == "ec2")
                var ebs = dataset.filter(item => item.type.toLowerCase() == "ebs")
                var ig = dataset.filter(item => item.type.toLowerCase() == "internetgateway")
                var s3_group = dataset.filter(item => item.type.toLowerCase() == "s3_group")
                var s3 = dataset.filter(item => item.type.toLowerCase() == "s3")
                var rds_group = dataset.filter(item => item.type.toLowerCase() == "rds_group")
                var rds = dataset.filter(item => item.type.toLowerCase() == "rds")


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
                                                for (var i = 0; i < tmp_ec2.link.length; i++) {
                                                    if (tmp_ec2.link[i] == tmp_sub.id) {
                                                        for (let tmp_ebs of ebs) {
                                                            for (var j = 0; j < tmp_ebs.link.length; j++) {
                                                                if (tmp_ebs.link[j] == tmp_ec2.id) {
                                                                    tmp_ec2.children = [];
                                                                    tmp_ec2.children.push(tmp_ebs);
                                                                }
                                                            }
                                                        }
                                                        tmp_sub.children.push(tmp_ec2);
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
                                    for (var i = 0; i < tmp_rds.link.length; i++) {
                                        if (tmp_rds.link[i] == tmp_rds_group.id) {
                                            tmp_rds_group.children.push(tmp_rds)
                                        }
                                    }
                                }
                                tmp_vpc.children.push(tmp_rds_group)
                            }
                        }

                    }
                    for (let tmp_s3_group of s3_group) {
                        tmp_s3_group.children = []
                        if (tmp.id == tmp_s3_group.link[0]) {
                            for (let tmp_s3 of s3) {
                                for (var i = 0; i < tmp_s3.link.length; i++) {
                                    if (tmp_s3.link[i] == tmp_s3_group.id) {
                                        tmp_s3_group.children.push(tmp_s3)
                                    }
                                }
                            }
                            tmp.children.push(tmp_s3_group)
                        }
                    }
                    visualdata = visualdata.concat(tmp);
                }

            }

            let aroot = {
                id: 'CRMSRootId',
                name: 'CRMS',
                type: 'CRMS',
                link: [],
                children: visualdata
            }

            var root = d3.hierarchy(aroot);
            var i = 0;
            var nodeSvg, linkSvg, simulation, nodeEnter, linkEnter;

            var svg = d3.select("svg")
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

            simulation = d3.forceSimulation()
                .alpha(0.5)
                .alphaDecay(0.001)
                .force("link", d3.forceLink(linkSvg).distance(400))
                .force("charge", d3.forceManyBody().strength(-2000))
                .force("center", d3.forceCenter(width / 2 + 100, height / 2 + 100))
                .on("tick", ticked);

            const stateFunc = this.setState.bind(this);

            update(stateFunc, this.state);

            function update(stateFunc, preState) {

                var nodes = flatten(root);
                var links = root.links();

                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].data.link.length > 0) {
                        for (var j = 0; j < nodes[i].data.link.length; j++) {
                            for (var h = 0; h < nodes.length; h++) {
                                if (nodes[i].data.link[j] == nodes[h].data.id) {
                                    links.push({ source: i, target: h })
                                }

                            }
                        }
                    }
                }

                linkSvg = svg.selectAll(".link")
                    .data(links, function (d) {
                        return d.target.id;
                    })


                linkSvg.exit().remove();

                var linkEnter = linkSvg.enter()
                    .append("line")
                    .attr("class", "link")
                    .style("stroke", "#ffc14d")
                    .attr("marker-end", "url(#end)");

                linkSvg = linkEnter.merge(linkSvg)

                nodeSvg = svg.selectAll(".node")
                    .data(nodes, function (d) {
                        return d.id;
                    })

                nodeSvg.exit().remove();

                var nodeEnter = nodeSvg.enter()
                    .append("g")
                    .attr("class", "node")
                    .on("mouseover", function (d) {
                        var thisNode = d.id
                        var thislink = d
                        d3.selectAll(".link").attr("opacity", function (d) {
                            return (d.source.id == thisNode || d.target.id == thisNode) ? 1 : 0.2
                        });
                        d3.selectAll(".node").attr("opacity", function (d) {
                            if (d.data.link.length > 0) {
                                for (var i = 0; i < d.data.link.length; i++) {
                                    if (d.data.link[i] == thislink.data.id)
                                        return "1";
                                }
                            }
                            if (d.id == thislink.data.link[i] || d.id == thisNode)
                                return "1";
                            else
                                return "0.1";
                        });
                    })
                    .on("mouseout", function (d) {
                        d3.selectAll(".link").attr("opacity", "1");
                        d3.selectAll(".node").attr("opacity", "1");
                    })
                    .on("contextmenu", function (d) {
                        d3.event.preventDefault();
                        if (d.children) {
                            var check = 0;
                            if (d.data.type == "subnet") {
                                for (var i = 0; i < d.children.length; i++) {
                                    for (var j = 0; j < d.children[i].data.link.length; j++) {
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
                                for (var i = 0; i < check; i++) {
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
                            let colors = ["blue", "gray", "#ff7f00", "gray", "red", "green"]
                            return colors[status]
                        } catch (e) {
                            return "#ffc14d"
                        }
                    })
                    .attr("stroke-width", "3")
                    .attr("fill", "none")
                    .attr("r", function (d) {
                        if (d.data.type == "CRMS") {
                            return 150;
                        }
                        if (d.data.type == "aws") {
                            return 100;
                        }
                        else if (d.data.type == "vpc")
                            return 80;
                        else if (d.data.type == "subnets" || d.data.type == "securitygroups")
                            return 70;
                        else if (d.data.type == "subnet" || d.data.type == "securitygroup")
                            return 60;
                        else {
                            return 50;
                        }
                    })

                nodeEnter.append("svg:image")
                    .attr("xlink:href", function (d) {
                        if (d.data.type == "ec2")
                            return "/images/compute.svg";
                        else if (d.data.type == "securitygroup")
                            return "/images/security_group.svg";
                        else if (d.data.type == "subnet")
                            return "/images/ec2-container-registry.svg";
                        else if (d.data.type == "vpc")
                            return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/AWS_Simple_Icons_Virtual_Private_Cloud.svg/640px-AWS_Simple_Icons_Virtual_Private_Cloud.svg.png";
                        else if (d.data.type == "aws")
                            return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/AWS_Simple_Icons_AWS_Cloud.svg/1200px-AWS_Simple_Icons_AWS_Cloud.svg.png";
                        else if (d.data.type == "ebs")
                            return "/images/ebs.svg";
                        else if (d.data.type == "rds")
                            return "/images/trans-line/rds.svg"
                        else if (d.data.type == "s3")
                            return "/images/storage.svg"
                        else if (d.data.type == "internetgateway")
                            return "/images/default/internet-gateway.svg"
                    })
                    .attr("x", function (d) { return -30; })
                    .attr("y", function (d) { return -35; })
                    .attr("height", 60)
                    .attr("width", 60)
                    .on("click", (d) => { click(d, stateFunc, preState) });

                nodeEnter.append("text")
                    .attr("dy", 33)
                    .style("fill", "#ffc14d")
                    .style("font-family", "NanumSquare")
                    .style("font-weight", "bold")
                    .style("font-size", "14px")
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.name;
                    });

                nodeSvg = nodeEnter.merge(nodeSvg);

                simulation
                    .nodes(nodes)

                simulation.force("link")
                    .links(links);

            }

            function ticked() {
                function cal(x, y, x1, y1, type) {
                    var angle = Math.atan2(y1 - y, x1 - x)
                }

                linkSvg
                    .attr("x1", function (d) {
                        var angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                        var length = 150 * Math.cos(angle);
                        return d.source.x + length;
                    })
                    .attr("y1", function (d) {
                        var angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                        var length = 150 * Math.sin(angle);
                        return d.source.y + length;
                    })
                    .attr("x2", function (d) {
                        var angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                        var length = 120 * Math.cos(angle);
                        return d.target.x - length;
                    })
                    .attr("y2", function (d) {
                        var angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                        var length = 120 * Math.sin(angle);
                        return d.target.y - length;
                    });

                nodeSvg
                    .attr("transform", function (d) {
                        return "translate(" + d.x + ", " + d.y + ")";
                    });
            }

            const clickFunc = stateFunc.bind(this);

            function click(d, clickFunc, preState) {
                clickFunc({
                    instanceData: d.data,
                    showHide: !preState.showHide
                })
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
        this.setState({ keyList: await this.getKeyData() })
        this.setState({ dataset: await this.getVisualData() })

        if (this.state.isFirst) {
            this.drawChart();
            this.setState({ isFirst: false })
        }

    }

    render() {
        return (
            <>
                <CreateIns dataset={this.state.dataset}/>
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
                    <button className="refresh" onClick={async () => { this.setState({ dataset: await this.getVisualData('data') }); this.drawChart() }}></button>
                </div>
            </>
        );
    }
}

export default Visual;