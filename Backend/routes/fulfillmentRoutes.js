const {WebhookClient} = require('dialogflow-fulfillment');

const mongoose = require('mongoose');

const Product = require('../models/product');



module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function chatambay(agent) {
            agent.add(`Welcome to my Ambay Assitance!`);
        }

        // async function registration(agent) {

        //     const registration = new Registration({
        //         name: agent.parameters.name,
        //         email: agent.parameters.email,
        //         dateSent: Date.now()
        //     });
        //     try{
        //         let reg = await registration.save();
        //         console.log(reg);
        //     } catch (err){
        //         console.log(err);
        //     }
        // }

        async function learn(agent) {

            Product.findOne({'Products': agent.parameters.Products}, function(err, products) {
                if (Product !== null ) {
                    Product.counter++;
                    Product.save();
                } else {
                    const product = new Product({Products: agent.parameters.Products});
                    Product.save();
                }
            });
            let responseText = `Well here are the products ${agent.parameters.Products}. 
                    Lastest Product link is: `;

            let Product = await Product.findOne({'course': agent.parameters.courses});
            if (Product !== null ) {
                responseText = `You want to learn about ${agent.parameters.courses}. 
                Here is the link to the Products: `;
            }

            agent.add(responseText);
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }

        let intentMap = new Map();
        intentMap.set('snoopy', snoopy);
        intentMap.set('learn courses', learn);
        intentMap.set('recommend courses - yes', registration);
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });

}