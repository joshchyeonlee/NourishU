import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSignIn } from 'react-auth-kit';

const Login = () => {
    // const signIn = useSignIn();

    // implement this like in client/Login.js
    // const authenticate = () => {
    //     signIn({
    //         token: res.data.token,
    //         expiresIn: 3600,
    //         tokenType: "Bearer",
    //         authState: {values: {email: cred.Email, userID: userID}},
    //     })
    // }

    return(<div>
        <Button component={Link} to={{pathname:"/admin"}}>Sign in</Button>
    </div>)
}

export default Login;