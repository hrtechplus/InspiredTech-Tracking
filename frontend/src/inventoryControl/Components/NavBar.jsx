import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <header>
        <div className='container'>
            <Link to='/inventoryPanel/addItems'>
                <h2>Add Items</h2>
            </Link>
        </div>
    </header>
  )
}

export default NavBar