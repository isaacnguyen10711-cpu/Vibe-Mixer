import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { API_URL } from "../config";
import { AudioLines } from "lucide-react";

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

            const response = await fetch(`${API_URL}/auth/login`, {
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
                {/* Page logo */}
                <Link to="/" className="flex items-center gap-2 text-violet-950">
                    <AudioLines className="h-7 w-7" />
                    <span className="text-xl font-bold">Vibe Mixer</span>
                </Link>

                <h1 className="mt-6 text-2xl font-bold md:text-3xl lg:text-4xl">Log in</h1>

                {/* Login form */}
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

                    {/* Login error */}
                    {error && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 md:text-base lg:px-3 lg:py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:cursor-pointer hover:scale-105 hover:bg-violet-700 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:opacity-60 md:px-5 md:text-base lg:py-4"
                    >
                        <span className="inline-flex items-center">
                            {loading ? "Logging in " : "Log in"}
                            {loading && (
                                <div className="ml-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            )}
                        </span>
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
