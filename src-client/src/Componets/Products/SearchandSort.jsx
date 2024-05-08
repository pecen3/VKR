import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { Stack, Form, Button } from 'react-bootstrap';

const SearchAndSort = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories/`);
        const options = response.data.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        setCategories(options);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (options) => {
    setSelectedCategories(options);
    updateParams({ category: options.map((option) => option.value) });
  };

  const handleSearch = () => {
    updateParams({ search: searchTerm });
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    updateParams({ search: null, category: null });
  };

  const updateParams = (newParams) => {
    const params = new URLSearchParams(window.location.search);
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] === null) {
        params.delete(key);
      } else {
        params.set(key, Array.isArray(newParams[key]) ? newParams[key].join(',') : newParams[key]);
      }
    });
    navigate(`?${params.toString()}`);
  };

  return (
    <Stack gap={3}>
      <Stack direction="horizontal" gap={2}>
        <Form.Control
          type="search"
          placeholder="Введите название товара"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Поиск
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Очистить
        </Button>
      </Stack>
      <Stack direction="horizontal" gap={2}>
        <Select
          isMulti
          options={categories}
          onChange={handleCategoryChange}
          value={selectedCategories}
          placeholder="Категории"
        />
      </Stack>
    </Stack>
  );
};

export default SearchAndSort;