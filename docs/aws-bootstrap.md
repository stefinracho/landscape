# AWS Bootstrap Runbook

This document outlines the absolute minimum manual steps required in a brand new AWS account before Infrastructure as Code can take over.

## Prerequisites

* A brand new AWS Account (requires email, password, and credit card).

## Step 1: Secure the Root User

1. Log into the AWS Management Console using the root email address and password.
2. Immediately navigate to **IAM** (Identity and Access Management).
3. Under the Security Recommendations, enable **MFA (Multi-Factor Authentication)** for the root user.

## Step 2: Create the Terraform Administrator

Terraform needs an IAM User with programmatic access to build infrastructure on your behalf.

1. In the IAM dashboard, click **Users** on the left sidebar, then click **Create user**.
2. **User Details:** Name the user `terraform-admin`. You do not need to provide AWS Management Console access to this user. Click Next.
3. **Permissions:** Select **Attach policies directly**.
4. Search for and check the box next to **AdministratorAccess**. Click Next.
5. Review the details and click **Create user**.

## Step 3: Generate Access Keys

1. Click on your newly created `terraform-admin` user in the Users list.
2. Go to the **Security credentials** tab.
3. Scroll down to **Access keys** and click **Create access key**.
4. Select **Command Line Interface (CLI)** as the use case. Check the confirmation box at the bottom and click Next.
5. (Optional) Set a description tag, then click **Create access key**.
6. **CRITICAL:** Copy the **Access key ID** and the **Secret access key**. *This is the only time the Secret Access Key will ever be shown.* Save them securely.

## Step 4: Configure Local Machine

Now you must connect your local machine's Terraform workflow to this AWS account.

1. Ensure the [AWS CLI](https://aws.amazon.com/cli/) is installed on your local machine.
2. Open your terminal and run:
   ```bash
   aws configure
   ```
3. Paste the **Access Key ID** when prompted.
4. Paste the **Secret Access Key** when prompted.
5. Set the default region name (e.g., `us-east-1`).
6. Set the default output format to `json`.

Your local machine is now authenticated to AWS. From this point forward, you do not need to manually configure infrastructure via the AWS console; Terraform will handle all AWS infrastructure provisioning.
