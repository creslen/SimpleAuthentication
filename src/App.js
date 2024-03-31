import React, { useState } from 'react';

const generateStrongPassword = () => {
  const length = 12; // You can adjust the length of the generated password
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const SignUpForm = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    if (regex.test(e.target.value)) {
      setPasswordStrength('strong');
    } else {
      setPasswordStrength('weak');
    }
  };

  const handleGeneratePassword = () => {
    const generatedPassword = generateStrongPassword();
    setPassword(generatedPassword);
    setConfirmPassword(generatedPassword);
    setPasswordStrength('strong');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div class="card">
      <div class="card-body">
        <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
              <div class="form-floating mb-2">
                <input type="email" class="form-control" placeholder="name@example.com" id="floatingInput"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label for="floatingInput">Email address</label>
              </div>

              <div class="form-floating mb-2">
                <input  class="form-control" placeholder="Password" id="floatingPassword"  type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} required />
                <label for="floatingPassword">Password</label>
                <button type="button" class="btn btn-outline-primary mt-2" onClick={toggleShowPassword}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>

              <div class="form-floating mb-2">
                <input class="form-control" placeholder="Confirm Password" id="floatingConPassword"type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <label for="floatingConPassword">Confirm Password</label>
                <button type="button" class="btn btn-outline-primary mt-2" onClick={toggleShowConfirmPassword}>{showConfirmPassword ? 'Hide' : 'Show'}</button>
              </div>

              <div>Password Strength: {passwordStrength}</div>
                <button type="submit" class="btn btn-success">Sign Up</button>
                <button type="button" class="btn btn-outline-secondary" onClick={handleGeneratePassword}>Generate Strong Password</button>
          </form>
      </div>
    </div>
  );
};

const LoginForm = ({ onLogin, initialEmail }) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="button" onClick={toggleShowPassword}>{showPassword ? 'Hide' : 'Show'}</button>
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
