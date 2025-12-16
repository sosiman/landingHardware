// src/components/ToolsSearch.jsx
// Componente React con búsqueda client-side usando Fuse.js

import React, { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';

const ToolsSearch = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // URL de tu API Gateway (reemplazar después de desplegar)
  const API_URL = 'https://TU-API-GATEWAY-ID.execute-api.us-east-1.amazonaws.com/prod';

  // Cargar herramientas al montar componente
  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tools`);
      const data = await response.json();
      
      if (data.success) {
        setTools(data.tools);
      } else {
        setError('Error cargando herramientas');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Configuración de Fuse.js para búsqueda fuzzy
  const fuse = useMemo(() => {
    const options = {
      keys: ['name', 'desc', 'category', 'url'],
      threshold: 0.3, // 0 = exacto, 1 = cualquier cosa
      includeScore: true,
      minMatchCharLength: 2
    };
    return new Fuse(tools, options);
  }, [tools]);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = [...new Set(tools.map(t => t.category))].sort();
    return ['all', ...cats];
  }, [tools]);

  // Filtrar herramientas
  const filteredTools = useMemo(() => {
    let result = tools;

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      result = result.filter(t => t.category === selectedCategory);
    }

    // Búsqueda fuzzy
    if (searchQuery.trim().length >= 2) {
      const fuseResults = fuse.search(searchQuery);
      const fuseToolIds = new Set(fuseResults.map(r => r.item.id));
      result = result.filter(t => fuseToolIds.has(t.id));
    }

    return result;
  }, [tools, searchQuery, selectedCategory, fuse]);

  // Estadísticas
  const stats = useMemo(() => ({
    total: tools.length,
    filtered: filteredTools.length,
    categories: categories.length - 1
  }), [tools, filteredTools, categories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Base de Datos de Herramientas
        </h1>
        <p className="text-gray-600">
          {stats.total} herramientas · {stats.categories} categorías
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar herramientas... (ej: API, design, video)"
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filtro de categorías */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-4 text-gray-600">
        Mostrando {filteredTools.length} de {stats.total} herramientas
      </div>

      {/* Grid de herramientas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTools.map(tool => (
          <a
            key={tool.id}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow hover:border-blue-500"
          >
            <div className="flex flex-col h-full">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {tool.name}
              </h3>
              
              {tool.desc && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                  {tool.desc}
                </p>
              )}
              
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {tool.category}
                </span>
                <span className="text-gray-400">{tool.source}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Sin resultados */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron herramientas
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 text-blue-500 hover:text-blue-700"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default ToolsSearch;
