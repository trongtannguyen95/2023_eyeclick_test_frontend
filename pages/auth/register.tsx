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
import { register, getMe } from '../../utility/request';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
const Register: NextPage = () => {
    const router = useRouter()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const dispatch = useDispatch();
    const submit = async () => {
        try {
            const res = await register(userName, password, confirmPassword, name, email, phone, address)
            if (res.statusCode == 200) {
                const resGetMe = await getMe()
                if (resGetMe.statusCode == 200 && resGetMe.data) {
                    dispatch(setAuthState(true));
                    dispatch(setUserProfile(resGetMe.data));
                    router.push('/')
                }
            }
        } catch (err) {
        }

    }
    return (
        <Layout>
            <Container maxWidth="sm">
                <Head>
                    <title>Login </title>
                    <meta name="description" content="Register" />
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
                                <TextField fullWidth id="register-username" value={userName} onChange={(e) => { setUserName(e.target.value) }} label="User Name" variant="outlined" required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="register-name" value={name} onChange={(e) => { setName(e.target.value) }} label="Full Name" variant="outlined" required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="register-password" value={password} onChange={(e) => { setPassword(e.target.value) }} label="Password" variant="outlined" required type="password" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="register-confirmPassword" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} label="Confirm Password" variant="outlined" required type="password" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="register-email" value={email} onChange={(e) => { setEmail(e.target.value) }} label="Email" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="register-phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} label="Phone" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="register-address" value={address} onChange={(e) => { setAddress(e.target.value) }} label="Address" variant="outlined" />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" onClick={submit}>Submit</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" onClick={() => { router.push('/') }}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </main>
            </Container>
        </Layout>
    )
}

export default Register
