import React, { Component } from 'react';
import { Route, BrowserRouter, NavLink, Switch } from 'react-router-dom'
import Home from './Home';
import Stuff from './Stuff';
import Testheader from './Testheader';
import Search from './Search'; //81-83, poisto ei onnistunut tällä rakenteella
import SearchWithDelete from './SearchWithDelete';//(81-) 84 rakenne hieman uusiksi poistoa varten
import ContactInfo from './ContactInfo'; //85
import SearchSPA from './SearchSPA'; //85

// jostain olin kopsannu tämän, että on class tyyppinen, 2 seuraavaa riviä kommentoitu + alhaalta yksi
//class App extends Component { //class tyyppisessä tämä rivi aktiiviseksi
//render() {	//class tyyppisessä tämä rivi aktiiviseksi
function App() { // kokeilin vaihtaa funktioksi, toimiiko samalla tavalla
	return (
		//BrowserRouter pitää kehystää diviä
		//Tuo on ärsyttävä kun table ja tbodysta tulee usein:Whitespace text nodes cannot appear as a child of <tbody>. Vaikka siellä ei olis mitään whitespacea??!!
		<BrowserRouter>
			<div>

				<header>
					<h1>React 2 tehtävät</h1>
				</header>

				<table><tbody><tr><td><NavLink to="/">Kotiin</NavLink></td><td><NavLink to="/ashaku">Asiakashakuun</NavLink></td><td><NavLink to="/ContactInfo">Yhteystiedot</NavLink></td></tr></tbody></table>

				<hr />

				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/stuff" render={() => (
						<Stuff name="Kalle" address="Teku" />
					)} />
					<Route path="/stuff/:key" component={Stuff} />
					<Route path="/ContactInfo/:id" component={ContactInfo} />
					<Route path="/ashaku" component={SearchSPA} />
				</Switch>


				<br />


			</div>
		</BrowserRouter>
	);
}
//} //class tyyppisessä tämä rivi aktiiviseksi

export default App;
