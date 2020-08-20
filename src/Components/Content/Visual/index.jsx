import React,{Component} from 'react';
import {connect} from 'react-redux';
import {AddResource} from  '../../../actions';
import * as d3 from 'd3';
import './Visual.css'
import { Modal } from 'react-bootstrap';
import { DataFormat, CreateVisualDataFormat } from './resource'


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
      {
        name:"vpc_test",
        type:"VPC",
        parent:"CLOUD",
        link:[],
        children:[
            {
                name:"test_sub",
                type:"Subnet",
                parent:"vpc_test",
                link:[],
                children:[
                    {
                        name:"ec2_1",
                        type:"EC2",
                        parent:"test_sub",
                        platform:"",
                        instype:"",
                        size:"",
                        EIP:"",
                        EBS_size:"",
                        EBS_type:"",
                        children:"",
                        link:["ec2_2","sg"]
                    },
                    {
                        name:"ec2_2",
                        type:"EC2",
                        parent:"test_sub",
                        platform:"",
                        instype:"",
                        size:"",
                        EIP:"",
                        EBS_size:"",
                        EBS_type:"",
                        children:"",
                        link:["ec2_1","sg"]
                    },
                    {
                        name:"sg",
                        type:"SecurityGroup",
                        parent:"test_sub",
                        children:"",
                        link:["ec2_1","ec2_2"]
                    }
                ]
            },
            {
                name:"sn1",
                type:"Subnet",
                parent:"vpc_test",
                children:"",
                link:[]
            }
        ]
    }
    ] 
}

class Visual extends Component{
    constructor(props){
      let jsdata = {"result":true,"vendor":"aws","data":{"compute":{"ec2":[{"Groups":[],"Instances":[{"AmiLaunchIndex":0,"ImageId":"ami-0a25005e83c56767a","InstanceId":"i-0acd99ba8df692892","InstanceType":"t2.micro","KeyName":"NevationKey","LaunchTime":"2020-08-10T13:29:55.000Z","Monitoring":{"State":"disabled"},"Placement":{"AvailabilityZone":"ap-northeast-2c","GroupName":"","Tenancy":"default"},"PrivateDnsName":"ip-172-31-47-215.ap-northeast-2.compute.internal","PrivateIpAddress":"172.31.47.215","ProductCodes":[],"PublicDnsName":"","State":{"Code":80,"Name":"stopped"},"StateTransitionReason":"User initiated (2020-08-10 13:33:04 GMT)","SubnetId":"subnet-6ed08922","VpcId":"vpc-2bef1440","Architecture":"x86_64","BlockDeviceMappings":[{"DeviceName":"/dev/sda1","Ebs":{"AttachTime":"2019-07-24T10:43:57.000Z","DeleteOnTermination":true,"Status":"attached","VolumeId":"vol-0e537238313263ee4"}}],"ClientToken":"","EbsOptimized":false,"EnaSupport":true,"Hypervisor":"xen","ElasticGpuAssociations":[],"ElasticInferenceAcceleratorAssociations":[],"NetworkInterfaces":[{"Attachment":{"AttachTime":"2019-07-24T10:43:56.000Z","AttachmentId":"eni-attach-0840108df9f6d8b15","DeleteOnTermination":true,"DeviceIndex":0,"Status":"attached"},"Description":"","Groups":[{"GroupName":"launch-wizard-1","GroupId":"sg-00174d37f556e051b"}],"Ipv6Addresses":[],"MacAddress":"0a:cc:b6:92:a8:62","NetworkInterfaceId":"eni-0239f8a62c60c7ca8","OwnerId":"236966029519","PrivateDnsName":"ip-172-31-47-215.ap-northeast-2.compute.internal","PrivateIpAddress":"172.31.47.215","PrivateIpAddresses":[{"Primary":true,"PrivateDnsName":"ip-172-31-47-215.ap-northeast-2.compute.internal","PrivateIpAddress":"172.31.47.215"}],"SourceDestCheck":true,"Status":"in-use","SubnetId":"subnet-6ed08922","VpcId":"vpc-2bef1440","InterfaceType":"interface"}],"RootDeviceName":"/dev/sda1","RootDeviceType":"ebs","SecurityGroups":[{"GroupName":"launch-wizard-1","GroupId":"sg-00174d37f556e051b"}],"SourceDestCheck":true,"StateReason":{"Code":"Client.UserInitiatedShutdown","Message":"Client.UserInitiatedShutdown: User initiated shutdown"},"Tags":[{"Key":"Name","Value":"NevationServer"}],"VirtualizationType":"hvm","CpuOptions":{"CoreCount":1,"ThreadsPerCore":1},"CapacityReservationSpecification":{"CapacityReservationPreference":"open"},"HibernationOptions":{"Configured":false},"Licenses":[],"MetadataOptions":{"State":"applied","HttpTokens":"optional","HttpPutResponseHopLimit":1,"HttpEndpoint":"enabled"}}],"OwnerId":"236966029519","ReservationId":"r-0b7476254f81d8a47"}],"ebs":{"Volumes":[{"Attachments":[{"AttachTime":"2019-07-24T10:43:57.000Z","Device":"/dev/sda1","InstanceId":"i-0acd99ba8df692892","State":"attached","VolumeId":"vol-0e537238313263ee4","DeleteOnTermination":true}],"AvailabilityZone":"ap-northeast-2c","CreateTime":"2019-07-24T10:43:57.581Z","Encrypted":false,"Size":8,"SnapshotId":"snap-0f0af9b836996d175","State":"in-use","VolumeId":"vol-0e537238313263ee4","Iops":100,"Tags":[],"VolumeType":"gp2","MultiAttachEnabled":false}]}},"network":{"vpc":[{"CidrBlock":"172.31.0.0/16","DhcpOptionsId":"dopt-bad47bd1","State":"available","VpcId":"vpc-2bef1440","OwnerId":"236966029519","InstanceTenancy":"default","Ipv6CidrBlockAssociationSet":[],"CidrBlockAssociationSet":[{"AssociationId":"vpc-cidr-assoc-722a771a","CidrBlock":"172.31.0.0/16","CidrBlockState":{"State":"associated"}}],"IsDefault":true,"Tags":[]}],"subnet":[{"AvailabilityZone":"ap-northeast-2c","AvailabilityZoneId":"apne2-az3","AvailableIpAddressCount":4090,"CidrBlock":"172.31.32.0/20","DefaultForAz":true,"MapPublicIpOnLaunch":true,"MapCustomerOwnedIpOnLaunch":false,"State":"available","SubnetId":"subnet-6ed08922","VpcId":"vpc-2bef1440","OwnerId":"236966029519","AssignIpv6AddressOnCreation":false,"Ipv6CidrBlockAssociationSet":[],"Tags":[],"SubnetArn":"arn:aws:ec2:ap-northeast-2:236966029519:subnet/subnet-6ed08922"},{"AvailabilityZone":"ap-northeast-2a","AvailabilityZoneId":"apne2-az1","AvailableIpAddressCount":4091,"CidrBlock":"172.31.0.0/20","DefaultForAz":true,"MapPublicIpOnLaunch":true,"MapCustomerOwnedIpOnLaunch":false,"State":"available","SubnetId":"subnet-2b12e740","VpcId":"vpc-2bef1440","OwnerId":"236966029519","AssignIpv6AddressOnCreation":false,"Ipv6CidrBlockAssociationSet":[],"Tags":[],"SubnetArn":"arn:aws:ec2:ap-northeast-2:236966029519:subnet/subnet-2b12e740"},{"AvailabilityZone":"ap-northeast-2d","AvailabilityZoneId":"apne2-az4","AvailableIpAddressCount":4091,"CidrBlock":"172.31.48.0/20","DefaultForAz":true,"MapPublicIpOnLaunch":true,"MapCustomerOwnedIpOnLaunch":false,"State":"available","SubnetId":"subnet-8bcdebd7","VpcId":"vpc-2bef1440","OwnerId":"236966029519","AssignIpv6AddressOnCreation":false,"Ipv6CidrBlockAssociationSet":[],"Tags":[],"SubnetArn":"arn:aws:ec2:ap-northeast-2:236966029519:subnet/subnet-8bcdebd7"},{"AvailabilityZone":"ap-northeast-2b","AvailabilityZoneId":"apne2-az2","AvailableIpAddressCount":4091,"CidrBlock":"172.31.16.0/20","DefaultForAz":true,"MapPublicIpOnLaunch":true,"MapCustomerOwnedIpOnLaunch":false,"State":"available","SubnetId":"subnet-8458feff","VpcId":"vpc-2bef1440","OwnerId":"236966029519","AssignIpv6AddressOnCreation":false,"Ipv6CidrBlockAssociationSet":[],"Tags":[],"SubnetArn":"arn:aws:ec2:ap-northeast-2:236966029519:subnet/subnet-8458feff"}],"securityGroup":[{"Description":"launch-wizard-1 created 2019-07-24T19:42:06.799+09:00","GroupName":"launch-wizard-1","IpPermissions":[{"FromPort":80,"IpProtocol":"tcp","IpRanges":[{"CidrIp":"0.0.0.0/0"}],"Ipv6Ranges":[{"CidrIpv6":"::/0"}],"PrefixListIds":[],"ToPort":80,"UserIdGroupPairs":[]},{"FromPort":22,"IpProtocol":"tcp","IpRanges":[{"CidrIp":"0.0.0.0/0"}],"Ipv6Ranges":[],"PrefixListIds":[],"ToPort":22,"UserIdGroupPairs":[]}],"OwnerId":"236966029519","GroupId":"sg-00174d37f556e051b","IpPermissionsEgress":[{"IpProtocol":"-1","IpRanges":[{"CidrIp":"0.0.0.0/0"}],"Ipv6Ranges":[],"PrefixListIds":[],"UserIdGroupPairs":[]}],"Tags":[],"VpcId":"vpc-2bef1440"},{"Description":"default VPC security group","GroupName":"default","IpPermissions":[{"IpProtocol":"-1","IpRanges":[],"Ipv6Ranges":[],"PrefixListIds":[],"UserIdGroupPairs":[{"GroupId":"sg-b91790d7","UserId":"236966029519"}]}],"OwnerId":"236966029519","GroupId":"sg-b91790d7","IpPermissionsEgress":[{"IpProtocol":"-1","IpRanges":[{"CidrIp":"0.0.0.0/0"}],"Ipv6Ranges":[],"PrefixListIds":[],"UserIdGroupPairs":[]}],"Tags":[],"VpcId":"vpc-2bef1440"}]}}}

      console.log(CreateVisualDataFormat(jsdata.vendor, jsdata.data))
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
        .force("link", d3.forceLink(linkSvg).distance(200))
        .alphaDecay(.0001)
        .force("charge", d3.forceManyBody().strength(-1500))
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
                return "/images/compute.svg";
            if(d.data.type=="SecurityGroup")
                return "/images/security_group.svg";
            if(d.data.type=="Subnet")
                return "/images/ec2-container-registry.svg";
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