//This is the received / listing serverf

const redis = require('redis');

(async () => {

    let subscriber = redis.createClient({
        url: 'redis://localhost:6379'
    });

    subscriber.on('error', () => console.log('Redis error'));
    subscriber.on('connect', () => console.log("🟩 Redis is connected"));


    await subscriber.connect();

    //here data is received from publisher same name must given in data
    await subscriber.subscribe('PData:',(data)=>{
        console.log(data)
    })

})()