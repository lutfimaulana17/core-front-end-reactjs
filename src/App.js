import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {MainLayout} from './components/Layout';
import PageSpinner from './components/PageSpinner';
import componentQueries from 'react-component-queries';
import './styles/reduction.scss';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthLogin from './pages/Auth/Login';


const Home = React.lazy(() => import ('./pages/Home/Home'));
{/* Users */}
const Users = React.lazy(() => import ('./pages/Users/Users'));
const UsersCreate = React.lazy(() => import ('./pages/Users/Create'));
const UsersEdit = React.lazy(() => import ('./pages/Users/Edit'));
{/* Category */}
const Category = React.lazy(() => import ('./pages/Category/Category'));
const CategoryCreate = React.lazy(() => import ('./pages/Category/Create'));
const CategoryEdit = React.lazy(() => import ('./pages/Category/Edit'));
{/* Article */}
const Article = React.lazy(() => import ('./pages/Article/Article'));
const ArticleCreate = React.lazy(() => import ('./pages/Article/Create'));
const ArticleEdit = React.lazy(() => import ('./pages/Article/Edit'));
{/* News */}
const News = React.lazy(() => import ('./pages/News/News'));
const NewsCreate = React.lazy(() => import ('./pages/News/Create'));
const NewsEdit = React.lazy(() => import ('./pages/News/Edit'));
{/* Company */}
const Company = React.lazy(() => import ('./pages/Company/Company'));
const CompanyCreate = React.lazy(() => import ('./pages/Company/Create'));
const CompanyEdit = React.lazy(() => import ('./pages/Company/Edit'));
{/* Myprofile */}
const Myprofile = React.lazy(() => import ('./pages/Myprofile/Myprofile'));

const App = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact="exact" path="/login" component={AuthLogin}/> 
                <MainLayout breakpoint={props.breakpoint}>
                    <React.Suspense fallback={<PageSpinner />}>
                        <Route exact="exact" path="/" component={Home}/> 
                        {/* Users Route */}
                        <Route exact="exact" path="/users" component={Users}/>
                        <Route exact="exact" path="/users/create" component={UsersCreate}/>
                        <Route exact="exact" path="/users/edit/:id" component={UsersEdit}/>
                        {/* Category Route */}
                        <Route exact="exact" path="/category" component={Category}/>
                        <Route exact="exact" path="/category/create" component={CategoryCreate}/>
                        <Route exact="exact" path="/category/edit/:id" component={CategoryEdit}/>
                        {/* Article Route */}
                        <Route exact="exact" path="/article" component={Article}/>
                        <Route exact="exact" path="/article/create" component={ArticleCreate}/>
                        <Route exact="exact" path="/article/edit/:id" component={ArticleEdit}/>
                        {/* News Route */}
                        <Route exact="exact" path="/news" component={News}/>
                        <Route exact="exact" path="/news/create" component={NewsCreate}/>
                        <Route exact="exact" path="/news/edit/:id" component={NewsEdit}/>
                        {/* Company Route */}
                        <Route exact="exact" path="/company" component={Company}/>
                        <Route exact="exact" path="/company/create" component={CompanyCreate}/>
                        <Route exact="exact" path="/company/edit/:id" component={CompanyEdit}/>
                        {/* Myprofile Route */}
                        <Route exact="exact" path="/myprofile/:id" component={Myprofile}/>
                    </React.Suspense>
                </MainLayout>
                <Redirect to="/"/>
            </Switch>
            <ToastContainer/>
        </BrowserRouter>
    );
}

const query = ({width}) => {
    if (width < 575) {
        return {breakpoint: 'xs'};
    }

    if (576 < width && width < 767) {
        return {breakpoint: 'sm'};
    }

    if (768 < width && width < 991) {
        return {breakpoint: 'md'};
    }

    if (992 < width && width < 1199) {
        return {breakpoint: 'lg'};
    }

    if (width > 1200) {
        return {breakpoint: 'xl'};
    }

    return {breakpoint: 'xs'};
};

export default componentQueries(query)(App);
