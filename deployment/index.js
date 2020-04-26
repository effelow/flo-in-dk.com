#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const static_site_1 = require("./static-site");
/**
 * This stack relies on getting the domain name from CDK context.
 * Use 'cdk synth -c domain=mystaticsite.com -c subdomain=www'
 * Or add the following to cdk.json:
 * {
 *   "context": {
 *     "domain": "mystaticsite.com",
 *     "subdomain": "www"
 *   }
 * }
**/
class MyStaticSiteStack extends cdk.Stack {
    constructor(parent, name, props) {
        super(parent, name, props);
        new static_site_1.StaticSite(this, 'StaticSite', {
            domainName: this.node.tryGetContext('domain'),
            siteSubDomain: this.node.tryGetContext('subdomain'),
        });
    }
}
const app = new cdk.App();
new MyStaticSiteStack(app, 'MyStaticSite', { env: {
        // Stack must be in us-east-1, because the ACM certificate for a
        // global CloudFront distribution must be requested in us-east-1.
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    } });
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBc0M7QUFDdEMsK0NBQTJDO0FBRTNDOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLGlCQUFrQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3JDLFlBQVksTUFBZSxFQUFFLElBQVksRUFBRSxLQUFxQjtRQUM1RCxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUzQixJQUFJLHdCQUFVLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUMvQixVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQzdDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7U0FDdEQsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztDQUNIO0FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFMUIsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLEVBQUUsR0FBRyxFQUFFO1FBQzlDLGdFQUFnRTtRQUNoRSxpRUFBaUU7UUFDakUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO1FBQ3hDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQjtLQUV6QyxFQUFDLENBQUMsQ0FBQztBQUVKLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jb3JlJyk7XG5pbXBvcnQgeyBTdGF0aWNTaXRlIH0gZnJvbSAnLi9zdGF0aWMtc2l0ZSc7XG5cbi8qKlxuICogVGhpcyBzdGFjayByZWxpZXMgb24gZ2V0dGluZyB0aGUgZG9tYWluIG5hbWUgZnJvbSBDREsgY29udGV4dC5cbiAqIFVzZSAnY2RrIHN5bnRoIC1jIGRvbWFpbj1teXN0YXRpY3NpdGUuY29tIC1jIHN1YmRvbWFpbj13d3cnXG4gKiBPciBhZGQgdGhlIGZvbGxvd2luZyB0byBjZGsuanNvbjpcbiAqIHtcbiAqICAgXCJjb250ZXh0XCI6IHtcbiAqICAgICBcImRvbWFpblwiOiBcIm15c3RhdGljc2l0ZS5jb21cIixcbiAqICAgICBcInN1YmRvbWFpblwiOiBcInd3d1wiXG4gKiAgIH1cbiAqIH1cbioqL1xuY2xhc3MgTXlTdGF0aWNTaXRlU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudDogY2RrLkFwcCwgbmFtZTogc3RyaW5nLCBwcm9wczogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocGFyZW50LCBuYW1lLCBwcm9wcyk7XG5cbiAgICAgICAgbmV3IFN0YXRpY1NpdGUodGhpcywgJ1N0YXRpY1NpdGUnLCB7XG4gICAgICAgICAgICBkb21haW5OYW1lOiB0aGlzLm5vZGUudHJ5R2V0Q29udGV4dCgnZG9tYWluJyksXG4gICAgICAgICAgICBzaXRlU3ViRG9tYWluOiB0aGlzLm5vZGUudHJ5R2V0Q29udGV4dCgnc3ViZG9tYWluJyksXG4gICAgICAgIH0pO1xuICAgfVxufVxuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG5uZXcgTXlTdGF0aWNTaXRlU3RhY2soYXBwLCAnTXlTdGF0aWNTaXRlJywgeyBlbnY6IHtcbiAgICAvLyBTdGFjayBtdXN0IGJlIGluIHVzLWVhc3QtMSwgYmVjYXVzZSB0aGUgQUNNIGNlcnRpZmljYXRlIGZvciBhXG4gICAgLy8gZ2xvYmFsIENsb3VkRnJvbnQgZGlzdHJpYnV0aW9uIG11c3QgYmUgcmVxdWVzdGVkIGluIHVzLWVhc3QtMS5cbiAgICBhY2NvdW50OiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9BQ0NPVU5ULFxuICAgIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfUkVHSU9OLCBcbiAgICBcbn19KTtcblxuYXBwLnN5bnRoKCk7Il19