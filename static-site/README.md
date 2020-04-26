# ZSH Configuration

##  Description
The project contains my personal blog content. As part of the technology to build this blog I used the Hexo Framework, a static site generator. These type of frameworks follow a new style of site building called Jamstack. New blog posts can be written in markdown language. The main advantage of Jamstack websites however is that they do not depend on a  webserver which, in turn, promises better dev experience, better performance, higher security. 

Build and Deployment work by using the new Actions Feature from Github. Target hosting platform is AWS S3 Static Web Hosting.


## Work from others

* [build-a-serverless-production-ready-blog]. Origin that lead to the idea of this project. Special thanks to mlabouardy
* [hexo-plugins] 
* [hexo-deployer-s3] from nt3rp
* [deploying-a-react-app-to-aws-s3-with-github-actions] 


[build-a-serverless-production-ready-blog]: https://hackernoon.com/build-a-serverless-production-ready-blog-b1583c0a5ac2
[hexo-plugins]:                             https://hexo.io/plugins/
[hexo-deployer-s3]:                         https://github.com/nt3rp/hexo-deployer-s3
[deploying-a-react-app-to-aws-s3-with-github-actions]:                       https://medium.com/trackstack/deploying-a-react-app-to-aws-s3-with-github-actions-b1cb9ba75c95

## Prerequs

* Git installed
* Node.JS installed

## Installation

Clone the repo
```console
git clone git@github.com:effelow/flo-in-dk.com.git
```

Use Hexo to create new posts or change existing post 

## Deployemnt

The Github Actions listens on push events to the master branch. So any commit to `master` will able the latest changes to the production blog.
```console
git add .; git commit -m "test deploy"; git push
```

## Future Work

* Use infrastructure-as-code approach to deploy S3 Deployer User and inline policy to AWS Account
* Setup a more user-friendly domain name
* Equipe the Static Website with a valide SSL Server Certificate