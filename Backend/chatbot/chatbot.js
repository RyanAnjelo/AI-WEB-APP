
const dialogflow = require('dialogflow');
const structjson = require('./structjson.js');
//const config = require('../config/keys');
//const mongoose = require('mongoose');

const googleAuth = require('google-oauth-jwt');

const projectId = "ambay-chat-bot-qktb";
const sessionId = 'ambay-chat-sxd';
const languageCode = 'en-US';
const email = "dialogflow-client@ambay-chat-bot-qktb.iam.gserviceaccount.com";
const p_key ='\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCXBAhqgPO8ys8Y\nK7mYOjAXux15wE1SKhdhSzQEpun5eNqkQ4Qu7DbEbQVH6TTKJ1fV/ARWUZi05/Ci\nFHo58wb8lW/YtiVAxWVPb/JPXGLFPEUHITc3SZCxmqDwlFQi6lXNU2As9we1+lTF\nOwI7ZSGPzbm/dGl6MvGGEGb/vL0SC33JJEQax98aMwD4styH7CIXj4FP49UDHSw0\njTVxM999NGxAZofpbp3MuVN790DZV3BaBlj7lOpgbTGwvC9lKd1S+hY+0a7jlYsz\nHf94tTxwMC54njC3sUcQB5YJkak2Crm6p8hynb4RG1IROq5kipXZvxjgZR3nUSkW\nMkPvUUxzAgMBAAECggEAESd7n0GDrmPpT2kUHYcqlF+EcyKVhepTGpG02HxvYo/I\nYlVrC/t4IyrxKSCEBxyd/SgyA+4j5xTbwEWMNs308rc068yRAcEKh5IDV+F6NMZq\nXut2frjED3CtrHZk8kxlL7wzVhg/j3veqkLQN5f+znuDiIx8OM3VorF1ScKSRZzM\n4qNmnotS9dEYDiZQp40h2SfEJ3ywK1w/i76NirWiweqKxM+TFojgjYPuG6fISgZq\n0qIvs3SLWXaUbA+L2t6OrVdZps8itUEiv3ISh05kbX840+GUldTCUQGoC5CqaNRR\n6PrVKkK7O6C5pwNgAxkiRMdXFNxjrXIw3lvJvEmvmQKBgQDGOv2Ys9+L2QF/dWo4\nk/mbxcDeAwZs4Xis0K2VrhS2J8+Uku7U/UE7AYHiBHBKoGVW2DDiD0nOMw7uNVoy\ny0O/64uy2ArvNH5eMsL/c90qRSwbGMAVgQBfjzhiJprQbdcRKf6yLyyTCiZwA8pI\nXLdi9ORzb0IxMVklaGGhvA0vywKBgQDDBpWhT6EBN7wgprUoa1lhzpi5b/IjIXBn\nQAm9QgYYCONQgRQL6hkYFwrSIMmoqtkjqsFI2w6CHp5HyvUMj1yusiwSWAxq+S82\nePFGkdY0u0jorbC7lY4dsG/7KAH43bQWsutqgqaA95Yvwr9wJDlrzwxpBAH61Sm+\n2Z6haB9w+QKBgQCEFUJswU2uzUWmPAIu+MpU9Qtx4uohGoth+xnupjO+vAAgq1bg\nLG+OdY6pnvODhiSAHUVVG4K+Fl9YccxMFAxskPJglHuUr5GUCpbLx9QSGk0tMOys\nZ2xsP+392GNHhijLkwPWjoBQ6W57LMtYNA8trKecEwIz7QHNXyPOtJLEyQKBgEU1\nW/ovwOomtjs8DcO3PLPp1ebQpDP1VOc/IXWpLXJwDQLvm4aS367d1ng1LHsPjhkL\nKqZJHn/sj6zYiFeZtIFGNz+XQWjg3vFMwAqUDFkQMVJo+PPIofNFPqf5TaHcQ2Fe\nww48KQxRUFnImZkZMcthYX0O8AjshnD010deJPI5AoGASjNJCmKb04vM+ds64XeT\nRmzSDCqokrAa/VSByVeU268R4ON7kxPXg40N5+j10a1f66d/izfBB0oqn5whl4uJ\nU4IC5EIkaDezgErOy9rVCJRzvi+KGzDoCkXlR5y5xzQibQG7rBWETmfU8YkwwNC3\nxcCeEU29y48J3ZFDkxpfgJM=\n';
const credentials = {
    client_email: "dialogflow-client@ambay-chat-bot-qktb.iam.gserviceaccount.com",
    private_key:p_key
    
};

const sessionClient = new dialogflow.SessionsClient({projectId, credentials});






module.exports = {

    getToken: async function() {
        return new Promise((resolve) => {
            googleAuth.authenticate(
                {
                    email: email,
                    key: p_key,
                    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                },
                (err, token) => {
                    resolve(token);
                },
            );
        });
    },

    textQuery: async function(text, userID, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: languageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;



    },

    eventQuery: async function(event, userID,  parameters = {}) {
        let self = module.exports;
        let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);

        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
                    languageCode: languageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = self.handleAction(responses);
        return responses;

    },


    handleAction: function(responses){
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'recommendcourses-yes':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields);
                }
                break;
        }

        return responses;
    },

    // saveRegistration: async function(fields){
    //     const registration = new Registration({
    //         name: fields.name.stringValue,
    //         address: fields.address.stringValue,
    //         phone: fields.phone.stringValue,
    //         email: fields.email.stringValue,
    //         dateSent: Date.now()
    //     });
    //     try{
    //         let reg = await registration.save();
    //         console.log(reg);
    //     } catch (err){
    //         console.log(err);
    //     }
    // }
}