import React, { useEffect, useState } from 'react';
import { db, auth } from '../Firebase';
import { useHistory } from 'react-router-dom';
import Cart from './Cart';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    img: {
        width: '400px',
        height: '400px',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxwidth: '300px',
        maxHight: '50',
        border: 'solid 2px red'
    }
}));

const Shop = () => {
    const classes = useStyles();
    const [products, setProduct] = useState([])
    let history = useHistory();
    let user = auth.currentUser

    const fetchProducts = async () => {
        db.collection('Products').onSnapshot((Snapshot) => {
            const ProdData = [];
            Snapshot.forEach((doc) => {
                ProdData.push({ ...doc.data(), id: doc.id })
            });
            console.log(products);
            setProduct(ProdData);

        });
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const addToCart = async (product) => {
        // console.log(product);

        try {
            if (user) {
                db.collection("Cart").add({
                    uid:user.uid,
                    product
                }).then(
                    alert("Iterm Added To Cart")
                ).catch((error )=>{
                    console.log(error.message)
                })

            } else {
                alert("please LogIn")
            }
        } catch (error) {
            console.log(Error.message);
        }
    }
    return (
        <div className="prices">
            <div className=" container">
                <div className="row">
                    {products && products.map(product => (
                        <div key={product.id} className="col-4">
                            <div className="price">
                                <div className="product_image">
                                    <img src={product.ProductImage} />
                                </div>
                                <h1 className="price_heading"> {product.ProductName} </h1>
                                <p className="price_text"> {product.ProductDescription}</p>
                                <p className="price_rs">R{product.ProductPrice}</p>
                                <button onClick={() => addToCart(product)} className="button_price">Add To Cart</button>
                            </div>
                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
};

export default Shop;