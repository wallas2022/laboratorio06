// src/Login.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      await response.json();
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        as="form"
        onSubmit={handleSubmit}
        bg="white"
        p={8}
        rounded="xl"
        shadow="md"
        minW={{ base: "90%", sm: "400px" }}
      >
        <Heading mb={6} textAlign="center">Iniciar Sesión</Heading>

        <FormControl mb={4}>
          <FormLabel>Usuario</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="usuario"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="contraseña"
          />
        </FormControl>

        {error && (
          <Text color="red.500" mb={4} textAlign="center">{error}</Text>
        )}

        <Button type="submit" w="full" colorScheme="blue">
          Entrar
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
