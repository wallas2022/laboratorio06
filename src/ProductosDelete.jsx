// src/ProductosDelete.jsx
import React, { useEffect, useState } from "react";
import {
  Box, Button, Heading, Text, Spinner, Flex, Stack
} from "@chakra-ui/react";
import { useNavigate, useParams, Link } from "react-router-dom";

const ProductosDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setError("");
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el producto");
        const data = await res.json();
        setProd(data);
      } catch (e) {
        setError(e.message || "Error cargando producto");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("No se pudo eliminar (simulado)");
      await res.json();
      navigate("/productos");
    } catch (e) {
      setError(e.message || "Error al eliminar");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner ml={6} mt={6} />;

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Eliminar Producto #{id}</Heading>
        <Button as={Link} to="/productos" variant="outline">Cancelar</Button>
      </Flex>

      {error && <Text color="red.500" mb={4}>{error}</Text>}

      {prod ? (
        <Box borderWidth="1px" rounded="md" p={4} maxW="640px">
          <Stack spacing={2} mb={4}>
            <Text><b>Nombre:</b> {prod.title}</Text>
            {prod.price != null && <Text><b>Precio:</b> ${prod.price}</Text>}
            {prod.brand && <Text><b>Marca:</b> {prod.brand}</Text>}
            {prod.category && <Text><b>Categoría:</b> {prod.category}</Text>}
          </Stack>

          <Text mb={4} color="red.600">
            ¿Confirmas que deseas eliminar este producto? (Operación simulada)
          </Text>

          <Button colorScheme="red" onClick={handleDelete} isLoading={deleting}>
            Sí, eliminar
          </Button>
        </Box>
      ) : (
        <Text>No se encontró el producto.</Text>
      )}
    </Box>
  );
};

export default ProductosDelete;
