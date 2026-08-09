# Mavencrest Store

A production-grade sporting goods e-commerce platform built with Next.js, Prisma, and PostgreSQL. The application demonstrates modern cloud-native application development, immutable infrastructure, Infrastructure as Code (Terraform), automated CI/CD, and highly available deployments on AWS.

---

## Architecture

### Application Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- Neon PostgreSQL
- NextAuth Authentication
- Docker support

### AWS Infrastructure

- Amazon EC2
- Auto Scaling Group
- Application Load Balancer
- Amazon S3
- Amazon CloudFront
- Route 53
- AWS Systems Manager Parameter Store
- IAM Roles
- Amazon Machine Images (AMI)

### Azure Infrastructure

- Azure container app
- Docker image
- Azure container registry

### Infrastructure as Code

Infrastructure is fully provisioned using Terraform.

The application infrastructure includes:

- VPC networking
- Security Groups
- Auto Scaling
- Launch Templates
- Load Balancer
- IAM Roles
- Route53 DNS
- S3 buckets
- CloudFront distribution

---



## CI/CD Pipeline

Application deployments use immutable infrastructure.

```
Developer Push
        │
        ▼
GitHub Actions
        │
        ▼
Packer builds immutable AMI
        │
        ▼
AMI ID published to AWS Systems Manager Parameter Store
        │
        ▼
Automatically triggers Infrastructure Deployment
        │
        ▼
Terraform updates Launch Template
        │
        ▼
Auto Scaling Instance Refresh
        │
        ▼
New EC2 instances become healthy
        │
        ▼
Old instances terminated
```

This approach provides:

- Immutable deployments
- Zero manual AMI updates
- Automated infrastructure deployment
- Consistent production environments
- Reduced deployment risk

---



## Repository Structure

```
.
├── apps
│   ├── storefront
│   └── admin
├── packages
│   └── database
├── scripts
├── packer
└── .github
```

---



## Local Development

Install dependencies:

```bash
npm install
```

Run the storefront:

```bash
npm run dev:store
```

Run the admin portal:

```bash
npm run dev:admin
```

---



## Database

Prisma manages all database access.

Generate the Prisma client:

```bash
npm run db:generate
```

Seed featured products:

```bash
npx tsx scripts/seed-featured-products.ts
```

---



## Security

- IAM Roles (no long-lived AWS credentials)
- GitHub Actions OIDC authentication
- Secrets stored in AWS Systems Manager Parameter Store
- Environment-specific configuration
- HTTPS through Application Load Balancer

---



## Production Features

- Immutable AMI deployments
- Auto Scaling
- Load balancing
- Automated infrastructure provisioning
- Infrastructure as Code
- Automated CI/CD
- CloudFront CDN
- Object storage with Amazon S3
- PostgreSQL database
- Role-based AWS authentication

---



## Future Enhancements

- Kubernetes deployment
- Blue/Green deployments
- Canary releases
- WAF integration
- CloudWatch dashboards
- Centralized logging
- Automated security scanning
- Performance testing

---



## License

Portfolio project demonstrating modern AWS cloud architecture, DevOps automation, and production deployment practices.