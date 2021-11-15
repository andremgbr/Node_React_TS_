import React from "react";
import Axios from "axios";

class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDest: [],
        };
    };

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }



    componentDidMount() {
        Axios.get("http://localhost:3333/api/users")
            .then(res => {
                //console.log(res.data)
                this.setState({
                    userDest: res.data
                })
            });
    }

    render() {
        const { userDest } = this.state;
        return (
            <>
                <label>
                    Para Usuáio:
                    <select name={"user_id_" + this.props.childCount}  onChange={this.myChangeHandler}>
                        {userDest.map(user => (
                            <option value={user.id}>{user.firstName}</option>
                        ))}
                    </select>
                </label >

            </>
        )
    }

}

export default AddUser