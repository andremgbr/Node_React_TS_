import React from "react";
import MetaTags from 'react-meta-tags';
import Axios from "axios";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }


    handleSubmit = async function (e) {

        e.preventDefault();
        Axios.post("http://localhost:3333/api/login",
            {
                username: e.target.name.value,
                password: e.target.password.value
            },
            { withCredentials: true })
            .then(res => { window.location.href = "/" })
            .catch(error => {
                //console.log("o SEFUINTE ERROR", error.response.status);
                this.setState({
                    error: "Usuáio ou senha inválido!...",
                })
            })

    }


    render() {
        const { error } = this.state;
        return (
            <>
                <MetaTags>
                    <title>Login</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
                </MetaTags>
                <div class="container overflow-hidden" style={{ paddingTop: "80px",width:"400px" }}>
                    <form onSubmit={this.handleSubmit}>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">ID-Card:</span>
                            <input type="text" name="name" class="form-control" placeholder="aaa111" aria-label="Username" aria-describedby="basic-addon1" onChange={this.myChangeHandler} />
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Senha:</span>
                            <input type="password" name="password" class="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={this.myChangeHandler} />
                        </div>


                        <button type="submit" value="Submit" class="btn btn-success">Entrar</button>
                        {error ? <div class="alert alert-danger" role="alert" >{error}</div> : ""}

                    </form>
                    <div>Não possui uma conta? <a href="/signup">Criar Conta</a></div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </>)
    }
}


export default Login;