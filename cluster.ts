import * as azure from "@pulumi/azure";
import * as azuread from "@pulumi/azuread";
import * as config from "./config";
import * as pulumi from "@pulumi/pulumi";

const __ = new pulumi.Config();


// Create the AD service principal for the K8s cluster.
const adApp = new azuread.Application("aks");
const adSp = new azuread.ServicePrincipal("aksSp", { applicationId: adApp.applicationId });
const adSpPassword = new azuread.ServicePrincipalPassword("aksSpPassword", {
    servicePrincipalId: adSp.id,
    value: __.require('password'),
    endDate: "2099-01-01T00:00:00Z",
});

// Now allocate an AKS cluster.
export const k8sCluster = new azure.containerservice.KubernetesCluster(`${__.require('cluster_name')}`, {
    resourceGroupName: config.resourceGroup.name,
    location: __.require('location'),

    agentPoolProfiles: [{
        name: `${__.require('cluster_name')}`,
        count: +__.require('node_number'),
        vmSize: __.require('node_size'),
    

    }],
    dnsPrefix: `${__.require('cluster_name')}-dns`,
    linuxProfile: {
        adminUsername: __.require('username'),
        sshKey: {
            keyData: config.sshPublicKey,
        },
        
    },

    servicePrincipal: {
        clientId: adApp.applicationId ,
        clientSecret: adSpPassword.value,
    },
});


// // Expose a K8s provider instance using our custom cluster instance.
// export const k8sProvider = new k8s.Provider(`aks-${__.require('cluster_name')}-provider`, {
//     // kubeconfig: k8sCluster.kubeConfigRaw,
//     kubeconfig: __.require('kubeConfig')
// });
