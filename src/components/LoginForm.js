import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../styles/LoginForm.css';

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''       
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(''); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); 

        if (isSignUp) {
            if (formData.password !== formData.confirmPassword) {
                alert('Mật khẩu và nhập lại mật khẩu không khớp!'); 
                return;
            }
            // Gửi yêu cầu đăng ký đến API PHP
            try {
                const response = await axios.post('http://localhost/form-register-login/backend/register_handler.php', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });
                if (response.data.success) {
                    alert('Đăng ký thành công! Vui lòng đăng nhập.');
                    setIsSignUp(false); // Chuyển sang form đăng nhập
                } else {
                    alert(response.data.message || 'Đăng ký thất bại!');
                }
            } catch (error) {
                alert('Đã xảy ra lỗi khi đăng ký!');
            }
        } else {
            // Gửi yêu cầu đăng nhập đến API PHP
            try {
                const response = await axios.post('http://localhost/form-register-login/backend/login_handler.php', {
                    username: formData.username,
                    password: formData.password
                });
                if (response.data.success) {
                    alert('Đăng nhập thành công!');
                    login({ username: formData.username }); 
                    navigate('/dashboard'); // Chuyển hướng đến trang dashboard hoặc trang chủ index j đó
                } else {
                    alert(response.data.message || 'Đăng nhập thất bại!');
                }
            } catch (error) {
                alert('Đã xảy ra lỗi khi đăng nhập!');
            }
        }
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setShowPassword(false);
        setShowConfirmPassword(false);
        setMessage(''); // Reset thông báo
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div className="nen">
            <div className="khung-dang-nhap">
                <div className="form-dang-nhap">
                    <h2 className="tieu-de">{isSignUp ? 'Đăng ký' : 'Đăng nhập'}</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="truong-nhap">
                            <label htmlFor="username" className="nhan-truong">Tên đăng nhập</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="o-nhap"
                                placeholder="Nhập tên đăng nhập"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <>
                                <div className="truong-nhap">
                                    <label htmlFor="email" className="nhan-truong">Nhập email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="o-nhap"
                                        placeholder="Nhập email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div className="truong-nhap">
                            <label htmlFor="password" className="nhan-truong">Mật khẩu</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className="o-nhap o-nhap--co-icon"
                                    placeholder="Nhập mật khẩu"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    className="icon-hien-mat-khau"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                            {!isSignUp && (
                                <p className="lien-ket-quen-mat-khau">
                                    <span onClick={handleForgotPassword}>Quên mật khẩu?</span>
                                </p>
                            )}
                        </div>
                        
                        {isSignUp && (
                            <>
                                <div className="truong-nhap">
                                    <label htmlFor="confirm-password" className="nhan-truong">Nhập lại mật khẩu</label>
                                    <div className="input-wrapper">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="confirm-password"
                                            name="confirmPassword"
                                            className="o-nhap o-nhap--co-icon"
                                            placeholder="Nhập lại mật khẩu"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
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
                            </>
                        )}
                        <button type="submit" className="nut-xac-nhan">
                            {isSignUp ? 'Đăng ký' : 'Đăng nhập'}
                        </button>
                    </form>
                    <p className="van-ban-dang-ky">
                        {isSignUp ? 'Bạn đã có tài khoản?' : 'Bạn chưa có tài khoản?'}{' '}
                        <span className="lien-ket-dang-ky" onClick={toggleForm}>
                            {isSignUp ? 'Đăng nhập' : 'Đăng ký'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
