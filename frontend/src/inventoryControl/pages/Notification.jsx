import { Container, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

// Components
import ItemNotification from '../Components/ItemNotification'
import SlideBar from '../Components/SlideBar'

function Notification() {
    // States
    const [items, setItems] = useState(null)

    // fetch items data from server
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/inventoryPanel')
            const json = await response.json()

            if (response.ok) {
                setItems(json)
            }
        }
        fetchItems()
    }, [])

    return (
        <>
            <SlideBar />
            <Container paddingTop='60px'>
                <Text fontSize='2xl' paddingBottom='60px'>These Items Reached To Stock Limit Value</Text>
                <div className="itemsNotificationSection">
                    {items && items.filter((item) => item.stockCount <= 3).map((item) => (
                        <ItemNotification key={item.itemID} item={item} />
                    ))}
                </div>
            </Container>
        </>
    )
}

export default Notification