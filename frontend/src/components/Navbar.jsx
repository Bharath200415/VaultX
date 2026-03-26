export default function Navbar() {
  return (
    <nav className="bg-gray-900 px-8 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-2xl">☁️</span>
        <span className="text-white text-xl font-bold tracking-wide">VaultX</span>
      </div>
      <span className="text-gray-400 text-sm">Secure Cloud-Based File Sharing Platform</span>
    </nav>
  );
}