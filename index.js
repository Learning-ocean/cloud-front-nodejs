const express = require('express')
const uuid = require('uuid');
const app = express()
const port = 3000

const users = [
    { id: 1, name: "Gaurav" },
    { id: 2, name: "Saurav" },
    { id: 3, ame: "Hinal" },
    { id: 4, name: "Hiral" },
    { id: 5, name: "Yash" },
    { id: 6, name: "Ram" },
    { id: 7, name: "Shayam" },
    { id: 8, name: "Pawan" },
    { id: 9, name: "Ankit" },
    { id: 10, name: "Nitin" },
    { id: 11, name: "Piyush" },
    { id: 12, name: "Shivam" },
    { id: 13, name: "Tushar" },
    { id: 14, name: "Princy" },
    { id: 15, name: "Aatira" },
    { id: 16, name: "Ashu" },
    { id: 17, name: "Shivani" },
    { id: 18, name: "Rajkumar" },
    { id: 19, name: "Harshal" },
    { id: 20, name: "Aditi" },
    { id: 21, name: "Hetal" },
    { id: 22, name: "Manish" }
]

app.get('/', (req, res) => {
    return res.send({ message: 'kindly share my youtube channel and help me to Grow :-)' })
})

app.get('/2m', (req, res) => {
    console.log("getting request on /2m")
    res.setHeader('Cache-Control', 'public, max-age=120');
    res.setHeader('learning_ocean_header', 'Test HeaderValue')


    return res.send({
        work: 'you are getting 120 in catch-control header',
        message: 'kindly share my youtube channel and help me to Grow :-)',
        uuid: uuid.v4(),
    })
})

app.get('/customheader', (req, res) => {
    console.log(`getting req on /customheader, req_from value is ${req.headers.req_from}`)
    if (req.headers.req_from !== 'cloudfront_head') {
        res.statusCode = 403;
        return res.send({
            message: 'you can not access the application directly',
            uuid: uuid.v4(),
        })
    }

    return res.send({
        work: "you will get response only when you will pass req_from=cloudfront_head header",
        message: 'kindly share my youtube channel and help me to Grow :-)',
        uuid: uuid.v4(),
    })
})

app.get('/users', (req, res) => {
    console.log("getting request on /users")
    const pageNumber = parseInt(req.query.page) || 1;   // The page number to retrieve
    const pageSize = parseInt(req.query.size) || 5;
    console.log({ pageNumber, pageSize });
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;

    const paginatedData = users.slice(startIndex, endIndex);

    return res.json({ total_count: users.length, users: paginatedData, uuid: uuid.v4() });

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})