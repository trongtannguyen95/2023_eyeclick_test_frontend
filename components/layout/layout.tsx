import React from 'react';
import Navbar from './navBar';
import Grid from '@mui/material/Grid';

export default function Layout(props: any) {

    return (
        <div>
            <Navbar />
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ marginTop: '30px'}}>
                    {
                        props.children
                    }
                </Grid>
            </Grid>

        </div>
    )
}