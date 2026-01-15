

export const Header = () => {
  // Local mock state since we are not connected to the host store via federation in this iframe mode
  

  return (
    <header className="bg-slate-800 text-white p-2 px-4 flex justify-between items-center shadow-md border-b border-slate-700">
      <div className="text-xl font-bold flex items-center gap-2">
        <span>🖼️</span>
        <span>모듈 페더레이션 (Iframe/lmw)</span>
        <span className="text-slate-400 text-xs ml-4 font-normal">
          postMessage를 통한 Host ↔ Iframe 양방향 통신 데모
        </span>
      </div>
    </header>
  );
};

export default Header;
