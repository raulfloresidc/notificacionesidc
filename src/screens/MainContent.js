import React from 'react'
import { Box } from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom'
function MainContent() {
  return (
    <Box >
        <Outlet />
    </Box>
  )
}

export default MainContent