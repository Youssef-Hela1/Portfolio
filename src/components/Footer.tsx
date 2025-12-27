export default function Footer() {
    const currentYear = new Date().getFullYear();

    const links = [
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/youssef-helal-yh/",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
        },
        {
            name: "Email",
            href: "mailto:Youssefhelal.yh@outlook.com",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
    ];

    return (
        <footer id="contact" className="bg-white border-t border-grey-200 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-display font-bold text-graphite-900 mb-2">Youssef Helal</h2>
                        <p className="text-graphite-500 text-sm">Data Analytics Portfolio</p>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                        {/* LinkedIn Link */}
                        <a
                            href="https://www.linkedin.com/in/youssef-helal-yh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-graphite-600 hover:text-[#0077b5] transition-colors"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            <span className="font-medium">LinkedIn</span>
                        </a>

                        {/* Email Text (No Link) */}
                        <div className="flex items-center gap-2 text-graphite-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">Youssefhelal.yh@outlook.com</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div>
                        <a
                            href="mailto:Youssefhelal.yh@outlook.com"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-graphite-900 text-white font-medium rounded-xl hover:bg-graphite-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <span>Get in Touch</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-grey-700 mt-10 pt-8 text-center">
                    <p className="text-grey-400 text-sm">
                        © {currentYear} Youssef Helal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
