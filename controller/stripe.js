const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

const stripeConf = {
  name: "MonkPay",
  description: "It is time that you deposite with Stripe on MonkPay.",
  quantity: 1
}

const getLink = async (req, res) => {
  try {
    const { amount, currency, email } = req.body; 
    const session = await stripe.checkout.sessions.create({ 
      payment_method_types: ["card"], 
      customer_email: email,
      line_items: [ 
        { 
          price_data: { 
            currency: currency, 
            product_data: { 
              name: stripeConf.name, 
            }, 
            unit_amount: amount * 100, 
          }, 
          quantity: stripeConf.quantity, 
        }, 
      ], 
      mode: "payment", 
      success_url: "http://localhost:3000/success", 
      cancel_url: "http://localhost:3000/cancel", 
    }); 
    return res.json({ id: session.id });  
  } catch (error) {
    return res.send({status: false, message: error});
  }
}


module.exports = {
  getLink
}