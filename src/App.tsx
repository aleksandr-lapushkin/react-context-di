import React from 'react';
import './App.css';
import {AxiosUserCard} from "./components/axios/AxiosUserCard";
import {AxiosUsersList} from "./components/axios/AxiosUsersList";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {Home} from "./components/pages/Home";
import {UserDetails} from "./components/pages/UserDetails";
import {Breadcrumb, Layout} from "antd";
import {UsersClientContext} from "./hooks/useClient";
import {AxiosUserClient, UserClient} from "./clients/UserClient";
import axios from "axios"
import {AxiosRatingsClient, RatingsClient} from "./clients/RatingsClient";
import { ClientsContext } from './context-clients';

function App() {
  return (
  <BrowserRouter>
    <div style={{
        height: '100%'
    }}>
        <Layout style={{height: '100%'}}>
            <Layout.Header>
                <h1 style={{color: "white"}}>Users App</h1>
            </Layout.Header>
            <Layout.Content style={{
                margin: "64px",
                flexGrow: 0,
                background: "white"
            }}>
                <Route exact path={"/users/:id"}>
                    {({match}) =>
                        match?.isExact &&
                        <Breadcrumb style={{padding: "16px"}}>
                            <Breadcrumb.Item>
                                <Link to={'/'}>Users List</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {match?.params?.id}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                </Route>
                <UsersClientContext.Provider value={{client: new AxiosUserClient(axios.create())}}>
                <ClientsContext.Provider value={{
                    usersClient: new AxiosUserClient(axios.create()),
                    ratingsClient: new AxiosRatingsClient(axios.create())
                }}>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/users/:id">
                            <UserDetails />
                        </Route>
                    </Switch>
                </div>
                </ClientsContext.Provider>
                </UsersClientContext.Provider>
            </Layout.Content>
            <Layout.Footer style={{textAlign: "center"}}>
                React Context DI Demo
            </Layout.Footer>
        </Layout>
    </div>
  </BrowserRouter>
  );
}

export default App;
