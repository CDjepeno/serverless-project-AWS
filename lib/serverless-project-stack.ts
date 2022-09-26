import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function as LambdaFunction, LambdaInsightsVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
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

    const helloLambda = new LambdaFunction(this, 'helloLambda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(__dirname, '..','lambdas')),
      handler: 'hello.main'
    })

    // Hello Api lambda integration:
    const helloLambdaIntegration = new LambdaIntegration(helloLambda)
    const helloLambdaResource = this.api.root.addResource('hello')
    helloLambdaResource.addMethod('GET', helloLambdaIntegration)


  }

    
}
