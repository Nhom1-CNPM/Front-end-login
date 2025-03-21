import React, { useState } from 'react';
import '../styles/LoginForm.css';

const LoginForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            if (formData.password !== formData.confirmPassword) {
                alert('Mật khẩu và nhập lại mật khẩu không khớp!');
                return;
            }
            console.log('Dữ liệu đăng ký:', formData);
        } else {
            console.log('Dữ liệu đăng nhập:', {
                username: formData.username,
                password: formData.password
            });
        }
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setFormData({
            username: '',
            password: '',
            confirmPassword: '',
            phone: ''
        });
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    const handleForgotPassword = () => {
        alert('Chức năng quên mật khẩu đang được phát triển!');
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
                                <div className="truong-nhap">
                                    <label htmlFor="phone" className="nhan-truong">Nhập số điện thoại</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="o-nhap"
                                        placeholder="Nhập số điện thoại"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
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