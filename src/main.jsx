import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Login from './Login.jsx';
import Home from './Home.jsx';
import Productos from './productos.jsx';
import ProductosEditar from './productosEditar.jsx';
import ProductosDelete from './ProductosDelete.jsx';  
import ProductosCreate from './ProductosCreate.jsx'; // Assuming you have a ProductosCreate component


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
           <Route path="/productos" element={<Productos />} />
          <Route path="/productos/create" element={<ProductosCreate />} />
          <Route path="/productos/:id" element={<ProductosEditar />} />
          <Route path="/productos/:id/edit" element={<ProductosEditar />} />
          <Route path="/productos/:id/delete" element={<ProductosDelete />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
