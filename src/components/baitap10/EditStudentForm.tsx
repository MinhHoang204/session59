import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

interface EditStudentFormProps {
  student: Student;
  onClose: () => void;
  onStudentUpdated: (updatedStudent: Student) => void;
}

interface Student {
  id: string;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: Date;
}

interface Errors {
  student_name?: string;
  email?: string;
  phone?: string;
}

const EditStudentForm: React.FC<EditStudentFormProps> = ({ student, onClose, onStudentUpdated }) => {
  const [updatedStudent, setUpdatedStudent] = useState<Student>(student);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setUpdatedStudent(student);
  }, [student]);

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!updatedStudent.student_name) newErrors.student_name = 'Tên sinh viên không được để trống';
    if (!updatedStudent.email) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(updatedStudent.email)) {
      newErrors.email = 'Email không đúng định dạng';
    }
    if (!updatedStudent.phone) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^\d+$/.test(updatedStudent.phone)) {
      newErrors.phone = 'Số điện thoại chỉ được phép nhập số';
    }
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/students/${updatedStudent.id}`, updatedStudent);
      onStudentUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sửa thông tin sinh viên</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Tên sinh viên</label>
            <input
              type="text"
              name="student_name"
              value={updatedStudent.student_name}
              onChange={handleChange}
            />
            {errors.student_name && <p className="error">{errors.student_name}</p>}
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={updatedStudent.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label>Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={updatedStudent.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={updatedStudent.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div>
            <button type="button" onClick={onClose}>Hủy</button>
            <button type="submit">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudentForm;
