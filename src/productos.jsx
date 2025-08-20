// src/Productos.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Button, Flex, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text,
  Input, InputGroup, InputRightElement, IconButton, Select, HStack, Spacer, Badge
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // UI state
  const [query, setQuery] = useState("");
  const [debouncedQ, setDebouncedQ] = useState(""); // debounce para la búsqueda
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const pages = useMemo(() => Math.max(1, Math.ceil(total / limit || 1)), [total, limit]);
  const skip = useMemo(() => (page - 1) * limit, [page, limit]);

  // Debounce de la búsqueda
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);          // al cambiar búsqueda, volver a página 1
      setDebouncedQ(query.trim());
    }, 400);
    return () => clearTimeout(t);
  }, [query]);

  const fetchProductos = async () => {
    setLoading(true);
    setError("");
    try {
      const base = "https://dummyjson.com";
      const url = debouncedQ
        ? `${base}/products/search?q=${encodeURIComponent(debouncedQ)}&limit=${limit}&skip=${skip}`
        : `${base}/products?limit=${limit}&skip=${skip}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("No se pudieron cargar los productos");
      const data = await res.json();

      // DummyJSON retorna { products, total, skip, limit }
      setProductos(data.products || []);
      setTotal(Number(data.total ?? 0));
    } catch (err) {
      setError(err.message || "Error al cargar productos");
      setProductos([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, page, limit]);

  const canPrev = page > 1;
  const canNext = page < pages;

  const resetSearch = () => {
    setQuery("");
    setDebouncedQ("");
    setPage(1);
  };

  return (
    <Box p={6}>
      <Flex direction={{ base: "column", md: "row" }} gap={3} align={{ md: "center" }} mb={4}>
        <Heading size="lg">Productos</Heading>
        <Spacer />
        <HStack spacing={3}>
          <Button as={Link} to="/home" variant="outline">Volver a Home</Button>
          <Button as={Link} to="/productos/create" colorScheme="blue">Crear Producto</Button>
        </HStack>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} gap={3} mb={4} align={{ md: "center" }}>
        <InputGroup maxW="420px">
          <Input
            placeholder="Buscar por título (DummyJSON)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputRightElement>
            {query ? (
              <IconButton
                aria-label="Limpiar búsqueda"
                size="sm"
                variant="ghost"
                icon={<CloseIcon boxSize={2.5} />}
                onClick={resetSearch}
              />
            ) : (
              <SearchIcon opacity={0.6} />
            )}
          </InputRightElement>
        </InputGroup>

        <HStack>
          <Text>Por página:</Text>
          <Select
            value={limit}
            onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
            width="90px"
          >
            {[5,10,15,20].map(n => <option key={n} value={n}>{n}</option>)}
          </Select>
        </HStack>

        <Spacer />

        <HStack>
          <Badge colorScheme="purple">Total: {total}</Badge>
          <Badge colorScheme="teal">Página {page} de {pages}</Badge>
          <Button onClick={() => setPage(p => p - 1)} isDisabled={!canPrev}>Anterior</Button>
          <Button onClick={() => setPage(p => p + 1)} isDisabled={!canNext}>Siguiente</Button>
        </HStack>
      </Flex>

      {loading && <Spinner />}
      {error && <Text color="red.500" mb={3}>{error}</Text>}
      {!loading && !error && productos.length === 0 && (
        <Text>No hay productos para mostrar.</Text>
      )}

      {productos.length > 0 && (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th isNumeric>Precio</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productos.map((p) => (
              <Tr key={p.id}>
                <Td>{p.id}</Td>
                <Td>{p.title}</Td>
                <Td isNumeric>{p.price != null ? `$${p.price}` : "-"}</Td>
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
