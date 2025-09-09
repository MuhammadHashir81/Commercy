const Footer = ()=> {
    return (
        <footer className="w-full bg-gradient-to-b from-[#1B004D] to-[#2E0A6F] text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <h2 className="font-bold text-6xl text-gray-200">Commercy</h2>
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    Get the products according to your needs in reasonable price.Commercy has now 80% client satisfaction rate, you can also be one of them  for what you are waiting for start buying on commercy and enjoy the services. 
                </p>
            </div>
            <div className="border-t border-[#3B1A7A]">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="https://prebuiltui.com">commercy</a> ©2025. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer