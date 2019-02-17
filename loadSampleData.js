const mesg = require('mesg-js').application()

mesg.executeTask({
  serviceID: 'zapier',
  taskKey: 'loadSample',
  inputData: JSON.stringify({
    triggerType: 'message-for-slack',
    sampleData: {
      beginning: "start",
      signature: "sig"
    }
  })
})
