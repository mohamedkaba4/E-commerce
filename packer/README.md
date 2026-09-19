# Packer

Packer is used to create the Amazon Machine Image (AMI) that runs the Mavencrest application on EC2.

Once Continuous Integration (CI) successfully validates the application, the Packer workflow starts.

```text
GitHub Actions Runner
        |
        ├── packer init
        ├── create /tmp/mavencrest-build
        └── packer build
                |
                v
        Temporary EC2 Instance
                |
                ├── launched from source AMI
                ├── placed in configured subnet
                ├── assigned IAM instance profile
                └── configured by .pkr.hcl
                |
                v
        Copy application source
        /tmp/mavencrest-build
                ↓
        /tmp/mavencrest-src
                |
                v
        Run build-app.sh
                |
                ├── copy app to /home/ec2-user/E-commerce
                ├── install dependencies with npm ci
                ├── generate Prisma client
                ├── build Storefront and Admin
                ├── configure Nginx
                └── configure PM2
                |
                v
        Create AMI from configured EC2 instance
                |
                v
        Terminate temporary EC2 instance
```
Packer configuration

The .pkr.hcl configuration defines the temporary EC2 build instance, including:

source AMI, subnet, instance type, SSH user, IAM instance profile, AWS region, Amazon Elastic Block Store (EBS) AMI builder

The amazon-ebs source tells Packer to launch an EBS-backed EC2 instance, configure it, and create a new AMI from that instance.

Packer build starts
The temporary directory with the new code is copied from the GitHub runner to the temporary EC2 instance
A shell provisioner runs build-app.sh
The script sets the application directory, for example APP_DIR=/home/ec2-user/E-commerce
The copied application code is moved into that application directory
Nginx is installed and started
Application dependencies are installed with npm ci, using the versions locked in package-lock.json
The Prisma/database setup script runs, followed by the Storefront and Admin builds
PM2 is started to manage the application processes

After the build completes, Packer creates the AMI and writes the resulting AMI ID to manifest.json. The temporary EC2 instance is then terminated

The GitHub Actions workflow then publishes the AMI ID to AWS Systems Manager (SSM) Parameter Store for use by the AWS-Mavencrest deployment workflow.


 
