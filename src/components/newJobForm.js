import React from 'react'
import Select from 'react-select'
import RichTextInput from './richTextInput'

import charge from '../utils/charge'

import { debounce, kebabCase, pickBy } from 'lodash'

import { Formik, FastField, Form } from 'formik'
import { CardElement } from 'react-stripe-elements'
import * as Yup from 'yup'

import uuid from 'uuid'

const validationSchema = Yup.object().shape({
  position: Yup.string().required('Required'),
  company_name: Yup.string().required('Required'),
  company_website: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  contact_email: Yup.string().required('Required'),
})

const initialValues = {
  position: '',
  location: '',
  remote_friendly: false,
  company_name: '',
  company_twitter_username: '',
  company_website: '',
  description: '',
  responsibilities: '',
  requirements: '',
  application_instructions: '',
  application_url: '',
  contact_email: '',
  stripe_id: '',
  stripe_error: null,
  submitting: false,
  tags: [],
}

const mapTagsToSelectOptions = (tags = []) =>
  tags.map(tag => ({
    label: tag.name,
    value: tag._id,
  }))

const selectedOptions = (tags = [], options = [], allowMulti = false) => {
  const hasTag = option => tags.map(tag => tag._id).includes(option.value)
  let filtered
  filtered = allowMulti ? options.filter(hasTag) : options.find(hasTag)
  return filtered
}

export default class NewJobForm extends React.Component {
  constructor(args) {
    super(args)
  }

  state = initialValues

  onSubmit = async (evt, values, errors) => {
    this.setState({ submitting: true })
    evt.preventDefault()

    if (Object.keys(errors).length || !Object.keys(values).length) {
      return false
    }

    try {
      const { token } = await this.props.stripe.createToken({
        name: values.company_name,
      })
      const chargeOpts = {
        token: token.id,
        description: `Charge for ${values.position} posted by ${
          values.company_name
        }`,
      }

      const { data } = await charge(chargeOpts)
      const stripe_id = data
      this.setState({ charge_error: null })

      const posted_at = new Date()

      const _id = uuid()

      const sanitize = str =>
        str
          .replace(/[^\x00-\x7F]/g, '')
          .replace(/[\W_]+/g, '-')
          .trim()

      const pretty = kebabCase(
        `${sanitize(values.position)}-${sanitize(values.company_name)}`
      )
      let slug = `${pretty}-${_id}`

      if (values.company_twitter_username) {
        values.company_twitter_username = values.company_twitter_username.replace(
          '@',
          ''
        )
      }

      const filteredValues = pickBy(
        values,
        (v, k) => !['submitting', 'stripe_error'].includes(k)
      )

      const body = Object.assign({}, filteredValues, {
        stripe_id,
        _id,
        slug,
      })

      body.posted_at = posted_at

      body.tags = body.tags
        .filter(tag => !!tag._id)
        .map(tag => ({
          _key: uuid(),
          _type: 'reference',
          _ref: tag._id,
        }))

      this.props.handleSubmit(body)
    } catch (e) {
      console.log(e)
      this.setState({ charge_error: 'We were unable to process this card.' })
    }
    this.setState({ submitting: false })
  }

  onValidate = values => {
    console.log('calling validate')
    this.props.updateJobPreview(values)
    return true
  }

  onSelect = (values, formTag, rerender, allowMulti = false, value) => {
    const { tagGroups } = this.props
    const tags = value ? new Set(value) : new Set(values.tags)

    const handleTag = tag => {
      const foundGroup = tagGroups.find(tagGroup =>
        tagGroup.tags.map(t => t._id).includes(tag)
      )

      foundGroup.tags.forEach(t => {
        if (t._id === tag) {
          tags.add(t)
        } else {
          if (!allowMulti) {
            tags.delete(t)
          }
        }
      })
    }

    if (formTag.value) {
      handleTag(formTag.value)
    } else {
      formTag.forEach(t => handleTag(t.value))
    }

    values.tags = Array.from(tags)
    rerender()
  }

  render = () => {
    const { tagGroups } = this.props

    const tools = mapTagsToSelectOptions(
      tagGroups.find(tagGroup => tagGroup.name === 'Tools').tags
    )
    const experienceLevels = mapTagsToSelectOptions(
      tagGroups.find(tagGroup => tagGroup.name === 'Experience').tags
    )
    const jobTypes = mapTagsToSelectOptions(
      tagGroups.find(tagGroup => tagGroup.name === 'Job Type').tags
    )
    const locations = mapTagsToSelectOptions(
      tagGroups.find(tagGroup => tagGroup.name === 'Location').tags
    )

    let calculated_amount = 29
    let final_amount = `$${calculated_amount}`
    return (
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({ errors, touched, validateForm, values }) => (
          <Form
            className="control"
            onSubmit={evt => this.onSubmit(evt, values, errors)}
          >
            <div className="border shadow p-4 my-4 mb-8">
              <div className="flex pb-4">
                <h2 className="text-blue-dark border-b-4 border-blue-dark">
                  Job Details
                </h2>
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Position*
                </label>
                <FastField
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="position"
                  required
                />
                {touched.position && errors.position && (
                  <p className="text-red py-4">{errors.position}</p>
                )}
              </div>

              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Location*
                </label>
                <FastField
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="location"
                  required
                />
                {touched.location && errors.location && (
                  <p className="text-red py-4">{errors.location}</p>
                )}
                <p className="help pt-4">
                  Where is your company/where is the role located? If remote,
                  put "Remote" here.
                </p>
              </div>
              <div className="my-8">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  <FastField
                    type="checkbox"
                    name="remote_friendly"
                    className="mr-2"
                  />
                  Remote Friendly
                </label>
                {touched.remote_friendly && errors.remote_friendly && (
                  <p className="text py-4">{errors.remote_friendly}</p>
                )}
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Description*
                </label>
                <FastField
                  component={RichTextInput}
                  name="description"
                  required
                />
                {touched.description && errors.description && (
                  <p className="text py-4">{errors.description}</p>
                )}
                <p className="pt-2 pb-4">
                  Describe what the role is about, and what your company does.
                  This is displayed first on the job page, so sell the job here
                  :)
                </p>
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Responsibilities
                </label>
                <FastField component={RichTextInput} name="responsibilities" />
                {touched.responsibilities && errors.responsibilities && (
                  <p className="text py-4">{errors.responsibilities}</p>
                )}
                <p className="pt-2 pb-4">
                  Describe what kind of work and day-to-day responsibilities
                  this role involves
                </p>
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Requirements
                </label>
                <FastField component={RichTextInput} name="requirements" />
                {touched.requirements && errors.requirements && (
                  <p className="text py-4">{errors.requirements}</p>
                )}
                <p className="pt-2 pb-4">
                  Example - "Two years of React development", or "experience
                  working remotely"
                </p>
              </div>
            </div>
            <div className="border shadow p-4 my-4 mb-8">
              <div className="flex pb-4">
                <h2 className="text-blue-dark border-b-4 border-blue-dark">
                  Tags
                </h2>
              </div>

              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Tools
                </label>
                <Select
                  component={Select}
                  isMulti
                  onChange={value =>
                    this.onSelect(values, value, validateForm, true, value)
                  }
                  options={tools}
                  value={selectedOptions(values.tags, tools, true)}
                />
                <p className="pt-2 pb-4">
                  If this job uses any "big-name" tools or frameworks, tag them
                  here. Our users often filter by these (for instance, "React
                  jobs"), so your job will be more discoverable
                </p>
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Job type
                </label>
                <FastField
                  component={Select}
                  onChange={value => this.onSelect(values, value, validateForm)}
                  options={jobTypes}
                  value={selectedOptions(values.tags, jobTypes)}
                />
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Experience level
                </label>
                <FastField
                  component={Select}
                  onChange={value => this.onSelect(values, value, validateForm)}
                  options={experienceLevels}
                  value={selectedOptions(values.tags, experienceLevels)}
                />
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Region
                </label>
                <FastField
                  component={Select}
                  onChange={value => this.onSelect(values, value, validateForm)}
                  options={locations}
                  value={selectedOptions(values.tags, locations)}
                />
                <p className="pt-2 pb-4">
                  Where is this position located? This will allow users to
                  lookup by "Region" tags -- including remote
                </p>
              </div>
            </div>

            <div className="border shadow p-4 my-4 mb-8">
              <div className="flex pb-4">
                <h2 className="text-blue-dark border-b-4 border-blue-dark">
                  Company Details
                </h2>
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Company Name*
                </label>
                <FastField
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="company_name"
                  required
                />
                {touched.company_name && errors.company_name && (
                  <p className="text py-4">{errors.company_name}</p>
                )}
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Company Website*
                </label>
                <FastField
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="company_website"
                  required
                />
                {touched.company_website && errors.company_website && (
                  <p className="text py-4">{errors.company_website}</p>
                )}
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Company Twitter Username
                </label>
                <FastField
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="company_twitter_username"
                />
                {touched.company_twitter_username &&
                  errors.company_twitter_username && (
                    <p className="text py-4">
                      {errors.company_twitter_username}
                    </p>
                  )}
                <p className="pt-2 pb-4">
                  We'll use this to tweet about your job, and link to your
                  company's Twitter account from the job posting
                </p>
              </div>
            </div>

            <div className="border shadow p-4 my-4 mb-8">
              <div className="flex pb-4">
                <h2 className="text-blue-dark border-b-4 border-blue-dark">
                  Job Post Details
                </h2>
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Application URL
                </label>
                <FastField
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="application_url"
                />
                {touched.application_url && errors.application_url && (
                  <p className="text py-4">{errors.application_url}</p>
                )}
                <p className="pt-2 pb-4">
                  If you don't provide an application URL, please provide
                  instructions below on how to apply to this job
                </p>
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Application Instructions
                </label>
                <FastField
                  component={RichTextInput}
                  name="application_instructions"
                />
                {touched.application_instructions &&
                  errors.application_instructions && (
                    <p className="text py-4">
                      {errors.application_instructions}
                    </p>
                  )}
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Contact Email*
                </label>
                <FastField
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="contact_email"
                  required
                />
                {touched.contact_email && errors.contact_email && (
                  <p className="text py-4">{errors.contact_email}</p>
                )}
                <p className="pt-2 pb-4">
                  This email is not public on the site -- we'll use it to
                  contact you about your job
                </p>
              </div>
            </div>

            <div className="border shadow p-4 my-4 mb-8">
              <div className="flex pb-4">
                <h2 className="text-blue-dark border-b-4 border-blue-dark">
                  Payment
                </h2>
              </div>
              <div className="my-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Card Info
                </label>
                <div className="mt-4">
                  {values.stripe_id ? (
                    <React.Fragment>
                      <p>We got your card info, thanks!</p>
                    </React.Fragment>
                  ) : (
                    <CardElement style={{ base: { fontSize: '16px' } }} />
                  )}
                  {this.state.charge_error && (
                    <p className="text py-4">{this.state.charge_error}</p>
                  )}
                  <p className="my-4">
                    All cards are processed by{' '}
                    <a href="https://stripe.com">Stripe</a>, a PCI-compliant
                    payment processor, over HTTPS
                  </p>
                </div>
              </div>
            </div>

            <p className="pt-2 pb-6">
              You won't be charged until you click the post button below
            </p>
            <button
              className={`text-white rounded p-2 ${
                this.state.submitting
                  ? 'bg-grey-light'
                  : 'bg-blue-dark hover:bg-blue'
              } text-xl`}
              disabled={this.state.submitting}
              type="submit"
            >
              <i className="fas fa-credit-card mr-4" />
              {this.state.submitting
                ? 'Submitting your job...'
                : `Post on Frontend Jobs for ${final_amount}`}
            </button>
          </Form>
        )}
      </Formik>
    )
  }
}
