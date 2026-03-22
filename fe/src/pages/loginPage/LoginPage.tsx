import { useCallback, useState } from "react";
import client from "../../api/client";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);

            const [res, err] = await client.post("/user/login", {
                email,
                password,
            });

            if (err) {
                setError(err);
                return;
            }

            if (res) {
                localStorage.setItem("access_token", res.access_token);
                navigate(routes.MAIN);
            }
        },
        [email, password, navigate],
    );

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                ← Go Back
            </button>

            <div className={styles.loginContainer}>
                <header className={styles.header}>
                    <h1>Login</h1>
                </header>

                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className={styles.errorBox}>{error}</div>}

                    <button type="submit" className={styles.submitBtn}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};
