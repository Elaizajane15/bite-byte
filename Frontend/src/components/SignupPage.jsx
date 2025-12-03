import React, { useState } from 'react';
import { useToast } from './ToastContext';

function SignupPage({ setCurrentPage, onSignup }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { showToast } = useToast();

    const handleSignup = async () => {
        const firstnameTrim = (firstname || '').trim();
        const lastnameTrim = (lastname || '').trim();
        const emailTrim = (email || '').trim();
        const passwordTrim = (password || '').trim();
        const confirmTrim = (confirmPassword || '').trim();
        if (!firstnameTrim || !lastnameTrim || !emailTrim || !passwordTrim) {
            showToast("Please fill in all fields.", 'error');
            return;
        }
        if (passwordTrim !== confirmTrim) {
            showToast("Passwords do not match.", 'error');
            return;
        }
        try {
            const res = await fetch(`/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname: firstnameTrim, lastname: lastnameTrim, email: emailTrim, password: passwordTrim })
            });
            if (!res.ok) {
                showToast('Sign up failed. Please try a different email.', 'error');
                return;
            }
            const user = await res.json();
            showToast("Account created successfully!", 'success');
            if (onSignup) {
                const name = user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : (user.firstname || emailTrim.split('@')[0]);
                onSignup({ id: user.id, name, email: user.email, createdAt: user.createdAt, bio: user.bio || '' });
            }
            // Stay on the signup page after successful registration
        } catch (e) {
            showToast('Network error.', 'error');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <button className="close-button" onClick={() => setCurrentPage("landing")}>
                    ✕
                </button>

                <h2 className="auth-title">Join RecipeShare</h2>

                {/* FIRSTNAME */}
                <div className="form-group">
                    <label className="label">First Name</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter your first name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>

                {/* LASTNAME */}
                <div className="form-group">
                    <label className="label">Last Name</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter your last name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

                {/* EMAIL */}
                <div className="form-group">
                    <label className="label">Email Address</label>
                    <input
                        className="input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* PASSWORD */}
                <div className="form-group">
                    <label className="label">Password</label>
                    <div className="input-wrapper">
                        <input
                            className="input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="eye-button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="form-group">
                    <label className="label">Confirm Password</label>
                    <div className="input-wrapper">
                        <input
                            className="input"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            className="eye-button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </div>
                </div>

                <button className="submit-button" onClick={handleSignup}>
                    Create Account
                </button>

                <p className="switch-text">
                    Already have an account?{" "}
                    <span className="switch-link" onClick={() => setCurrentPage("login")}>
                        Sign in
                    </span>
                </p>

            </div>
        </div>
    );
}

export default SignupPage;
