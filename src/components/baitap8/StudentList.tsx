import React, { useState, useEffect } from 'react';
import StudentTable from './StudentTable';
import DeleteModal from './DeleteModal';
import axios from 'axios';
import './StudentList.css';

interface Student {
  id: string;
  student_name: string;
  email: string;
  address: string;
  phone: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  useEffect(() => {
    const getAllStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    getAllStudents();
  }, []);

  const handleDeleteClick = (studentId: string) => {
    setStudentToDelete(studentId);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setStudentToDelete(null);
  };

  const handleConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/students/${studentToDelete}`);
      setStudents(students.filter(student => student.id !== studentToDelete));
      setShowModal(false);
      setStudentToDelete(null);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h1>Quản lý sinh viên</h1>
      <button>Thêm mới sinh viên</button>
      <StudentTable students={students} onDeleteClick={handleDeleteClick} />
      <DeleteModal 
        show={showModal} 
        studentId={studentToDelete} 
        onCancel={handleCancel} 
        onConfirm={handleConfirm} 
      />
    </div>
  );
}

export default StudentList;