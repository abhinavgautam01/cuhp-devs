import { MdFolderZip, MdCloudDownload, MdStorage } from "react-icons/md";

const resources = [
    { title: "Extra1", provider: "Udemy (Mega)", size: "53.4 GB", url: "https://mega.nz/folder/NyIW2CxI#KlSrcyOM-W1EElVz4ExrNg" },
    { title: "Extra2", provider: "Udemy (Mega)", size: "51.1 GB", url: "https://mega.nz/folder/kzJ31I5S#Z8SeXHQ2G39e3HFSmLgONg" },
    { title: "Extra3", provider: "Udemy (Mega)", size: "50.1 GB", url: "https://mega.nz/folder/ViYy2TIT#cyvpfiqw_mT4Yd8wKV4jgQ" },
    { title: "Extra4", provider: "Google Drive", size: "40.1 GB", url: "https://drive.google.com/drive/folders/1fs0HwmFdY451TlREy2rmN1yzSRV_GdVw" },
];

export function DirectCourses() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
                <div className="text-[#1337ec] p-2 bg-[#1337ec]/10 rounded-lg">
                    <MdFolderZip size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Premium Courses Vault</h2>
            </div>

            <div className="grid gap-4">
                {resources.map((res) => (
                    <div key={res.title} className="bg-slate-900 border border-white/5 p-1 rounded-2xl">
                        <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl">
                            <div className="flex items-center gap-4">
                                <MdStorage className="text-[#1337ec]" size={28} />
                                <div>
                                    <h3 className="text-white font-bold text-sm">{res.title}</h3>
                                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">
                                        {res.provider} • {res.size}
                                    </p>
                                </div>
                            </div>
                            <a 
                                href={res.url}
                                className="px-4 py-2 bg-[#1337ec] text-white rounded-lg text-xs font-bold hover:bg-[#1337ec]/80 transition-all flex items-center gap-2"
                            >
                                <MdCloudDownload size={16} />
                                Access Link
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}