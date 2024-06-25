import React from 'react'
import { Outlet } from 'react-router'
import { Header, Footer } from "../../components"

const LandingPageLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default LandingPageLayout