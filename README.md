# Cloud Assignment 1 - Cloud Native Web Application 
# Name - Samiksha Baral
# Nuid - 002825118
Command to run the project -> npm start
command to run the test case -> npm test
# Example 
* Method Allowed -> GET
* Successful Request -> curl --location 'http://localhost:8080/healthz'
* Bad Request -> curl --location --request GET 'http://localhost:8080/healthz' \
--header 'Content-Type: text/plain' \
--data 'Hii'
