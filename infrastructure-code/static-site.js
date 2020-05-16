#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudfront = require("@aws-cdk/aws-cloudfront");
const route53 = require("@aws-cdk/aws-route53");
const s3 = require("@aws-cdk/aws-s3");
const acm = require("@aws-cdk/aws-certificatemanager");
const cdk = require("@aws-cdk/core");
const targets = require("@aws-cdk/aws-route53-targets/lib");
const core_1 = require("@aws-cdk/core");
/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
class StaticSite extends core_1.Construct {
    constructor(parent, name, props) {
        super(parent, name);
        const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: props.domainName });
        const siteDomain = props.siteSubDomain + '.' + props.domainName;
        new cdk.CfnOutput(this, 'Site', { value: 'https://' + siteDomain });
        // Content bucket
        const siteBucket = new s3.Bucket(this, 'SiteBucket', {
            bucketName: siteDomain,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'error.html',
            publicReadAccess: true,
            // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
            // the new bucket, and it will remain in your account until manually deleted. By setting the policy to
            // DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
        new cdk.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });
        // TLS certificate
        const certificateArn = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
            domainName: siteDomain,
            hostedZone: zone
        }).certificateArn;
        new cdk.CfnOutput(this, 'Certificate', { value: certificateArn });
        // CloudFront distribution that provides HTTPS
        const distribution = new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
            aliasConfiguration: {
                acmCertRef: certificateArn,
                names: [siteDomain],
                sslMethod: cloudfront.SSLMethod.SNI,
                securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
            },
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: siteBucket
                    },
                    behaviors: [{ isDefaultBehavior: true }],
                }
            ]
        });
        new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });
        // Route53 alias record for the CloudFront distribution
        new route53.ARecord(this, 'SiteAliasRecord', {
            recordName: siteDomain,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
            zone
        });
    }
}
exports.StaticSite = StaticSite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXNpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWMtc2l0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzREFBdUQ7QUFDdkQsZ0RBQWlEO0FBQ2pELHNDQUF1QztBQUN2Qyx1REFBd0Q7QUFDeEQscUNBQXNDO0FBQ3RDLDREQUE2RDtBQUM3RCx3Q0FBMEM7QUFPMUM7Ozs7O0dBS0c7QUFDSCxNQUFhLFVBQVcsU0FBUSxnQkFBUztJQUNyQyxZQUFZLE1BQWlCLEVBQUUsSUFBWSxFQUFFLEtBQXNCO1FBQy9ELEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFcEIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUMzRixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsYUFBYSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ2hFLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXBFLGlCQUFpQjtRQUNqQixNQUFNLFVBQVUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNqRCxVQUFVLEVBQUUsVUFBVTtZQUN0QixvQkFBb0IsRUFBRSxZQUFZO1lBQ2xDLG9CQUFvQixFQUFFLFlBQVk7WUFDbEMsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixnR0FBZ0c7WUFDaEcsc0dBQXNHO1lBQ3RHLHFHQUFxRztZQUNyRyxhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPO1NBQzNDLENBQUMsQ0FBQztRQUNILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXBFLGtCQUFrQjtRQUNsQixNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDNUUsVUFBVSxFQUFFLFVBQVU7WUFDdEIsVUFBVSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNsQixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBRWxFLDhDQUE4QztRQUM5QyxNQUFNLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDcEYsa0JBQWtCLEVBQUU7Z0JBQ2hCLFVBQVUsRUFBRSxjQUFjO2dCQUMxQixLQUFLLEVBQUUsQ0FBRSxVQUFVLENBQUU7Z0JBQ3JCLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUc7Z0JBQ25DLGNBQWMsRUFBRSxVQUFVLENBQUMsc0JBQXNCLENBQUMsYUFBYTthQUNsRTtZQUNELGFBQWEsRUFBRTtnQkFDWDtvQkFDSSxjQUFjLEVBQUU7d0JBQ1osY0FBYyxFQUFFLFVBQVU7cUJBQzdCO29CQUNELFNBQVMsRUFBRyxDQUFFLEVBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFDLENBQUM7aUJBQzNDO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBRWxGLHVEQUF1RDtRQUN2RCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ3pDLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsRixJQUFJO1NBQ1AsQ0FBQyxDQUFDO0lBRVAsQ0FBQztDQUNKO0FBdkRELGdDQXVEQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCBjbG91ZGZyb250ID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnQnKTtcbmltcG9ydCByb3V0ZTUzID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLXJvdXRlNTMnKTtcbmltcG9ydCBzMyA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1zMycpO1xuaW1wb3J0IGFjbSA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXInKTtcbmltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jb3JlJyk7XG5pbXBvcnQgdGFyZ2V0cyA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1yb3V0ZTUzLXRhcmdldHMvbGliJyk7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdAYXdzLWNkay9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNTaXRlUHJvcHMge1xuICAgIGRvbWFpbk5hbWU6IHN0cmluZztcbiAgICBzaXRlU3ViRG9tYWluOiBzdHJpbmc7XG59XG5cbi8qKlxuICogU3RhdGljIHNpdGUgaW5mcmFzdHJ1Y3R1cmUsIHdoaWNoIGRlcGxveXMgc2l0ZSBjb250ZW50IHRvIGFuIFMzIGJ1Y2tldC5cbiAqXG4gKiBUaGUgc2l0ZSByZWRpcmVjdHMgZnJvbSBIVFRQIHRvIEhUVFBTLCB1c2luZyBhIENsb3VkRnJvbnQgZGlzdHJpYnV0aW9uLFxuICogUm91dGU1MyBhbGlhcyByZWNvcmQsIGFuZCBBQ00gY2VydGlmaWNhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0aWNTaXRlIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQ6IENvbnN0cnVjdCwgbmFtZTogc3RyaW5nLCBwcm9wczogU3RhdGljU2l0ZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudCwgbmFtZSk7XG5cbiAgICAgICAgY29uc3Qgem9uZSA9IHJvdXRlNTMuSG9zdGVkWm9uZS5mcm9tTG9va3VwKHRoaXMsICdab25lJywgeyBkb21haW5OYW1lOiBwcm9wcy5kb21haW5OYW1lIH0pO1xuICAgICAgICBjb25zdCBzaXRlRG9tYWluID0gcHJvcHMuc2l0ZVN1YkRvbWFpbiArICcuJyArIHByb3BzLmRvbWFpbk5hbWU7XG4gICAgICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdTaXRlJywgeyB2YWx1ZTogJ2h0dHBzOi8vJyArIHNpdGVEb21haW4gfSk7XG5cbiAgICAgICAgLy8gQ29udGVudCBidWNrZXRcbiAgICAgICAgY29uc3Qgc2l0ZUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ1NpdGVCdWNrZXQnLCB7XG4gICAgICAgICAgICBidWNrZXROYW1lOiBzaXRlRG9tYWluLFxuICAgICAgICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6ICdpbmRleC5odG1sJyxcbiAgICAgICAgICAgIHdlYnNpdGVFcnJvckRvY3VtZW50OiAnZXJyb3IuaHRtbCcsXG4gICAgICAgICAgICBwdWJsaWNSZWFkQWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgLy8gVGhlIGRlZmF1bHQgcmVtb3ZhbCBwb2xpY3kgaXMgUkVUQUlOLCB3aGljaCBtZWFucyB0aGF0IGNkayBkZXN0cm95IHdpbGwgbm90IGF0dGVtcHQgdG8gZGVsZXRlXG4gICAgICAgICAgICAvLyB0aGUgbmV3IGJ1Y2tldCwgYW5kIGl0IHdpbGwgcmVtYWluIGluIHlvdXIgYWNjb3VudCB1bnRpbCBtYW51YWxseSBkZWxldGVkLiBCeSBzZXR0aW5nIHRoZSBwb2xpY3kgdG9cbiAgICAgICAgICAgIC8vIERFU1RST1ksIGNkayBkZXN0cm95IHdpbGwgYXR0ZW1wdCB0byBkZWxldGUgdGhlIGJ1Y2tldCwgYnV0IHdpbGwgZXJyb3IgaWYgdGhlIGJ1Y2tldCBpcyBub3QgZW1wdHkuXG4gICAgICAgICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLCAvLyBOT1QgcmVjb21tZW5kZWQgZm9yIHByb2R1Y3Rpb24gY29kZVxuICAgICAgICB9KTtcbiAgICAgICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0J1Y2tldCcsIHsgdmFsdWU6IHNpdGVCdWNrZXQuYnVja2V0TmFtZSB9KTtcblxuICAgICAgICAvLyBUTFMgY2VydGlmaWNhdGVcbiAgICAgICAgY29uc3QgY2VydGlmaWNhdGVBcm4gPSBuZXcgYWNtLkRuc1ZhbGlkYXRlZENlcnRpZmljYXRlKHRoaXMsICdTaXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICAgICAgICBkb21haW5OYW1lOiBzaXRlRG9tYWluLFxuICAgICAgICAgICAgaG9zdGVkWm9uZTogem9uZVxuICAgICAgICB9KS5jZXJ0aWZpY2F0ZUFybjtcbiAgICAgICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0NlcnRpZmljYXRlJywgeyB2YWx1ZTogY2VydGlmaWNhdGVBcm4gfSk7XG5cbiAgICAgICAgLy8gQ2xvdWRGcm9udCBkaXN0cmlidXRpb24gdGhhdCBwcm92aWRlcyBIVFRQU1xuICAgICAgICBjb25zdCBkaXN0cmlidXRpb24gPSBuZXcgY2xvdWRmcm9udC5DbG91ZEZyb250V2ViRGlzdHJpYnV0aW9uKHRoaXMsICdTaXRlRGlzdHJpYnV0aW9uJywge1xuICAgICAgICAgICAgYWxpYXNDb25maWd1cmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgYWNtQ2VydFJlZjogY2VydGlmaWNhdGVBcm4sXG4gICAgICAgICAgICAgICAgbmFtZXM6IFsgc2l0ZURvbWFpbiBdLFxuICAgICAgICAgICAgICAgIHNzbE1ldGhvZDogY2xvdWRmcm9udC5TU0xNZXRob2QuU05JLFxuICAgICAgICAgICAgICAgIHNlY3VyaXR5UG9saWN5OiBjbG91ZGZyb250LlNlY3VyaXR5UG9saWN5UHJvdG9jb2wuVExTX1YxXzFfMjAxNixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5Db25maWdzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzM09yaWdpblNvdXJjZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgczNCdWNrZXRTb3VyY2U6IHNpdGVCdWNrZXRcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3JzIDogWyB7aXNEZWZhdWx0QmVoYXZpb3I6IHRydWV9XSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgICAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnRGlzdHJpYnV0aW9uSWQnLCB7IHZhbHVlOiBkaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uSWQgfSk7XG5cbiAgICAgICAgLy8gUm91dGU1MyBhbGlhcyByZWNvcmQgZm9yIHRoZSBDbG91ZEZyb250IGRpc3RyaWJ1dGlvblxuICAgICAgICBuZXcgcm91dGU1My5BUmVjb3JkKHRoaXMsICdTaXRlQWxpYXNSZWNvcmQnLCB7XG4gICAgICAgICAgICByZWNvcmROYW1lOiBzaXRlRG9tYWluLFxuICAgICAgICAgICAgdGFyZ2V0OiByb3V0ZTUzLlJlY29yZFRhcmdldC5mcm9tQWxpYXMobmV3IHRhcmdldHMuQ2xvdWRGcm9udFRhcmdldChkaXN0cmlidXRpb24pKSxcbiAgICAgICAgICAgIHpvbmVcbiAgICAgICAgfSk7XG5cbiAgICB9XG59Il19