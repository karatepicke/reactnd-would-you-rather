import React from 'react';
import { Tab } from 'semantic-ui-react';

const panes = [
  { menuItem: 'Unanswered Questions', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Answered Questions', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> }
]

class QuestionsPanel extends React.Component {
  render() {
    return(
      <Tab panes={panes} />
    )
  }
}

export default QuestionsPanel;