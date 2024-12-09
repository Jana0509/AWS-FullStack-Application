# "Building a Full Stack Application: A Serverless Approach with AWS"

# Scenario:
Imagine you're building a full stack application where users hit via a front end[UI], backend should process the request and sends the response back to the user. The system should:
* Users hit the Frontend static website - S3
* Request should go to the backend service via API Gateway
* API gateway triggers the lambda.
* Lambda will fetch records from Dynamo DB.

# ARCHITECTURE DIAGRAM:

![image](https://github.com/user-attachments/assets/e4bafc3d-49d4-46f0-b9d2-d3d52ca9e8c1)


# Services Used:
**1. S3:** It is the storage service where you can store HTML, CSS and JS files.

**2. S3 Static Website :** It's the feature of S3 where you can host your frontend site which contain files such as HTML, CSS and JS.

**3. API GATEWAY** : It is used to create, publish, monitor your HTTP/REST API

**4. LAMBDA** : It helps to run your code and perform the business logic without provisioning the infrastructure.

**5. DYNAMO DB** : It's the No-SQL DB store where you can store your non relational data.

**LET'S START BUILDING IT!**
Normally, it's always the great way to backtrack things while building the system. So we are going to start creating from Dynamo DB.

# CREATE DYNAMO DB:
1. Navigate to the AWS Management Console, and go to the DynamoDB service and click create table

2. Provide the table name, partition key which is the primary key and sort key as below and click create by keeping other fields as default values.

   ![image](https://github.com/user-attachments/assets/82bd3dfb-47c6-4893-844c-980a51730d94)

3. Add the table records, I have added the table records in the below file. Click create item to add the items to the table.

   ![image](https://github.com/user-attachments/assets/57bde878-eb09-44d9-a7f8-a30b87a1694e)

4. Click Json view and add the json data one by one which is provided in the file.

   ![image](https://github.com/user-attachments/assets/6e643514-9026-4f85-a6df-7088b7e7d88a)

5. After adding all the records, you can explore all the data inserted to the table under Explore items tab

   ![image](https://github.com/user-attachments/assets/58a48229-95ef-4087-bedc-1721464b9851)


# CREATE LAMBDA FUNCTION:
1. Navigate to the AWS Management Console, and go to the Lambda and click create function.
   
2.  Give Function name and choose the runtime, Lambda supports various programming language such as python, nodejs, .net and etc. Choose your Runtime.

3. Click Create.

![image](https://github.com/user-attachments/assets/821ec2e5-8eaf-4dd6-a227-f24fc4262e18)

4. Now, we have to set execution role to lambda, so that lambda can access dynamo db. we are going to create the role for lambda by providing the access to dynamo db.

5. To set Execution role, go to the configuration tab and click the getRecipes-role.

![image](https://github.com/user-attachments/assets/38763c97-ea6d-477f-a5d5-39cf3fc73279)

6. Click Attach policies in IAM Console.

   ![image](https://github.com/user-attachments/assets/b828a984-1996-4bf2-98cc-bc326cd898e0)

7. Search "AmazonDynamoDBFullAccess" permission and select and click next. In production environment, it is always recommended to give table level access. Here for simplicity, we have provided "DynamoDBFullAccess"

   ![image](https://github.com/user-attachments/assets/b9195f72-15e8-4a97-a3e1-30eb71463625)

8. After Attaching the "DynamoDBFullAccess" to the lambda exceution role, Now it's to add the code for the lambda function.
Add Code: Use the following example code for Nodejs 18.x (replace with your logic if needed):

![image](https://github.com/user-attachments/assets/e132d9bc-c883-407f-ae01-b29115f0952d)

FYI : You can find the above code in Github- https://github.com/Jana0509/AWS-FullStack-Application

# CREATE API GATEWAY:
1. Navigate to the AWS API Gateway in AWS Console and choose API type as REST API

   ![image](https://github.com/user-attachments/assets/86542059-53d5-43f2-ad61-f1b2ffcaa6cc)

2. Provide the API name and click createAPI

   ![image](https://github.com/user-attachments/assets/4b136286-0506-4989-bee4-47844fe2eade)

3. Now, we have to create the resources, click create resources and give the resource name and create it.

![image](https://github.com/user-attachments/assets/60e3f3df-0e05-4b05-9efe-2a9c00d6b9ce)

4. After creating the resources, we have to add http method such as get, post, etc. We are adding get method to get the data from Dynamo DB.

5. Click Create method and provide the method name as "get" and integration type as "Lambda" as we are triggering lambda from API gateway. Then, select the lambda function which we created and click create method.

   ![image](https://github.com/user-attachments/assets/5823f2c4-d069-402d-8865-4640c339733a)


6. Enabling the CORS for the resource, because API gateway and frontend website are different domain, so we have to add CORS inorder to communicate frontend and backend services.
   
7.To enable CORS, click Enable CORS and check the GET Access control allow method and save it.

![image](https://github.com/user-attachments/assets/c66e3e32-e727-4e46-a8f0-8bb85168bb31)

![image](https://github.com/user-attachments/assets/2aae1a13-4c1d-43a2-ab28-b5195cabdbe9)

5. Choose Stage name (e.g., dev or prod) and Click Deploy.

6. Get API URL: After deployment, you'll be given an API endpoint URL. This will be the URL that clients can send requests to, such as https://<api-id>.execute-api.<region>.amazonaws.com/dev

   ![image](https://github.com/user-attachments/assets/01003d03-48c3-45de-9b61-702d41fe5352)


# CREATE S3 BUCKET AND ENABLE STATIC WEBSITE:
1. Search S3 and Give the Bucket name.
   
2. Enable Public Access for this bucket by disabling the checkbox.

   ![image](https://github.com/user-attachments/assets/3fbda86d-29e7-403d-8bd5-47b224419899)

3. Keep everything as default value and click create.

4. Go into the bucket and Upload the static files such as app.js, index.html and style.css and click upload

   ![image](https://github.com/user-attachments/assets/f1a38c7f-1228-4f3e-b258-4b4c9358d17c)

5. To Enable S3 Static Website, Go to properties and edit static website hosting, enable Enable.
Keep index.html as the landing page for your website and click save changes.

![image](https://github.com/user-attachments/assets/8f416d37-11f3-44b4-bfe3-ff271b5dd3fa)

6. To get the Frontend website URL, go to the properties again to check the website endpoint.

   ![image](https://github.com/user-attachments/assets/0a1fae9e-fedd-486c-ab5d-09049e37ed34)

7. If you try hitting the website from browser, you will getting 403 forbidden because bucket policy is missing.

   ![image](https://github.com/user-attachments/assets/d23884eb-9464-4e42-96f0-3e0a0c90d6e9)

8. To Add bucket policy, go to permission under bucket and click edit for Bucket policy and replace the bucketname with your name.
FYI: I have uploaded the bucket policy in GITHUB - https://github.com/Jana0509/AWS-FullStack-Application

![image](https://github.com/user-attachments/assets/b542793a-f3d9-4d6a-9608-ad2474f1ee93)

9. Now, if you try to hit the website, you will be able to render the website after enable the bucket policy

    ![image](https://github.com/user-attachments/assets/54aea1fc-7b4e-4b06-8c10-7429f30b1fd6)

10. In order to get the response from the API gateway, change the API gateway URL in app.js
 You can find the API gateway URL

![image](https://github.com/user-attachments/assets/63bd39a4-5e97-423a-8e2f-ac9f1602a079)

11. After Changing the URL in app.js, delete the already existing app.js file from the bucket and upload the latest file again to the bucket.

    # Test from Browser: 
1. Hit the website URL to check the response from the API gateway

   ![image](https://github.com/user-attachments/assets/e7f29f34-3115-4366-97d4-4afd4be1bc30)

What's happening behind the screen:
The request is going to the S3 Website, app.js calls the API gateway which in turns calls the lambda function to get the response from DynamoDB.

**CONGRATULATIONS!** You have successfully completed the full stack project using AWS serverless services.

# Enable Cloudwatch Logging for the Lambda:

PFA Blog and check for Enable Cloudwatch Logging for the Lambda section.

**Remember, don't forget to delete all resources created and configured when you are done following the steps of this article.**

If you've got this far, thanks for reading! I hope it was worthwhile to you.

Signing off!
Jana
