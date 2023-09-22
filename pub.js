const express =require('express');
const redis =require('redis');

const app =express();

let publisherData =redis.createClient({
    url: 'redis://localhost:6379'
});

publisherData.on('error',()=>console.log('Redis error'));
publisherData.on('connect',()=>console.log("🔺Redis is connected"));

const connect =async()=>{
    await publisherData.connect();
};

connect();

app.get('/', (req, res) => {
    res.send({
        message: "Publisher active from port 3001"
    })
});

//todo: we publish it from redis
app.get('/publish', async(req, res) => {
    
    const id =Math.floor(Math.random()*10);
    // we want to publish this data
    const data={
        id, 
        message:`Message from id:${id}`
    };
    console.log(data)

    //here data is published
    await publisherData.publish('PData:',JSON.stringify(data));

    //after publish we send a response
    res.send({
        Message:"PData is successfully published",
        data
    })
      
});







// run the express app
app.listen(3001,()=>{
    console.log("Publisher server start on 3001");
});

