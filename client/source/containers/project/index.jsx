import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import FlatButton from 'material-ui/FlatButton';

import * as ProjectActions from '../../actions/project';
import * as SgUserActions from '../../actions/sgusers';

class Project extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
    
      name: '',
    
      totalspent: 0,
    
      expenses: '',
    
      users: '',
    
      open: true,
    
      finalizing: true,
    
      errorText: {
      
        
          name: '',
        
      
        
      
        
      
        
      
        
      
        
      
      },
    };
  }
  

  componentWillMount() {
    this.props.projectActions.getProject();
    this.props.sgUsersActions.getSgUsers();
  }

  createModelInstance = () => {
    this.props.projectActions.createProject(this.state);
  };

  handleChange = (e, key, value) => {
    if (e) {
      e.preventDefault();
    }
    if (value === undefined || value === '') {
      const errorText = this.state.errorText;
      errorText[key] = key + ' is required';
      this.setState({ errorText })
    } else {
      const errorText = this.state.errorText;
      errorText[key] = '';
      this.setState({ errorText })
    }
    this.setState({
      [key]: value,
    });
  };

  render() {
    console.log(this.props.sgusers);
    const styles = {
      container: {
        padding: '10px',
      },
      
      creationContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'flex-start',
      },
      
      property: {
        margin: '0px 15px 0px 0px',
      },
      
      
      toggle: {
        margin: '0px 15px 0px 0px',
        width: 'auto',
      }
      
      
    };
    return (
      <div style={styles.container}>
        <h1>Project</h1>
        
        <div style={styles.creationContainer}>
                      
              <TextField
                
                errorText={this.state.errorText['name']}
                
                hintText="name"
                onChange={(e, value) => this.handleChange(e, 'name', value)}
                style={styles.property}
                value={this.state.name}
              />
            
                      
              <TextField
                
                hintText="totalspent"
                onChange={(e, value) => this.handleChange(e, 'totalspent', value)}
                style={styles.property}
                type="number"
                value={this.state.totalspent}
              />
            
                      
              <TextField
                
                hintText="expenses"
                onChange={(e, value) => this.handleChange(e, 'expenses', value)}
                style={styles.property}
                value={this.state.expenses}
              />
            
                      
              <TextField
                
                hintText="users"
                onChange={(e, value) => this.handleChange(e, 'users', value)}
                style={styles.property}
                value={this.state.users}
              />
            
                      
              <Toggle
                label="open"
                onToggle={(e, value) => this.handleChange(e, 'open', value)}
                style={styles.toggle}
                value={this.state.open}
              />
            
                      
              <Toggle
                label="finalizing"
                onToggle={(e, value) => this.handleChange(e, 'finalizing', value)}
                style={styles.toggle}
                value={this.state.finalizing}
              />
            
          
          <FlatButton
            label="Submit"
            onTouchTap={this.createModelInstance}
          />
        </div>
        
        <Table> selectable={false} >
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>id</TableHeaderColumn>
              
              <TableHeaderColumn>name</TableHeaderColumn>
              
              <TableHeaderColumn>totalspent</TableHeaderColumn>
              
              <TableHeaderColumn>expenses</TableHeaderColumn>
              
              <TableHeaderColumn>users</TableHeaderColumn>
              
              <TableHeaderColumn>open</TableHeaderColumn>
              
              <TableHeaderColumn>finalizing</TableHeaderColumn>
              
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false} >
            {_.map(this.props.projects, (data, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  { data.id }
                </TableRowColumn>
                
                <TableRowColumn>
                  { data.name }
                </TableRowColumn>
                
                <TableRowColumn>
                  { data.totalspent }
                </TableRowColumn>
                
                <TableRowColumn>
                  { data.expenses }
                </TableRowColumn>
                
                <TableRowColumn>
                  { data.users }
                </TableRowColumn>
                
                <TableRowColumn>
                  { data.open }
                </TableRowColumn>
                
                <TableRowColumn>
                  { data.finalizing }
                </TableRowColumn>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Project.propTypes = {
  projects: PropTypes.array.isRequired,
  projectActions: PropTypes.shape({
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
  })
};

function mapStateToProps(state) {
  return {
    projects: state.project,
    sgUsers: state.sgusers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    projectActions: bindActionCreators(ProjectActions, dispatch),
    sgUsersActions: bindActionCreators(SgUserActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Project);
