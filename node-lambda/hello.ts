

async function handler(envent:any, context: any) {
  console.log('Got an event')
  console.log(event)
  return {
    statusCode: 200,
    body: 'Hello from lambda typescript'
  }
}

export { handler }