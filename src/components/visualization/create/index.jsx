import React, { Component } from "react";
import {
    Button,
    Modal,
    Tab,
    Col,
    Form,
} from "react-bootstrap";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSync } from "react-icons/fa";
import { summaryType } from "../../../manager";

const EC2Data = {
    Ami: [],
    Type: [{ "InstanceType": "t2.micro", "CurrentGeneration": true, "FreeTierEligible": true, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "xen", "ProcessorInfo": { "SupportedArchitectures": ["i386", "x86_64"], "SustainedClockSpeedInGhz": 2.5 }, "VCpuInfo": { "DefaultVCpus": 1, "DefaultCores": 1, "DefaultThreadsPerCore": 1, "ValidCores": [1], "ValidThreadsPerCore": [1] }, "MemoryInfo": { "SizeInMiB": 1024 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "unsupported", "EncryptionSupport": "supported", "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Low to Moderate", "MaximumNetworkInterfaces": 2, "Ipv4AddressesPerInterface": 2, "Ipv6AddressesPerInterface": 2, "Ipv6Supported": true, "EnaSupport": "unsupported", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["partition", "spread"] }, "HibernationSupported": true, "BurstablePerformanceSupported": true, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "t2.large", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "xen", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.3 }, "VCpuInfo": { "DefaultVCpus": 2, "DefaultCores": 2, "DefaultThreadsPerCore": 1, "ValidCores": [1, 2], "ValidThreadsPerCore": [1] }, "MemoryInfo": { "SizeInMiB": 8192 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "unsupported", "EncryptionSupport": "supported", "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Low to Moderate", "MaximumNetworkInterfaces": 3, "Ipv4AddressesPerInterface": 12, "Ipv6AddressesPerInterface": 12, "Ipv6Supported": true, "EnaSupport": "unsupported", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["partition", "spread"] }, "HibernationSupported": true, "BurstablePerformanceSupported": true, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "t2.2xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "xen", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.3 }, "VCpuInfo": { "DefaultVCpus": 8, "DefaultCores": 8, "DefaultThreadsPerCore": 1, "ValidCores": [1, 2, 3, 4, 5, 6, 7, 8], "ValidThreadsPerCore": [1] }, "MemoryInfo": { "SizeInMiB": 32768 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "unsupported", "EncryptionSupport": "supported", "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Moderate", "MaximumNetworkInterfaces": 3, "Ipv4AddressesPerInterface": 15, "Ipv6AddressesPerInterface": 15, "Ipv6Supported": true, "EnaSupport": "unsupported", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["partition", "spread"] }, "HibernationSupported": true, "BurstablePerformanceSupported": true, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "t3a.small", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.2 }, "VCpuInfo": { "DefaultVCpus": 2, "DefaultCores": 1, "DefaultThreadsPerCore": 2, "ValidCores": [1], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 2048 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 175, "BaselineThroughputInMBps": 21.875, "BaselineIops": 1000, "MaximumBandwidthInMbps": 2085, "MaximumThroughputInMBps": 260.625, "MaximumIops": 11800 }, "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Up to 5 Gigabit", "MaximumNetworkInterfaces": 2, "Ipv4AddressesPerInterface": 4, "Ipv6AddressesPerInterface": 4, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["partition", "spread"] }, "HibernationSupported": false, "BurstablePerformanceSupported": true, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "t3a.medium", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.2 }, "VCpuInfo": { "DefaultVCpus": 2, "DefaultCores": 1, "DefaultThreadsPerCore": 2, "ValidCores": [1], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 4096 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 350, "BaselineThroughputInMBps": 43.75, "BaselineIops": 2000, "MaximumBandwidthInMbps": 2085, "MaximumThroughputInMBps": 260.625, "MaximumIops": 11800 }, "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Up to 5 Gigabit", "MaximumNetworkInterfaces": 3, "Ipv4AddressesPerInterface": 6, "Ipv6AddressesPerInterface": 6, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["partition", "spread"] }, "HibernationSupported": false, "BurstablePerformanceSupported": true, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "t3a.2xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.2 }, "VCpuInfo": { "DefaultVCpus": 8, "DefaultCores": 4, "DefaultThreadsPerCore": 2, "ValidCores": [2, 4], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 32768 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 695, "BaselineThroughputInMBps": 86.875, "BaselineIops": 4000, "MaximumBandwidthInMbps": 2780, "MaximumThroughputInMBps": 347.5, "MaximumIops": 15700 }, "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Up to 5 Gigabit", "MaximumNetworkInterfaces": 4, "Ipv4AddressesPerInterface": 15, "Ipv6AddressesPerInterface": 15, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["partition", "spread"] }, "HibernationSupported": false, "BurstablePerformanceSupported": true, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "t3.medium", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.5 }, "VCpuInfo": { "DefaultVCpus": 2, "DefaultCores": 1, "DefaultThreadsPerCore": 2, "ValidCores": [1], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 4096 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 347, "BaselineThroughputInMBps": 43.375, "BaselineIops": 2000, "MaximumBandwidthInMbps": 2085, "MaximumThroughputInMBps": 260.625, "MaximumIops": 11800 }, "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Up to 5 Gigabit", "MaximumNetworkInterfaces": 3, "Ipv4AddressesPerInterface": 6, "Ipv6AddressesPerInterface": 6, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["partition", "spread"] }, "HibernationSupported": false, "BurstablePerformanceSupported": true, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "t3.large", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.5 }, "VCpuInfo": { "DefaultVCpus": 2, "DefaultCores": 1, "DefaultThreadsPerCore": 2, "ValidCores": [1], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 8192 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 695, "BaselineThroughputInMBps": 86.875, "BaselineIops": 4000, "MaximumBandwidthInMbps": 2780, "MaximumThroughputInMBps": 347.5, "MaximumIops": 15700 }, "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Up to 5 Gigabit", "MaximumNetworkInterfaces": 3, "Ipv4AddressesPerInterface": 12, "Ipv6AddressesPerInterface": 12, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["partition", "spread"] }, "HibernationSupported": false, "BurstablePerformanceSupported": true, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "t3.xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.5 }, "VCpuInfo": { "DefaultVCpus": 4, "DefaultCores": 2, "DefaultThreadsPerCore": 2, "ValidCores": [2], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 16384 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 695, "BaselineThroughputInMBps": 86.875, "BaselineIops": 4000, "MaximumBandwidthInMbps": 2780, "MaximumThroughputInMBps": 347.5, "MaximumIops": 15700 }, "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Up to 5 Gigabit", "MaximumNetworkInterfaces": 4, "Ipv4AddressesPerInterface": 15, "Ipv6AddressesPerInterface": 15, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["partition", "spread"] }, "HibernationSupported": false, "BurstablePerformanceSupported": true, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "t3.2xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.5 }, "VCpuInfo": { "DefaultVCpus": 8, "DefaultCores": 4, "DefaultThreadsPerCore": 2, "ValidCores": [2, 4], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 32768 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 695, "BaselineThroughputInMBps": 86.875, "BaselineIops": 4000, "MaximumBandwidthInMbps": 2780, "MaximumThroughputInMBps": 347.5, "MaximumIops": 15700 }, "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Up to 5 Gigabit", "MaximumNetworkInterfaces": 4, "Ipv4AddressesPerInterface": 15, "Ipv6AddressesPerInterface": 15, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["partition", "spread"] }, "HibernationSupported": false, "BurstablePerformanceSupported": true, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "m5ad.large", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.2 }, "VCpuInfo": { "DefaultVCpus": 2, "DefaultCores": 1, "DefaultThreadsPerCore": 2, "ValidCores": [1], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 8192 }, "InstanceStorageSupported": true, "InstanceStorageInfo": { "TotalSizeInGB": 75, "Disks": [{ "SizeInGB": 75, "Count": 1, "Type": "ssd" }] }, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 650, "BaselineThroughputInMBps": 81.25, "BaselineIops": 3600, "MaximumBandwidthInMbps": 2880, "MaximumThroughputInMBps": 360, "MaximumIops": 16000 }, "NvmeSupport": "required" }, "NetworkInfo": { "NetworkPerformance": "Up to 10 Gigabit", "MaximumNetworkInterfaces": 3, "Ipv4AddressesPerInterface": 10, "Ipv6AddressesPerInterface": 10, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["cluster", "partition", "spread"] }, "HibernationSupported": true, "BurstablePerformanceSupported": false, "DedicatedHostsSupported": false, "AutoRecoverySupported": false }, { "InstanceType": "m5ad.2xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.2 }, "VCpuInfo": { "DefaultVCpus": 8, "DefaultCores": 4, "DefaultThreadsPerCore": 2, "ValidCores": [2, 4], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 32768 }, "InstanceStorageSupported": true, "InstanceStorageInfo": { "TotalSizeInGB": 300, "Disks": [{ "SizeInGB": 300, "Count": 1, "Type": "ssd" }] }, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 1580, "BaselineThroughputInMBps": 197.5, "BaselineIops": 8333, "MaximumBandwidthInMbps": 2880, "MaximumThroughputInMBps": 360, "MaximumIops": 16000 }, "NvmeSupport": "required" }, "NetworkInfo": { "NetworkPerformance": "Up to 10 Gigabit", "MaximumNetworkInterfaces": 4, "Ipv4AddressesPerInterface": 15, "Ipv6AddressesPerInterface": 15, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["cluster", "partition", "spread"] }, "HibernationSupported": true, "BurstablePerformanceSupported": false, "DedicatedHostsSupported": false, "AutoRecoverySupported": false }, { "InstanceType": "m5ad.4xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.2 }, "VCpuInfo": { "DefaultVCpus": 16, "DefaultCores": 8, "DefaultThreadsPerCore": 2, "ValidCores": [2, 4, 6, 8], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 65536 }, "InstanceStorageSupported": true, "InstanceStorageInfo": { "TotalSizeInGB": 600, "Disks": [{ "SizeInGB": 300, "Count": 2, "Type": "ssd" }] }, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 2880, "BaselineThroughputInMBps": 360, "BaselineIops": 16000, "MaximumBandwidthInMbps": 2880, "MaximumThroughputInMBps": 360, "MaximumIops": 16000 }, "NvmeSupport": "required" }, "NetworkInfo": { "NetworkPerformance": "Up to 10 Gigabit", "MaximumNetworkInterfaces": 8, "Ipv4AddressesPerInterface": 30, "Ipv6AddressesPerInterface": 30, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["cluster", "partition", "spread"] }, "HibernationSupported": true, "BurstablePerformanceSupported": false, "DedicatedHostsSupported": false, "AutoRecoverySupported": false }, { "InstanceType": "m5ad.8xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.5 }, "VCpuInfo": { "DefaultVCpus": 32, "DefaultCores": 16, "DefaultThreadsPerCore": 2, "ValidCores": [4, 6, 8, 10, 12, 14, 16], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 131072 }, "InstanceStorageSupported": true, "InstanceStorageInfo": { "TotalSizeInGB": 1200, "Disks": [{ "SizeInGB": 600, "Count": 2, "Type": "ssd" }] }, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 4750, "BaselineThroughputInMBps": 593.75, "BaselineIops": 20000, "MaximumBandwidthInMbps": 4750, "MaximumThroughputInMBps": 593.75, "MaximumIops": 20000 }, "NvmeSupport": "required" }, "NetworkInfo": { "NetworkPerformance": "Up to 10 Gigabit", "MaximumNetworkInterfaces": 8, "Ipv4AddressesPerInterface": 30, "Ipv6AddressesPerInterface": 30, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["cluster", "partition", "spread"] }, "HibernationSupported": true, "BurstablePerformanceSupported": false, "DedicatedHostsSupported": false, "AutoRecoverySupported": false }, { "InstanceType": "m5ad.12xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.2 }, "VCpuInfo": { "DefaultVCpus": 48, "DefaultCores": 24, "DefaultThreadsPerCore": 2, "ValidCores": [6, 12, 18, 24], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 196608 }, "InstanceStorageSupported": true, "InstanceStorageInfo": { "TotalSizeInGB": 1800, "Disks": [{ "SizeInGB": 900, "Count": 2, "Type": "ssd" }] }, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 6780, "BaselineThroughputInMBps": 847.5, "BaselineIops": 30000, "MaximumBandwidthInMbps": 6780, "MaximumThroughputInMBps": 847.5, "MaximumIops": 30000 }, "NvmeSupport": "required" }, "NetworkInfo": { "NetworkPerformance": "10 Gigabit", "MaximumNetworkInterfaces": 8, "Ipv4AddressesPerInterface": 30, "Ipv6AddressesPerInterface": 30, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["cluster", "partition", "spread"] }, "HibernationSupported": false, "BurstablePerformanceSupported": false, "DedicatedHostsSupported": false, "AutoRecoverySupported": false }, { "InstanceType": "m5a.2xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.5 }, "VCpuInfo": { "DefaultVCpus": 8, "DefaultCores": 4, "DefaultThreadsPerCore": 2, "ValidCores": [2, 4], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 32768 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 1580, "BaselineThroughputInMBps": 197.5, "BaselineIops": 8333, "MaximumBandwidthInMbps": 2880, "MaximumThroughputInMBps": 360, "MaximumIops": 16000 }, "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Up to 10 Gigabit", "MaximumNetworkInterfaces": 4, "Ipv4AddressesPerInterface": 15, "Ipv6AddressesPerInterface": 15, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["cluster", "partition", "spread"] }, "HibernationSupported": true, "BurstablePerformanceSupported": false, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "m5a.4xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.5 }, "VCpuInfo": { "DefaultVCpus": 16, "DefaultCores": 8, "DefaultThreadsPerCore": 2, "ValidCores": [2, 4, 6, 8], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 65536 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 2880, "BaselineThroughputInMBps": 360, "BaselineIops": 16000, "MaximumBandwidthInMbps": 2880, "MaximumThroughputInMBps": 360, "MaximumIops": 16000 }, "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "Up to 10 Gigabit", "MaximumNetworkInterfaces": 8, "Ipv4AddressesPerInterface": 30, "Ipv6AddressesPerInterface": 30, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["cluster", "partition", "spread"] }, "HibernationSupported": true, "BurstablePerformanceSupported": false, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }, { "InstanceType": "m5a.16xlarge", "CurrentGeneration": true, "FreeTierEligible": false, "SupportedUsageClasses": ["on-demand", "spot"], "SupportedRootDeviceTypes": ["ebs"], "SupportedVirtualizationTypes": ["hvm"], "BareMetal": false, "Hypervisor": "nitro", "ProcessorInfo": { "SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 2.5 }, "VCpuInfo": { "DefaultVCpus": 64, "DefaultCores": 32, "DefaultThreadsPerCore": 2, "ValidCores": [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32], "ValidThreadsPerCore": [1, 2] }, "MemoryInfo": { "SizeInMiB": 262144 }, "InstanceStorageSupported": false, "EbsInfo": { "EbsOptimizedSupport": "default", "EncryptionSupport": "supported", "EbsOptimizedInfo": { "BaselineBandwidthInMbps": 9500, "BaselineThroughputInMBps": 1187.5, "BaselineIops": 40000, "MaximumBandwidthInMbps": 9500, "MaximumThroughputInMBps": 1187.5, "MaximumIops": 40000 }, "NvmeSupport": "unsupported" }, "NetworkInfo": { "NetworkPerformance": "12 Gigabit", "MaximumNetworkInterfaces": 15, "Ipv4AddressesPerInterface": 50, "Ipv6AddressesPerInterface": 50, "Ipv6Supported": true, "EnaSupport": "required", "EfaSupported": false }, "PlacementGroupInfo": { "SupportedStrategies": ["cluster", "partition", "spread"] }, "HibernationSupported": false, "BurstablePerformanceSupported": false, "DedicatedHostsSupported": false, "AutoRecoverySupported": true }],
    region: []
}

const TYPEID = {
    aws: {
        subnet: {
            id: "SubnetId",
            url: "subnet"
        },
        vpc: {
            id: "VpcId",
            url: "vpc"
        },
        securitygroup: {
            id: "GroupId",
            url: "securitygroup"
        },
        keypair: {
            id: "KeyName",
            url: "keypair"
        }
    }
}


export async function getDynamicOption(key_id, key_vendor, type) {
    let tmp_type = TYPEID[key_vendor][type]["url"]
    let url = `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/${tmp_type}?key_id=${key_id}&type=true`;
    let items = [];
    const response = await fetch(url).then(res => res.json())
    if (type == "subnet") {
        for (let i = 0; i < response.data.length; i++) {
            let tmpOptionId = response.data[i];
            items.push(tmpOptionId);
        }
    }
    else {
        for (let i = 0; i < response.data.length; i++) {
            let tmpOptionId = response.data[i][TYPEID[key_vendor][type]["id"]];
            items.push(tmpOptionId);
        }
    }
    return items;
}

class SelVendor extends React.Component {
    constructor() {
        super();
        this.state = {
            key: JSON.parse(localStorage.getItem("key")),
        };
    }

    render() {
        return (
            <>
                <label for="recipient-name" class="col-form-label">
                    Select Key ID{" "}
                </label>
                <select
                    className="form-control"
                    name="instance"
                    onChange={this.props.choose}
                >
                    <option value="" disabled selected>
                        {" "}
                        Key Id{" "}
                    </option>
                    {this.state.key.map(v => {
                        return <option value={v.vendor}>{v.key}</option>
                    })}
                </select>

                <label for="recipient-name" class="col-form-label">
                    Select Resource{" "}
                </label>
                <select
                    className="form-control"
                    name="instance"
                    onChange={this.props.click}
                >
                    <option value="" disabled selected>
                        Resource
                    </option>
                    <option value="server">Server</option>
                    <option value="ip">IP</option>
                    <option value="volume">Volume</option>
                    <option value="keypair">KeyPair</option>
                    <option value="vpc">VPC</option>
                    <option value="subnet">Subnet</option>
                    <option value="securitygroup">SecurityGroup</option>
                    <option value="database">Database</option>
                    <option value="bucket">Bucket</option>
                </select>
            </>
        );
    }
}

class Nextbut extends React.Component {
    render() {
        return (
            <>
                <Button variant="warning" onClick={this.props.click_but}>
                    Next
                </Button>
            </>
        );
    }
}

class Submitbut extends React.Component {
    render() {
        return (
            <>
                <Button variant="warning" onClick={this.props.submit_but}>
                    Submit
                </Button>
            </>
        );
    }
}

class EC2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key_name: this.props.key_name,
            key_vendor: this.props.key_vendor,
            vpc_items: [],
            subnet_items: [],
            security_items: [],
            key_items: [],
            tmp_subnet: []
        }
        this.func = this.props.func.bind(this);
        this.func("MinCount", 1);
        this.func("MaxCount", 1);
        this.init();
    }

    async init() {
        let vpcList = await this.getVpcList()
        let subnetList = await this.getSubnetList()
        let securityList = await this.getSgList()
        let keyList = await this.getKeypairList()

        this.setState({
            vpc_items: vpcList,
            subnet_items: subnetList,
            security_items: securityList,
            key_items: keyList
        })
    }

    async tmp_get() {
        let vpcList = await this.getVpcList()

        this.setState({
            vpc_items: vpcList,
        });
    }

    async getVpcList() {
        return await getDynamicOption(this.state.key_name, this.state.key_vendor, "vpc")
    }

    async getSubnetList() {
        return await getDynamicOption(this.state.key_name, this.state.key_vendor, "subnet")
    }

    async getSgList() {
        return await getDynamicOption(this.state.key_name, this.state.key_vendor, "securitygroup")
    }

    async getKeypairList() {
        return await getDynamicOption(this.state.key_name, this.state.key_vendor, "keypair")
    }

    async getAvailabilityZone(type, key_name) {
        let item = [];
        let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/data/server/etc/types`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key_id: key_name,
                args: {
                    LocationType: 'availability-zone',
                    Filters: [
                        {
                            Name: 'instance-type',
                            Values: [type]
                        }
                    ]
                }
            })
        }).then(res => res.json())
        for (let i = 0; i < response.data.length; i++) {
            item.push(response.data[i].Location)
        }
        EC2Data.region = item
        let items = [];
        for (let i = 0; i < this.state.subnet_items.length; i++) {
            for (let j = 0; j < EC2Data.region.length; j++) {
                if (this.state.subnet_items[i].AvailabilityZone == EC2Data.region[j]) {
                    items.push(this.state.subnet_items[i].SubnetId)
                }
            }
        }
        this.setState({
            tmp_subnet: items
        })
    }

    render() {
        let func = this.func;
        let vpcList = this.state.vpc_items
        let subnetList = this.state.subnet_items
        let securityList = this.state.security_items
        let keyList = this.state.key_items

        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Label className="subtitle"> Server </Form.Label>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Resource Name</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            onChange={(e) => {
                                let tmp = [
                                    {
                                        ResourceType: "instance",
                                        Tags: [
                                            {
                                                Key: "Name",
                                                Value: "",
                                            },
                                        ],
                                    },
                                ];
                                tmp[0].Tags[0].Value = e.target.value;
                                this.func("TagSpecifications", tmp);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>AMI *</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("ImageId", val);
                            }}
                        >
                            <option value="" disabled selected>
                                Ami
                            </option>
                            {
                                EC2Data.Ami.map(v => {
                                    return <option value={v.ImageId}>{v.Description}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Type *</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.getAvailabilityZone(e.target.value, this.state.key_name)
                                this.func("InstanceType", val);
                            }}
                        >
                            <option value="" disabled selected>
                                InstanceType
                            </option>
                            {
                                EC2Data.Type.map(v => {
                                    return <option value={v.InstanceType}>{v.InstanceType}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>MaxCount</Form.Label>
                        <Form.Control
                            placeholder="Enter MaxCount"
                            onChange={(e) => {
                                this.func("MaxCount", parseInt(e.target.value));
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>MinCount</Form.Label>
                        <Form.Control
                            placeholder="Enter MinCount"
                            onChange={(e) => {
                                this.func("MinCount", parseInt(e.target.value));
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Row className="align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label className="mr-sm-2">
                                    KeyName
                            </Form.Label>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button size="sm" style={
                                    {
                                        backgroundColor: "#494949",
                                        color: "#ffc14d",
                                        border: "none",
                                        marginBottom: ".5rem"
                                    }}
                                >
                                    <FaSync style={{
                                        marginBottom: ".2rem"
                                    }} />
                                </Button>
                            </Col>
                        </Form.Row>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("KeyName", val);
                            }}
                        >
                            <option value="" disabled selected>
                                KeyName
                            </option>
                            {
                                keyList.map(v => {
                                    return <option value={v}>{v}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Volume </Form.Label>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>EBS size</Form.Label>
                        <Form.Control
                            placeholder="Enter Size min is 8"
                            onChange={(e) => {
                                let tmp = [
                                    {
                                        DeviceName: "/dev/sda1",
                                        Ebs: {
                                            VolumeSize: 8,
                                        },
                                    },
                                ];
                                tmp[0].Ebs.VolumeSize = parseInt(e.target.value);
                                console.log(tmp)
                                this.func("BlockDeviceMappings", tmp);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>EBS Type</Form.Label>
                        <Form.Control as="select">
                            <option value="" disabled selected>
                                EBS Type
                            </option>
                            <option>범용 SSD(gp2)</option>
                            <option>프로비저닝된 IOPS SSD(io1)</option>
                            <option>마그네틱(standard)</option>
                        </Form.Control>
                    </Form.Group>
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Network </Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Row className="align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label className="mr-sm-2">
                                    VPC
                        </Form.Label>
                            </Col>
                            <Col xs="auto" style={{ float: "right!important" }}>
                                <Button size="sm" style={
                                    {
                                        backgroundColor: "#494949",
                                        color: "#ffc14d",
                                        border: "none",
                                        marginBottom: ".5rem"
                                    }}
                                    onClick={() => this.tmp_get()}
                                >
                                    <FaSync style={{
                                        marginBottom: ".2rem"
                                    }} />
                                </Button>
                            </Col>
                        </Form.Row>
                        <Form.Control as="select">
                            <option value="" disabled selected>
                                VPC
                            </option>
                            {
                                vpcList.map(v => {
                                    return <option value={v}>{v}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Row className="align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label className="mr-sm-2">
                                    Subnet
                            </Form.Label>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button size="sm" style={
                                    {
                                        backgroundColor: "#494949",
                                        color: "#ffc14d",
                                        border: "none",
                                        marginBottom: ".5rem"
                                    }}
                                >
                                    <FaSync style={{
                                        marginBottom: ".2rem"
                                    }} />
                                </Button>
                            </Col>
                        </Form.Row>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("SubnetId", val);
                            }}
                        >
                            <option value="" disabled selected>
                                Subnet
                            </option>
                            {
                                this.state.tmp_subnet.map(v => {
                                    return <option value={v}>{v}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Row className="align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label className="mr-sm-2">
                                    Security Group
                                </Form.Label>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button size="sm" style={
                                    {
                                        backgroundColor: "#494949",
                                        color: "#ffc14d",
                                        border: "none",
                                        marginBottom: ".5rem"
                                    }}
                                >
                                    <FaSync style={{
                                        marginBottom: ".2rem"
                                    }} />
                                </Button>
                            </Col>
                        </Form.Row>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp = [];
                                tmp.push(e.target.value);
                                this.func("SecurityGroupIds", tmp);
                            }}
                        >
                            <option value="" disabled selected>
                                SecurityGroup
                            </option>
                            {
                                securityList.map(v => {
                                    return <option value={v}>{v}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class EBS extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.props.func.bind(this);
        this.state = {
            key: JSON.parse(localStorage.getItem("key")),
            AZ: [],
            type: undefined
        }

        this.getDynamicAZ(this.props.key_name)
    }

    async getDynamicAZ(key_name) {
        let key_region = "";
        let key = this.state.key
        for (let i = 0; i < key.length; i++) {
            if (key[i].key == key_name) {
                key_region = key[i].region
                break;
            }
        }
        let items = [];
        let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/data/volume/etc/zones`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key_id: key_name,
                args: {
                    Filters: [
                        {
                            Name: 'region-name',
                            Values: [key_region]
                        }
                    ]
                }
            })
        }).then(res => res.json())
        for (let i = 0; i < response.data.length; i++) {
            items.push(<option value={response.data[i].ZoneName}>{response.data[i].ZoneName}</option>)
        }
        this.setState({
            AZ: items
        })
    }

    render() {
        let func = this.func;
        const volumeType = {
            standard: "Plz Input Size of Volume. min: 1",
            gp2: "Plz Input Size of Volume. min: 1",
            io1: "Plz Input Size of Volume. min: 4",
            io2: "Plz Input Size of Volume. min: 4",
            sc1: "Plz Input Size of Volume. min: 500",
            st1: "Plz Input Size of Volume. min: 500",
            undefined: "Plz check type of volume"
        }
        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Label className="subtitle"> Volume </Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>VolumeType *</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                this.func("VolumeType", e.target.value);
                                this.setState({
                                    type: e.target.value
                                })
                            }}
                        >
                            <option value="" disabled selected>
                                VolumeType
                            </option>
                            <option>standard</option>
                            <option>io1</option>
                            <option>io2</option>
                            <option>gp2</option>
                            <option>sc1</option>
                            <option>st1</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>AvailabilityZone *</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("AvailabilityZone", val);
                            }}
                        >
                            <option value="" disabled selected>
                                AvailabilityZone
                            </option>
                            {this.state.AZ}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Size *</Form.Label>
                        <Form.Control
                            placeholder={volumeType[this.state.type]}
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("Size", val);
                            }}
                        />
                    </Form.Group>
                    {
                        (this.state.type == "io2" || this.state.type == "io1") ?
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Iops *</Form.Label>
                                <Form.Control
                                    placeholder="Enter iops: minimum is 100"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.func("Iops", val);
                                    }}
                                />
                            </Form.Group>
                            : <></>
                    }
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>MultiAttachEnabled</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("MultiAttachEnabled", ("true" === val));
                            }}
                        >
                            <option value="" disabled selected>
                                MultiAttachEnabled
                            </option>
                            <option>true</option>
                            <option>false</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            onChange={(e) => {
                                let tmp = [
                                    {
                                        Key: "Name",
                                        Value: "",
                                    },
                                ];
                                tmp[0].Value = e.target.value;
                                this.func("Tags", tmp);
                            }}
                        />
                    </Form.Group>
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Secure </Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Encrypted</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("Encrypted", ("true" === val))
                            }}
                        >
                            <option value="" disabled selected>
                                Encrypted
                            </option>
                            <option>true</option>
                            <option>false</option>
                        </Form.Control>
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class KeyPair extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.props.func.bind(this);
    }

    render() {
        let func = this.func;
        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>KeyName *</Form.Label>
                        <Form.Control
                            placeholder="Enter KeyName"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("KeyName", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            onChange={(e) => {
                                let tmp = [
                                    {
                                        ResourceType: "key-pair",
                                        Tags: [
                                            {
                                                Key: "Name",
                                                Value: "",
                                            },
                                        ],
                                    },
                                ];
                                tmp[0].Tags[0].Value = e.target.value;
                                this.func("TagSpecifications", tmp);
                            }}
                        />
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class SecurityGroup extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.props.func.bind(this);
    }

    render() {
        let func = this.func;
        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Description *</Form.Label>
                        <Form.Control
                            placeholder="Enter Description"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("Description", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>GroupName *</Form.Label>
                        <Form.Control
                            placeholder="Enter GroupName"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("GroupName", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            onChange={(e) => {
                                let tmp = [
                                    {
                                        ResourceType: "security-group",
                                        Tags: [
                                            {
                                                Key: 'Name',
                                                Value: ''
                                            },
                                        ]
                                    }
                                ]
                                tmp[0].Tags[0].Value = e.target.value;
                                this.func("TagSpecifications", tmp);
                            }}
                        />
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class VPC extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.props.func.bind(this);
    }

    render() {
        let func = this.func;
        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Label className="subtitle"> CidrBlock </Form.Label>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>CidrBlock *</Form.Label>
                        <Form.Control
                            placeholder="Enter CidrBlock"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("CidrBlock", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>AmazonProvidedIpv6CidrBlock</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("AmazonProvidedIpv6CidrBlock", ("true" == val));
                            }}
                        >
                            <option value="" disabled selected>
                                AmazonProvidedIpv6CidrBlock
                            </option>
                            <option>true</option>
                            <option>false</option>
                        </Form.Control>
                    </Form.Group>
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Else </Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>InstanceTenancy</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("InstanceTenancy", val);
                            }}
                        >
                            <option value="" disabled selected>
                                InstanceTenancy
                            </option>
                            <option>default</option>
                            <option>dedicated</option>
                            <option>host</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            onChange={(e) => {
                                let tmp = [{
                                    ResourceType: "vpc",
                                    Tags: [
                                        {
                                            Key: "Name",
                                            Value: "",
                                        },
                                    ]
                                }]
                                tmp[0].Tags[0].Value = e.target.value;
                                this.func("TagSpecifications", tmp);
                            }}
                        />
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class Subnet extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.props.func.bind(this);
        this.state = {
            key_name: this.props.key_name,
            key: JSON.parse(localStorage.getItem("key")),
            key_vendor: this.props.key_vendor,
            vpcList: [],
            AZ: []
        }

        this.getDynamicAZ(this.props.key_name);
        this.getVpcList();
    }

    async getDynamicAZ(key_name) {
        let key_region = "";
        let key = this.state.key
        for (let i = 0; i < key.length; i++) {
            if (key[i].key == key_name) {
                key_region = key[i].region
                break;
            }
        }
        let items = [];
        let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/data/volume/etc/zones`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key_id: key_name,
                args: {
                    Filters: [
                        {
                            Name: 'region-name',
                            Values: [key_region]
                        }
                    ]
                }
            })
        }).then(res => res.json())
        for (let i = 0; i < response.data.length; i++) {
            items.push(<option value={response.data[i].ZoneName}>{response.data[i].ZoneName}</option>)
        }
        this.setState({
            AZ: items
        })
    }

    async getVpcList() {
        let items = []
        let response = await getDynamicOption(this.state.key_name, this.state.key_vendor, "vpc")

        for (let i = 0; i < response.length; i++) {
            items.push(<option value={response[i]}>{response[i]}</option>)
        }
        this.setState({
            vpcList: items
        })
    }

    render() {
        let func = this.func;
        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Label className="subtitle"> CidrBlock </Form.Label>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>CidrBlock *</Form.Label>
                        <Form.Control
                            placeholder="Enter CidrBlock"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("CidrBlock", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Ipv6CidrBlock</Form.Label>
                        <Form.Control
                            placeholder="Enter Ipv6CidrBlock"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("Ipv6CidrBlock", val);
                            }}
                        />
                    </Form.Group>
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Network </Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Row className="align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label className="mr-sm-2">
                                    VpcId *
                        </Form.Label>
                            </Col>
                            <Col xs="auto" style={{ float: "right!important" }}>
                                <Button size="sm" style={
                                    {
                                        backgroundColor: "#494949",
                                        color: "#ffc14d",
                                        border: "none",
                                        marginBottom: ".5rem"
                                    }}
                                >
                                    <FaSync style={{
                                        marginBottom: ".2rem"
                                    }} />
                                </Button>
                            </Col>
                        </Form.Row>
                        <Form.Control as="select" onChange={(e) => {
                            let val = e.target.value;
                            this.func("VpcId", val);
                        }}>
                            <option value="" disabled selected>
                                VpcId
                            </option>
                            {this.state.vpcList}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>AvailabilityZone</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("AvailabilityZone", val);
                            }}
                        >
                            <option value="" disabled selected>
                                AvailabilityZone
                            </option>
                            {this.state.AZ}
                        </Form.Control>
                    </Form.Group>
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Else </Form.Label>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            onChange={(e) => {
                                let tmp = [
                                    {
                                        ResourceType: "subnet",
                                        Tags: [{
                                            Key: "Name",
                                            Value: "",
                                        }]
                                    }
                                ];
                                tmp[0].Tags[0].Value = e.target.value;
                                this.func("TagSpecifications", tmp);
                            }}
                        />
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class EIP extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.props.func.bind(this);
    }

    render() {
        let func = this.func;
        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Domain</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                if (e.target.value == "vpc") {
                                    let val = e.target.value;
                                    this.func("Domain", val);
                                }
                            }}
                        >
                            <option value="" disabled selected>
                                Domain
                            </option>
                            <option>standard</option>
                            <option>vpc</option>
                        </Form.Control>
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class RDS extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.props.func.bind(this);
        this.state = {
            key: this.props.key_name,
            tmp_version: [],
            subnet_items: [],
            tmp_class: [],
            type: undefined,
            volumeType: undefined
        }
        this.func('AllocatedStorage', 20)
        this.getSubnetList()
    }

    async getSubnetList() {
        let items = []
        let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/data/database/etc/subnets`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key_id: this.state.key,
            }
            )
        }).then(res => res.json())

        console.log(response)
        for (let subnet of response.data) {
            items.push(subnet.DBSubnetGroupName);
        }

        this.setState({ subnet_items: items })
    }

    async getEngineVersion(engine) {
        let items = []
        let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/data/database/etc/versions`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key_id: this.state.key,
                args: {
                    Engine: engine
                }
            }
            )
        }).then(res => res.json())

        let engineSet = new Set()

        for (let version of response.data) {
            engineSet.add(version.EngineVersion);
        }

        for (let version of Array.from(engineSet)) {
            items.push(<option value={version}>{version}</option>);
        }

        return items;
    }

    async getDBinstanceclass(engine) {
        let items = []
        let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/data/database/etc/classes`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key_id: this.state.key,
                args: {
                    Engine: engine
                }
            }
            )
        }).then(res => res.json())

        let classSet = new Set()
        let availability_zone = {}

        for (let cls of response.data) {
            classSet.add(cls.DBInstanceClass);
            availability_zone[cls.DBInstanceClass] = cls.AvailabilityZones;
        }

        for (let cls of Array.from(classSet)) {
            items.push(<option value={cls}>{cls}</option>);
        }
        return [items, availability_zone]
    }

    async setDataSet(val) {
        let rst = await this.getDBinstanceclass(val)
        this.setState({
            tmp_version: await this.getEngineVersion(val),
            tmp_class: rst[0],
            availability_zone: rst[1],
        });
    }

    render() {
        const volumeType = {
            standard: "Plz Input Size of Volume. min: 5",
            gp2: "Plz Input Size of Volume. min: 20",
            io1: "Plz Input Size of Volume. min: 100"
        }

        let subnet_list = this.state.subnet_items
        let func = this.func;
        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Label className="subtitle"> Engine </Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Engine *</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("Engine", val);
                                this.setDataSet(val)
                                this.setState({ type: e.target.value })
                            }}
                        >
                            <option value="" disabled selected>
                                Engine
                            </option>
                            <option value="aurora">Amazon Aurora</option>
                            <option value="mysql">MySQL</option>
                            <option vlaue="mariadb">MariaDB</option>
                            <option value="postgres">PostgreSQL</option>
                            <option value="oracle-ee">Oracle</option>
                            <option value="sqlserver-ee">
                                Microsoft SQL Server
                            </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>EngineVersion</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("EngineVersion", val);
                            }}
                        >
                            <option value="" disabled selected>
                                EngineVersion
                            </option>
                            {this.state.tmp_version}
                        </Form.Control>
                    </Form.Group>
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Database </Form.Label>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>DBInstanceIdentifier *</Form.Label>
                        <Form.Control
                            placeholder="Enter DBInstanceIdentifier"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("DBInstanceIdentifier", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>DBName</Form.Label>
                        <Form.Control
                            placeholder="Enter DBName"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("DBName", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>MasterUsername *</Form.Label>
                        <Form.Control
                            placeholder="Enter MasterUsername"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("MasterUsername", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>
                            MasterUserPassword * (length &gt;= 8)
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter MasterUserPassword"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("MasterUserPassword", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>DBInstanceClass *</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("DBInstanceClass", val);
                            }}
                        >
                            <option value="" disabled selected>
                                DBInstanceClass
                            </option>
                            {this.state.tmp_class}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Port</Form.Label>
                        <Form.Control
                            placeholder="Enter Port"
                            onChange={(e) => {
                                let val = parseInt(e.target.value);
                                this.func("Port", val);
                            }}
                        />
                    </Form.Group>
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Volume </Form.Label>
                    {this.state.type == "aurora" ? <></> :
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>StorageType</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    this.func("StorageType", val);
                                    this.setState({ volumeType: e.target.value })
                                }}
                            >
                                <option value="" disabled selected>
                                    StorageType
                            </option>
                                <option>standard</option>
                                <option>gp2</option>
                                <option>io1</option>
                            </Form.Control>
                        </Form.Group>
                    }
                    {this.state.type == "aurora" ? <></> :
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>AllocatedStorage</Form.Label>
                            <Form.Control
                                placeholder={volumeType[this.state.volumeType]}
                                onChange={(e) => {
                                    let val = parseInt(e.target.value);
                                    this.func("AllocatedStorage", val);
                                }}
                            />
                        </Form.Group>}
                    {
                        this.state.type == "aurora" ? <></> : this.state.volumeType == "io1" ?
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Iops *</Form.Label>
                                <Form.Control
                                    placeholder="Plz Input Size of iops. min: 1000"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.func("Iops", val);
                                    }}
                                />
                            </Form.Group>
                            : <></>
                    }
                    {this.state.type == "aurora" ? <></> :
                        this.state.volumeType == "standard" ? <></> :
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>MaxAllocatedStorage</Form.Label>
                                <Form.Control
                                    placeholder={volumeType[this.state.volumeType]}
                                    onChange={(e) => {
                                        let val = parseInt(e.target.value);
                                        this.func("MaxAllocatedStorage", val);
                                    }}
                                />
                            </Form.Group>
                    }
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Network </Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>DBSubnetGroupName</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("DBSubnetGroupName", val);
                            }}
                        >
                            <option value="" disabled selected>
                                DBSubnetGroupName
                            </option>
                            {
                                subnet_list.map(v => {
                                    return <option value={v}>{v}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Network </Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>StorageEncrypted</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("StorageEncrypted", ("true" == val));
                            }}
                        >
                            <option value="" disabled selected>
                                StorageEncrypted
                            </option>
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>MultiAZ</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("MultiAZ", ("true" == val));
                            }}
                        >
                            <option value="" disabled selected>
                                MultiAZ
                            </option>
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Form.Group>
                    <hr className="divideLine"></hr>
                    <Form.Label className="subtitle"> Else </Form.Label>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>BackupRetentionPeriod</Form.Label>
                        <Form.Control
                            placeholder="Enter BackupRetentionPeriod ( 0 ~ 35 day )"
                            onChange={(e) => {
                                let val = parseInt(e.target.value);
                                this.func("BackupRetentionPeriod", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>CopyTagsToSnapshot</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("CopyTagsToSnapshot", ("true" == val));
                            }}
                        >
                            <option value="" disabled selected>
                                CopyTagsToSnapshot
                            </option>
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>AutoMinorVersionUpgrade</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("AutoMinorVersionUpgrade", ("true" == val));
                            }}
                        >
                            <option value="" disabled selected>
                                AutoMinorVersionUpgrade
                            </option>
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>DeletionProtection</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("DeletionProtection", ("true" == val));
                            }}
                        >
                            <option value="" disabled selected>
                                DeletionProtection
                            </option>
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            onChange={(e) => {
                                let tmp = [
                                    {
                                        Key: "Name",
                                        Value: "",
                                    },
                                ];
                                tmp[0].Value = e.target.value;
                                this.func("Tags", tmp);
                            }}
                        />
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class S3 extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.props.func.bind(this);
    }

    render() {
        let func = this.func;
        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Bucket *</Form.Label>
                        <Form.Control
                            placeholder="Enter Bucket"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("Bucket", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>ACL</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("ACL", val);
                            }}
                        >
                            <option value="" disabled selected>
                                ACL
                            </option>
                            <option>private</option>
                            <option>public-read </option>
                            <option>public-read-write</option>
                            <option>authenticated-read</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>ObjectLockEnabledForBucket</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("ObjectLockEnabledForBucket", ("true" == val));
                            }}
                        >
                            <option value="" disabled selected>
                                ObjectLockEnabledForBucket
                            </option>
                            <option>true</option>
                            <option>false</option>
                        </Form.Control>
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class CreateModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHide: false,
            vendor: "",
            key_name: "",
            type: "",
            data: {},
            component: <SelVendor choose={this.select_vendor.bind(this)} click={this.select_type.bind(this)} />,
            but_type: <Nextbut click_but={this.clickNextModal.bind(this)} />,
        };

        this.select_vendor = this.select_vendor.bind(this);
        this.clickNextModal = this.clickNextModal.bind(this);
        this.clickSubmitbut = this.clickSubmitbut.bind(this);
        this.handleModalShowHide = this.handleModalShowHide.bind(this);
    }

    handleModalShowHide() {
        if (this.state.type != "") {
            this.setState({
                type: "",
                vendor: "",
                component: <SelVendor choose={this.select_vendor.bind(this)} click={this.select_type.bind(this)} />
            });
        }
        this.setState({
            showHide: !this.state.showHide,
            but_type: <Nextbut click_but={this.clickNextModal.bind(this)} />,
        });
    }

    async getAmiData(key_id) {
        let url = `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/image?key_id=${key_id}&type=true`
        let items = [];
        const response = await fetch(url).then(res => res.json())
        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
            items.push(response.data[i]);
        }
        EC2Data.Ami = items;
    }

    select_vendor(e) {
        var index = e.nativeEvent.target.selectedIndex;
        if(e.target.value=="aws"){
            this.getAmiData(e.nativeEvent.target[index].text)
        }
        this.setState({
            vendor: e.target.value,
            key_name: e.nativeEvent.target[index].text
        });
    }

    select_type(e) {
        this.setState({ type: e.target.value });
    }

    func(key, value) {
        this.state.data[key] = value;
        this.setState({ data: this.state.data });
    }

    clickNextModal() {
        const componentType = {
            aws: {
                server: <EC2 func={this.func.bind(this)} key_vendor={this.state.vendor} key_name={this.state.key_name} />,
                volume: <EBS func={this.func.bind(this)} key_name={this.state.key_name} />,
                ip: <EIP func={this.func.bind(this)} key_name={this.state.key_name} />,
                keypair: <KeyPair func={this.func.bind(this)} />,
                database: <RDS func={this.func.bind(this)} key_name={this.state.key_name} key_vendor={this.state.vendor} />,
                vpc: <VPC func={this.func.bind(this)} />,
                subnet: <Subnet func={this.func.bind(this)} key_vendor={this.state.vendor} key_name={this.state.key_name} />,
                securitygroup: <SecurityGroup func={this.func.bind(this)} />,
                bucket: <S3 func={this.func.bind(this)} />
            },
            azure: {
                server: "",
                volume: "",
                ip: "",
                keypair: "",
                database: "",
                vpc: "",
                subnet: "",
                securitygroup: "",
                bucket: ""
            }
        }

        if(this.state.vendor=="azure"){
            alert("Not provide this vendor")
            this.handleModalShowHide()
        }

        else if (componentType[this.state.vendor] == undefined || componentType[this.state.vendor][this.state.type] == undefined) {
            alert("Must choose 2 Option")
        }
        else {
            this.setState({
                component: componentType[this.state.vendor][this.state.type],
                but_type: <Submitbut submit_but={this.clickSubmitbut.bind(this)} />
            })
        }
    }

    async createInstance() {
        let key_id = this.state.key_name
        let args = this.state.data
        let rst = await summaryType[this.state.type]["manage"].create(key_id, args)
        if(this.state.type=="keypair"){
            const element = document.createElement("a");
            const file = new Blob([rst.data], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = args.KeyName + ".pem";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
        alert(rst.data ? 'success' : 'failed')
        window.location.reload();
    }

    clickSubmitbut() {
        this.createInstance();
        this.setState({ showHide: !this.state.showHide, data: {} });
    }

    render() {
        return (
            <div>
                <Button
                    className="Modal"
                    variant="warning"
                    onClick={() => this.handleModalShowHide()}
                >
                    Create
                </Button>

                <Modal
                    show={this.state.showHide}
                    onHide={this.handleModalShowHide}
                    size="lg"
                    dialogClassName="width :50%"
                    dialogClassName="height:50%"
                    centered
                >
                    <Modal.Header
                        closeButton
                        
                    >
                        <Modal.Title>Create {this.state.type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.component}</Modal.Body>
                    <Modal.Footer>{this.state.but_type}</Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CreateModal;
