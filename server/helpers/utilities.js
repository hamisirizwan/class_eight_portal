require("dotenv").config();
const axios = require("axios");
// Set your app credentials
const credentials = {
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
};

// Initialize the SDK
const AfricasTalking = require("africastalking")(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

const sendSms = (phone, msg) => {
  const options = {
    // Set the numbers you want to send to in international format
    to: `+${phone}`,
    // Set your message
    message: msg,
    // Set your shortCode or senderId
    from: "ELIMU",
  };

  // That’s it, hit send and we’ll take care of the rest
  sms
    .send(options)
    .then(() => {
      console.log("sent");
    })
    .catch((err) => {
      console.log(err);
    });
};

const notifyWhatsapp = (phone, msg) => {
  const token = process.env.WHATSAPP_TOKEN;
  axios
    .post(
      "https://graph.facebook.com/v13.0/104806052267845/messages",
      {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: phone,
        type: "template",
        template: {
          name: "rizwan",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: msg,
                },
              ],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((sent) => {
      console.log("notifyied via whatsapp");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  notifyWhatsapp,
  sendSms,
};
