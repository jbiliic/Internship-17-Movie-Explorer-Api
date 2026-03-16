import { useCallback, useState } from "react"
import client from "../../api/client"
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const [res, err] = await client.post<{ access_token: string }>('/user/login', {
            email,
            password
        });

        if (err) {
            setError(err);
            return;
        }

        if (res) {
            localStorage.setItem('access_token', res.access_token);
            alert('Login successful!');
            navigate('/');
        }
    }, [email, password]);

    return (
        <div>
            <h1>Login Page</h1>
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
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

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button type="submit" className="submit-btn">Login</button>
                </form>
            </div>
        </div>
    )
}