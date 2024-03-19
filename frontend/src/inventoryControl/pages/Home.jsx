import React, { useEffect, useState } from 'react'

// Components
import NavBar from '../Components/NavBar' //this is test purpose navbar
import ItemDetailsDisplay from '../Components/itemDetailsDisplay'
import { Container } from '@chakra-ui/react'

function Home() {
  const [items, setItems] = useState(null)

  // fetch items data from server
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/inventoryPanel')
      const json = await response.json()

      if(response.ok) {
        setItems(json)
      }
    }
    fetchItems()
  }, [])

  return (
    <>
      <NavBar />
      <h1>You're now in Inventory Control Panel</h1>
      <br />
      
      <Container>
        <div className="itemsDetailsSection">
          {items && items.map((item) => (
            <ItemDetailsDisplay key={item.itemID} item={item} /> //ItemDetailsDisplay component
          ))}
        </div>
      </Container>
    </>
  )
}

export default Home