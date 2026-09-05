import { Link } from "react-router";
import { useState, useEffect } from "react";
import PopupDialog from "../components/PopupDialog";

function ProfilePage() {
    const [username, setUsername] = useState("Not set yet");
    const [email, setEmail] = useState("you@example.com");
    const [createdAt, setCreatedAt] = useState("Current Date");
    const [popUpMessage, setPopUpMessage] = useState<string | null>(null);

    const [usernameIsEditable, setUsernameIsEditable] = useState(false);
    const [emailIsEditable, setEmailIsEditable] = useState(false);

    useEffect(() => {
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
                setPopUpMessage("An error occurred while fetching profile information.");
            }
        };
        fetchProfile();
    }, []);

    const toggleUsernameEditable = () => {
        setUsernameIsEditable(!usernameIsEditable);
    };

    const toggleEmailEditable = () => {
        setEmailIsEditable(!emailIsEditable);
    };

    const handleSaveUsername = async () => {
        try {
        const response = await fetch("http://127.0.0.1:8000/users/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify({ username, email })
        });

        if (!response.ok) {
            throw new Error("Failed to update username.");
        }

        toggleUsernameEditable();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error updating username:", error.message);
            }
            setPopUpMessage("An error occurred while updating the username.");
        }
    };

    const handleSaveEmail = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/users/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify({ username, email })
            });

            if (!response.ok) {
                throw new Error("Failed to update email.");
            }

            toggleEmailEditable();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error updating email:", error.message);
            }
            setPopUpMessage("An error occurred while updating the email.");
        }
    };


    return (
        <>
            {popUpMessage && (
                <PopupDialog
                    message={popUpMessage}
                    confirmButtonText="OK"
                    onConfirmButtonClick={() => setPopUpMessage(null)}
                />
            )}
            <main className="flex flex-col min-h-screen w-full items-center justify-center px-4 py-8 md:px-8 lg:px-12">
                <section className="w-full max-w-sm rounded-2xl border-2 border-violet-300 bg-white/75 p-6 shadow-lg md:max-w-md md:p-8 lg:max-w-lg lg:p-9">
                    <Link
                        to="/"
                        className="text-sm font-semibold text-violet-700 underline md:text-base lg:text-lg"
                    >
                        Back to Vibe Mixer
                    </Link>

                    <h1 className="mt-6 text-2xl font-bold md:text-3xl lg:text-4xl">
                        Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-600 md:text-base lg:text-lg">
                        View your Vibe Mixer account details.
                    </p>

                    <div className="mt-4 space-y-3 rounded-xl bg-violet-100 p-4 md:space-y-4 md:p-5 lg:space-y-5 lg:p-6">
                        <div className="rounded-lg bg-white p-3 md:p-2 lg:p-3">
                            <p className="text-sm font-semibold text-violet-700 md:text-base lg:text-lg">
                                Username
                            </p>
                            {usernameIsEditable ? (
                                <>
                                <div className="flex justify-between items-center">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-1 w-full rounded-md shadow-sm outline-none text-sm md:text-base lg:text-lg"
                                />
                                <button
                                    type="button"
                                    onClick={handleSaveUsername}
                                    className="mt-2 text-sm text-violet-700 px-4 py-2 hover:cursor-pointer hover:text-violet-800 md:text-base lg:text-lg"
                                >
                                    Save
                                </button> 
                                </div>
                                </>
                            ) : (
                            <>
                            <div className="flex justify-between items-center">
                            <p className="mt-1 text-sm text-gray-800 md:text-base lg:text-lg">
                                {username}
                            </p>
                            <button
                                type="button"
                                onClick={toggleUsernameEditable}
                                className="mt-2 text-sm text-violet-700 px-4 py-2 hover:cursor-pointer hover:text-violet-800 md:text-base lg:text-lg"
                            >
                                Edit
                            </button>
                            </div>
                            </>
                            )}
                        </div> 

                        <div className="rounded-lg bg-white p-3 md:p-4 lg:p-5">
                            <p className="text-sm font-semibold text-violet-700 md:text-base lg:text-lg">
                                Email
                            </p>
                            {emailIsEditable ? (
                                <div className="flex items-center justify-between">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 w-full rounded-md shadow-sm outline-none text-sm md:text-base lg:text-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSaveEmail}
                                        className="mt-2 px-4 py-2 text-sm text-violet-700 hover:cursor-pointer hover:text-violet-800 md:text-base lg:text-lg"
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <p className="mt-1 break-words text-sm text-gray-800 md:text-base lg:text-lg">
                                        {email}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={toggleEmailEditable}
                                        className="mt-2 px-4 py-2 text-sm text-violet-700 hover:cursor-pointer hover:text-violet-800 md:text-base lg:text-lg"
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="rounded-lg bg-white p-3 md:p-4 lg:p-5">
                            <p className="text-sm font-semibold text-violet-700 md:text-base lg:text-lg">
                                Member since
                            </p>
                            <p className="mt-1 text-sm text-gray-800 md:text-base lg:text-lg">
                                {new Date(createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/my-playlists"
                        className="mt-4 block w-full rounded-lg bg-violet-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-violet-700 md:text-base lg:text-lg"
                    >
                        My playlists
                    </Link>
                </section>
            </main>
        </>
    );
}

export default ProfilePage;
