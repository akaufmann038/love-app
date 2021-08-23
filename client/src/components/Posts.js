
import Post from "./Post"
import { Button, Container } from '@material-ui/core';
import { useHistory } from "react-router-dom"


const Posts = ({ posts, useAuth, resetReload }) => {
    let history = useHistory()
    let auth = useAuth()

    const clickNewPost = () => {
        history.push("/new-post")
    }

    console.log(posts);

    return (
        <div class="row gx-0 mb-4 mb-lg-5 align-items-center">
            {posts.map((element, idx) => {
                return <Post key={idx}
                    postData={element}
                    resetReload={resetReload}
                    useAuth={useAuth} />
            })}
        </div>
        // <div>
        //     <Container>
        //         {posts.map((element, idx) => {
        //             return <Post key={idx} 
        //             postData={element}
        //             resetReload={resetReload}
        //             useAuth={useAuth} />
        //         })}
        //     </Container>
        //     <Button color="primary" variant="contained" onClick={() => clickNewPost()}>New Post</Button>
        //     <Button variant="contained" onClick={() => {auth.signout(() => history.push("/login"));}}>Logout</Button>
        // </div>
    )
}

export default Posts