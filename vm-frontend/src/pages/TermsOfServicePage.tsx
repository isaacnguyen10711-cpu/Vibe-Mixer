function TermsOfServicePage() {
    return (
        <main className="min-h-screen w-full px-4 py-10 text-violet-950 md:px-8 md:py-12 lg:px-12">
            <article className="mx-auto max-w-4xl rounded-2xl border border-violet-300 bg-white/80 p-6 shadow-lg md:p-8 lg:p-10">
                {/* Terms introduction */}
                <header className="border-b border-violet-200 pb-6">
                    <h1 className="text-3xl font-bold md:text-4xl">Vibe Mixer Terms of Service</h1>
                    <p className="mt-3 text-sm text-slate-600 md:text-base">
                        Last updated: 12 September 2026
                    </p>
                </header>

                <div className="mt-8 space-y-8 text-sm leading-7 text-slate-700 md:text-base">
                    {/* Acceptance and permitted use */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">Using Vibe Mixer</h2>
                        <p className="mt-3">
                            By using Vibe Mixer, you agree to these terms. Vibe Mixer is an independent music-discovery application that generates playlist recommendations from mood selections, music-market preferences, and, for signed-in users, recently saved playlists.
                        </p>
                        <p className="mt-3">
                            You may use the application only for lawful, personal purposes. You must not attempt to misuse the service, interfere with its operation, bypass its security or rate limits, or access accounts and data belonging to another user.
                        </p>
                    </section>

                    {/* Accounts */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">Accounts</h2>
                        <p className="mt-3">
                            You are responsible for providing accurate account information and keeping your login details secure. Access may be restricted or removed if an account is used to misuse the application or violate these terms.
                        </p>
                    </section>

                    {/* Recommendations */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">Playlist recommendations</h2>
                        <p className="mt-3">
                            Playlist recommendations are generated with automated services and may occasionally be inaccurate, unavailable, duplicated, or unsuitable for a selected mood. Vibe Mixer does not guarantee that every recommendation or matched video will remain available.
                        </p>
                    </section>

                    {/* YouTube services */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">YouTube content</h2>
                        <p className="mt-3">
                            Vibe Mixer uses YouTube API Services to locate videos and the YouTube embedded player to provide playback. Vibe Mixer does not own, host, download, modify, or redistribute YouTube videos. Video availability and playback are controlled by YouTube and the relevant content owners.
                        </p>
                        <p className="mt-3">
                            By using features that display YouTube content, you also agree to the
                            {' '}<a className="font-semibold text-violet-700 underline" href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer">YouTube Terms of Service</a>.
                            Your use of Google and YouTube services is also subject to the
                            {' '}<a className="font-semibold text-violet-700 underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>.
                        </p>
                    </section>

                    {/* Availability and liability */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">Availability and responsibility</h2>
                        <p className="mt-3">
                            Vibe Mixer is provided on an “as is” and “as available” basis. Features may change, experience interruptions, or be discontinued. To the extent permitted by law, the developer is not responsible for losses resulting from use of the application, generated recommendations, or third-party services.
                        </p>
                    </section>

                    {/* Privacy and changes */}
                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">Privacy and changes</h2>
                        <p className="mt-3">
                            Information is handled as described in the Vibe Mixer Privacy Policy. These terms may be updated when the application, third-party services, or legal requirements change. The latest version will remain available at this URL.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-violet-950 md:text-2xl">Contact</h2>
                        <p className="mt-3">
                            For questions about these terms, contact the Vibe Mixer developer using the contact information supplied with the application.
                        </p>
                    </section>
                </div>
            </article>
        </main>
    );
}

export default TermsOfServicePage;
