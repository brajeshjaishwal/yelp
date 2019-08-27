'use strict';

const Yelp = require('yelp-fusion');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiKey = 'bGTP7z87-ATxa_qA_Abs9QIHrRhNnjrQNaGWwlAA5dIbcM14aXJNGFhcLLq03WHBdDV26aHosJpwuHaX6FSYj-Tjl_guhWNGRBaKxBwnQRLqK5mYFBzgZSvwA-xkXXYx';

const PORT = 4005

const client = Yelp.client(apiKey);

let app = express()

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

//welcome route
app.get('/welcome', (req, res) => res.send("Welcome to the coding challenge"))

//welcome route
app.get('/search/:city', async (req, res) => {
    try{
        let searchRequest = {
                term:'Ice Cream Shop',
                location: req.params.city,
                limit: 5
            }
        let response = await client.search(searchRequest),
            businesses = response.jsonBody && response.jsonBody.businesses
        
        if(businesses) {
            let requests = []
            businesses.forEach(b => {
                let request = client.reviews(b.alias)
                requests.push(request)
            })
            let resp = await Promise.all(requests)
            if(resp) {
                resp.forEach((r, index) => {
                        if(businesses[index]) {
                            businesses[index].reviews = r.jsonBody.reviews
                        }
                    }
                )
            }
        }
        res.send({ data: businesses})
    }catch(Error) {
        res.send({Error})
    }
})

app.listen(PORT, 
    () => console.log(`server is running on ${PORT}`)
)

