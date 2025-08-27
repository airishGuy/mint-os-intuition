import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Copyright */}
                <div className="pt-8 border-t text-center">
                    <p className="text-sm">
                        © 2025 MemkoPad. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
