// src/ProductosCreate.jsx
import React, { useState } from "react";
import {
  Box, Button, FormControl, FormLabel, Input, Heading, Textarea,
  Text, Flex, SimpleGrid, NumberInput, NumberInputField, useToast
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";

const ProductosCreate = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("El nombre (title) es obligatorio");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        // DummyJSON acepta campos extra; price opcional
        ...(price !== "" ? { price: Number(price) } : {}),
        ...(brand.trim() ? { brand: brand.trim() } : {}),
        ...(category.trim() ? { category: category.trim() } : {}),
        ...(description.trim() ? { description: description.trim() } : {}),
      };

      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("No se pudo crear el producto");
      await res.json(); // respuesta simulada

      toast({
        title: "Producto creado (simulado).",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/productos");
    } catch (e) {
      setError(e.message || "Error al crear el producto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Crear Producto</Heading>
        <Button as={Link} to="/productos" variant="outline">
          Volver
        </Button>
      </Flex>

      {error && <Text color="red.500" mb={4}>{error}</Text>}

      <Box as="form" onSubmit={handleSubmit} maxW="720px">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel>Nombre (title)</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: TESLA X"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Precio</FormLabel>
            <NumberInput min={0} value={price} onChange={(v) => setPrice(v)}>
              <NumberInputField placeholder="Ej: 999" />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Marca</FormLabel>
            <Input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Ej: Tesla"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Categoría</FormLabel>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ej: autos"
            />
          </FormControl>
        </SimpleGrid>

        <FormControl mt={4}>
          <FormLabel>Descripción</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalles del producto"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          mt={6}
          isLoading={saving}
          isDisabled={!title.trim()}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default ProductosCreate;
