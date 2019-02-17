const mesg = require('mesg-js').application()

// start
mesg.listenEvent({
  serviceID: 'webhook',
  eventFilter: 'request'
})
  .on('data', goToZapier)
  .on('error', (error) => {
    console.error('an error occurred while listening the request events:', error.message)
  })

// handle zapier
function goToZapier () {
  return mesg.executeTaskAndWaitResult({
    serviceID: 'zapier',
    taskKey: 'execute',
    inputData: JSON.stringify({
      triggerType: 'message-for-slack',
      data: {
        beginning: "Hey there! This message was originated from the MESG Application",
        signature: "From your humble developer - Joel"
      }
    })
  }).then(result => {
    const data = JSON.parse(result.outputData)

    if (result.outputKey === 'success') {
      sendMessageToSlack(data.outputs.data)
    } else {
      console.error('failed to go to zapier', data)
    }
    
  }).catch(console.error.bind('error going to zapier'))
}


// finish by sending a message to slack
function sendMessageToSlack(message) {
  mesg.executeTask({
    serviceID: '_46b910b6f2fe824cdbb253150cd02f5f17920626',
    taskKey: 'notify',
    inputData: JSON.stringify({
      endpoint: 'https://hooks.slack.com/services/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',
      icon_emoji: '',
      text: message,
      username: ''
    })
  })
}

console.log('application is running and listening for events')