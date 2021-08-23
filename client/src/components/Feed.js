import { Switch, useRouteMatch, Route, useParams, useHistory } from "react-router-dom"
import Posts from "./Posts"
import PostPage from "./PostPage"
import { Button } from '@material-ui/core';

const Feed = ({ posts, useAuth, resetReload, loading }) => {
    let history = useHistory()

    let { path, url } = useRouteMatch()

    // refresh data in application
    const refetchData = async () => {
        //setLoading(true)

        const result = await fetch("http://localhost:5000/posts")
            .then(response => response.json())
            .then(data => {
                return data
            })

        console.log("data reloaded")
        resetReload(result)
    }

    return (
        <Switch>
            <Route exact path={path}>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                    <div className="container px-4 px-lg-5">
                        <a className="navbar-brand" href="#page-top">Creative Share</a>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                    <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item"><a className="nav-link" onClick={() => history.push("/home")}>Home</a></li>
                                <li className="nav-item"><a className="nav-link" onClick={() => history.push("/feed")}>Feed</a></li>
                                <li className="nav-item"><a className="nav-link" href="#signup">My Posts</a></li>
                                <li className="nav-item"><a className="nav-link" href="#signup">Conversations</a></li>
                                <li className="nav-item"><a className="nav-link" href="#signup">LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section className="projects-section bg-light" id="projects">
                    <div className="container px-4 px-lg-5">
                        {loading && <h4>Loading...</h4>}
                        <Posts
                            posts={posts} // all post data
                            useAuth={useAuth}
                            resetReload={resetReload} />
                        <Button variant="contained" color="primary" onClick={() => history.push("/admin")} >Admin Page</Button>
                        <Button variant="contained" color="primary" onClick={() => history.push("/conversations")} >Conversations Page</Button>
                        <Button variat="contained" color="primary" onClick={() => refetchData()}>Refresh</Button>
                    </div>
                </section>
            </Route>
            <Route path={`${path}/:postId`}>
                <PostPage posts={posts} useAuth={useAuth} resetReload={resetReload} />
            </Route>
        </Switch>
    )
}

export default Feed