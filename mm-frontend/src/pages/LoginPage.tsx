import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";

function LoginPage() {
    const navigate = useNavigate();
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!usernameOrEmail.trim() || !password) {
            setError("Username or email and password are required.");
            return;
        }

        setLoading(true);

        try {
            const formData = new URLSearchParams();
            formData.set("username", usernameOrEmail.trim());
            formData.set("password", password);

            const response = await fetch("http://127.0.0.1:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
            });

            if (response.status === 401) {
                throw new Error("Invalid username or password.");
            }

            if (!response.ok) {
                throw new Error("Login failed. Please try again.");
            }

            const data = await response.json();

            if (!data.access_token) {
                throw new Error("The server returned an invalid login response.");
            }

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("token_type", data.token_type);
            navigate("/");
        } 
        catch (loginError) {
            setError(
                loginError instanceof Error
                    ? loginError.message
                    : "Login failed. Please try again."
            );
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen w-full items-center justify-center px-4 py-8 md:px-8 lg:px-12">
            <div className="w-full max-w-sm rounded-2xl border-2 border-violet-300 bg-white/75 p-6 shadow-lg md:max-w-lg md:p-8 lg:max-w-[34rem] lg:p-9">
                <Link to="/" className="text-sm font-semibold text-violet-700 underline md:text-base">
                    Back to Mood Mixer
                </Link>

                <h1 className="mt-6 text-2xl font-bold md:text-3xl lg:text-4xl">Log in</h1>

                <form className="mt-6 space-y-4 md:mt-8 md:space-y-5 lg:space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold md:text-base lg:text-base">
                            Username or email
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            value={usernameOrEmail}
                            onChange={(event) => setUsernameOrEmail(event.target.value)}
                            className="mt-2 w-full rounded-lg border-2 border-violet-200 bg-white px-4 py-3 outline-none focus:border-violet-500 md:px-5 md:text-base lg:py-4"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold md:text-base lg:text-base">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="mt-2 w-full rounded-lg border-2 border-violet-200 bg-white px-4 py-3 outline-none focus:border-violet-500 md:px-5 md:text-base lg:py-4"
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 md:text-base lg:px-3 lg:py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 md:px-5 md:text-base lg:py-4"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                    <Link to="/register" className="block text-center text-sm text-violet-600 hover:underline md:text-base lg:text-base">
                        Don't have an account? Sign up
                    </Link>
                </form>
            </div>
        </main>
    );
}

export default LoginPage;
