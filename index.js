import AWS from 'aws-sdk';
import axios from 'axios';
import dotenv from 'dotenv';
import mailgun from 'mailgun-js';


dotenv.config()


export async function handler(event, context) {

        // Initialize the Mailgun client
        const mg = mailgun({
            apiKey:process.env.apiKey,
            domain: process.env.domain,
        });

        // Compose and send an email
        const data = {
            from: "support@amishacloudcsye.website",
            to: "gokhale.ami@northeastern.edu",
            subject: "Hello",
            text: "Hi from Amisha's Webapp!",
        };

            console.log(event);
            const snsMessage = JSON.parse(event.Records[0].Sns.Message);
            console.log(snsMessage);



        try {
            const body= await mg.messages().send(data)
            console.log(data)
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Lambda successful" }),
            };
        } catch (error) {
            console.error("Error in Lambda execution:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Error in Lambda execution" }),
            };
        }


 }
 
handler()
/*
const snsMes = event.Records[0].Sns.Message;
    const messageData = JSON.parse(snsMes);
   
        console.log(messageData.assignment_id)
        console.log(messageData.submissionUrl)
        console.log(messageData.userEmail)
    //const mail=messageData.email

    const releaseUrl = messageData.submissionUrl;
    const mail = messageData.userEmail;


    // Fetch release from GitHub
    const response = await fetch(releaseUrl);
   
    if (!response.ok) {
        throw new Error(`Failed to fetch GitHub release. Status: ${response.status}`);
      }

   // const response = await axios.get(releaseUrl, { responseType: 'stream' });

     //Upload the release to Google Cloud Storage
    const storage = new googleCloudStorage.Storage();
    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
    await bucket.file('release.zip').upload(response.data); 
   
    
    const mailgun = require('mailgun-js')({
        apiKey: process.env.apiKey,
        domain: process.env.domain,
    });
    const data = {
        from: "mail@amishacloudcsye.website",
        to: "gokhale.ami@northeastern.edu",
        subject: "Hello",
        text: "Hi from Amisha Webapp!",
        html: "<h1>Testing Amisha's Webapp!</h1>"
      };
      
    
        try {
          const body = await mailgun.messages().send(data);
          console.log("Email sent successfully:", body);
        } catch (error) {
          console.error("Email sending failed:", error);
        }
*/