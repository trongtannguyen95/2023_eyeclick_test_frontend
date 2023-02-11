import type { NextPage } from 'next'
import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { selectAuthState, setAuthState } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../store/store";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Layout from '../../components/layout/layout';
const Login: NextPage = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
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
                    >
                        <TextField fullWidth id="login-user" value={userName} onChange={(e) => { setUserName(e.target.value) }} label="User Name" variant="outlined" required />
                        <TextField fullWidth id="login-password" value={password} onChange={(e) => { setPassword(e.target.value) }} label="Password" variant="outlined" required type="password" />
                    </Box>
                </main>
            </Container>
        </Layout>
    )
}
export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            // we can set the initial state from here
            await store.dispatch(setAuthState(false));

            console.log("State on server", store.getState());

            return {
                props: {
                    authState: false,
                },
            };
        }
);

export default Login
