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
  onDeleteClick: (id: string) => void;
}

const StudentItem: React.FC<StudentItemProps> = ({ student, onDeleteClick }) => {
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
        <button>Edit</button>
        <button onClick={() => onDeleteClick(student.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default StudentItem;
