import React, { Component } from 'react';

class ContactInfo extends Component {
  render() {
    return (
			<div>
			{this.props.match ?
				<p>Ollaan Yhteystiedoissa Contacttt {this.props.match.params.key}</p>
				: null
			}
				<p>Ja lisää dataa Contacttt: {this.props.name}, {this.props.address} </p>
			</div>
    );
  }
}

export default ContactInfo;