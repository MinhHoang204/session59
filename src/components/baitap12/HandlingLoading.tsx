import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

interface Item {
  id: number;
  name: string;
}

const HandlingLoadding: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Item[]>('https://api.example.com/data');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
};

const handleAdd = async (newItem: Omit<Item, 'id'>) => {
    setLoading(true);
    try {
      const response = await axios.post<Item>('https://api.example.com/data', newItem);
      setData([...data, response.data]);
    } catch (error) {
      console.error("Error adding data:", error);
    } finally {
      setLoading(false);
    }
};

const handleEdit = async (id: number, updatedItem: Partial<Item>) => {
    setLoading(true);
    try {
      const response = await axios.put<Item>(`https://api.example.com/data/${id}`, updatedItem);
      setData(data.map(item => (item.id === id ? response.data : item)));
    } catch (error) {
      console.error("Error editing data:", error);
    } finally {
      setLoading(false);
    }
};

const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`https://api.example.com/data/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setLoading(false);
    }
};

return (
    <div className="App">
      {loading && <Loading />}
      {!loading && (
        <div>
          {data.map(item => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HandlingLoadding;