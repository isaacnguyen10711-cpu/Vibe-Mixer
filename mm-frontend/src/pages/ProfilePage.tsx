import { Link } from "react-router";

function ProfilePage() {
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

                <div className="mt-6 space-y-4 rounded-xl bg-purple-200 p-4 md:mt-8 md:space-y-5 md:p-5 lg:space-y-5 lg:p-6">
                    <div>
                        <p className="text-sm font-semibold md:text-base lg:text-base">
                            Username
                        </p>
                        <p className="mt-2 rounded-lg px-4 py-3 text-sm text-gray-700 md:px-5 md:text-base lg:py-4">
                            Not set yet
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold md:text-base lg:text-base">
                            Email
                        </p>
                        <p className="mt-2 break-words rounded-lg px-4 py-3 text-sm text-gray-700 md:px-5 md:text-base lg:py-4">
                            you@example.com
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold md:text-base lg:text-base">
                            Member since
                        </p>
                        <p className="mt-2 rounded-lg px-4 py-3 text-sm text-gray-700 md:px-5 md:text-base lg:py-4">
                            Date will appear here
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProfilePage;
