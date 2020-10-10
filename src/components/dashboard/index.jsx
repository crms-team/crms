import React, { Component } from "react";
import Sidebar from "../sidebar";
import "./dashboard.scss";
import DashboardTable from "./dashboard-table";
import NumberWidget from "./number-widget";
import { Line as LineChart } from "react-chartjs-2";
import { Form } from "react-bootstrap";

const statusColors = {
    create: {
        backgroundColor: "#8CB1FA",
        borderColor: "#8CB1FA",
        pointHighlightFill: "#8CB1FA",
        fillColor: "#7595d420",
        pointColor: "#7595d4",
        pointHighlightStroke: "#7595d4",
    },
    modify: {
        backgroundColor: "#45567A",
        borderColor: "#45567A",
        pointHighlightFill: "#45567A",
        fillColor: "#424f6c20",
        pointColor: "#424f6c",
        pointHighlightStroke: "#424f6c",
    },
    remove: {
        backgroundColor: "#21293B",
        borderColor: "#21293B",
        pointHighlightFill: "#21293B",
        fillColor: "#1e232820",
        pointColor: "#1e2328",
        pointHighlightStroke: "#1e2328",
    },
};
const options = {
    backgroundColor: "#21293B",
    borderColor: "21293B",
};

const styles = {
    graphContainer: {
        background: "#1f2124",
        borderRadius: ".5rem",
        padding: "10px",
        margin: "1rem",
    },
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            statusData: undefined,
            keyValue: "",
            dataset: [],
            graphDataset: {
                labels: [],
                datasets: [
                    {
                        backgroundColor: ["#7D9EDF"],
                    },
                ],
            },
        };

        this.changeDashboardData = this.changeDashboardData.bind(this);
    }

    getHistorySummary(detail) {
        let result = { create: 0, remove: 0, modify: 0 };

        for (let session in detail) {
            for (let resource in detail[session]) {
                for (let status in detail[session][resource]) {
                    result[status] += detail[session][resource][status].length;
                }
            }
        }

        return result;
    }

    async changeDashboardData(e) {
        let key_id = e == undefined ? "" : e.target.value;
        let queryString = key_id != "" ? `key_id=${key_id}` : "";

        let statusData = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/dashboard?${queryString}`
        ).then((res) => res.json());
        let historys = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/cloud/history?count=10&${queryString}`
        ).then((res) => res.json());

        let dataset = [];
        let graphData = {};

        let i = 1;

        for (let history of historys.history) {
            dataset.push({
                index: i++,
                keyId: history.keyId,
                time: history.time,
                title: history.title,
            });

            let timeLabel = history.time.split(".").slice(1, 4).join(".") + "m";
            let summary = this.getHistorySummary(history.detail);

            if (graphData[timeLabel] == undefined) {
                graphData[timeLabel] = { create: 0, remove: 0, modify: 0 };
            }

            for (let status in graphData[timeLabel]) {
                graphData[timeLabel][status] += summary[status];
            }
        }

        let graphDataset = {
            labels: Object.keys(graphData).sort(),
            datasets: [],
        };

        for (let status in statusColors) {
            let dataList = [];

            for (let time of graphDataset.labels) {
                dataList.push(graphData[time][status]);
            }

            graphDataset.datasets.push({
                label: status,
                data: dataList,
                ...statusColors[status],
            });
        }

        this.setState({
            statusData: statusData.data,
            keyValue: key_id,
            dataset: dataset,
            graphDataset: graphDataset,
        });
    }

    async componentDidMount() {
        let response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/cloud/key/list`
        ).then((res) => res.json());
        let key_id = Object.keys(response.keys);
        for (let i = 0; i < key_id.length; i++) {
            key_id[i] = {
                key: key_id[i],
                vendor: response.keys[key_id[i]].vendor,
                region: response.keys[key_id[i]].keys.region,
            };
        }
        localStorage.setItem("key", JSON.stringify(key_id));
        await this.changeDashboardData();
    }

    getResourceStatusData(resource, type = undefined) {
        if (type) {
            return this.state.statusData
                ? this.state.statusData[resource][0] +
                      "/" +
                      this.state.statusData[resource][1]
                : "loading";
        }

        return this.state.statusData && this.state.statusData[resource][1] != 0
            ? (this.state.statusData[resource][0] /
                  this.state.statusData[resource][1]) *
                  100
            : 0;
    }

    render() {
        return (
            <div className="dashboard-page">
                <Sidebar />
                <div className="board-container">
                    <div>
                        <Form className="select__option dashboard-option">
                            <select
                                className="select__option--options form-control"
                                onChange={this.changeDashboardData}
                                value={this.state.keyValue}
                            >
                                <option value="" selected>
                                    All
                                </option>
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
                            </select>
                        </Form>
                    </div>
                    <h3 className="dashboard-title">Dashboard</h3>
                    <div className="resource-list">
                        <div className="resource compute">
                            <div className="compute-list">
                                <NumberWidget
                                    className="compute surver"
                                    title="Server"
                                    number={this.getResourceStatusData(
                                        "server",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "server"
                                        ),
                                        label: "Compute",
                                    }}
                                />
                                <NumberWidget
                                    className="compute volume"
                                    title="Volume"
                                    number={this.getResourceStatusData(
                                        "volume",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "volume"
                                        ),
                                        label: "Compute",
                                    }}
                                />
                                <NumberWidget
                                    className="compute ip"
                                    title="IP"
                                    number={this.getResourceStatusData(
                                        "ip",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData("ip"),
                                        label: "Compute",
                                    }}
                                />
                                <NumberWidget
                                    className="compute key-pair"
                                    title="Key Pair"
                                    number={this.getResourceStatusData(
                                        "keypair",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "keypair"
                                        ),
                                        label: "Compute",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="resource database">
                            <div>
                                <NumberWidget
                                    className="database db"
                                    title="Database"
                                    number={this.getResourceStatusData(
                                        "database",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "database"
                                        ),
                                        label: "Database",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="resource storage">
                            <div className="compute-list">
                                <NumberWidget
                                    className="network vpc"
                                    title="VPC"
                                    number={this.getResourceStatusData(
                                        "vpc",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "vpc"
                                        ),
                                        label: "Network",
                                    }}
                                />
                                <NumberWidget
                                    className="network subnet"
                                    title="Subnet"
                                    number={this.getResourceStatusData(
                                        "subnet",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "subnet"
                                        ),
                                        label: "Network",
                                    }}
                                />
                                <NumberWidget
                                    className="network security-group"
                                    title="Security Group"
                                    number={this.getResourceStatusData(
                                        "securitygroup",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "securitygroup"
                                        ),
                                        label: "Network",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="resource network">
                            <div>
                                <NumberWidget
                                    className="storage bucket"
                                    title="Bucket"
                                    number={this.getResourceStatusData(
                                        "storage",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "storage"
                                        ),
                                        label: "Storage",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="chart-container">
                        <div className="left-chart">
                            <h3>History Graph</h3>
                            <div style={styles.graphContainer}>
                                <LineChart
                                    data={this.state.graphDataset}
                                    options={options}
                                    width="500"
                                    height="300"
                                />
                            </div>
                        </div>
                        <div className="right-chart">
                            <h3>History Summary</h3>
                            <DashboardTable dataset={this.state.dataset} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
