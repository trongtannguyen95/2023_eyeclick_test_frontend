import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import { selectSearch } from '../store/systemSlice';
import styles from '../styles/Home.module.css';
import { getShopItem } from '../utility/request';
import { useDispatch } from 'react-redux';
import { addItemToShoppingCart, selectShoppingCart } from '../store/authSlice';
import { setAlert, setAlertMessage } from '../store/systemSlice';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const [shopItems, setShopItems] = useState([])
  const searchState = useSelector(selectSearch)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const shoppingCart = useSelector(selectShoppingCart)
  const getShopItems = async () => {
    const res = await getShopItem(currentPage, { name: searchState })
    if (res.statusCode === 200) {
      let items = res.data?.list || []
      let total = res.data?.total || 0
      setShopItems(items)
      setTotalRecord(total)
    }
  }
  useEffect(() => {
    getShopItems()
  }, [])
  useEffect(() => {
    getShopItems()

  }, [searchState, currentPage])
  const addItem = (item: any) => {
    dispatch(addItemToShoppingCart(item))
    dispatch(setAlert(true))
    dispatch(setAlertMessage('Added item to cart!'))
  }
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart || '{}'))
  }, [shoppingCart])
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Online Shop</title>
          <meta name="description" content="Online Shop" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Box sx={{ width: '100%' }}>
            <Typography gutterBottom variant="h3" color={'primary.dark'} component="div">Items List</Typography>

            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {
                shopItems.map((item: any, i) => {
                  return (
                    <Grid item xs={4} key={item._id}>
                      <Box>
                        <Box sx={{ my: 3, mx: 2 }}>
                          <Grid container alignItems="center">
                            <Grid item xs>
                              <Typography gutterBottom variant="h4" component="div">
                                {item.name || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography gutterBottom variant="h6" color={'primary'} component="div">
                                {Intl.NumberFormat('en-US').format(item.price) || '0'}đ
                              </Typography>
                            </Grid>
                            <img style={{ 'width': '100%' }} src={item.image || "https://via.placeholder.com/400x400?text=No+Image"} />
                          </Grid>
                          <Typography color="text.secondary" variant="body1">
                            {item.description || 'N/A'}
                          </Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box sx={{ mt: 1, mr: 2, mb: 1 }} style={{ float: 'right' }}>
                          <Button onClick={() => { addItem(item) }}>Add to cart</Button>
                        </Box>
                      </Box>
                    </Grid>
                  )
                })
              }
              {
                (totalRecord > 9) && (
                  <Grid item xs={12} sx={{ mb: 3}}>
                    <Stack spacing={3} alignItems="center">
                      <Pagination style={{ float: 'right' }} color="primary" count={Math.ceil(totalRecord / 9)} onChange={handleChangePage} variant="outlined" />
                    </Stack>
                  </Grid>
                )
              }
            </Grid>
          </Box>
        </main>
      </div>
    </Layout >
  )
}
export default Home
