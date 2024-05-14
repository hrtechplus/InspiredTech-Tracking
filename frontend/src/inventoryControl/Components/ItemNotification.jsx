import React from 'react'
import { Box, Heading, Text, Image, Stack } from '@chakra-ui/react'

function itemNotification({ item }) {
    return (
        <div className="itemDetailsBox">
            <Box maxWidth='680px' marginBottom='30px'>
                <Stack direction='row'>
                    <div className='img-box'>
                        <Image
                            src={`${item.imgURL}`}
                            boxSize='100px'
                            objectFit='cover'
                        />
                    </div>

                    <div className='item-detail-box'>
                        <Heading size='sm'>Item ID : {item.itemID}</Heading>
                        <Text fontSize='md'>Name : {item.itemName}</Text>
                        <Text fontSize='md' color='red'>Available Stocks : {item.stockCount}</Text>
                        <Text fontSize='md'>Notify Supplier Manager!</Text>
                    </div>
                </Stack>
            </Box>
        </div>
    )
}

export default itemNotification