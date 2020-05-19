import React, { Component } from 'react';
import { Route, BrowserRouter, NavLink, Switch } from 'react-router-dom'
import Home from './Home';
import Stuff from './Stuff';
import Testheader from './Testheader';
import Search from './Search'; //81-83, poisto ei onnistunut tällä rakenteella
import SearchWithDelete from './SearchWithDelete';//(81-) 84 rakenne hieman uusiksi poistoa varten
import ContactInfo from './ContactInfo'; //85
import SearchSPA from './SearchSPA'; //85
import ErrorBoundary from './ErrorBoundary'; //86 
// Täältä vinkkiä, miten saa erroboundaryn ja routen syntaksin yhteen: 
//https://stackoverflow.com/questions/49130876/how-to-integrate-error-boundary-in-components-routed-using-react-router

// jostain olin kopsannu tämän, että on class tyyppinen, 2 seuraavaa riviä kommentoitu + alhaalta yksi
//class App extends Component { //class tyyppisessä tämä rivi aktiiviseksi
//render() {	//class tyyppisessä tämä rivi aktiiviseksi

//"tavallinen reititys ilman erroria:"
//<Route exact path="/ContactInfo/:id" component={ContactInfo} />


function App() { // kokeilin vaihtaa funktioksi, toimiiko samalla tavalla
	return (
		//BrowserRouter pitää kehystää diviä
		//Tuo on ärsyttävä kun table ja tbodysta tulee usein:Whitespace text nodes cannot appear as a child of <tbody>. Vaikka siellä ei olis mitään whitespacea??!!
		<BrowserRouter>
			<div>

				<header>
					<h1>React 2 tehtävät</h1>
				</header>

				<table><tbody>
					<tr>
						<td><NavLink to="/">Kotiin</NavLink></td>
						<td><NavLink to="/ashaku">Asiakashakuun</NavLink></td>
						<td>Yhteystietoihin pääset asiakashausta</td>
					</tr>
				</tbody></table>
				<table><tbody>
					<tr>
						<td>Virhekokeiluja:</td>
						<td><NavLink to="/ContactInfo">Yhteystiedot ilman parametria</NavLink></td>
						<td><NavLink to="/testerror">Virhetestaus (toimii)</NavLink></td>
						<td><NavLink to="/testerrorcontact/8">Virhetestaus kontaktisivulla (ei toimi kunnolla)</NavLink></td></tr>
				</tbody></table>

				<hr />

				<Switch>

					<Route exact path="/" component={Home} />
					<Route
						exact path="/testerror"
						render={() => (
							<ErrorBoundary>
								<Home testpara="5" />
							</ErrorBoundary>
						)}
					/>
					
					<Route exact path="/ContactInfo/:id" component={ContactInfo} />
					<Route exact path="/ContactInfo" component={ContactInfo} />
					<Route
						exact path="/testerrorcontact/:id"
						render={() => (
							<ErrorBoundary>
								<ContactInfo />
							</ErrorBoundary>
						)}
					/>
					<Route path="/ashaku" component={SearchSPA} />
				</Switch>

				<br />

			</div>
		</BrowserRouter>
	);
}
//} //class tyyppisessä tämä rivi aktiiviseksi

export default App;
