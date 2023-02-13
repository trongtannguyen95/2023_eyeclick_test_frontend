import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/layout';
import Divider from '@mui/material/Divider';
import styles from '../../styles/Home.module.css';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import React from 'react';
import { addItemToShoppingCart, selectShoppingCart, removeItemFromShoppingCart, deleteItemFromShoppingCart } from '../../store/authSlice';
const Home: NextPage = () => {
    const dispatch = useDispatch()
    const [shopItems, setShopItems] = useState([])
    const shoppingCart = useSelector(selectShoppingCart)
    const addItem = (item: any) => {
        dispatch(addItemToShoppingCart(item))
    }
    const removeItem = (item: any) => {
        dispatch(removeItemFromShoppingCart(item))
    }
    const deleteItem = (item: any) => {
        dispatch(deleteItemFromShoppingCart(item))
    }
    
    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>Shopping Cart</title>
                    <meta name="description" content="Shopping Cart" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <Box  >
                        <Typography sx={{ ml: 4 }} gutterBottom variant="h3" color={'primary.dark'} component="div">Shopping Cart</Typography>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={8}>
                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    {
                                        Object.keys(shoppingCart).map((key: any) => {
                                            const item = shoppingCart[key]
                                            return (
                                                <React.Fragment key={item._id}>
                                                    <ListItem alignItems="flex-start" secondaryAction={
                                                        <React.Fragment>
                                                            <IconButton onClick={() => { addItem(item) }} edge="end" aria-label="addItem">
                                                                <AddIcon  />
                                                            </IconButton>
                                                            <IconButton onClick={() => { removeItem(item) }}  sx={{ ml: 1 }} edge="end" aria-label="removeItem">
                                                                <RemoveIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => { deleteItem(item) }} sx={{ ml: 1 }} edge="end" aria-label="deleteItem">
                                                                <DeleteForeverIcon  />
                                                            </IconButton>
                                                        </React.Fragment>
                                                    }>
                                                        <ListItemAvatar>
                                                            <img style={{ 'width': '100%', height: '100px' }} src={item.image || "https://via.placeholder.com/400x400?text=No+Image"} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            sx={{ ml: 2, mt: 2 }}
                                                            primary={item.name}
                                                            secondary={
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="subtitle1"
                                                                    color="text.primary"
                                                                >
                                                                    {item.description}
                                                                </Typography>

                                                            }
                                                        />
                                                        <ListItemText
                                                            sx={{ ml: 2, mt: 2 }}
                                                            primary={'Price: ' + (Intl.NumberFormat('en-US').format(item.price) || '0') + 'đ'}
                                                            secondary={
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="subtitle1"
                                                                    color="text.primary"
                                                                >
                                                                    Total Price: {(Intl.NumberFormat('en-US').format(item.price) || '0') + 'đ'} X {item.amount} = {Intl.NumberFormat('en-US').format(item.price * item.amount) || '0'}đ
                                                                </Typography>

                                                            }
                                                        />

                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />

                                                </React.Fragment>


                                            )
                                        })
                                    }
                                </List>
                            </Grid>

                        </Grid>
                    </Box>
                </main>
            </div>
        </Layout >
    )
}
export default Home
