import React from 'react';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';
import SignInUpForm from './SignInUpForm';

const SignInUpPrompt = () => (
  <Segment placeholder>
    <Grid columns={1} stackable textAlign='center'>
      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
          <Header icon>
            <Icon name='key' />
            Sign In
          </Header>

          <SignInUpForm />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
)

export default SignInUpPrompt;