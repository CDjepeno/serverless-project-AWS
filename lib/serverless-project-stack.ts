import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path'
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { GenericTable } from '../entities/GenericTable';

export class ServerlessProjectStack extends Stack {

    private api = new RestApi(this, 'serverlessAPI')
    private serverTable = new GenericTable(
      'ServerlessTable',
      'serverId',
      this
    )

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambdaNodeJs = new NodejsFunction(this,'LambdaFunctionNodeJS',{
      entry: join(__dirname, '..','node-lambda', 'hello.ts'),
      handler: 'handler'
    })

    const s3ListPolicy = new PolicyStatement()
    s3ListPolicy.addActions('s3:ListAllMyBuckets')
    s3ListPolicy.addResources('*')

    //Attache policies with lambda function
    helloLambdaNodeJs.addToRolePolicy(s3ListPolicy)

    // Hello Api lambda integration:
    const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodeJs)
    const helloLambdaResource = this.api.root.addResource('hello')
    helloLambdaResource.addMethod('GET', helloLambdaIntegration)


  }

    
}
