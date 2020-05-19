import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary'; //86

class Home extends Component {

  render() {
          
    return (
			<div>
				<p>Kotisivu. Pitiköhän täälläkin  olla jotain??</p>			
<ErrorBoundary>
  
</ErrorBoundary>
        
			</div>
    );
  }
}






export default Home;
