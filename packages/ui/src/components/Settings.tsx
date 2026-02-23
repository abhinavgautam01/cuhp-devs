
interface SettingsProps {
  onLogout?: () => Promise<void> | void;
  isLoggingOut?: boolean;
}

export default function Settings({ onLogout, isLoggingOut = false }: SettingsProps) {
  return (
    <div className="min-h-screen bg-[#101322] text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-slate-400">Manage your account preferences.</p>

        <div className="mt-8 rounded-xl border border-blue-900/30 bg-[#0c1436] p-6">
          <h2 className="text-xl font-semibold">Account</h2>
          <p className="mt-2 text-sm text-slate-400">
            Sign out of your current session.
          </p>

          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className="mt-6 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </div>
    </div>
  );
}
