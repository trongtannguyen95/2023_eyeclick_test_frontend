import type { NextPage } from 'next'
import React from 'react';
import Head from 'next/head'
import { selectAuthState, setAuthState, setUserProfile } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../store/store";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Layout from '../../components/layout/layout';
import { auth, getMe } from '../../utility/request';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
const Login: NextPage = () => {
    const router = useRouter()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const login = async () => {
        try {
            const res = await auth(userName, password)
            if (res.statusCode == 200) {
                const resGetMe = await getMe()
                if (resGetMe.statusCode == 200 && resGetMe.data) {
                    dispatch(setAuthState(true));
                    dispatch(setUserProfile(resGetMe.data));
                    router.push('/')
                }
            }
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <Layout>
            <Container maxWidth="sm">
                <Head>
                    <title>Login </title>
                    <meta name="description" content="Login" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <Box
                        component="form"
                        noValidate
                        sx={{ flexGrow: 1, backgroundColor: '#eaeaea', padding: '30px', borderRadius: '5px' }}
                    >
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField fullWidth id="login-user" value={userName} onChange={(e) => { setUserName(e.target.value) }} label="User Name" variant="outlined" required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="login-password" value={password} onChange={(e) => { setPassword(e.target.value) }} label="Password" variant="outlined" required type="password" />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" onClick={login}>Login</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" onClick={()=>{router.push('/auth/register')}}>Register</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </main>
            </Container>
        </Layout>
    )
}

export default Login
