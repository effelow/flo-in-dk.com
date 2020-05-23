# Infrastructure Code

##  Description
The project contains the code to deploy the infrastructure for the [static-site] using AWS CDK. Infrastructure components to be deployed such as the file bucket for the static files, ssl certificate for authenticity, and content delivery network are all defined in this stack. AWS Services used are the following:
* S3
* Cloudfront
* SSL Certificate Manager


## Work from others

* [how-to-host-static-website-with-https-using-amazon-s3] 
* [aws-cdk-examples-static-site]


[how-to-host-static-website-with-https-using-amazon-s3]: https://medium.com/@channaly/how-to-host-static-website-with-https-using-amazon-s3-251434490c59
[aws-cdk-examples-static-site]: https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/static-site
[static-site]: https://github.com/effelow/flo-in-dk.com/tree/master/static-site

## Prerequs

* Git installed
* Node.JS installed
* AWS CDK installed
* Fully fletched AWS Account addressable via AWS CLI
* Registered domain and hosted zone configured under AWS route 53

## Installation

Download the repository and excecute and navigate into the deployment directory

```
$ git clone git@github.com:effelow/flo-in-dk.com.git
```
```
$ cd infrastructure-code
```


## Deployment

[cdk_deploy.yml]: https://github.com/effelow/flo-in-dk.com/blob/master/.github/workflows/cdk_deploy.yml
[cdk_diff.yml]: https://github.com/effelow/flo-in-dk.com/blob/master/.github/workflows/cdk_diff.yml

### Github Action Workflow

The workflow runs a `cdk diff` when generating a PR to master ([cdk_diff.yml])  and `cdk deploy` when the PR is accepted ([cdk_deploy.yml]).

![](https://github.com/actions/flo-in-dk.com/blob/master/.github/workflows/cdk_deploy.yml/badge.svg)

From you local machine execute `synth`, `diff` and finally `deploy` to deploy the infrastructure for your static s3 website
```console
$ cdk synth|diff|deploy \
--context account=<placeholder> \
--context region=<placeholder> \
--context domain=<placeholder> \
--context subdomain=<placeholder>
```

## Future Work
* Manage Deployment with Github Actions