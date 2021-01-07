const mqtt = require('async-mqtt')

const client = mqtt.connect('mqtt://test.mosquitto.org:1883')

const topic = process.argv[2]
const message = process.argv[3]

const publish = async () => {
    // publish a message
    await client.publish(topic, message)
    console.info('Published...')
    // client, close connection
    // since we are command line, then need to close otherwise process will hang
    // if bot, no need to close
    await client.end()
}

client.on('connect', publish)