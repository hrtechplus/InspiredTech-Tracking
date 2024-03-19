import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

function itemDetailsDisplay({ item }) {
  return (
    <div className="itemDetailsBox">
        <Box maxWidth='480px' marginBottom='30px'>
            <Heading size='sm'>Item ID : {item.itemID}</Heading>
            <Text fontSize='md'>Name : {item.itemName}</Text>
            <Text fontSize='md'>Brand : {item.itemBrand}</Text>
            <Text fontSize='md'>Price : Rs.{item.itemPrice}</Text>
            <Text fontSize='md'>Available Stocks : {item.stockCount}</Text>
            <Text fontSize='md'>Added Date : {item.createdAt}</Text>
        </Box>
    </div>
  )
}

export default itemDetailsDisplay