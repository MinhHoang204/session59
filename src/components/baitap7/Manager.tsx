import { useEffect, useState } from 'react'
import "./manager.css";
import axios from 'axios';
interface User {
    name:string,
    email:string,
    address:string,
    phone:string,
    status:boolean
}
export default function Manager() {
    const [users, setUsers]=useState<User[]>([])
    // di lay danh sach sinh vien
    useEffect(()=>{
        axios.get("http://localhost:8080/users")
        .then(response=>{
            console.log("gia tri data tra ve", response);
            setUsers(response.data);
        })
        .catch(err=>console.log(err))
    })
  return (
    <>
  <div className="w-[80%] m-auto mt-4 h-[100vh]">
    <main className="main">
      <header className="d-flex justify-content-between mb-3">
        <h3>Nhân viên</h3>
        <button className="btn btn-primary">Thêm mới nhân viên</button>
      </header>
      <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
        <input
          style={{ width: 350 }}
          type="text"
          className="form-control"
          placeholder="Tìm kiếm theo email"
        />
        <i className="fa-solid fa-arrows-rotate" title="Refresh" />
      </div>
      {/* Danh sách nhân viên */}
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th colSpan={2}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Nguyễn Văn A</td>
            <td>28/02/1990</td>
            <td>nvana@gmail.com</td>
            <td>Ba Đình, Hà Nội</td>
            <td>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="status status-active" />
                <span> Đang hoạt động</span>
              </div>
            </td>
            <td>
              <span className="button button-block">Chặn</span>
            </td>
            <td>
              <span className="button button-edit">Sửa</span>
            </td>
            <td>
              <span className="button button-delete">Xóa</span>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Trần Thị B</td>
            <td>15/07/1985</td>
            <td>ttb@gmail.com</td>
            <td>Cầu Giấy, Hà Nội</td>
            <td>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="status status-stop" />
                <span> Ngừng hoạt động</span>
              </div>
            </td>
            <td>
              <span className="button button-block">Bỏ chặn</span>
            </td>
            <td>
              <span className="button button-edit">Sửa</span>
            </td>
            <td>
              <span className="button button-delete">Xóa</span>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Lê Văn C</td>
            <td>03/10/2000</td>
            <td>lvc@gmail.com</td>
            <td>Hai Bà Trưng, Hà Nội</td>
            <td>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="status status-stop" />
                <span> Ngừng hoạt động</span>
              </div>
            </td>
            <td>
              <span className="button button-block">Bỏ chặn</span>
            </td>
            <td>
              <span className="button button-edit">Sửa</span>
            </td>
            <td>
              <span className="button button-delete">Xóa</span>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Phạm Thị D</td>
            <td>20/05/1995</td>
            <td>ptd@gmail.com</td>
            <td>Hoàn Kiếm, Hà Nội</td>
            <td>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="status status-active" />
                <span> Đang hoạt động</span>
              </div>
            </td>
            <td>
              <span className="button button-block">Chặn</span>
            </td>
            <td>
              <span className="button button-edit">Sửa</span>
            </td>
            <td>
              <span className="button button-delete">Xóa</span>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Ngô Văn E</td>
            <td>12/11/1988</td>
            <td>nve@gmail.com</td>
            <td>Cầu Giấy, Hà Nội</td>
            <td>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="status status-active" />
                <span> Đang hoạt động</span>
              </div>
            </td>
            <td>
              <span className="button button-block">Chặn</span>
            </td>
            <td>
              <span className="button button-edit">Sửa</span>
            </td>
            <td>
              <span className="button button-delete">Xóa</span>
            </td>
          </tr>
        </tbody>
      </table>
      <footer className="d-flex justify-content-end align-items-center gap-3">
        <select className="form-select">
          <option>Hiển thị 10 bản ghi trên trang</option>
          <option>Hiển thị 20 bản ghi trên trang</option>
          <option>Hiển thị 50 bản ghi trên trang</option>
          <option>Hiển thị 100 bản ghi trên trang</option>
        </select>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </footer>
    </main>
  </div>
  {/* Form thêm mới nhân viên */}
  <div className="overlay" >
    <form className="form">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Chỉnh sửa nhân viên</h4>
        <i className="fa-solid fa-xmark" />
      </div>
      <div>
        <label className="form-label" htmlFor="userName">
          Họ và tên
        </label>
        <input id="userName" type="email" className="form-control" />
        {/* <div class="form-text error">Họ và tên không được để trống.</div> */}
      </div>
      <div>
        <label className="form-label" htmlFor="dateOfBirth">
          Ngày sinh
        </label>
        <input id="dateOfBirth" type="date" className="form-control" />
      </div>
      {/* <div class="form-text error">
    Ngày sinh không được lớn hơn ngày hiện tại.
  </div> */}
      <div>
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input id="email" type="text" className="form-control" />
      </div>
      {/* <div class="form-text error">Email không được để trống.</div> */}
      <div>
        <label className="form-label" htmlFor="address">
          Địa chỉ
        </label>
        <textarea
          className="form-control"
          id="address"
          rows={3}
          defaultValue={""}
        />
      </div>
      <div>
        <button className="w-100 btn btn-primary">Thêm mới</button>
      </div>
    </form>
  </div>
  {/* Modal xác nhận chặn tài khoản */}
  <div className="overlay">
    <div className="modal-custom">
      <div className="modal-title">
        <h4>Cảnh báo</h4>
        <i className="fa-solid fa-xmark" />
      </div>
      <div className="modal-body-custom">
        <span>Bạn có chắc chắn muốn chặn tài khoản này?</span>
      </div>
      <div className="modal-footer-custom">
        <button className="btn btn-light">Hủy</button>
        <button className="btn btn-danger">Xác nhận</button>
      </div>
    </div>
  </div>
  {/* Modal xác nhận xóa tài khoản */}
  <div className="overlay">
    <div className="modal-custom">
      <div className="modal-title">
        <h4>Cảnh báo</h4>
        <i className="fa-solid fa-xmark" />
      </div>
      <div className="modal-body-custom">
        <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
      </div>
      <div className="modal-footer-custom">
        <button className="btn btn-light">Hủy</button>
        <button className="btn btn-danger">Xác nhận</button>
      </div>
    </div>
  </div>
</>

  )
}
