import React, { useState } from 'react';

const SignUpForm = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Check password strength
    if (passwordStrength !== 'strong') {
      alert('Password must be strong');
      return;
    }
    // Implement signup logic here
    const newUser = { email, password };
    onSignUp(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    console.log('Signed up successfully!');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Check password strength
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (regex.test(e.target.value)) {
      setPasswordStrength('strong');
    } else {
      setPasswordStrength('weak');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div>Password Strength: {passwordStrength}</div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

const LoginForm = ({ onLogin, initialEmail }) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && user.password === password) {
      onLogin(user);
      console.log('Logged in successfully!');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Home = ({ onPageChange }) => {
  return (
    <div>
      <h1>Welcome to the Authentication App</h1>
      <button onClick={() => onPageChange('signup')}>Sign Up</button>
      <button onClick={() => onPageChange('login')}>Login</button>
    </div>
  );
};

const Authentication = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleSignUp = (user) => {
    setCurrentPage('login');
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  return (
    <div>
      {currentPage === 'home' && <Home onPageChange={setCurrentPage} />}
      {currentPage === 'signup' && <SignUpForm onSignUp={handleSignUp} />}
      {currentPage === 'login' && <LoginForm onLogin={() => setCurrentPage('welcome')} initialEmail={JSON.parse(localStorage.getItem('user'))?.email} />}
      {currentPage === 'welcome' && (
        <div>
          <h1>Welcome! You have successfully logged in.</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Authentication;
