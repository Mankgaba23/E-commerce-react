import React from 'react';
import { link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Cart from './Cart';
import Shop from './Shop';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { Button } from '@material-ui/core';
import { Logout } from 'react';
import { auth } from '../Firebase';

const NavBar = () => {
    function Logout() {

        auth.signOut().then(
            alert("has signned out")
        )
    }
    return (
        <Router>
            <header className="header">
                <nav className="NavBar">
                    <a href="/" className="logo-nav">LOGO</a>
                    <ul className="manu-nav">
                        <Link className="link-nav" to="/"> Shop</Link>
                        <Link className=" link-nav" to="/Cart">Cart </Link>
                        <Link className=" link-nav" to="/SignUp">SignUp </Link>
                        <Link className="link-nav" to="/SignIn">SignIn</Link>
                        <Button onClick={() => Logout()}>Logout </Button>
                    </ul>
                </nav>
            </header>
            <Switch>
                <Route exact path="/">
                    <Shop></Shop>
                </Route>

                <Route exact path="/Shop">
                    <Shop></Shop>
                </Route>

                <Route exact path="/Cart">
                    <Cart></Cart>
                </Route>

                <Route exact path="/SignUp">
                    <SignUp></SignUp>
                </Route>

                <Route exact path="/SignIn">
                    <SignIn></SignIn>
                </Route>
                
            </Switch>


        </Router>

    );
}

export default NavBar;