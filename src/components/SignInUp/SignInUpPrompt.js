import React from 'react';
import { Button, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import SignInUpForm from './SignInUpForm';

const SignInUpPrompt = () => (
  <Segment placeholder>
    <Grid columns={2} stackable textAlign='center'>
      <Divider vertical>Or</Divider>

      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
          <Header icon>
            <Icon name='key' />
            Sign In
          </Header>

          <SignInUpForm />
        </Grid.Column>

        <Grid.Column>
          <Header icon>
            <Icon name='add user' />
            Create Account
          </Header>
          <Button primary>Create</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
)

export default SignInUpPrompt;