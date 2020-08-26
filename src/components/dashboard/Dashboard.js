import React, { Component } from 'react';
import Sidemenu from '../sidemenu/sidemenu';
import  './dashboard.scss';
import DashboardTable from './dashboard-table';
import NumberWidget from './number-widget';
import { Line as LineChart } from "react-chartjs-2";

function chartData() {
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June' ],
      datasets: [
        {
          label: '사용 요금',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: '#fff',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [45, 90, 83, 32, 50, 70],
        },
      ]
    }
  }
  
  const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 100,
    datasetFill: true,
    legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
  }
  
  const styles = {
    graphContainer: {
      background: '#212125',
      borderRadius : '.5rem',
      padding: '15px',
    }
  }
  
  class Dashboard extends React.Component {
  
    constructor(props) {
      super(props)
      this.state = {
        data: chartData()
      }
    }
  
    render() {
      return (
        <div className="dashboard-page">
            <Sidemenu/>
            <div className="board-container">
                <h3>Dashboard</h3>
                <div className="resource-list">
                    <div className="resource compute">
                        <div className="compute-list">
                            <NumberWidget 
                                className="compute surver"
                                title = "Server"
                                number = "1"
                                progress = {{
                                    value : 50,
                                    label : 'compute'
                                }}
                            />
                            <NumberWidget 
                                className="compute volume"
                                title = "Volume"
                                number = "20개"
                                progress = {{
                                    value : 20,
                                    label : 'compute'
                                }}
                            />
                            <NumberWidget 
                                className="compute ip"
                                title = "IP"
                                progress = {{
                                    value : 10,
                                    label : 'compute'
                                }}
                            />
                            <NumberWidget 
                                className="compute key-pair"
                                title = "Key Pair"
                                progress = {{
                                    value : 25,
                                    label : 'compute'
                                }}
                            />
                        </div>
                    </div>
                    <div className="resource database">
                        <div>
                            <NumberWidget 
                                    className="database db"
                                    title = "Database"
                                    progress = {{
                                        value : 90,
                                        label : 'database'
                                    }}
                            />
                        </div>
                    </div>
                    <div className="resource storage">
                        <div className="compute-list">
                            <NumberWidget 
                                    className="storage vpc"
                                    title = "VPC"
                                    progress = {{
                                        value : 90,
                                        label : 'storage'
                                    }}
                            />
                            <NumberWidget 
                                    className="storage subnet"
                                    title = "Subnet"
                                    progress = {{
                                        value : 5,
                                        label : 'storage'
                                    }}
                            />
                            <NumberWidget 
                                    className="storage security-group"
                                    title = "Security Group"
                                    progress = {{
                                        value : 20,
                                        label : 'storage'
                                    }}
                            />
                        </div>
                    </div>
                    <div className="resource network">
                        <div>
                            <NumberWidget 
                                    className="network security-group"
                                    title = "Bucket"
                                    progress = {{
                                        value : 5,
                                        label : 'network'
                                    }}
                            />
                        </div>
                    </div>
                </div>
                <div className="chart-container">
                    <div className="left-chart">
                        <h3>최근 6개월 사용 금액</h3>
                        <div style={styles.graphContainer}>
                        <LineChart data={this.state.data}
                            options={options}
                            width="500" height="200" />
                        </div>
                    </div>
                    <div className="right-chart">
                        <h3>이름없음 - 테이블 자리</h3>
                        <DashboardTable/>
                    </div>
                </div>
            </div>
        </div>
      )
    }
  }
  
export default Dashboard;
