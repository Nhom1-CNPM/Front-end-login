import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';

const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        if (newPassword !== confirmPassword) {
            alert('Mật khẩu và xác nhận mật khẩu không khớp!');
            return;
        }

        try {
            const response = await axios.post('http://localhost/form-register-login/backend/reset_password_handler.php', {
                uid,
                token,
                new_password: newPassword
            });
            if (response.data.success) {
                alert(response.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert('Đã xảy ra lỗi khi đặt lại mật khẩu!');
        }
    };

    return (
        <div className="nen">
            <div className="khung-dang-nhap">
                <div className="form-dang-nhap">
                    <h2 className="tieu-de">Đặt lại mật khẩu</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="truong-nhap">
                            <label htmlFor="newPassword" className="nhan-truong">Mật khẩu mới</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="newPassword"
                                    name="newPassword"
                                    className="o-nhap o-nhap--co-icon"
                                    placeholder="Nhập mật khẩu mới"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="icon-hien-mat-khau"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>                            
                        </div>
                        <div className="truong-nhap">
                            <label htmlFor="confirmpassword" className="nhan-truong">Xác nhận mật khẩu mới</label>
                            <div className="input-wrapper">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="o-nhap o-nhap--co-icon"
                                    placeholder="Xác nhận mật khẩu mới"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="icon-hien-mat-khau"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <i className={showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>                           
                        </div>
                        <button type="submit" className="nut-xac-nhan">Đặt lại mật khẩu</button>
                        {message && <p className="message">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;