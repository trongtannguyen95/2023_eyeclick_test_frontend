import Grid from '@mui/material/Grid';

import Navbar from './navBar';
import { useDispatch } from 'react-redux';
import { setShoppingCart, selectShoppingCart } from '../../store/authSlice';
import { selectAlert, selectAlertMessage, setAlert } from '../../store/systemSlice';
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

import { useSelector } from 'react-redux';
export default function Layout(props: any) {
    const dispatch = useDispatch()

    const alertMessage = useSelector(selectAlertMessage)
    const alert = useSelector(selectAlert)
    const shoppingCartState = useSelector(selectShoppingCart)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const shoppingCart = localStorage.getItem('shoppingCart') || '{}'
        dispatch(setShoppingCart(JSON.parse(shoppingCart)))
        setTimeout(() => {
            setLoading(false)
        }, 200)
    }, [])
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartState || '{}'))
        }
    }, [shoppingCartState])
    return (
        <div>
            <Navbar />
            <Snackbar
                open={alert}
                autoHideDuration={3000}
                message={alertMessage}
                onClose={() => { dispatch(setAlert(false)) }}
            />
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ marginTop: '30px' }}>
                    {
                        props.children
                    }
                </Grid>
            </Grid>

        </div>
    )
}