# About
This is the first main poc in using apig, lambda, and dynamodb. This project has one function which is to query the
Repeater table in dynamodb. The query uses the '?state=California' in the uri query params.

# AWS Lambda & Rust Deployment Method


<p float="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/mjehrhart/assets/main/images/Amazon_Lambda_architecture_logo.svg_BJlr5ojmmqIb7PH7.png" width="300" />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/mjehrhart/assets/main/images/Moby-logo_lzPn2FhabJy0xWhh.webp" width="300" />  
</p>


# Prerequisite
This guide is written for macOS users. Make sure you have these following items installed and configured if needed. Installing these items takes only a few minutes. This guide will help you deploy rust lambdas into AWS using SAM CLI along with Docker. Plus you can test locally using SAM CLI as well. Save time by not deploying until you want too.

- AWS SAM CLI  
	https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html

- Docker - container for building cross compilation  
  https://docs.docker.com/get-started/  

- Artillery - used for rapid testing  
  ```npm install -g artillery@latest```

# Setup
Open your mac terminal to your projects home directory
- ```git clone https://github.com/mjehrhart/sam-rust-template.git``` or use ```sam init``` for a new install
- ```make setup``` (uses the Makefile from this repo)
- Make any changes to Makefile
- Make any changes to template.yaml  

Once all this is done, go ahead and do your coding stuff.  As of the time of writing this, various rust crates do not work in AWS lambda or at least I haven't been able to get them to work.  So be careful and take your time testing crates.  For me, it was a lot of trial and error.  

# Commands
Using Docker with SAM CLI is preferred for the build
- ```make build```

Deploy to AWS
- ```make deploy```

# Testing Options
- ```make tests-unit```

- ```make tests-integ```

- ```make test``` (only restart server if changes to template.yaml are made )

Update Changes to test locally with SAM CLI
- ```make build```
- open browser to http://127.0.0.1:3000
- SAM CLI will work off of the updated bootstrap file. That is why we update it here after any changes to the code.

# Cleanup
- ```sam delete```

# Helpful Links
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/building-custom-runtimes.html

- https://github.com/aws-samples/serverless-rust-demo

- https://github.com/awslabs/aws-lambda-rust-runtime/blob/main/lambda-http/examples/hello-http.rs
 
# Note
If you follow this guide and use this setup with the Makefile you will still need to go into the AWS Lamnda console and set the "Exexution Role" for the lambda to execute. I have not figured out how to change the IAM roles in the template.yaml file yet. So for now, I manual add the IAM role (with permissions to cloudwatch, lamda executions, etc...) in the console.

# Screenshots  

#### Makefile
Here is what my Makefile looks like. It works great for me. I encourage you to look inside the Makefile and see the commands are calling behind the scene.  I tried to make it simple and easy to follow (at least for me). If you have an suggestions about how to improve the Makefile of anything else, go ahead and post an issue in this repo and I'll do my best to update whatever it is that needs updating. Note, this Makefile screenshot probably will not reflect on the most recent changes that are found in the real file in this file. I added the Makefile screenshot just so people have a quick reference to look at if they are unfamiliar (like I am) with Makefiles.

<img width="50%" alt="images/Screen Shot 2022-05-11 at 10.04.38 AM_gOO0tQxBTQudo5Re.png" src="https://raw.githubusercontent.com/mjehrhart/assets/main/images/Screen Shot 2022-05-11 at 10.04.38 AM_gOO0tQxBTQudo5Re.png">

#### template.yaml
Note the CodeUri points to the build/ directory.  This is where the bootstrap file will be put.  So the CodeUri points to the location of the bootstrap for that function.  

<img width="50%" alt="images/Screen Shot 2022-05-10 at 10.00.09 AM_NDCdNwvovL0Tjp0Y.png" src="https://raw.githubusercontent.com/mjehrhart/assets/main/images/Screen Shot 2022-05-10 at 10.00.09 AM_NDCdNwvovL0Tjp0Y.png">

updated 05/14/2022
