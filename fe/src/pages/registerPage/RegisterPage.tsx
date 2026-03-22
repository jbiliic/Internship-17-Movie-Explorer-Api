import { useCallback, useState } from "react";
import client from "../../api/client";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleRegister = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);

            const [res, err] = await client.post("/user/register", {
                email,
                password,
                name,
            });

            if (err) {
                setError(err || "Registration failed");
                return;
            }

            if (res) {
                localStorage.setItem("access_token", res.access_token);
                navigate(routes.MAIN);
            }
        },
        [email, password, name, navigate],
    );

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                ← Go Back
            </button>

            <div className={styles.registerContainer}>
                <header className={styles.header}>
                    <h1>Create Account</h1>
                </header>

                <form className={styles.registerForm} onSubmit={handleRegister}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="name@example.com"
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
                        Register Now
                    </button>
                </form>
            </div>
        </div>
    );
};
