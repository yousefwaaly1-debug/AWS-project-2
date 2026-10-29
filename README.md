 AWS Scalable Web Application & Snapshot Lifecycle Management

Overview
This repository contains the architecture design and backup automation logic for the AWS project.

---
Solution Architecture
The setup is deployed across two Availability Zones (us-east-1a and us-east-1b) inside a custom VPC:

Traffic & Security: Incoming requests hit Route 53 and AWS WAF before reaching the Application Load Balancer (ALB).
Compute: EC2 instances run inside private subnets across both zones for redundancy.
Database: Amazon RDS is configured in a private subnet using Multi-AZ deployment.
Outbound Internet: NAT Gateways in public subnets handle outbound traffic for private resources.

---

Architecture Diagram
[AWS Architecture](AWS.drawio.png)

---

Files in this Repo
snapshot-planner.js
AWS.drawio.png
README.md
