const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fs = require("fs")
const dotenv = require('dotenv');
dotenv.config();
const path = require("path")
const myOAuth2Client = new OAuth2(process.env.GCID, process.env.GCSECRET, "https://developers.google.com/oauthplayground");

const getRegNums = () => {
    const data = fs.readFileSync(path.join(process.cwd(), "data/regNumbers.csv"), "utf-8");
    const branches = data.split('\n');
    return {
        CSE: branches[0].split(',')[1],
        IT: branches[1].split(',')[1],
        ECE: branches[2].split(',')[1],
    }
}

const updateRegNums = () => {
    const { CSE, IT, ECE } = getRegNums();
    const data = `CSE,${parseInt(CSE) + 1}\nIT,${parseInt(IT) + 1}\nECE,${parseInt(ECE) + 1}`
    fs.writeFileSync(path.join(process.cwd(), "data/regNumbers.csv"), data, "utf-8");
}

const sendEmail = (to, sub, htmlContent) => {

    myOAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const myAccessToken = myOAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "noreply-admissions@iiitu.ac.in", //your gmail account you used to set the project up in google cloud console"
            clientId: process.env.GCID,
            clientSecret: process.env.GCSECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: myAccessToken //access token variable 
        }
    });


    const mailOptions = {
        from: '19137@iiitu.ac.in', // sender
        to: to, // receiver
        subject: sub, // Subject
        html: htmlContent // html body
    }

    transport.sendMail(mailOptions, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            transport.close();
            console.log(result);
        }
    });

}

module.exports = { getRegNums, updateRegNums, sendEmail };


