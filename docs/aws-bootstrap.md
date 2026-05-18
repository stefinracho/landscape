# AWS Bootstrap

This document outlines the absolute minimum manual steps required in a brand new AWS account before Infrastructure as Code can take over.

## Prerequisites

* A brand new AWS Account (requires email, password, and credit card).
- [AWS Command Line Interface (AWS CLI)](https://docs.aws.amazon.com/cli/)

## 1. Secure the Root User

The root user has unrestricted access to your entire AWS account and must be protected immediately.

1. Log into the AWS Management Console.
2. Navigate to **IAM** (Identity and Access Management).
3. Under the Security Recommendations, enable **MFA (Multi-Factor Authentication)** for the root user.

## 2. Create the Terraform Administrator

Terraform needs an IAM User with programmatic access to build infrastructure on your behalf.

1. In the IAM dashboard, click **IAM users** on the left sidebar, then click the yellow **Create user** button.
2. **Specify user details:** Set the **User name** as `terraform-admin`. You do not need to provide AWS Management Console access to this user. Click Next.
3. **Set permissions:** Select **Attach policies directly**. Search for and check the box next to **AdministratorAccess**. Click Next.
4. **Review and create:** Review the details and click the yellow **Create user** button.

## 3. Generate Access Keys

Your new IAM user requires security credentials to authenticate and authorize programmatic requests to AWS.

1. Click on your newly created `terraform-admin` user in the **User name** column.
2. Go to the **Security credentials** tab.
3. Scroll down to **Access keys** and click **Create access key**.
4. **Access key best practices & alternatives:** Select **Command Line Interface (CLI)** as the Use case. Check the confirmation box at the bottom and click Next.
5. **Set description tag (optional):** Set a description tag (e.g., `terraform-local-bootstrap`), then click **Create access key**.
6. **Retrieve access keys:** Copy the **Access Key ID** and the **Secret Access Key**. This is the only time the Secret Access Key will ever be shown. Save them securely. Click Done.

## 4. Configure Local Machine

Now you must connect your local machine's Terraform workflow to this AWS account.

1. Ensure the AWS CLI is installed on your local machine.
2. Open your terminal and run:
   ```bash
   aws configure
   ```
3. Paste the **Access Key ID** when prompted.
4. Paste the **Secret Access Key** when prompted.
5. Set the default region name (e.g., `us-west-2`).
6. Set the default output format to `json`.

## 5. Verify Authentication

Verify your setup with the steps below.

1. Run the following command in your terminal:

   ```bash
   aws sts get-caller-identity

   ```

2. You should receive a JSON response containing your Account ID and the ARN ending in `/terraform-admin`:

   ```sh
   {
       "UserId": "AIDAxxxxxxxxxxxxxxxxx",
       "Account": "123456789012",
       "Arn": "arn:aws:iam::123456789012:user/terraform-admin"
   }
   ```

Your local machine is now authenticated to AWS. From this point forward, you do not need to manually configure infrastructure via the AWS console; Terraform will handle all AWS infrastructure provisioning.
