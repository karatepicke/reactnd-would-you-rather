import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/register">
            <Button primary>Create</Button>
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
)

export default SignInUpPrompt;