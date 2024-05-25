import React from 'react'
import Header from './Header'
import { Toaster } from 'react-hot-toast';


const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ minHeight: "80vh" }}> <Toaster /> {children} </main>
        </>
    )
}
export default Layout;