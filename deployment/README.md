# ZSH Configuration

##  Description
The project contains software defined infrastructure code to deploy the (static-site)[../static-site] using AWS CDK. Infrastructure components to be deployed such as the s3 bucket, ssl certificates, content delivery infrastructure are all defined in this stack.  


## Work from others

* [how-to-host-static-website-with-https-using-amazon-s3] 
* [aws-cdk-examples-static-site]


[how-to-host-static-website-with-https-using-amazon-s3]: https://medium.com/@channaly/how-to-host-static-website-with-https-using-amazon-s3-251434490c59

[aws-cdk-examples-static-site]: https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/static-site

## Prerequs

* Git installed
* Node.JS installed

## Installation

Download the repository and excecute: "`cd deployment`"  to come to the right folder

## Deployemnt

From you local machine
```console
cdk diff|deploy \
--context 'account=<placeholder>' \
--context region=<placeholder> \
--context domain=<placeholder> \
--context subdomain=<placeholder>
```

## Future Work
