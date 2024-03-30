import React from 'react'
import { Link } from 'react-router-dom'

function SlideBar() {
  return (
    <div className='slide-bar-container'>
        <h1 className='in-panel-slide-name'><strong>Inventory Control<br />Panel</strong></h1>
        <div className="in-panel-slide-btn">
            <Link to='/inventoryPanel' className='inventory-panel-home-link'>Home</Link>
        </div>
        <div className="in-panel-slide-btn">
            <Link to='/inventoryPanel/addItems' className='inventory-panel-add-item-link'>Add Items</Link>
        </div>
    </div>
  )
}

export default SlideBar