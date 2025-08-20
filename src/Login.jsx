// src/Login.jsx
import React, { useState } from 'react';
import {
  Box, Button, Flex, FormControl, FormLabel, Input, Heading, Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('emilys');      // demo
  const [password, setPassword] = useState('emilyspass');  // demo
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
     const r = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
        
      });

      // Si el preflight fallara, muchas veces r.ok es false o ni llega acá.
      if (!r.ok) {
        // Intenta leer detalle de error si lo hay
        let msg = 'Error de autenticación';
        try {
          const err = await r.json();
          msg = err?.message || msg;
        } catch (_) {}
        throw new Error(msg);
      }

      const data = await r.json();
      const { accessToken } = data || {};
      if (!accessToken) throw new Error('No se recibió accessToken');

      // Guarda el token (ejemplo sencillo en localStorage)
      localStorage.setItem('token', accessToken);

      // Opcional: comprobar /auth/me con el Bearer
      const me = await fetch('https://dummyjson.com/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!me.ok) throw new Error('No se pudo cargar el perfil');

      navigate('/home');
    } catch (err) {
      setError(err.message || 'Hubo un problema al iniciar sesión');
    } finally {
      setLoading(false);
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
        minW={{ base: '90%', sm: '400px' }}
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

        {error && <Text color="red.500" mb={4} textAlign="center">{error}</Text>}

        <Button type="submit" w="full" colorScheme="blue" isLoading={loading}>
          Entrar
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
