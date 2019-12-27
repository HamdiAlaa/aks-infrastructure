import * as azure from "@pulumi/azure";
import * as k8s from "@pulumi/kubernetes";
import * as config from "./config";
import * as pulumi from "@pulumi/pulumi";

const __ = new pulumi.Config();


// Now allocate an AKS cluster.
export const k8sCluster = new azure.containerservice.KubernetesCluster(`${__.require('cluster_name')}-${__.require('type')}`, {
    resourceGroupName: config.resourceGroup.name,
    location: __.require('location'),

    agentPoolProfiles: [{
        name: `${__.require('type')}node`,
        count: +__.require('node_number'),
        vmSize: __.require('node_size'),
    

    }],
    dnsPrefix: `${__.require('type')}-${__.require('cluster_name')}-dns`,
    linuxProfile: {
        adminUsername: __.require('username'),
        sshKey: {
            keyData: config.sshPublicKey,
        },
    },

    servicePrincipal: {
        clientId: __.require('clientId') ,
        clientSecret:__.require('clientSecret'),
    },
});

// Expose a K8s provider instance using our custom cluster instance.
export const k8sProvider = new k8s.Provider(`aks-${__.require('type')}-provider`, {
    kubeconfig: k8sCluster.kubeConfigRaw,
});
