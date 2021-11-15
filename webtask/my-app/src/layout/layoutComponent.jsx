import React from 'react';
import MetaTags from 'react-meta-tags';
import Axios from "axios"


class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
        };
    }

    componentDidMount() {

        Axios.get("http://localhost:3333/auth/user", { withCredentials: true })
            .then(res => {
                //console.log(res);
                this.setState({ user: res.data })
            })
            .catch(error => {
                console.log("o SEFUINTE ERROR", error.response.status);
                this.setState({
                    error: "Usuáio não logado!.",
                    isLoaded: true,

                })
            })
    }

    render() {
        const { user } = this.state;
        //console.log(user);
        return (
            <>
                <MetaTags>
                    <meta name="Content-type" content="text/html; charset=UTF-8" />
                    <meta httpEquiv="Content-Language" content="pt-br"/>
                    <meta name="Accept" content="application/json" />
                    <meta name='Access-Control-Allow-Origin' content='http://localhost:3000' />
                    <meta name="Access-Control-Allow-Credentials" content='true' />
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
                </MetaTags>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">{user.firstName}</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/task/create">Nova Tarefa</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/mytask">Meus Pedidos</a>
                                </li>
                              
                            </ul>
                            <div>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3333/api/logout">Log Out</a>
                                </li>
                            </div>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default Layout;