import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SellerMenu() {
    return (
        <><div className='text-center'>
            <div className="list-group dashboard-menu">
                <h3>Seller</h3>
                <NavLink to="/dashboard/seller/create-property" className="list-group-item list-group-item-action">Create Property</NavLink>
                <NavLink to="/dashboard/seller/properties" className="list-group-item list-group-item-action">Properties</NavLink>
            </div>
        </div>
        </>
    )
}
