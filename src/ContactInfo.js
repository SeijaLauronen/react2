import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary'; //86
// Huhhuh, tuon fetchID:n hakuun autto tämä: 
//https://stackoverflow.com/questions/54114416/how-to-access-this-props-match-params-along-with-other-props
//Toimii, mutta tulee state ja unmounted virhettä, täältä vinkkiä korjaamiseen:
//https://www.debuggr.io/react-update-unmounted-component/
// Errorboundervideo: https://www.youtube.com/watch?v=DNYXgtZBRPE

class ContactInfo extends Component {

    constructor(props) {
        super();
        this.state =
        {
            fetchID: props.match.params.id,
            message: '',
            customerdata: '',
            countFetched:0,
            error: null, 
            errorInfo: null
        }
    }

    // Tämä on tyypillisesti Reactissa se paikka, minne tehdään datan haun kutsu
    componentDidMount() {
        this.fetchData();
    }

    //86
    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
          error: error,
          errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    async fetchData() {

        this.setState({ message: 'Haetaan yhteystietoja id:lle' + this.state.fetchID + "..." });

        let searchstr = '?';
        if (this.state.fetchID !== '') {
            searchstr += "id=" + this.state.fetchID + "&";
        }

        let response = await fetch("http://localhost:3004/asiakkaat" + searchstr)
        let data = await response.json();
        console.log("JSON ", data);

       

        const items = data.map((customer) =>
            <p key={(customer.id).toString()}>
                Id: {customer.id}<br />
                Nimi: {customer.nimi}<br />
                Osoite: {customer.osoite}<br />
                Postinro: {customer.postinumero}<br />
                Postitmp: {customer.postitmp}<br />
                Puh: {customer.puh}<br />
            </p>
        );

        this.setState({ customerdata: items });
        this.setState({countFetched:data.length}); //86:sta varten

        this.setState({ message: '' });
        if (data.length === 0) {
            this.setState({ message: 'Hakuehdon täyttäviä asiakkaita ei löytynyt' });
        }

        

    }

    render() {
        return (
             //t86
        
            <div>
                <h1>Yhteystiedot</h1>
                

                {this.props.match ?
                    <p>Parametri: {this.props.match.params.id}</p>
                    : <p>Hae ensin asiakas, jonka yhteystiedot haluat</p>
                }

                <p>{this.state.message}</p>
                
                {this.state.customerdata}
                
               
                <ErrorBoundary>
                </ErrorBoundary>
            </div>
        );
    }
}



export default ContactInfo;