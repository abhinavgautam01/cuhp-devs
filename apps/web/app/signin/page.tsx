import avatars from "../../assets/Avatar";
import { LeftPanel } from "@repo/ui/sign-in/LeftPanel";
import { SignInClient } from "../../components/SignInClient";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      <LeftPanel avatars={avatars.map((src: string) => ({ src }))} />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16  bg-[#101322]">
        <SignInClient />
      </div>
    </div>
  );
}
