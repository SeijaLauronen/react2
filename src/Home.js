import React, { Component } from 'react';

class Home extends Component {


  render() {
    if (this.props.testpara > 1) {
      throw new Error('Testataan virhettä')
    }

    return (
      <div>
        <p>Kotisivu. Pitiköhän täälläkin  olla jotain??</p>

      </div>
    );
  }
}


export default Home;
