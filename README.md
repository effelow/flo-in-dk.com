# Hexo Blog - flo-in-dk.andthe.world

##  Description
The project contains my personal blog content. As part of the technology to build this blog I used the Hexo Framework, a static site generator. These types of frameworks follow a new style of site building called Jamstack. New blog posts can be written in so called markdown language. The main advantage of Jamstack websites is that they do not depend on any webserver which in turn promises better development experience, better performance, higher security. 

Build and Deployment work by using the Action Workflow Feature from Github. Target hosting platform is AWS S3 Static Web Hosting. 


## Work from others

* [build-a-serverless-production-ready-blog]. Origin that lead to the idea of this project. Special thanks to mlabouardy
* [hexo-plugins] 
* [hexo-deployer-s3] from nt3rp
* [deploying-a-react-app-to-aws-s3-with-github-actions] 


[build-a-serverless-production-ready-blog]: https://hackernoon.com/build-a-serverless-production-ready-blog-b1583c0a5ac2
[hexo-plugins]:                             https://hexo.io/plugins/
[hexo-deployer-s3]:                         https://github.com/nt3rp/hexo-deployer-s3
[deploying-a-react-app-to-aws-s3-with-github-actions]:                       https://medium.com/trackstack/deploying-a-react-app-to-aws-s3-with-github-actions-b1cb9ba75c95

[infrastructure-code]: https://github.com/effelow/flo-in-dk.com/blob/master/infrastructure-code/README.md

## Prerequs

* Git installed
* Node.JS installed

## Installation

Clone the repo
```console
$ git clone git@github.com:effelow/flo-in-dk.com.git
```
```console
$ cd static-site
```

Use Hexo to create new posts or change existing post 

## Deployment

Since it is a one person project, the Github Actions is triggered on push events to the master branch. So any commit to `master` will able the latest changes to the production blog.
```console
$ git add .; git commit -m "test deploy"; git push
```

For the deployment of the infrastructure, please note the [infrastructure-code] section.

## Future Work

* [ ] Use infrastructure-as-code approach to deploy S3 Deployer User and inline policy to AWS Account
* [x] Setup a more user-friendly domain name
* [x] Equip the static website with a valid SSL Server Certificate
* [ ] Remove .jpg files from git source code version control and store in S3 directly
* [ ] Separate blog content from source code content
* [ ] Write more content