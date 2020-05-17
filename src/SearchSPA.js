import React, { Component } from 'react';
import { Route, BrowserRouter, NavLink, Switch } from 'react-router-dom';//85
import ContactInfo from './ContactInfo'; //85
//Tehtavan 85 tarvitsemat muutokset

class SearchSPA extends Component {

    constructor(props) {
        super();

        this.buttonClicked = this.buttonClicked.bind(this); // tämä vaaditaan, jos halutaan käyttää this.buttonClicked alempana buttonissa
        this.onNameChanged = this.onNameChanged.bind(this); // tämä vaaditaan, jos halutaan käyttää this.onAgeChanged alempana buttonissa
        this.onAddressChanged = this.onAddressChanged.bind(this);
        this.onPostalNroChanged = this.onPostalNroChanged.bind(this);
        this.poistaClicked = this.poistaClicked.bind(this);

        this.state =
        {
            searchName: '',
            searchAddress: '',
            searchPostalNro: '',
            message: '', //laitetaan odotus kuitenkin omaan palikkaansa
            customerdata: ''//Tuli jossain vaiheessa suorittaessa virhe: Text nodes cannot appear as a child of <tbody> 
        }

    }

    // Tämä on tyypillisesti Reactissa se paikka, minne tehdään datan haun kutsu
    componentDidMount() {
        //this.fetchData();        Otetaan nyt tästä pois, niin ei hae kaikkia heti sivun latautuessa
    }

    buttonClicked() {
        //this.setState({ customerdata: 'Loading...' }); //tämän voi laittaa tänne tai tuonne itse fetchiin
        this.fetchData();
    }

    onNameChanged(event) {
        this.setState({ searchName: event.target.value });
    }

    onAddressChanged(event) {
        this.setState({ searchAddress: event.target.value });
    }

    onPostalNroChanged(event) {
        this.setState({ searchPostalNro: event.target.value })
    }

    async delData(props) {//props voisi olla myös suoraan id-nimellä...?
        this.setState({ message: 'Deleting...' });
        this.setState({ customerdata: '' });//Ei tuo erroria nähtävästi, vaikka table-elementti on sitten tyhjä
        let response = await fetch("http://localhost:3004/asiakkaat/" + props, { method: 'DELETE' });
        let data = await response.json();
        this.fetchData();
    }

    //Täältä vinkkiä miten saa tuon id:n välitettyä. Tuo event on ehkä nyt ylimääräinen
    //https://stackoverflow.com/questions/42576198/get-object-data-and-target-element-from-onclick-event-in-react-js
    poistaClicked(event, id) {
        //alert("poistetaan:"+id); 
        //https://stackoverflow.com/questions/51503687/proper-fetch-call-for-delete-using-json-server              
        //https://stackoverflow.com/questions/45654080/fetch-delete-request-method-using-react-redux-is-not-deleting

        //juju olikin siinä, että koska tämä ei ole asynkroninen funkka, niin ei voinut tehdä tuota delete kutsua tänne, vaan oma funkka sille:
        this.delData(id);
        //this.fetchData(); Jos laittoi tähän, niin haki ennenkuin oli poistanut
    }

    async fetchData() {
        this.setState({ customerdata: '' });//tyhjennetään entiset hakutulokset
        this.setState({ message: 'Loading...' });//Vaihtoehtoisesti buttonclickin kanssa vois laittaa tänne (tai vaikka molempiin...)

        let searchstr = '?';
        if (this.state.searchName !== '') {
            searchstr += "nimi=" + this.state.searchName + "&";
        }
        if (this.state.searchAddress !== '') {
            searchstr += "osoite=" + this.state.searchAddress + "&";
        }

        if (this.state.searchPostalNro !== '') {
            searchstr += "postinumero=" + this.state.searchPostalNro + "&";
        }

        //alert(searchstr);

        let response = await fetch("http://localhost:3004/asiakkaat" + searchstr)
        let data = await response.json();
        //console.log("Searchdata: " + data);
        //console.log("SearchdataString " + JSON.stringify(data));
        console.log("JSON ", data);

        let cLink = "http://localhost:3000/ContactInfo/";
        //let cLink="/ContactInfo/:";
        //Vaihtoehto 1
        /*
        const items = data.map((customer) =>
            //Huhhuh, menipä kauen ennkun hoksasin, että pitää laittaa {cLink,customer.id} eikä {cLink}{customer.id} tai jotain muuta....
            //Äh, no miksi ei toimikaan. No tämä toimii: {"http://localhost:3000/ContactInfo/",customer.id}
            //No eikä toimi, ei mene perille kuin tuo customer.id. Miksi häsiää se reitti?????
            //<td><NavLink to={cLink,customer.id}>Yhteystiedot Navlinkkinä </NavLink></td>
            //<td><NavLink to="/ContactInfo/">Yhteystiedot Navlinkkinä </NavLink></td>
            <tr key={(customer.id).toString()}>
                <td>{customer.nimi}</td>
                <td> {customer.osoite}</td>
                <td>{customer.postinumero}</td>
                <td> {customer.postitmp} </td>
                <td>{customer.puh}</td>
                <td><button value={customer.id} onClick={((e) => this.poistaClicked(e, customer.id))}>Poista </button></td>
                <td><a href={"http://localhost:3000/ContactInfo/", customer.id}>Yhteystiedot </a></td>
                <td><NavLink to={"/ContactInfo/",customer.id}>Yhteystiedot Navlinkkinä </NavLink></td>
            </tr>

        );
        */
        //return items; //ei käytetäkään returnia
        /*
        //OHO, ei saanut noitten tagien väliin laittaa tyhjää, tuli muuten: Whitespace text nodes cannot appear as a child of <tr>
        let tHeaderRow = <tr><th>Nimi</th><th>Osoite</th><th>Postinro</th><th>Postitoimipaikka</th><th>Puh</th><th></th></tr>;
        let resultTable = <table border='1'><tbody>{tHeaderRow}{items}</tbody></table>;

        //this.setState({ customerdata: items });
        this.setState({ customerdata: resultTable });
        */

        //Vaihtoehto 2
        // tätä jos kokeilee, pitäää renderissä vaihtaa table:n tilalle vaikka <ul></ul>
        
        let tHeaderRow = <tr key="-1"><th>Nimi</th><th>Osoite</th><th>Postinro</th><th>Postitoimipaikka</th><th>Puh</th><th></th></tr>;
        //let resultTable = <table border='1'><tbody>{tHeaderRow}{items}</tbody></table>;
        var listitems = [];
        var rowitem="";    
        var totalLink="";  
        var totacNavlLink="";  
        let cNavLink="/ContactInfo/";  
        listitems.push(tHeaderRow);
        data.forEach(customer => {
            totalLink =cLink+customer.id;
            totacNavlLink = cNavLink+customer.id;
            console.log("JSON ", customer.nimi);
            listitems.push(
            rowitem=<tr key={(customer.id).toString()}>
            <td>{customer.nimi}</td>
            <td>{customer.osoite}</td>
            <td>{customer.postinumero}</td>
            <td>{customer.postitmp}</td>
            <td>{customer.puh}</td>
            <td><button value={customer.id} onClick={((e) => this.poistaClicked(e, customer.id))}>Poista </button></td>
            <td><a href={totalLink}>Yhteystiedot </a></td>
            <td><NavLink to={totacNavlLink}>Yhteystiedot Navlinkkinä </NavLink></td>
            </tr>);
            //listitems.push(rowitem);

        });        
        //return listitems;  //ei käytetäkään returnia
        this.setState({ customerdata: listitems });    
        

        this.setState({ message: '' });
        if (data.length === 0) {
            this.setState({ message: 'Hakuehdon täyttäviä asiakkaita ei löytynyt' });
        }

    }

    render() {
        return (
            <BrowserRouter>
                <div>

                    <form>
                        <label>Nimi:</label>
                        <input type="text" name="nimi" onChange={this.onNameChanged} />
                        <br />
                        <label>Osoite:</label>
                        <input type="text" name="osoite" onChange={this.onAddressChanged} />
                        <br />
                        <label>Postinumero:</label>
                        <input type="text" name="postinumero" onChange={this.onPostalNroChanged} />
                    </form>
                    <button onClick={this.buttonClicked}>Hae</button>
                    <br />
                    <label>{this.state.message}</label>
                    <table border='1'><tbody>{this.state.customerdata}</tbody></table>
                    <Switch>
                        <Route path="/ContactInfo/:id" component={ContactInfo} />
                        <Route path="/ContactInfo/" component={ContactInfo} />                        
                    </Switch>
                </div>


            </BrowserRouter>

        )
    }
}

//En nyt sitten käytäkään tätä, kun en saanut tällä tuota buttonclickiä toimimaan mitenkään...
function dataToTable(props) {
    let row = '';
    //mites tuon poiston saa kutsuttua
    //https://stackoverflow.com/questions/50015445/react-dynamically-create-buttons-based-on-number-of-results
    //https://stackoverflow.com/questions/56775842/i-want-to-create-a-button-inside-a-cell-of-react-table-column
    //https://stackoverflow.com/questions/44710135/react-onclick-for-dynamically-generated-components


    row = <tr key={(props.id).toString()}>
        <td>{props.nimi}</td>
        <td> {props.osoite}</td>
        <td>{props.postinumero}</td>
        <td> {props.postitmp} </td>
        <td>{props.puh}</td>
        <td><button onClick={props.poistaClicked}>Poista ei toimi tässä</button></td>
    </tr>
    return row;
}

export default SearchSPA;