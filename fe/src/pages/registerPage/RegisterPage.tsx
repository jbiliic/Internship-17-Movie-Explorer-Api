import { useCallback, useState } from "react";
import client from "../../api/client";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleRegister = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const [res, err] = await client.post('/user/register', {
            email,
            password,
            name
        });

        if (err) {
            setError(err || 'Registration failed');
            return;
        }

        if (res) {
            alert('Registration successful!');
            localStorage.setItem('access_token', res.access_token);
            navigate(routes.MAIN);
        }
    }, [email, password, name]);

    return (
        <div>
            <h1>Register Page</h1>
            <div className="register-container">
                <form className="register-form" onSubmit={handleRegister}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="submit-btn">Register</button>
                </form>
            </div>
        </div>
    )
}