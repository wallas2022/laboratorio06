import React from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';

const Home = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box bg="white" p={6} rounded="xl" shadow="md">
        <Heading mb={2} textAlign="center">Bienvenido!</Heading>
        <Text textAlign="center">Has iniciado sesión correctamente ✅</Text>
      </Box>
    </Flex>
  );
};

export default Home;
