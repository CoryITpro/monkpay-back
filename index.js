const cors = require("cors"); 
const express = require("express"); 
const mongoose = require("mongoose");
const router = require("./router");



require("dotenv").config(); 
 
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 
// var currencyCloud = require('currency-cloud');


// currencyCloud.authentication.login({
//   environment: 'demo', 
//   loginId: process.env.CURRCLOUT_ID,
//   apiKey:  process.env.CURRCLOUT_KEY
// })
// .then(currencyCloud.reference.getAvailableCurrencies)
// .then(function(res) {
//   console.log('available currencies: ' + JSON.stringify(res.currencies, null, 2));    
// })
// .then(currencyCloud.balances.find)
// .then(function(res) {
//   console.log('balances: ' + JSON.stringify(res.balances, null, 2));
// })

const app = express(); 
// const server = require('http').createServer(app);
 
// Middlewares here 
app.use(express.json()); 
app.use(cors()); 
 
// Routes here
// const reqconf = {
//   method: 'post',
//   url: 'https://api.flutterwave.com/v3/payments',
//   data: {
//     tx_ref: "hooli-tx-1920bbt",
//     amount: "100",
//     currency: "NGN",
//     redirect_url: "http://localhost:3000/success",
//     payment_options: "card",
//     customer: {
//         email: "user@gmail.com",
//     },
//     customizations: {
//         title: "MonkPay",
//         logo: "https://cdn.iconscout.com/icon/premium/png-256-thumb/payment-2193968-1855546.png"
//     }
//   },
//   headers: {
//     Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
//   }
// } 


mongoose
  .connect("mongodb+srv://price:123456789LionKing@cluster0.epz612r.mongodb.net/monkpay?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
    
    app.use(express.json());
    app.use("/api", router);

    app.listen(8000, () => { 
      console.log("Server started at port 8000"); 
    }); 
  });


// app.post("/api/create-deposit-flutterwave", async (req, res) => {
//   const {amount, currency, email} = req.body;
//   try {
//     let flutterRequest = reqconf;
//     flutterRequest.data.amount = amount;
//     flutterRequest.data.currency = currency;
//     flutterRequest.data.customer.email = email;
//     const response = await axios.request(flutterRequest);
//     res.send(response.data.data);
//     console.log(response.data.data.link);
    
//   } catch (error) {
    
//   }
// })

// const stripeConf = {
//   name: "MonkPay",
//   description: "It is time that you deposite with Stripe on MonkPay.",
//   quantity: 1
// }

// app.get("/api/get-balance", async (req, res) => {
//   const {currency} = req.params;
//   let balance = await currencyCloud.balances.get({currency: currency});
//   return res.send({status: false, data: balance});
// })


// app.post("/api/create-beneficiency", async (req, res) => {
//   const {bankAccountHolderName, bankCountry, currency, name, bicSwift, iban} = req.body;
//   let beneficiary = await currencyCloud.beneficiaries.create({
//     bankAccountHolderName: bankAccountHolderName,
//     bankCountry: bankCountry,
//     currency: currency,
//     name: name,
//     bicSwift: bicSwift,
//     iban: iban
//   })

//   return res.send({status: true, data:beneficiary});
// })



// app.post("/api/create-payment", async (req, res) => {
//   const {currency, amount, reason, reference, paymentType, benficiaryId} = req.body;
//   const uniqueRequestId = uuid4();

//   let payment = await currencyCloud.payments.create({
//     currency: currency,
//     amount: amount,
//     reason: reason,
//     reference: reference,
//     paymentType: paymentType,
//     uniqueRequestId: uniqueRequestId,
//     benficiaryId: benficiaryId
//   })

//   return res.send({status: true, data:payment});
// })

// app.post("/api/create-deposit-stripe", async (req, res) => { 
//   const { amount, currency, email } = req.body; 
//   const session = await stripe.checkout.sessions.create({ 
//     payment_method_types: ["card"], 
//     customer_email: email,
//     line_items: [ 
//       { 
//         price_data: { 
//           currency: currency, 
//           product_data: { 
//             name: stripeConf.name, 
//           }, 
//           unit_amount: amount * 100, 
//         }, 
//         quantity: stripeConf.quantity, 
//       }, 
//     ], 
//     mode: "payment", 
//     success_url: "http://localhost:3000/success", 
//     cancel_url: "http://localhost:3000/cancel", 
//   }); 
//   res.json({ id: session.id }); 
// }); 
 
// Listen 
// app.listen(8000, () => { 
//   console.log("Server started at port 8000"); 
// }); 