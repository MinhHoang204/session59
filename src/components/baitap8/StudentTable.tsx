import React from 'react';
import StudentItem from './StudentItem';

interface Student {
  id: string;
  student_name: string;
  email: string;
  address: string;
  phone: string;
}

interface StudentTableProps {
  students: Student[];
  onDeleteClick: (id: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onDeleteClick }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Tên sinh viên</th>
          <th>Email</th>
          <th>Địa chỉ</th>
          <th>Số điện thoại</th>
          <th>Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <StudentItem key={student.id} student={student} onDeleteClick={onDeleteClick} />
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;