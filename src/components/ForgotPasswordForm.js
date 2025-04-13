import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/LoginForm.css';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);
      
        try {
          const response = await axios.post(
            'http://localhost/form-register-login/backend/forgot_password_handler.php',
            { email }
          );
          if (response.data.success) {
            setMessage({ text: response.data.message, type: 'success' });
          } else {
            setMessage({ text: response.data.message, type: 'error' });
          }
        } catch (error) {
          setMessage({
            text: 'Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu!',
            type: 'error'
          });
        } finally {
          setIsLoading(false);
        }
      };

    return (
        <div className="nen">
            <div className="khung-dang-nhap">
                <div className="form-dang-nhap">
                    <h2 className="tieu-de">Quên mật khẩu</h2>
                    <form onSubmit={handleSubmit} className="forgot-password-form">
                        <div className="truong-nhap">
                            <label htmlFor="email" className="nhan-truong">Nhập email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="o-nhap"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="nut-xac-nhan"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
                        </button>
                        <p className="van-ban-dang-ky">
                            Trở về trang{' '}
                            <Link to="/login" className="lien-ket-dang-ky">
                                Đăng nhập
                            </Link>
                        </p>
                        {message && (
                        <p className={`thong-bao ${message.type}`}>
                            {message.text}
                        </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;