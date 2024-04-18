const amqp = require('amqplib');
const { v4 } = require('uuid')

const matchUsers = async (req, res) => {
    try {
      const { userId, username, topic, difficulty } = req.body;

      // Connect to RabbitMQ
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      const matchid = v4();
  
      // Declare the exchange and queue
      const exchangeName = 'matching_exchange';
      await channel.assertExchange(exchangeName, 'direct', { durable: false });
  
      const queueName = topic.replace(/ /g, '_') + "_" + difficulty;
      const { queue } = await channel.assertQueue(queueName, { messageTtl: 5000, maxLength: 2, durable: false });
  
      await channel.bindQueue(queue, exchangeName, queueName);
  
      // Publish the user's request to the exchange
      channel.publish(exchangeName, queueName, Buffer.from(JSON.stringify({ matchid, userId, username, topic, difficulty })));
  
      let messageBuffer = [];
  
      // Create a promise to wait for the matched users
      const matchedUsersPromise = new Promise((resolve, reject) => {
        console.log("Waiting for messages...");
  
        // Start consuming messages from the queue
        channel.consume(
          queue,
          (message) => {
            if (message) {
              const messageData = JSON.parse(message.content.toString());
              console.log("Received message:", messageData);
              messageBuffer.push(messageData);
  
              // If 2 messages are received, process them
              if (messageBuffer.length === 2) {
                console.log('Received 2 messages. Processing...');
                console.log('Messages:', messageBuffer);
                // Acknowledge both messages
                // channel.ackAll();
                // create a match id
                resolve(messageBuffer);
                // Reset messageBuffer for next batch
                messageBuffer = [];
              }
            }
          }
        );
      });
  
  
      // Wait for the matched users
      const matchedUsers = await matchedUsersPromise; //waitForResultWithTimeout(matchedUsersPromise, 5000);
      console.log('matchedUsers: ' + matchedUsers);
  
      // Close the RabbitMQ connection
      await channel.close();
      await connection.close();
  
      // Reset messageBuffer for next batch
      messageBuffer = [];
  
      res.status(200).json({ 
        message: 'Match found.', 
        matchedUsers: matchedUsers,
        topic: topic,
        difficulty: difficulty
      });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to send matching request.' });
    }
  }

// export controller functions to be used in corresponding route
module.exports = { matchUsers }
