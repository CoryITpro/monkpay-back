const axios = require('axios');

const reqconf = {
  method: 'post',
  url: 'https://api.flutterwave.com/v3/payments',
  data: {
    tx_ref: "hooli-tx-1920bbt",
    amount: "100",
    currency: "NGN",
    redirect_url: "http://localhost:3000/success",
    payment_options: "card",
    customer: {
        email: "user@gmail.com",
    },
    customizations: {
        title: "MonkPay",
        logo: "https://cdn.iconscout.com/icon/premium/png-256-thumb/payment-2193968-1855546.png"
    }
  },
  headers: {
    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
  }
} 


const getLink = async (req, res) => {
  const {amount, currency, email} = req.body;
  try {
    let flutterRequest = reqconf;
    flutterRequest.data.amount = amount;
    flutterRequest.data.currency = currency;
    flutterRequest.data.customer.email = email;
    const response = await axios.request(flutterRequest);
    return res.send({status: true, data: response.data.data});
    
  } catch (error) {
    return res.send({status: false, message: error});

  }
}
module.exports = {
  getLink,
}