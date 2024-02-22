# Cloud Assignment - Cloud Native Web Application 
Name - Samiksha Baral
Nuid - 002825118

## Getting Started

These instructions will help you set up and run the project on your local machine.

## Prerequisites

- Node.js and npm should be installed on your machine.

## Installing

1. Clone the repository:

    git clone https://github.com/baralsam/webapp.js
    

2. Navigate to the project directory:
   
    cd webapp
    

3. Install dependencies using npm:

    npm i

4. Run the project

    npm start

5. Run test cases   

    npm test

#### Assignemnt 1
 
* Method Allowed -> GET
* Successful Request -> curl --location 'http://localhost:8080/healthz'
* Bad Request -> curl --location --request GET 'http://localhost:8080/healthz' \
--header 'Content-Type: text/plain' \
--data 'Hii'


#### Assignemnt 2

* Methods Allowed -> GET, POST, PUT
* Authorization Type -> Basic Auth

* Get Request -> curl --location 'http://localhost:3001/v1/user/self' \
--header 'Authorization: Basic c2FtQGdtYWlsLmNvbTpwYXNzd29yZA==' \
--data ''

* Post Request -> curl --location 'http://localhost:3001/v1/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Samiksha",
    "lastName": "Baral",
    "password": "password",
    "email": "sam@gmail.com"
}'

* Put Request -> curl --location --request PUT 'http://localhost:3001/v1/user/self' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic c2FtQGdtYWlsLmNvbTpwYXNzd29yZA==' \
--data '{
    "firstName": "Samiksha123",
    "lastName": "Baral",
    "password": "password"
}'

#### Assignemnt 3

* Run Integration Tests -> npm test

#### Assignemnt 4

1. Packer Format

    packer fmt packer.pkr.hcl

2. Packer Build
 
    packer build  packer.pkr.hcl

3. To check service on google cloud console in SSH window of an instance

    sudo journalctl -u csye6225.service     
    
