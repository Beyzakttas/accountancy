import React, { useState } from 'react';
import './Login.css';

function Login() {
  // Sadece ihtiyacımız olan State'ler
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');

  const handleLogin = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Giriş Başarılı! Token:", data.token);
        
        // Token ve rolü tarayıcı hafızasına alıyoruz
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        
        // Dashboard'a yönlendiriyoruz
        window.location.href = '/dashboard';
      } else {
        // Backend'den gelen 'User not found' veya 'Invalid credentials' mesajı
        alert("Hata: " + data.message);
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
      alert("Sunucuya ulaşılamadı. Backend terminali açık mı?");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresinizi girin"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="form-select"
            >
              <option value="Admin">Admin</option>
              <option value="Owner">Owner</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;