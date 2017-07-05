import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import FlatButton from 'material-ui/FlatButton';

import * as CountryActions from '../../actions/country';

class Country extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
    
      name: '',
    
      capital: '',
    
      population: 0,
    
      errorText: {
      
        
          name: '',
        
      
        
      
        
      
      },
    };
  }
  

  componentWillMount() {
    this.props.countryActions.getCountry();
  }

  createModelInstance = () => {
    this.props.countryActions.createCountry(this.state);
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
    const styles = {
      container: {
        padding: '10px',
      },
      
      creationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      
      property: {
        margin: '0px 15px 0px 0px',
      },
      
      
      
    };
    return (
      <div style={styles.container}>
        <h1>Country</h1>
        
        <div style={styles.creationContainer}>
                      
              <TextField
                
                errorText="This field is required"
                
                hintText="name"
                onChange={(e, value) => this.handleChange(e, 'name', value)}
                style={styles.property}
                value={this.state.name}
              />
            
                      
              <TextField
                
                hintText="capital"
                onChange={(e, value) => this.handleChange(e, 'capital', value)}
                style={styles.property}
                value={this.state.capital}
              />
            
                      
              <TextField
                
                hintText="population"
                onChange={(e, value) => this.handleChange(e, 'population', value)}
                style={styles.property}
                type="number"
                value={this.state.population}
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
              
              <TableHeaderColumn>capital</TableHeaderColumn>
              
              <TableHeaderColumn>population</TableHeaderColumn>
              
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false} >
            {_.map(this.props.countries, (data, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  { data.id }
                </TableRowColumn>
                
                <TableRowColumn>
                  { data.name }
                </TableRowColumn>
                
                <TableRowColumn>
                  { data.capital }
                </TableRowColumn>
                
                <TableRowColumn>
                  { data.population }
                </TableRowColumn>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Country.propTypes = {
  countries: PropTypes.array.isRequired,
  countryActions: PropTypes.shape({
    getCountry: PropTypes.func.isRequired,
    createCountry: PropTypes.func.isRequired,
  })
};

function mapStateToProps(state) {
  return {
    countries: state.country,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    countryActions: bindActionCreators(CountryActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Country);
