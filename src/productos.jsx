// src/Productos.jsx
import React, { useEffect, useState } from "react";
import {
  Box, Button, Flex, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProductos = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://dummyjson.com/products?limit=10");
      if (!res.ok) throw new Error("No se pudieron cargar los productos");
      const data = await res.json();
      setProductos(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <Box p={6}>
      <Flex justify="space-between" mb={4} align="center">
        <Heading size="lg">Productos</Heading>
        <Flex gap={2}>
          <Button as={Link} to="/home" variant="outline">
            Volver a Home
          </Button>
          <Button as={Link} to="/productos/create" colorScheme="blue">
            Crear Producto
          </Button>
        </Flex>
      </Flex>

      {loading && <Spinner />}
      {error && <Text color="red.500">{error}</Text>}

      {productos.length > 0 && (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Precio</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productos.map((p) => (
              <Tr key={p.id}>
                <Td>{p.id}</Td>
                <Td>{p.title}</Td>
                <Td>${p.price}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`/productos/${p.id}/edit`}
                    size="sm"
                    mr={2}
                    colorScheme="yellow"
                  >
                    Editar
                  </Button>
                  <Button
                    as={Link}
                    to={`/productos/${p.id}/delete`}
                    size="sm"
                    colorScheme="red"
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Productos;
