import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";

function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Need to add succesful registration feedback to the user.


    const handleRegister = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            });
            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error("Email already exists.");
                }
                else {
                    throw new Error("Registration failed. Please try again.");
                }
            }

            navigate("/login");
        } 
        catch (registerError) {
            setError(
                registerError instanceof Error
                    ? registerError.message
                    : "Registration failed. Please try again."
            );
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen w-full items-center justify-center px-4 py-8 md:px-8 lg:px-12">
            <section className="w-full max-w-sm rounded-2xl border-2 border-violet-300 bg-white/75 p-6 shadow-lg md:max-w-lg md:p-8 lg:max-w-[34rem] lg:p-9">
                <Link to="/" className="text-sm font-semibold text-violet-700 underline md:text-base">
                    Back to Mood Mixer
                </Link>

                <h1 className="mt-6 text-2xl font-bold md:text-3xl lg:text-4xl">Register</h1>

                <form className="mt-6 space-y-4 md:mt-8 md:space-y-5 lg:space-y-5" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold md:text-base lg:text-base">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
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
                            autoComplete="new-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="mt-2 w-full rounded-lg border-2 border-violet-200 bg-white px-4 py-3 outline-none focus:border-violet-500 md:px-5 md:text-base lg:py-4"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-semibold md:text-base lg:text-base">
                            Confirm password
                        </label>
                        <input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
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
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <Link to="/login" className="block text-center text-sm text-violet-600 hover:underline md:text-base lg:text-base">
                        Already have an account? Log in
                    </Link>
                </form>
            </section>
        </main>
    );
}

export default RegisterPage;
    
