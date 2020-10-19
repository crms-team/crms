import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import * as d3 from "d3";
import "./visual.scss";
import { CreateVisualDataFormat } from "../resource";
import CreateModal from "../create";
import MButton from "../summary/button";
import MInfo from "../summary";
import { VisualStructure, IMAGE_TYPE, resourceState } from "../resource-params";
import { IconContext } from "react-icons";
import { GrFormRefresh } from "react-icons/gr";

class Visual extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataset: undefined,
            keyList: undefined,
            isFirst: true,
            showHide: false,
            instanceData: undefined,
        };
        this.drawChart = this.drawChart.bind(this);
        this.setState = this.setState.bind(this);
    }

    async getKeyData() {
        let response = await (
            await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/cloud/key/list`
            )
        ).json();
        let key_id = Object.keys(response.keys);
        for (let i = 0; i < key_id.length; i++) {
            key_id[i] = {
                key: key_id[i],
                vendor: response.keys[key_id[i]].vendor,
                region: response.keys[key_id[i]].keys.region,
            };
        }
        localStorage.setItem("key", JSON.stringify(key_id));
        return response.keys;
    }

    async getVisualData(type = undefined) {
        let result = [];
        for (let key in this.state.keyList) {
            let ep =
                `${process.env.REACT_APP_SERVER_URL}/api/cloud/data?key_id=${key}` +
                (type ? `&type=${type}` : "");
            let response = await fetch(ep);
            let data = await response.json();
            result.push(
                CreateVisualDataFormat(
                    key,
                    this.state.keyList[key].vendor,
                    data.data
                )
            );
        }
        return result;
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide });
    }

    drawChart() {
        if (this.state.dataset != undefined) {
            let width = parseInt(
                    window.getComputedStyle(document.querySelector("#root"))
                        .width
                ),
                height =
                    parseInt(
                        window.getComputedStyle(document.querySelector("#root"))
                            .height
                    ) - 200;

            let visualDataset = [];
            console.log(this.state.dataset);
            for (let dataset of this.state.dataset) {
                let datasets = {
                    cloud: dataset.filter(
                        (item) => item.type.toLowerCase() == "aws"
                    ),
                    vpc: dataset.filter(
                        (item) => item.type.toLowerCase() == "vpc"
                    ),
                    security_groups: dataset.filter(
                        (item) => item.type.toLowerCase() == "securitygroups"
                    ),
                    security_group: dataset.filter(
                        (item) => item.type.toLowerCase() == "securitygroup"
                    ),
                    subnet_groups: dataset.filter(
                        (item) => item.type.toLowerCase() == "subnets"
                    ),
                    subnet: dataset.filter(
                        (item) => item.type.toLowerCase() == "subnet"
                    ),
                    ec2: dataset.filter(
                        (item) => item.type.toLowerCase() == "ec2"
                    ),
                    ebs: dataset.filter(
                        (item) => item.type.toLowerCase() == "ebs"
                    ),
                    ig: dataset.filter(
                        (item) => item.type.toLowerCase() == "internetgateway"
                    ),
                    s3_groups: dataset.filter(
                        (item) => item.type.toLowerCase() == "s3_group"
                    ),
                    s3: dataset.filter(
                        (item) => item.type.toLowerCase() == "s3"
                    ),
                    rds_groups: dataset.filter(
                        (item) => item.type.toLowerCase() == "rds_group"
                    ),
                    rds: dataset.filter(
                        (item) => item.type.toLowerCase() == "rds"
                    ),
                };

                function make_dataset(resource, parent, vs, check_link) {
                    for (let element of resource) {
                        if (check_link) {
                            for (let link of element.link) {
                                if (parent.id == link) {
                                    for (let child of Object.keys(vs)) {
                                        make_dataset(
                                            datasets[child],
                                            element,
                                            vs[child],
                                            true
                                        );
                                    }
                                    parent.children.push(element);
                                }
                            }
                        } else {
                            for (let child of Object.keys(vs)) {
                                make_dataset(
                                    datasets[child],
                                    element,
                                    vs[child],
                                    true
                                );
                            }
                            parent.push(element);
                        }
                    }
                }
                make_dataset(
                    datasets.cloud,
                    visualDataset,
                    VisualStructure,
                    false
                );
            }

            let root = d3.hierarchy({
                id: "CRMSRootId",
                name: "CRMS",
                type: "CRMS",
                link: [],
                children: visualDataset,
            })

            let nodeSvg, linkSvg, simulation;

            let svg = d3
                .select(".Visual")
                .call(
                    d3
                        .zoom()
                        .scaleExtent([1 / 100, 8])
                        .on("zoom", zoomed)
                )
                .style("background-color", "#25272b")
                .on("dblclick.zoom", null)
                .on("contextmenu", function (d, i) {
                    d3.event.preventDefault();
                })
                .select("g");

            svg.append("svg:defs")
                .selectAll("marker")
                .data(["end"]) // Different link/path types can be defined here
                .enter()
                .append("svg:marker") // This section adds in the arrows
                .attr("id", String)
                .style("stroke", "transparent")
                .style("fill", "#7d9edf")
                .attr("viewBox", "0 -5 10 10")
                .attr("markerWidth", 7)
                .attr("markerHeight", 7)
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
                .on("tick", ticked);

            function zoomed() {
                svg.attr("transform", d3.event.transform);
            }
            
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

                let linkEnter = linkSvg
                    .enter()
                    .append("line")
                    .attr("class", "link")
                    .style("stroke-width", "1.8")
                    .style("stroke", "#7d9edf")
                    .attr("marker-end", "url(#end)");

                linkSvg = linkEnter.merge(linkSvg);

                nodeSvg = svg.selectAll(".node").data(nodes, function (d) {
                    return d.id;
                });

                nodeSvg.exit().remove();

                let nodeEnter = nodeSvg
                    .enter()
                    .append("g")
                    .attr("class", "node")
                    .on("mouseover", function (d) {
                        let thisNode = d.id;
                        let thislink = d;
                        let tmp = 0;

                        function compareId(list, target) {
                            for (let child of list) {
                                if (child.data.id == target.data.id) {
                                    return true;
                                }
                            }
                            return false;
                        }

                        function compareList(source, target) {
                            return compareId(source.children, target) ||
                                compareId(target.children, source) ||
                                compareId(source.data.link, target) ||
                                compareId(target.link, source)
                                ? 1
                                : 0.2;
                        }

                        d3.selectAll(".link").attr("opacity", function (d) {
                            return d.source.id == thisNode ||
                                d.target.id == thisNode
                                ? 1
                                : 0.2;
                        });
                        d3.selectAll(".node").attr("opacity", function (d) {
                            if (
                                thislink.id == d.data.id ||
                                thislink.id == d.data.name
                            ) {
                                return 1;
                            } else {
                                try {
                                    return compareList(thislink, d);
                                } catch {
                                    try {
                                        return compareList(d, thislink);
                                    } catch {
                                        try {
                                            for (
                                                let i = 0;
                                                i < thislink.data.link.length;
                                                i++
                                            ) {
                                                if (
                                                    thislink.data.link[i] ==
                                                    d.data.id
                                                ) {
                                                    return 1;
                                                }
                                            }
                                            for (
                                                let i = 0;
                                                i < d.data.link.length;
                                                i++
                                            ) {
                                                if (
                                                    d.data.link[i] ==
                                                    thislink.data.id
                                                ) {
                                                    return 1;
                                                }
                                            }
                                        } catch {
                                            for (
                                                let i = 0;
                                                i < d.data.link.length;
                                                i++
                                            ) {
                                                if (
                                                    d.data.link[i] ==
                                                    thislink.data.id
                                                ) {
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
                                    for (
                                        let j = 0;
                                        j < d.children[i].data.link.length;
                                        j++
                                    ) {
                                        if (
                                            d.children[i].data.link[j].includes(
                                                ":securitygroup:"
                                            )
                                        ) {
                                            d.data.link.push(
                                                d.children[i].data.link[j]
                                            );
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
                    .call(
                        d3
                            .drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended)
                    );

                nodeEnter
                    .append("circle")
                    .attr("stroke", function (d) {
                        let data = d.data;
                        let rType = d.data.type;
                        try {
                            let status = resourceState[rType](data.data);
                            if (rType == "ebs") {
                                status -= 6;
                            }
                            let colors = [
                                "#535861",
                                "#ff5a76",
                                "#ff5a76",
                                "#ff5a76",
                                "#9298b1",
                                "#75D6E6",
                            ];
                            return colors[status];
                        } catch (e) {
                            return "#7d9edf";
                        }
                    })
                    .attr("stroke-width", "6")
                    .attr("fill", "none")
                    .attr("r", function (d) {
                        return IMAGE_TYPE[d.data.type].circle_size;
                    });

                nodeEnter
                    .append("svg:image")
                    .attr("xlink:href", function (d) {
                        return IMAGE_TYPE[d.data.type].image;
                    })
                    .attr("height", function (d) {
                        return IMAGE_TYPE[d.data.type].circle_size * 1.5;
                    })
                    .attr("width", function (d) {
                        return IMAGE_TYPE[d.data.type].circle_size * 1.5;
                    })
                    .attr("x", function (d) {
                        return -(IMAGE_TYPE[d.data.type].circle_size * 1.5) / 2;
                    })
                    .attr("y", function (d) {
                        return -(IMAGE_TYPE[d.data.type].circle_size * 1.5) / 2;
                    })
                    .on("click", (d) => {
                        click(d, stateFunc, preState);
                    });

                nodeEnter
                    .append("text")
                    .attr("dy", (d) => {
                        return (
                            (IMAGE_TYPE[d.data.type].circle_size * 1.5) / 2 + 3
                        );
                    })
                    .style("fill", "#7d9edf")
                    .attr("stroke", "white")
                    .attr("stroke-width", "0.2")
                    .style("font-family", "NanumSquare")
                    .style("font-weight", "500")
                    .style("font-size", "16px")
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
                        let angle = Math.atan2(
                            d.target.y - d.source.y,
                            d.target.x - d.source.x
                        );
                        let length =
                            IMAGE_TYPE[d.source.data.type].circle_size *
                            Math.cos(angle) *
                            1.25;
                        return d.source.x + length;
                    })
                    .attr("y1", function (d) {
                        let angle = Math.atan2(
                            d.target.y - d.source.y,
                            d.target.x - d.source.x
                        );
                        let length =
                            IMAGE_TYPE[d.source.data.type].circle_size *
                            Math.sin(angle) *
                            1.25;
                        return d.source.y + length;
                    })
                    .attr("x2", function (d) {
                        let angle = Math.atan2(
                            d.target.y - d.source.y,
                            d.target.x - d.source.x
                        );
                        let length =
                            IMAGE_TYPE[d.target.data.type].circle_size *
                            Math.cos(angle) *
                            1.28;
                        return d.target.x - length;
                    })
                    .attr("y2", function (d) {
                        let angle = Math.atan2(
                            d.target.y - d.source.y,
                            d.target.x - d.source.x
                        );
                        let length =
                            IMAGE_TYPE[d.target.data.type].circle_size *
                            Math.sin(angle) *
                            1.28;
                        return d.target.y - length;
                    });

                nodeSvg.attr("transform", function (d) {
                    return "translate(" + d.x + ", " + d.y + ")";
                });
            }

            function click(d, clickFunc, preState) {
                try {
                    clickFunc({
                        instanceData: d.data,
                        showHide: !preState.showHide,
                    });
                } catch (e) {
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
                    nodes.push(node);
                }
                recurse(root);
                return nodes;
            }
        }
    }

    async componentDidMount() {
        this.setState({ keyList: await this.getKeyData() });
        this.setState({ dataset: await this.getVisualData(true) });

        if (this.state.isFirst) {
            this.drawChart();
            this.setState({ isFirst: false });
        }
    }

    render() {
        return (
            <>
                <CreateModal />
                <Modal
                    show={this.state.showHide}
                    onHide={this.handleModalShowHide}
                    size="lg"
                    dialogClassName="width :50%"
                    dialogClassName="height:50%"
                    centered
                    scrollable={true}
                >
                    <Modal.Header
                        closeButton
             
                    >
                        <Modal.Title>
                            {this.state.instanceData
                                ? this.state.instanceData.type
                                : ""}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
