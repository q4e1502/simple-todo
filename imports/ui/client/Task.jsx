import React, { Component, PropTypes } from 'react';
import { Tasks } from '../../api/tasks.js';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Button, Card, Row, Col } from 'react-materialize';

// Task component - represents a single todo item

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  }
};

export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';
    const iconStyles = {
      marginRight: 24,
      marginLeft: -10
    };
    return (
      <Row>
        <Col m={6} >
          <ListItem
            leftCheckbox={
              <Checkbox
                id ={this.props.task._id}
                readOnly
                checked={this.props.task.checked}
                onCheck={this.toggleChecked.bind(this)}
              />
            }
            rightIconButton={
              <IconButton onClick={this.deleteThisTask.bind(this)}>
                <FontIcon className="material-icons" style={styles.mediumIcon}> delete</FontIcon>
              </IconButton>
            }
            primaryText={this.props.task.text}
            secondaryText={this.props.task._id}
          />
        </Col>
      </Row>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
};
