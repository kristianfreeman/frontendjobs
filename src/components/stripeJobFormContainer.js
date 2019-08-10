import * as React from 'react'
import { StripeProvider, Elements, injectStripe } from 'react-stripe-elements'
import Form from './newJobForm'

const InjectedForm = injectStripe(Form)
const FormWithProps = props => <InjectedForm {...props} />

export default class NewJobForm extends React.Component {
  state = { stripe: null }

  componentDidMount = () => {
    const key = process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
    this.setState({ stripe: window.Stripe(key) })
  }

  render = () => {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <FormWithProps {...this.props} />
        </Elements>
      </StripeProvider>
    )
  }
}
