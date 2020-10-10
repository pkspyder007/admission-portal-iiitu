const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const myOAuth2Client = new OAuth2(process.env.GCID, process.env.GCSECRET,"https://developers.google.com/oauthplayground")
myOAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});
const myAccessToken = myOAuth2Client.getAccessToken()

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "19137@iiitu.ac.in", //your gmail account you used to set the project up in google cloud console"
         clientId: process.env.GCID,
         clientSecret: process.env.GCSECRET,
         refreshToken: process.env.REFRESH_TOKEN,
         accessToken: myAccessToken //access token variable we defined earlier
    }});


    const mailOptions = {from: '19137@iiitu.ac.in', // sender
    to: 'pkspyder007@gmail.com', // receiver
    subject: 'My tutorial brought me here', // Subject
    html: '<p>You have received this email using nodemailer, you are welcome ;)</p>'// html body
}

transport.sendMail(mailOptions,function(err,result){if(err){
    console.error(err);
    }else{
    transport.close();
    console.log(result);
    }
});