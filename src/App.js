// Imports
import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


// Import Search Bar Components
import SearchBar from 'material-ui-search-bar';

// Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

class SearchBlock extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: ''
    };

    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

  }

  handleScriptLoad() {
    // Declare Options For Autocomplete
    var options = {
      types: ['(cities)'],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }
  
  handlePlaceSelect() {

    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }

  render() {
    return (
      <div>
        <Script
          url= {`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <MuiThemeProvider>
            <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query}
            style={{
                margin: '0 auto',
                maxWidth: 800,
            }}
            />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SearchBlock;

