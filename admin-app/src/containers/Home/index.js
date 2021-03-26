import React from 'react'
import Layout from '../../components/Layout'
import { Jumbotron } from 'react-bootstrap'
/**
* @author
* @function Home
**/

const Home = (props) => {
    return (
        <Layout>
            <Jumbotron style={{margin:'10rem',background:'#fff'}} className="text-center">
                <h1>Welcome to Admin Dashboard</h1>
                <h3>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used before final copy is available, but it may also be used to temporarily replace copy in a process called greeking, which allows designers to consider form without the meaning of the text influencing the design.
Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a first-century BC text b…</h3>
            </Jumbotron>
        </Layout>
    )

}

export default Home