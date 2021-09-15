import { blue, blueGrey } from '@material-ui/core/colors';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import { db, auth } from '../Firebase';
import link from '@material-ui/core/link';
import { useHistory } from 'react-router-dom';
import { Button, Link } from '@material-ui/core';
import SignUp from './SignUp';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    p: {
        color: 'red'
    }
});
const SignIn = () => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm()
    let history = useHistory();
    const onSubmit = async (data) => {
        const { email, password } = data
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password).then(() => {
                alert("welcom back")
                history.push("/Shop")
                console.log(res)
            })
            const user = res.user;
            db.collection('users').doc(user.uid).set({
                uid: user.uid,
                password,
                email,
            }
            ).then(
                history.push("/Shop")
            ).catch((error) => {
                console.error(error.message)
            }
            )

        } catch (error) {
            alert(error.message)
        }
    }
    function SignUp() {
        history.push("/SignUp")
    }

    return (
        <Container maxWidth="sm">
            <h1>SignIn</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    id="standard-basic"
                    label="Email"
                    required
                    autoFocus
                    fullWidth
                    {...register("email", { required: { value: true, message: "please enter your email" } })}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <TextField
                    id="standard-basic"
                    label="Password"
                    required
                    autoFocus
                    fullWidth
                    type="password"
                    {...register("password", { required: { value: true, message: "please enter your password" } })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <Button type="submit" className={classes.root}> LOGIN</Button>
                <Link href="#" onClick={() => SignUp()}>
                    Dont have an account?SignUp
                </Link>
            </form>
        </Container>
    );
};

export default SignIn;