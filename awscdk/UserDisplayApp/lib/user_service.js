const cdk = require('aws-cdk-lib');
const { Construct } = require('constructs');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const lambda = require('aws-cdk-lib/aws-lambda');
const dynamo = require('aws-cdk-lib/aws-dynamodb');

class UserService extends Construct{
  constructor(scope, id){
    super(scope, id);

    // Table construct
    const UserTable = new dynamo.Table(this, 'UserTable', {
      partitionKey: {name: 'id', type: dynamo.AttributeType.STRING},
      billingMode: dynamo.BillingMode.PROVISIONED
    })
    UserTable.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    }).scaleOnUtilization({ targetUtilizationPercent: 20});

    //Lambda construct
    const handler = new lambda.Function(this, 'UserHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('resources'),
      handler: 'lambdaHandler.main',
      environment: {
        DYNAMO_TABLE: UserTable.tableName
      }
    });
    handler.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ['dynamodb:PutItem',
                  'dynamodb:DeleteItem',
                  'dynamodb:GetItem',
                  'dynamodb:Scan',
                  'dynamodb:UpdateItem'],
        resources: [UserTable.tableArn]
      })
    );
    
    //api gateway construct
    const api = new apigateway.RestApi(this, 'user-api', {
      restApiName: 'User Api',
      description: 'This service serves users.'
    })

    const getUserIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: {'application/json': '{"statusCode": "200"}'}
    });
    const putUserIntegration = new apigateway.LambdaIntegration(handler, {
      proxy: true,
    });
    const updateUserIntegration = new apigateway.LambdaIntegration(handler, {
      proxy: true,
    });
    const deleteUserIntegration = new apigateway.LambdaIntegration(handler, {
      proxy: true,
    });
    const getUserByIdIntegration = new apigateway.LambdaIntegration(handler, {
      proxy: true,
    });
    const apiUserResource = api.root.addResource('users')
    apiUserResource.addMethod('GET', getUserIntegration);
    apiUserResource.addMethod('POST', putUserIntegration);
    const apiIdResource = apiUserResource.addResource('{id}');
    apiIdResource.addMethod('GET', getUserByIdIntegration);
    apiIdResource.addMethod('PATCH', updateUserIntegration);
    apiIdResource.addMethod('DELETE', deleteUserIntegration);
  }
}

module.exports = { UserService };