import "./globals.css";
import HomeClient from "../components/HomeClient";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-hidden flex flex-col items-center justify-center">
      <HomeClient />
    </div>
  );
}
