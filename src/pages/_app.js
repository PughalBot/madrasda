import '@/styles/globals.css'
import {UserContext} from "../../context/context";
import {useEffect, useState} from "react";
import {isTokenValid} from "@/utils/JWTVerifier";
import axios from "axios";
import {createTheme} from '@nextui-org/react'
import {useRouter} from 'next/router';

const theme = createTheme({
    type: 'dark', theme: {
        fonts: {
            // algeria: 'Algeria Sans',
            algeria: 'Montserrat',
        },
    },
})

function Loading() {
    const router = useRouter();
}

export default function App({Component, pageProps}) {
    const [cart, setCart] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [token, setToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        const jwtToken = localStorage.getItem("token")
        if (jwtToken === undefined || isTokenValid(jwtToken)) {
            setToken(jwtToken)
            axios.get("http://localhost:8080/api/cart/", {
                headers: {
                    "Authorization": "Bearer " + jwtToken
                }
            })
                .then(response => {
                    setCart(response.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, []);
    const decrementQty = (id) => {
        let qty;
        setCart(oldCart => {
            let newCart = []
            for (let item of oldCart.cartItems) {
                if (item.id === id) {
                    if (item.quantity <= 1) continue;
                    qty = --item.quantity;
                    newCart.push(item);
                }
            }

            return {
                ...oldCart, cartItems: newCart
            };
        })
        axios.put("http://localhost:8080/api/cart/changeQuantity/" + id + "&&" + qty, null, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .catch(err => console.log(err));
    }
    const incrementQty = (id) => {
        let qty;
        setCart(oldCart => {
            return {
                ...oldCart, cartItems: oldCart.cartItems.map(item => {
                    if (item.id === id) {
                        qty = ++item.quantity
                    }
                    return item;
                })
            };
        })
        axios.put("http://localhost:8080/api/cart/changeQuantity/" + id + "&&" + qty, null, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .catch(err => console.log(err));
    }
    const customQuantity = (id, qty) => {
        setCart(oldCart => {
            const newCart = oldCart.cartItems.map(item => {
                if (item.id === id) {
                    if (item.quantity <= 1 && item.quantity > 65535) return;
                    item.quantity = qty;
                }
                return item;
            });
            return {...oldCart, cartItems: [...newCart]};
        })
        axios.put("http://localhost:8080/api/cart/changeQuantity/" + id + "&&" + qty, {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .catch(err => console.log(err));
    }
    const removeItem = (id) => {
        setCart(oldCart => {
            return {
                ...oldCart, cartItems: oldCart.cartItems.filter(item => item.id !== id)
            }
        })
        axios.put("http://localhost:8080/api/cart/changeQuantity/" + id + "&&0", {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .catch(err => console.log(err));
    }
    const addToCart = (product) => {
        if (isTokenValid(token)) {
            const cartItem = {
                "id": product.id,
                "colors": product.colors,
                quantity: product.quantity
            }
            console.log(cartItem)
            axios.post("http://localhost:8080/api/cart/addToCart", cartItem, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
        } else {
            router.push("/login")
        }
    }

    return (<>
            <Loading/>
            <UserContext.Provider value={{
                decrementQty: decrementQty,
                incrementQty: incrementQty,
                customQuantity: customQuantity,
                removeItem: removeItem,
                addToCart: addToCart,
                cart: cart
            }}>
                <Component {...pageProps} id="page"/>
            </UserContext.Provider>
        </>

    )
}
