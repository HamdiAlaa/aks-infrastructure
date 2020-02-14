// Copyright 2016-2019, Pulumi Corporation.  All rights reserved.

import * as helm from "@pulumi/kubernetes/helm";
import { k8sCluster } from "./cluster";


// if(__config.services.length>0){
//     for (let index = 0; index < __config.services.length; index++) {
//         //Chart
// const service = new helm.v2.Chart(
//     __config.services[index].release_name,
//     {
//         repo: __config.services[index].repo,
//         chart: __config.services[index].chart,
//         //version: __config.services[index].version,
//     },
//     { providers: { kubernetes: k8sProvider } },
// );
//     }}
// const service  = new helm.v2.Chart("jenkins",{
//     repo:"stable",
//     chart:"jenkins"
// },{providers:{ kubernetes: k8sProvider}});

export let kubeConfig = k8sCluster.kubeConfigRaw || 'Empty';
// export let provider = k8sProvider;

// export let serviceIP = apache
//     .getResourceProperty("v1/Service", "apache-apache","status")
//     .apply(status => status.loadBalancer.ingress[0].ip);
