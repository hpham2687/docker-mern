import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import DefaultLayout from './components/DefaultLayout/index';
import { publicRoutes } from './routes/index';

import LoginForm from "./components/LoginForm";
// import { useSelector } from 'react-redux';
import CreateAccountForm from './components/CreateAccountForm';

function App() {
    // const user = useSelector(state => state.auth.login.currentUser);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/register" element={<CreateAccountForm />} />
                    {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
