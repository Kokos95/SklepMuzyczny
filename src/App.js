import React, { useEffect } from 'react'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import LoginPage from './views/LoginPage'
import Shop from './views/Shop'
import Cart from './views/Cart'
import Orders from './views/Orders'
import { UserProvider } from './UserContext'
import { loadDatabase } from './database'

function App() {

  useEffect(() => {
    loadDatabase()
  }, [])

  return (
    <HashRouter>
        <UserProvider>
            <React.Suspense fallback={() => <span>Loading...</span>}>
                <Switch>
                    <Route exact path="/" name="Login Page" render={props => <LoginPage {...props} />} />
                    <Route exact path="/shop" name="Shop Page" render={props => <Shop {...props} />} />
                    <Route exact path="/cart" name="Cart Page" render={props => <Cart {...props} />} />
                    <Route exact path="/orders" name="Order Page" render={props => <Orders {...props} />} />
                </Switch>
            </React.Suspense>
        </UserProvider>
    </HashRouter>
  );
}

export default App;
