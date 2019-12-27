// Copyright 2016-2019, Pulumi Corporation.  All rights reserved.

import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
// import * as azuread from "@pulumi/azuread";

const __ = new pulumi.Config();

export const password = __.require("password");
const location = __.require('location');
export const sshPublicKey = __.require("sshPublicKey");

export const resourceGroup = new azure.core.ResourceGroup("aks", { location });
