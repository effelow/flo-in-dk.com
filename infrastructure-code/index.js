#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const static_site_1 = require("./static-site");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBc0M7QUFDdEMsK0NBQTJDO0FBRTNDLE1BQU0saUJBQWtCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDckMsWUFBWSxNQUFlLEVBQUUsSUFBWSxFQUFFLEtBQXFCO1FBQzVELEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTNCLElBQUksd0JBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQy9CLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDN0MsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztTQUN0RCxDQUFDLENBQUM7SUFDUixDQUFDO0NBQ0g7QUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUUxQixJQUFJLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUU7UUFDOUMsZ0VBQWdFO1FBQ2hFLGlFQUFpRTtRQUNqRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7UUFDeEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCO0tBRXpDLEVBQUMsQ0FBQyxDQUFDO0FBRUosR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NvcmUnKTtcbmltcG9ydCB7IFN0YXRpY1NpdGUgfSBmcm9tICcuL3N0YXRpYy1zaXRlJztcblxuY2xhc3MgTXlTdGF0aWNTaXRlU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudDogY2RrLkFwcCwgbmFtZTogc3RyaW5nLCBwcm9wczogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocGFyZW50LCBuYW1lLCBwcm9wcyk7XG5cbiAgICAgICAgbmV3IFN0YXRpY1NpdGUodGhpcywgJ1N0YXRpY1NpdGUnLCB7XG4gICAgICAgICAgICBkb21haW5OYW1lOiB0aGlzLm5vZGUudHJ5R2V0Q29udGV4dCgnZG9tYWluJyksXG4gICAgICAgICAgICBzaXRlU3ViRG9tYWluOiB0aGlzLm5vZGUudHJ5R2V0Q29udGV4dCgnc3ViZG9tYWluJyksXG4gICAgICAgIH0pO1xuICAgfVxufVxuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG5uZXcgTXlTdGF0aWNTaXRlU3RhY2soYXBwLCAnTXlTdGF0aWNTaXRlJywgeyBlbnY6IHtcbiAgICAvLyBTdGFjayBtdXN0IGJlIGluIHVzLWVhc3QtMSwgYmVjYXVzZSB0aGUgQUNNIGNlcnRpZmljYXRlIGZvciBhXG4gICAgLy8gZ2xvYmFsIENsb3VkRnJvbnQgZGlzdHJpYnV0aW9uIG11c3QgYmUgcmVxdWVzdGVkIGluIHVzLWVhc3QtMS5cbiAgICBhY2NvdW50OiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9BQ0NPVU5ULFxuICAgIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfUkVHSU9OLCBcblxufX0pO1xuXG5hcHAuc3ludGgoKTsiXX0=