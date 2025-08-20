// src/Login.jsx
import React, { useState } from 'react';
import {
  Box, Button, Flex, FormControl, FormLabel, Input,
  Heading, Text, Image, VStack
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
        body: JSON.stringify({ username, password, expiresInMins: 30 })
      });

      if (!r.ok) {
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

      localStorage.setItem('token', accessToken);

      // Validar token
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
        textAlign="center"
      >
        <VStack spacing={4} mb={6}>
          {/* 🔹 Logo UMG (puedes reemplazar por tu archivo local en /assets) */}
          <Image
            src="https://play-lh.googleusercontent.com/PAgEDMao5gLi5N-9x-EdPIihJHe0CRqscma-BQPunQoV887HW58Wi8ccdAtU2UwBnwo=w480-h960-rw"
            alt="Logo UMG"
            boxSize="80px"
            objectFit="contain"
          />
          <Heading size="md">Laboratorio 05 – APIs DummyJSON</Heading>
        </VStack>

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

        {error && <Text color="red.500" mb={4}>{error}</Text>}

        <Button type="submit" w="full" colorScheme="blue" isLoading={loading}>
          Entrar
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
