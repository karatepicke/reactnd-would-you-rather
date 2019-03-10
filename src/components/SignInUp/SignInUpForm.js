import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

const SignInUpForm = () => (
  <Form>
    <Form.Field>
      <input type="email" placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <input placeholder='Password' />
    </Form.Field>
    <Button type='submit'>Login</Button>
  </Form>
)

export default SignInUpForm;