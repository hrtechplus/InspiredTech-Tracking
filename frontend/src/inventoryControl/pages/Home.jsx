import React, { useEffect, useState } from 'react'

// Components
import ItemDetailsDisplay from '../Components/itemDetailsDisplay'
import SlideBar from '../Components/SlideBar'
import { Container, Heading } from '@chakra-ui/react'

function Home() {
  // States
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
      <SlideBar />
      <Container>
        <Heading paddingTop='24px' paddingBottom='24px'>All Added Items</Heading>
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