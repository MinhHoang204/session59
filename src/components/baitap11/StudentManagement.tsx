import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Student {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 10;

  useEffect(() => {
    axios.get('/api/students') 
      .then(response => {
        setStudents(response.data);
        setTotalPages(Math.ceil(response.data.length / recordsPerPage));
      })
      .catch(error => {
        console.error('There was an error fetching the students!', error);
      });
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newPage = Number(event.currentTarget.getAttribute('data-page'));
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2>Quản lý sinh viên</h2>
      <table>
        <thead>
          <tr>
            <th>Tên sinh viên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.address}</td>
              <td>{student.phone}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Hiển thị {currentRecords.length}/{students.length} bản ghi</p>
      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            data-page={index + 1}
            onClick={handleClick}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default StudentManagement;