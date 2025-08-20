// src/Home.jsx
import React from 'react';
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // borrar token
    navigate('/'); // redirigir a login
  };

  return (
    <Box p={8}>
      <Heading mb={4}>Home</Heading>
      <Text mb={4}>Token presente: {token ? 'Sí' : 'No'}</Text>

      <Flex gap={4}>
        <Button onClick={handleLogout} colorScheme="red">
          Cerrar sesión
        </Button>

        <Button as={Link} to="/productos" colorScheme="blue">
          Ir a Productos
        </Button>
      </Flex>
    </Box>
  );
};

export default Home;
