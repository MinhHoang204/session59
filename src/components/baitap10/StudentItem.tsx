import React from 'react';

interface Student {
  id: string;
  student_name: string;
  email: string;
  address: string;
  phone: string;
}

interface StudentItemProps {
  student: Student;
  onDeleteClick: (student: Student) => void;
  onEditClick: (student: Student) => void;
}

const StudentItem: React.FC<StudentItemProps> = ({ student, onDeleteClick, onEditClick }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{student.student_name}</td>
      <td>{student.email}</td>
      <td>{student.address}</td>
      <td>{student.phone}</td>
      <td>
        <button onClick={() => onEditClick(student)}>Edit</button>
        <button onClick={() => onDeleteClick(student)}>Delete</button>
      </td>
    </tr>
  );
};

export default StudentItem;
