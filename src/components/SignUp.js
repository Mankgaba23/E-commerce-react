import React from 'react';
import { Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import { db, auth } from '../Firebase';
import SignIn from './SignIn';
import link from '@material-ui/core/link';
import { useHistory } from 'react-router-dom';

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
const SignUp = () => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors} } = useForm();
    let history = useHistory();
    const onSubmit = async (data) => {
        const { name, email, password, contact } = data
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password).then(user=>{
                console.log(user.user);
                alert("Thank you for signing up")
               history.push("/Shop")              
            }           
            ).then(
                //console.log("profile set!")
                history.push("/Shop")
            ).catch((error) => {
                console.log(error.message)
            }
            )

        } catch (error) {
            console.error(error);
            alert(error.message)
        }
    }
    function SignIn() {
        history.push("/SignIn")
    }

    return (
        <Container maxWidth="sm">
            <div>
                <h1>SignUp</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    <TextField
                        id="standard-basic"
                        label="Name"
                        name="Name"
                        required
                        fullWidth
                        autoFocus
                        {...register("name", { required: { value: true, message: "please enter your name" } })}
                    />
                    {errors.name && <p>{errors.name.message}</p>}

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

                    <TextField
                        id="standard-basic"
                        label="Contact"
                        name="Contact"
                        required
                        autoFocus
                        fullWidth
                        {...register("contact", { required: { value: true, message: "please enter your contact" } })}
                    />
                    {errors.contact && <p>{errors.contact.message}</p>}
                    <Button type="submit" className={classes.root}> SignUp</Button>
                    <Link href="#" onClick={() => SignIn()}>
                        Have an account?SignIn
                    </Link>
                </form>


            </div>
        </Container>

    );
};

export default SignUp;