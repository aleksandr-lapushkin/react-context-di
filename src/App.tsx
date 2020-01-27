import React from 'react';
import './App.css';
import {AxiosUserCard} from "./components/axios/AxiosUserCard";
import {AxiosUsersList} from "./components/axios/AxiosUsersList";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "./components/pages/Home";
import {UserDetails} from "./components/pages/UserDetails";
import {Layout} from "antd";
import {UsersClientContext} from "./hooks/useClient";
import {AxiosUserClient, UserClient} from "./clients/UserClient";
import axios from "axios"
import {AxiosRatingsClient, RatingsClient} from "./clients/RatingsClient";
import { ClientsContext } from './context-clients';



function App() {
  return (
    <div style={{
        height: '100%'
    }}>
        <Layout style={{height: '100%'}}>
            <Layout.Header>
                Users App
            </Layout.Header>
            <Layout.Content style={{
                height: '100%'
            }}>
                <UsersClientContext.Provider value={{client: new AxiosUserClient(axios.create())}}>
                <ClientsContext.Provider value={{
                    usersClient: new AxiosUserClient(axios.create()),
                    ratingsClient: new AxiosRatingsClient(axios.create())
                }}>
                <div style={{
                    height: '100%'
                }}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route path="/users/:id">
                                <UserDetails />
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
                </ClientsContext.Provider>
                </UsersClientContext.Provider>
            </Layout.Content>
            <Layout.Footer>

            </Layout.Footer>
        </Layout>
    </div>
  );
}

export default App;
