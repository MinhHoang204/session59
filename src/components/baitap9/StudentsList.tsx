import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentTable from '../baitap8/StudentTable';
import DeleteModal from '../baitap8/DeleteModal';
import NewStudentForm from './NewStudentForm';

interface Student {
  id: string;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: Date;
}

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedStudent) {
      try {
        await axios.delete(`http://localhost:3000/students/${selectedStudent.id}`);
        setStudents(students.filter((s) => s.id !== selectedStudent.id));
        setIsDeleteModalOpen(false);
        setSelectedStudent(null);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleAddClick = () => {
    setIsAddFormOpen(true);
  };

  const handleAddStudent = (newStudent: Student) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div>
      <h1>Quản lý sinh viên</h1>
      <button onClick={handleAddClick}>Thêm mới sinh viên</button>
      <StudentTable students={students} onDeleteClick={handleDeleteClick} />
      {isDeleteModalOpen && selectedStudent && (
        <DeleteModal
          show={isDeleteModalOpen}
          studentId={selectedStudent.id}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {isAddFormOpen && (
        <NewStudentForm
          onClose={() => setIsAddFormOpen(false)}
          onStudentAdded={handleAddStudent}
        />
      )}
    </div>
  );
}

export default StudentsList;