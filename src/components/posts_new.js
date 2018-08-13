import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createPosts } from '../actions'

class PostNew extends Component {
  renderField(field) {
    const { meta: { touched: touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          //onChange={field.input.onChange}
          //onFocus={field.input.onChange}
          //onBlur={field.input.onChange}
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }
  renderTagsField() {

  }

  onSubmit(values) {
    console.log(values)
    this.props.createPosts(values)
  }
  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title!"
  }
  if (!values.categories) {
    errors.categories = "Enter some categories"
  }
  if (!values.content) {
    errors.content = "Enter some content"
  }

  return errors
}
export default reduxForm({
  validate,
  form: 'PostsNewForm'
}) (
  connect(null,{ createPosts })(PostNew)
)
