import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../../api/tasks.js';
import Task from './Task.jsx';

// imports UI Themes
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

// End import themes

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      hideCompleted: false,
      open: false,
      textInput: '' ,
    };
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  handleTextInput(event) {
    this.setState({
      textInput: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    Tasks.insert({
      text: this.state.textInput,
      createdAt: new Date(), // current time
    });

    // Clear form
    this.state.textInput = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  handleTouchTap(){
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

	  return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="container">
          <List>
            <Subheader>
              Todo List ({this.props.incompleteCount})
            </Subheader>
            <Checkbox
              label="Hide Completed Tasks"
              readOnly
              checked={this.state.hideCompleted}
              onCheck={this.toggleHideCompleted.bind(this)}
            />
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <TextField
                type="text"
                value={this.state.textInput}
                onChange={this.handleTextInput.bind(this)}
                name="textInput"
                hintText="Task name"
                floatingLabelText="Type to add new tasks"
              />
            </form>
            {this.renderTasks()}
          </List>
        </div>
      </MuiThemeProvider>
	  );
	}
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({},{ sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
}, App);