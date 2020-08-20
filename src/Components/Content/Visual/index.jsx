import React,{Component} from 'react';
import {connect} from 'react-redux';
import {AddResource} from  '../../../actions';
import * as d3 from 'd3';
import './Visual.css'

const data={
  instancedata : [
    {
      "id": "i-0acd99ba8df692892",
      "name": "NevationServer",
      "link": [
        "subnet-6ed08922",
        "sg-00174d37f556e051b"
      ],
      "type": "ec2",
      "data": {
        "InstanceType": "t2.micro",
        "ImageId": "ami-0a25005e83c56767a",
        "InstanceId": "i-0acd99ba8df692892",
        "BlockDeviceMappings": [
          {
            "DeviceName": "/dev/sda1",
            "Ebs": {
              "AttachTime": "2019-07-24T10:43:57.000Z",
              "DeleteOnTermination": true,
              "Status": "attached",
              "VolumeId": "vol-0e537238313263ee4"
            }
          }
        ],
        "KeyName": "NevationKey",
        "MaxCount": 1,
        "MinCount": 1,
        "SecurityGroups": [
          {
            "GroupName": "launch-wizard-1",
            "GroupId": "sg-00174d37f556e051b"
          }
        ],
        "SubnetId": "subnet-6ed08922",
        "Tags": [
          {
            "Key": "Name",
            "Value": "NevationServer"
          }
        ]
      }
    },
    {
      "id": "vol-0e537238313263ee4",
      "name": "vol-0e537238313263ee4",
      "link": [
        "i-0acd99ba8df692892"
      ],
      "type": "ebs",
      "data": {
        "Attachments": [
          {
            "AttachTime": "2019-07-24T10:43:57.000Z",
            "Device": "/dev/sda1",
            "InstanceId": "i-0acd99ba8df692892",
            "State": "attached",
            "VolumeId": "vol-0e537238313263ee4",
            "DeleteOnTermination": true
          }
        ],
        "AvailabilityZone": "ap-northeast-2c",
        "CreateTime": "2019-07-24T10:43:57.581Z",
        "Encrypted": false,
        "Size": 8,
        "SnapshotId": "snap-0f0af9b836996d175",
        "State": "in-use",
        "VolumeId": "vol-0e537238313263ee4",
        "Iops": 100,
        "Tags": [],
        "VolumeType": "gp2",
        "MultiAttachEnabled": false
      }
    },
    {
      "id": "vpc-2bef1440",
      "name": "vpc-2bef1440",
      "link": [
        "CLOUD"
      ],
      "type": "vpc",
      "data": {
        "CidrBlock": "172.31.0.0/16",
        "DhcpOptionsId": "dopt-bad47bd1",
        "State": "available",
        "InstanceTenancy": "default",
        "Ipv6CidrBlockAssociationSet": [],
        "CidrBlockAssociationSet": [
          {
            "AssociationId": "vpc-cidr-assoc-722a771a",
            "CidrBlock": "172.31.0.0/16",
            "CidrBlockState": {
              "State": "associated"
            }
          }
        ],
        "IsDefault": true
      }
    },
    {
      "id": "subnet-6ed08922",
      "name": "subnet-6ed08922",
      "link": [
        "vpc-2bef1440"
      ],
      "type": "subnet",
      "data": {
        "AvailabilityZone": "ap-northeast-2c",
        "AvailabilityZoneId": "apne2-az3",
        "CidrBlock": "172.31.32.0/20",
        "State": "available",
        "Ipv6CidrBlockAssociationSet": [],
        "SubnetArn": "arn:aws:ec2:ap-northeast-2:236966029519:subnet/subnet-6ed08922"
      }
    },
    {
      "id": "subnet-2b12e740",
      "name": "subnet-2b12e740",
      "link": [
        "vpc-2bef1440"
      ],
      "type": "subnet",
      "data": {
        "AvailabilityZone": "ap-northeast-2a",
        "AvailabilityZoneId": "apne2-az1",
        "CidrBlock": "172.31.0.0/20",
        "State": "available",
        "Ipv6CidrBlockAssociationSet": [],
        "SubnetArn": "arn:aws:ec2:ap-northeast-2:236966029519:subnet/subnet-2b12e740"
      }
    },
    {
      "id": "subnet-8bcdebd7",
      "name": "subnet-8bcdebd7",
      "link": [
        "vpc-2bef1440"
      ],
      "type": "subnet",
      "data": {
        "AvailabilityZone": "ap-northeast-2d",
        "AvailabilityZoneId": "apne2-az4",
        "CidrBlock": "172.31.48.0/20",
        "State": "available",
        "Ipv6CidrBlockAssociationSet": [],
        "SubnetArn": "arn:aws:ec2:ap-northeast-2:236966029519:subnet/subnet-8bcdebd7"
      }
    },
    {
      "id": "subnet-8458feff",
      "name": "subnet-8458feff",
      "link": [
        "vpc-2bef1440"
      ],
      "type": "subnet",
      "data": {
        "AvailabilityZone": "ap-northeast-2b",
        "AvailabilityZoneId": "apne2-az2",
        "CidrBlock": "172.31.16.0/20",
        "State": "available",
        "Ipv6CidrBlockAssociationSet": [],
        "SubnetArn": "arn:aws:ec2:ap-northeast-2:236966029519:subnet/subnet-8458feff"
      }
    },
    {
      "id": "sg-00174d37f556e051b",
      "name": "launch-wizard-1",
      "link": [
        "vpc-2bef1440"
      ],
      "type": "securitygroup",
      "data": {
        "IpPermissions": [
          {
            "FromPort": 80,
            "IpProtocol": "tcp",
            "IpRanges": [
              {
                "CidrIp": "0.0.0.0/0"
              }
            ],
            "Ipv6Ranges": [
              {
                "CidrIpv6": "::/0"
              }
            ],
            "PrefixListIds": [],
            "ToPort": 80,
            "UserIdGroupPairs": []
          },
          {
            "FromPort": 22,
            "IpProtocol": "tcp",
            "IpRanges": [
              {
                "CidrIp": "0.0.0.0/0"
              }
            ],
            "Ipv6Ranges": [],
            "PrefixListIds": [],
            "ToPort": 22,
            "UserIdGroupPairs": []
          }
        ],
        "VpcId": "vpc-2bef1440",
        "tagname": ""
      }
    },
    {
      "id": "sg-b91790d7",
      "name": "default",
      "link": [
        "vpc-2bef1440"
      ],
      "type": "securitygroup",
      "data": {
        "IpPermissions": [
          {
            "IpProtocol": "-1",
            "IpRanges": [],
            "Ipv6Ranges": [],
            "PrefixListIds": [],
            "UserIdGroupPairs": [
              {
                "GroupId": "sg-b91790d7",
                "UserId": "236966029519"
              }
            ]
          }
        ],
        "VpcId": "vpc-2bef1440",
        "tagname": ""
      }
    }
  ]
}

const test={
  name:"ClOUD",
  type:"cloud",
  region:"",
  platform:"",
  instype:"",
  size:"",
  parent:"",
  link:[],
  children:[

  ] 
}

var vpc = data.instancedata.filter(item=>item.type.toLowerCase().includes("vpc"));
var sg=data.instancedata.filter(item=>item.type.toLowerCase().includes("securitygroup"));
var ec2 = data.instancedata.filter(item=>item.type.toLowerCase().includes("ec2"));
var subnet=data.instancedata.filter(item=>item.type.toLowerCase().includes("subnet"));
var ebs = data.instancedata.filter(item=>item.type.toLowerCase().includes("ebs"));

for (let tmp of vpc){
  tmp.children=[];
  test.children.push(tmp);
}

for (let tmp of subnet){
  tmp.children=[];
  for(let tmp_ec2 of ec2){
    for(var i=0;i<tmp_ec2.link.length;i++){
      if(tmp_ec2.link[i]==tmp.id){
        tmp_ec2.children=[];
        for (let tmp_ebs of ebs){
          tmp.children=[];
          for(var j=0;j<tmp_ebs.link.length;j++){
            if(tmp_ebs.link[i]==tmp_ec2.id){
              tmp_ec2.children.push(tmp_ebs);
            }
          }
        }
        tmp.children.push(tmp_ec2);        
      }
    }
  }
  for(var i=0;i<test.children.length;i++){
    if(test.children[i].id==tmp.link[0])
      test.children[i].children.push(tmp);
  }
}

for (let tmp of sg){
  tmp.children=[];
  for(var i=0;i<test.children.length;i++){
    if(test.children[i].id==tmp.link[0])
      test.children[i].children.push(tmp);
  }
}

class Visual extends Component{
    constructor(props){
      super(props);

      this.state={
          payload:{
            name:"",
            type:"",
            region:"",
            platform:"",
            instype:"",
            size:"",
            parent:"",
            link:[],
            children:[] 
         }
        }
    }

    drawChart() {
      var width = parseInt(window.getComputedStyle(document.querySelector("#root > div > main > div.Content > svg")).width),
          height = parseInt(window.getComputedStyle(document.querySelector("#root > div > main > div.Content > svg")).height)-200;

      //initialising hierarchical data
      var root = d3.hierarchy(test);
      
      var i = 0;
      
      var transform = d3.zoomIdentity;
      
      var nodeSvg, linkSvg, simulation, nodeEnter, linkEnter;

      var tooltip = d3.select(".tooltip")
      .attr("class", "tooltip")
      .style("display", "none")
      .on("contextmenu",function(d){
        d3.event.preventDefault();});
      
      var svg = d3.select("svg")
        .call(d3.zoom().scaleExtent([1 / 2, 8]).on("zoom", zoomed))
        .style("background-color","#27262b")
        .on("dblclick.zoom",null)
        .on("contextmenu",function(d,i){
            d3.event.preventDefault();
        })
        .append("g")
        .attr("transform", "translate(40,0)")
    
        svg.append("svg:defs").selectAll("marker")
            .data(["end"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .style("stroke","#ffc14d")
            .style("fill","#ffc14d")
            .attr("viewBox", "0 -5 10 10")
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");
      
      function zoomed() {
        tooltip.style("display", "none")
        svg.attr("transform", d3.event.transform);
      }
      
      simulation = d3.forceSimulation()
        .force("link", d3.forceLink(linkSvg).distance(300))
        .alphaDecay(.0001)
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("center", d3.forceCenter(width / 2, height / 2+100))
        .force("colide",d3.forceCollide().radius(d=>d.r*500))
        .on("tick", ticked);
      
      update();
      
      function update() {
        var nodes = flatten(root);
        var links = root.links();

        for(var i=0;i<nodes.length;i++){
            if(nodes[i].data.link.length>0){
                for(var j=0;j<nodes[i].data.link.length;j++){
                    for(var h=0;h<nodes.length;h++){
                        if(nodes[i].data.link[j]==nodes[h].id){
                          console.log(nodes[i].data.link[j],nodes[h].id)
                            links.push({source:i,target:h})
                        }
                        
                    }
                }
            }
        }

        linkSvg = svg.selectAll(".link")
            .data(links, function(d) {
            return d.target.id;
          })
        
      
        linkSvg.exit().remove();
      
        var linkEnter = linkSvg.enter()
          .append("line")
          .attr("class", "link")
          .style("stroke","#ffc14d")
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
          .on("mouseover", function(d) {
            var thisNode = d.id
            var thislink=d
            d3.selectAll(".link").attr("opacity", function(d) {
                    return (d.source.id == thisNode || d.target.id == thisNode) ? 1 : 0.2
            });
            d3.selectAll(".node").attr("opacity", function(d) {
                    if(d.data.link.length>0){
                        for(var i=0;i<d.data.link.length;i++){
                            if(d.data.link[i]==thislink.data.name)
                            return "1";
                        }
                    }
                    if(d.data.name==thislink.data.parent||d.id==thisNode||d.data.parent==thislink.data.name)
                        return "1";
                    else
                        return "0.2";
            });                    
          })
          .on("mouseout", function(d) {
                d3.selectAll(".link").attr("opacity","1");
                d3.selectAll(".node").attr("opacity","1");
          })
          .on("contextmenu",function(d){
              d3.event.preventDefault();
              var tmp=[];
              if(d.data.children.length>0){
                for(var i=0;i<d.data.children.length;i++){
                  tmp.push(d.data.children[i].name)
                }
              }
              tooltip.transition()
              .duration(300)
              .style("opacity",1)
              .style("display", "block")
              .style('pointer-events', 'visiblePainted')
              tooltip.html(
                "<div class='toolbut'>"+
                  "<button class='hide' onClick={document.getElementsByClassName('tooltip')[0].style.display='none';}> X </button>" +
                "</div>"+
                "<hr/>"+
                "Name : " + d.data.name + "<hr/>" +
                "Type : " + d.data.type + "<hr/>" +
                "Parent : " + d.data.parent + "<hr/>" +
                "Children : " + tmp + "<hr/>"+
                "Link : " + d.data.link + "<hr/>"+
                "<div class='toolbut'>"+
                "<button> Detail </button>" + 
                "<button> Delete </button>"+
                "</div>"
              )
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY + 10) + "px");
            })
          .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))

        nodeEnter.append("circle")
        .attr("stroke","#ffc14d")
        .attr("stroke-width","3")
        .attr("fill","none")
        .attr("r",50)

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
        .attr("x", function(d) { return -30;})
        .attr("y", function(d) { return -35;})
        .attr("height", 60)
        .attr("width", 60)
        .on("click", click);
      
        nodeEnter.append("text")
          .attr("dy", 33)
          .style("fill","#ffc14d")
          .style("font-family","NanumSquare")
          .style("font-weight","bold")
          .style("font-size","14px")
          .style("text-anchor","middle")
          .text(function(d) { 
            return d.data.name;
          });
      
        nodeSvg = nodeEnter.merge(nodeSvg);

        var addresshow = d3.select(".add_res");
        var resnoshow = addresshow.select("#cancel");
        resnoshow.on("click",function(){
          addresshow.style("display","none");
        })
      
        simulation
          .nodes(nodes)
      
        simulation.force("link")
          .links(links);
      
      }

      function ticked() {
        
        linkSvg
          .attr("x1", function(d) {
            var angle=Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
            var length=60*Math.cos(angle);
            return d.source.x+length;
          })
          .attr("y1", function(d) {
            var angle=Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
            var length=60*Math.sin(angle);
            return d.source.y+length;
          })
          .attr("x2", function(d) {
            var angle=Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
            var length=70*Math.cos(angle);
            return d.target.x-length;
          })
          .attr("y2", function(d) {
            var angle=Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
            var length=70*Math.sin(angle);
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
          simulation.restart()
          ;
        } else {
          d.children = d._children;
          d._children = null;
          update();
          simulation.restart();
        }
      }
      
      function dragstarted(d) {
        tooltip.style("display", "none")
        .style('pointer-events', 'visiblePainted')
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

    componentDidMount(){
        this.drawChart();
    }

    render(){
        return(
            <>
              <div className="tooltip"> 
              </div>   
              <svg className="Visual">           
              </svg>
            </>
        );
    }
}

let mapStateToProps=(state)=>{
  console.log(state.show,state.Add)
}

Visual=connect(mapStateToProps)(Visual);

export default Visual;