function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen w-full px-4 py-10 text-violet-950 md:px-8 md:py-12 lg:px-12">
            <article className="mx-auto max-w-4xl rounded-2xl border border-violet-300 bg-white/80 p-6 shadow-lg md:p-8 lg:p-10">
                {/* Policy introduction */}
                <header className="border-b border-violet-200 pb-6">
                    <h1 className="text-3xl font-bold md:text-4xl">Vibe Mixer Privacy Policy</h1>
                    <p className="mt-3 text-sm text-slate-600 md:text-base">
                        Last updated: 11 September 2026
                    </p>
                </header>

                <div className="mt-8 space-y-8 text-sm leading-7 text-slate-700 md:text-base">
                    {/* Information collected by Vibe Mixer */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">Information we collect</h2>
                        <p className="mt-3">
                            Vibe Mixer may collect account information such as your username and email address. Passwords are stored only in hashed form. The application also processes mood ratings, music-market selections, generated playlists, and playlists that signed-in users choose to save.
                        </p>
                        <p className="mt-3">
                            Vibe Mixer may use browser local storage and session storage to keep an authentication token and the current generated playlist. Basic technical information may also be recorded in server logs for security, troubleshooting, and rate limiting.
                        </p>
                    </section>

                    {/* YouTube API data */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">YouTube API Services</h2>
                        <p className="mt-3">
                            Vibe Mixer uses YouTube API Services to search for videos that match recommended songs and uses the YouTube embedded player to play those videos. Search results may include YouTube video identifiers, video URLs, titles, channel information, and thumbnail URLs.
                        </p>
                        <p className="mt-3">
                            Vibe Mixer does not ask for or store your YouTube username, password, viewing history, subscriptions, or private YouTube account information. Vibe Mixer does not use Google OAuth to access a user’s YouTube account.
                        </p>
                        <p className="mt-3">
                            By using features that display YouTube content, you also agree to the
                            {' '}<a className="font-semibold text-violet-700 underline" href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer">YouTube Terms of Service</a>.
                            Google explains how it handles information in the
                            {' '}<a className="font-semibold text-violet-700 underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>.
                        </p>
                    </section>

                    {/* How information is used */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">How we use information</h2>
                        <p className="mt-3">
                            Information is used to operate Vibe Mixer, generate playlists, personalise recommendations for signed-in users, save and manage playlists, match songs with YouTube videos, secure accounts, prevent abuse, and diagnose technical problems.
                        </p>
                    </section>

                    {/* External services */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">External services</h2>
                        <p className="mt-3">
                            Mood selections, music-market choices, and relevant saved-song context may be processed by OpenAI to generate recommendations. Song search terms are sent to YouTube API Services to locate matching videos. Hosting and database providers process application data only as needed to run Vibe Mixer. Vibe Mixer does not sell personal information.
                        </p>
                    </section>

                    {/* Storage and deletion */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">Storage and deletion</h2>
                        <p className="mt-3">
                            Account details and saved playlists are retained while they are needed to provide the service. Users can delete individual saved playlists within Vibe Mixer. YouTube API data is retained only as needed for the application and must be refreshed or deleted in accordance with the YouTube API Services policies.
                        </p>
                        <p className="mt-3">
                            You may request deletion of your Vibe Mixer account and associated stored data by contacting the developer. Deleting Vibe Mixer data does not delete any information held by YouTube. If an application uses Google authorisation, access can also be reviewed or revoked from
                            {' '}<a className="font-semibold text-violet-700 underline" href="https://security.google.com/settings/security/permissions" target="_blank" rel="noreferrer">Google’s security settings</a>.
                        </p>
                    </section>

                    {/* Security and policy changes */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">Security and changes</h2>
                        <p className="mt-3">
                            Vibe Mixer uses reasonable technical measures to protect stored information, but no internet service can guarantee absolute security. This policy may be updated when the application, its providers, or legal requirements change. The latest version will remain available at this URL.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">Contact</h2>
                        <p className="mt-3">
                            For privacy questions or data-deletion requests, contact the Vibe Mixer developer using the contact information supplied with the application.
                        </p>
                    </section>
                </div>
            </article>
        </main>
    );
}

export default PrivacyPolicyPage;
