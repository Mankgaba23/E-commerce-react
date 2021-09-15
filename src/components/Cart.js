import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { db, auth } from '../Firebase';
import link from '@material-ui/core/link';
import { useHistory } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button, Grid, Typography, Paper, } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: '1',
        display: 'flex',
        flexdirectction: 'colum',
        width: '100%'
    },
    paper: {
        padding: theme.spacing(4),
        marginTop: 'auto',
        maxwidth: '50%',
        display: 'flex',
        flexDirectction: 'colum',
        marginBottom: 10,
        marginTop: 10

    },
    img: {
        width: '400px',
        height: '400px',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxwidth: '50%',
        maxHight: '50%',
        border: 'solid 2px red'
    }
}));
const Cart = () => {
    const classes = useStyles();
    let user = auth.currentUser
    const [cartList, setCartList] = useState([])

    const fetchCartItems = async () => {
        try {
            if (user) {
                const cartData = []
                const query = await db.collection("Cart").where("uid", "==", user?.uid).get()
                query.forEach((doc) => {
                    // console.log(doc.data());
                    cartData.push({ ...doc.data(), id: doc.id })
                })
                setCartList(cartData)
                console.log(cartList);
            } else {
                alert("please LogIn")
            }

        } catch (error) {
            //console.log(error, message);
        }
    }
    useEffect(() => {
        fetchCartItems()
    }, [])

    return (
        <div className={classes.root}>
            {cartList && cartList.map(CartItem => (
                <Paper>
                    <Grid>
                        <Grid item>
                            <ButtonBase className={classes.Image}>
                                <img className={classes.img} src={CartItem.product.ProductImage} />
                            </ButtonBase>
                        </Grid>
                        <Grid container xm={12}>
                            <Grid container xs item direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {CartItem.product.ProductName}
                                    </Typography>
                                    <Typography variant="body2">
                                        {CartItem.product.ProductDescription}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Button color="secondary">Remove</Button>

                        </Grid >
                        <Grid>
                            <Typography variant="subtitle1">
                                R{CartItem.product.ProductPrice}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper >
            ))
            }
        </div >
    );
};

export default Cart;