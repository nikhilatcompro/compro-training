const AWS = require('aws-sdk');
AWS.config.update({ region: "ap-south-1"});
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1"});

exports.main = async ( event, context) => {
    
    let responseBody = '' ;
    let statusCode = 0;
    const method = event.httpMethod;

    if(method === 'GET') {
      if(event.pathParameters === null){
          const params = {
              TableName: process.env.DYNAMO_TABLE 
          }
          try{
              const data = await documentClient.scan(params).promise();
              statusCode = 200;
              responseBody = JSON.stringify(data.Items);
          } catch (e) {
              statusCode = 403;
              responseBody = 'Could not get user data. ERROR: ' + e;
          }            
      }
      
      else{
          const { id } = event.pathParameters;
          const params = {
              TableName: process.env.DYNAMO_TABLE,
              Key: {
                  id: id
              }
          };
           try {
              const data = await documentClient.get(params).promise();
              statusCode = 200;
              responseBody = JSON.stringify(data.Item);
          } catch (e) {
              statusCode = 403;
              responseBody = 'Could not get user data. ERROR: ' + e;
          }
      }
    }

    else if(method === 'POST'){
      const { id, name, email, dateOfBirth } = JSON.parse(event.body);
      const params = {
          TableName: process.env.DYNAMO_TABLE,
          Item: {
              id,
              name,
              email,
              dateOfBirth
          }
      };
      try {
          const res = await documentClient.put(params).promise();
          statusCode = 201;
          responseBody = JSON.stringify(res);
      } catch (e) {
          statusCode = 403;
          responseBody = 'Could not put user :' + e;
      }
    }

    else if(method === 'PATCH'){
      const { id } = event.pathParameters;
      const { name, email, dateOfBirth } = JSON.parse(event.body);
      const params = {
          TableName:process.env.DYNAMO_TABLE,
          Key: {
              id: id
          },
          UpdateExpression: "set #name = :name, #email = :email, #dateOfBirth = :dateOfBirth",
          ExpressionAttributeNames: {
              "#name": "name",
              "#email": "email",
              "#dateOfBirth": "dateOfBirth"
          },
          ExpressionAttributeValues: {
              ":name": name,
              ":email": email,
              ":dateOfBirth": dateOfBirth
          }
      };
      try {
          const data = await documentClient.update(params).promise();
          statusCode = 200;
          responseBody = JSON.stringify(data.Item);
      } catch (e) {
          statusCode = 403;
          responseBody = e.message;
      }
    }

    else if(method === 'DELETE'){
      const { id } = event.pathParameters;
      const params = {
          TableName: process.env.DYNAMO_TABLE,
          Key: {
              id: id
          }
      };
      try {
          const data = await documentClient.delete(params).promise();
          statusCode = 200;
          responseBody = JSON.stringify(data.Item);
      } catch (e) {
          statusCode = 403;
          responseBody = e.message;
      }
    }
    
    else {
      responseBody = 'Cannot respond. invalid method.';
      statusCode = 400;
    }

    const response = {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: responseBody
    };
    console.log(responseBody);
    return response;
};
