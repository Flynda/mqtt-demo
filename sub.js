const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://test.mosquitto.org:1883')

const topic = process.argv[2]

// wait for connection
client.on('connect', () => {
    console.info('Connected')
    // subscribe to a topic
    client.subscribe(topic, (err, granted) => {
        // will not have error unless server is down because using unencrypted
        if (null != err) {
            console.error('Subscription error: ', err);
            process.exit(-1)
        }
        console.info('Granted: ', granted)

        // listen to incoming message
        client.on('message', (topic, payload) => {
            const data = payload.toString()
            console.info(`Topic: ${topic}, payload: ${data}`)
        })
    })
})