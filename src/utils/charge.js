import axios from 'axios'

const charge = ({ coupon, token, description }) =>
  axios.post('/.netlify/functions/stripeCharge', { coupon, token, description })

export default charge
