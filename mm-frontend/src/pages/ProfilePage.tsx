import { Link } from "react-router";
import { useState, useEffect } from "react";

function ProfilePage() {
    const [username, setUsername] = useState("Not set yet");
    const [email, setEmail] = useState("you@example.com");
    const [createdAt, setCreatedAt] = useState("Current Date");
    
    useEffect(()  => {
        const fetchProfile = async () => {
            try {
            const response = await fetch("http://127.0.0.1:8000/users/profile", 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch profile information.");
            }

            const data = await response.json();
            setUsername(data.username);
            setEmail(data.email);
            setCreatedAt(data.created_at);
            } 
            catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching profile:", error.message);
                }
                alert("An error occurred while fetching profile information.");
            }
        };
        fetchProfile();
    }, []);


    return (
        <main className="flex min-h-screen w-full items-center justify-center px-4 py-8 md:px-8 lg:px-12">
            <section className="w-full max-w-sm rounded-2xl border-2 border-violet-300 bg-white/75 p-6 shadow-lg md:max-w-md md:p-8 lg:max-w-lg lg:p-9">
                <Link
                    to="/"
                    className="text-sm font-semibold text-violet-700 underline md:text-base"
                >
                    Back to Mood Mixer
                </Link>

                <h1 className="mt-6 text-2xl font-bold md:text-3xl lg:text-4xl">
                    Profile
                </h1>

                <p className="mt-2 text-sm text-gray-600 md:text-base">
                    View your Mood Mixer account details.
                </p>

                <div className="mt-6 space-y-3 rounded-xl bg-violet-100 p-4 md:mt-8 md:space-y-4 md:p-5 lg:p-6">
                    <div className="rounded-lg bg-white p-3 md:p-4 lg:p-5">
                        <p className="text-sm font-semibold text-violet-700 md:text-base">
                            Username
                        </p>
                        <p className="mt-1 text-sm text-gray-800 md:text-base">
                            {username}
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-3 md:p-4 lg:p-5">
                        <p className="text-sm font-semibold text-violet-700 md:text-base">
                            Email
                        </p>
                        <p className="mt-1 break-words text-sm text-gray-800 md:text-base">
                            {email}
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-3 md:p-4 lg:p-5">
                        <p className="text-sm font-semibold text-violet-700 md:text-base">
                            Member since
                        </p>
                        <p className="mt-1 text-sm text-gray-800 md:text-base">
                            {new Date(createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProfilePage;
