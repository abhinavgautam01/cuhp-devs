import { MdSend, MdGroups, MdOpenInNew } from "react-icons/md";

const groups = [
    { name: "CBOX: CyberSecurity", members: "120 members", link: "https://t.me/cbox_backup" },
    { name: "Web3 Jobs", members: "5k members", link: "https://t.me/web3hiring" },
    { name: "DeepCore Security", members: "2.4k members", link: "https://t.me/deepcoresec" },
];

export function TelegramLinks() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
                <div className="text-[#0088cc] p-2 bg-[#0088cc]/10 rounded-lg">
                    <MdSend size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">Community Groups</h2>
            </div>
            
            <div className="grid gap-4">
              <h2 className="font-bold text-red-500">Engage in groups on your own risk..!</h2>
                {groups.map((group) => (
                    <a 
                        key={group.name} 
                        href={group.link} 
                        target="_blank" 
                        rel="noopener noreferrer" // <--- This fixes the ESLint error
                        className="flex items-center justify-between p-5 bg-slate-900 border border-white/5 rounded-2xl hover:border-[#0088cc]/50 transition-all group relative overflow-hidden"
                    >
                        {/* Subtle background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0088cc]/0 to-[#0088cc]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 bg-[#0088cc]/10 rounded-full text-[#0088cc] group-hover:scale-110 transition-transform">
                                <MdGroups size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold tracking-tight">{group.name}</h3>
                                <p className="text-xs text-slate-500 font-medium">{group.members}</p>
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex items-center gap-2 text-slate-600 group-hover:text-[#0088cc] transition-colors text-xs font-bold uppercase tracking-widest">
                            Join
                            <MdOpenInNew size={18} />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}