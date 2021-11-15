import React from "react";
import MetaTags from 'react-meta-tags';
import Axios from "axios";

class SignUp extends React.Component {

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

        Axios.post("http://localhost:3333/api/users",
            {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                sha256_password: e.target.sha256_password.value,
                companyId: e.target.companyId.value,
            },
            { withCredentials: true })
            .then(res => { window.location.href = "/login" })
            .catch(err => {
                this.setState({
                    error: "ERROR ----->  Id card já existe!."
                })
            });

        //window.location.href = "/login"
    }


    render() {
        const { error } = this.state;
        //console.log(error)
        return (
            <>
                <MetaTags>
                    <title>Registrar</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
                </MetaTags>

                <div class="container overflow-hidden" style={{ paddingTop: "80px", width: "400px" }}>
                    <form onSubmit={this.handleSubmit}>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Primeiro nome:</span>
                            <input type="text" name="firstName" class="form-control" placeholder="Primeiro Nome" aria-label="Username" aria-describedby="basic-addon1" onChange={this.myChangeHandler} />
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Segundo nome:</span>
                            <input type="text" name="lastName" class="form-control" placeholder="Segundo Nome" aria-label="Username" aria-describedby="basic-addon1" onChange={this.myChangeHandler} />
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Id-Card:</span>
                            <input type="text" name="companyId" class="form-control" placeholder="aaa111" aria-label="Username" aria-describedby="basic-addon1" onChange={this.myChangeHandler} />
                        </div>


                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Senha:</span>
                            <input type="password" name="sha256_password" class="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={this.myChangeHandler} />
                        </div>

                        <button type="submit" value="Submit" class="btn btn-success">Criar Usuário</button>

                    </form>
                    {error ? <div class="alert alert-danger" role="alert" >{error}</div> : ""}
                    <div>Já uma conta? <a href="/login">Login</a></div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </>)
    }
}


export default SignUp;