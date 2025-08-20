// src/ProductosEdit.jsx
import React, { useEffect, useState } from "react";
import {
  Box, Button, FormControl, FormLabel, Input, Heading, Text, Spinner, Flex
} from "@chakra-ui/react";
import { useNavigate, useParams, Link } from "react-router-dom";

const ProductosEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Cargar datos actuales
  useEffect(() => {
    const load = async () => {
      setError("");
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el producto");
        const data = await res.json();
        setTitle(data.title ?? "");
        setPrice(data.price ?? "");
      } catch (e) {
        setError(e.message || "Error cargando producto");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price: price === "" ? undefined : Number(price),
        }),
      });
      if (!res.ok) throw new Error("No se pudo actualizar el producto");
      await res.json();
      navigate("/productos");
    } catch (e) {
      setError(e.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner ml={6} mt={6} />;

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Editar Producto #{id}</Heading>
        <Button as={Link} to="/productos" variant="outline">Volver</Button>
      </Flex>

      {error && <Text color="red.500" mb={4}>{error}</Text>}

      <Box as="form" onSubmit={handleSubmit} maxW="520px">
        <FormControl mb={4} isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Precio</FormLabel>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ej: 999"
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" isLoading={saving}>
          Guardar cambios
        </Button>
      </Box>
    </Box>
  );
};

export default ProductosEditar;
