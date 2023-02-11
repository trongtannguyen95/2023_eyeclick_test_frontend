import React from 'react';
import Navbar from './navBar';

export default function Layout(props: any) {
    return (
        <div>
            <Navbar />
            {
                props.children
            }
        </div>
    )
}