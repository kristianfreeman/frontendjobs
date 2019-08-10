import axios from 'axios'

const post = ({ job }) =>
  axios.post('/.netlify/functions/postJob', { job })

export default post
