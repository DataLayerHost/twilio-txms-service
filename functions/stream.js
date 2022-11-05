exports.handler = (context, event, callback) => {
  const twiml = new Twilio.twiml.MessagingResponse()
  const debug = (context.DEBUG == 1 || context.DEBUG == true) ? true : false

  const body = event.Body
  const number = event.From
  if(typeof body === 'string' && body.trim().length === 0) {
    let error = 'Err(1): Empty message'
    let emptyerror = { "id": null, "message": error, "sent": false, "error": "Empty message", "errno": 1, "date": timestamp() }
    if(debug) console.error('Err(1)', emptyerror)
    feedback(number, error)
    return callback(JSON.stringify(emptyerror), null)
  }
  const provider = (context.PROVIDER.endsWith('/') ? context.PROVIDER : context.PROVIDER + '/') + context.ENDPOINT

  const txms = require('txms.js')
  const axios = require('axios')

  const parts = body.split(/\u000a/u)

  parts.forEach(function (msg, index) {
    let rawmsg = msg.trim()
    const hextest = /^(0[xX])?[0-9a-fA-F]+$/
    let hextx = ''
    if (hextest.test(rawmsg)) {
      if (rawmsg.toLowerCase().startsWith('0x')) {
        hextx = rawmsg
      } else {
        hextx = '0x' + rawmsg
      }
      if(debug) console.log('Info', 'HEX message: ' + hextx)
    } else if(typeof rawmsg === 'string' && rawmsg.length !== 0) {
      hextx = txms.decode(rawmsg)
      if(debug) console.log('Info', 'TXMS message: ' + hextx)
    } else {
      let error = 'Err(2): Empty message part'
      let perror = { "id": null, "message": error, "sent": false, "error": "Empty message part", "errno": 2, "date": timestamp() }
      if(debug) console.error('Err(2)', perror)
      feedback(number, perror)
      return callback(JSON.stringify(perror), null)
    }

    axios.post(provider, hextx, {
      headers: {
        'Content-Type': 'text/plain',
        'User-Agent': 'txms'
      }
    })
    .then(function (response) {
      if(response.result) {
        let ok = 'OK: <'+hextx.substring(2, 5)+hextx.slice(-3)+'> '+response.result
        feedback(number, ok)
        let oks = { "message": ok, "sent": true, "hash": response.result, "date": timestamp() }
        if(debug) console.log('OK', oks)
        return callback(null, JSON.stringify(oks))
      } else {
        let ok = 'OK: <'+hextx.substring(2, 5)+hextx.slice(-3)+'>'
        feedback(number, ok)
        let oks = { "message": ok, "sent": true, "date": timestamp() }
        if(debug) console.log('OK', oks)
        return callback(null, JSON.stringify(oks))
      }
    })
    .catch(function (err) {
      let error = 'Err(3): <'+hextx.substring(2, 5)+hextx.slice(-3)+'>'
      feedback(number, error)
      let errors = { "message": error, "sent": false, "error": err.message, "errno": 3, "date": timestamp() }
      if(debug) console.error('Err(4)', errors)
      return callback(JSON.stringify(errors), null)
    })
  })

  function feedback(number, message) {
    let premium = false
    premium = isPremium(number)
    if (premium) {
      if(debug) console.log('Info', number + ' is premium')
      twiml.message(message)
    }
  }

  function isPremium(number) {
    if (!number) {
      return false
    }
    const assets = Runtime.getAssets()
    const premiumFile = assets['/premium-list.json'].open
    const premium = premiumFile()
    if (premium.includes(number)) {
      return true
    } else {
      return false
    }
  }

  function timestamp() {
    return new Date().toISOString()
  }
}
