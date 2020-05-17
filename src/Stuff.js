import React, { Component } from 'react';

class Stuff extends Component {
  render() {
    return (
			<div>
			{this.props.match ?
				<p>Ollaan Stuff {this.props.match.params.key}</p>
				: null
			}
				<p>Ja lisää data: {this.props.name}, {this.props.address} </p>
			</div>
    );
  }
}

export default Stuff;
