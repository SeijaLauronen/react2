import React, { Component } from 'react';
// Huhhuh, tuon fetchID:n hakuun autto tämä: 
//https://stackoverflow.com/questions/54114416/how-to-access-this-props-match-params-along-with-other-props

class ContactInfo extends Component {

    constructor(props) {
        super();
        this.state =
        {
            fetchID: props.match.params.id,
            message: '',
            customerdata: ''
        }
    }

    // Tämä on tyypillisesti Reactissa se paikka, minne tehdään datan haun kutsu
    componentDidMount() {
        this.fetchData();
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

        this.setState({ message: '' });
        if (data.length === 0) {
            this.setState({ message: 'Hakuehdon täyttäviä asiakkaita ei löytynyt' });
        }

    }

    render() {
        return (
            <div>
                <h1>Yhteystiedot</h1>

                {this.props.match ?
                    <p>Parametri: {this.props.match.params.id}</p>
                    : <p>Hae ensin asiakas, jonka yhteystiedot haluat</p>
                }

                <p>{this.state.message}</p>
                {this.state.customerdata}
            </div>
        );
    }
}


export default ContactInfo;