import {connect} from "react-redux";
import {Login} from "./Login";

function LoginContainer(props) {
    return (
        <div>
            <Login></Login>
        </div>
    );
}

let mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(LoginContainer)