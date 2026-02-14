import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Search, Home, Flame, Sparkles, 
  Play, MonitorPlay, List, ImageOff, X
} from 'lucide-react';

const API_BASE = "https://api.sonzaix.indevs.in/melolo";

const processImageUrl = (url) => {
  if (!url) return '';
  if (url.includes('.heic')) {
      const encodedUrl = encodeURIComponent(url);
      return `https://wsrv.nl/?url=${encodedUrl}&output=jpg`;
  }
  return url;
};

const Header = ({ toggleSidebar, setView, setActiveTag, searchQuery, setSearchQuery, handleSearch }) => (
  <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] flex items-center justify-between px-4 z-50 border-b border-[#272727]">
    <div className="flex items-center gap-2 md:gap-4 w-full">
      <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-[#272727] rounded-full text-white active:scale-90 transition-transform"
      >
        <Menu size={24} />
      </button>

      <div 
        className="flex items-center gap-1 cursor-pointer flex-shrink-0 mr-2 md:mr-0" 
        onClick={() => { setView('home'); setActiveTag('Semua'); }}
      >
        <div className="bg-red-600 text-white p-1 rounded-md">
          <Play size={16} fill="white" />
        </div>
        <span className="text-white font-bold text-lg md:text-xl tracking-tighter hidden sm:block">MeloloTube</span>
      </div>

      <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-2 md:mx-4 flex">
          <div className="flex w-full relative">
              <input
                  type="text"
                  placeholder="Cari..."
                  className="w-full bg-[#121212] border border-[#303030] rounded-l-full px-4 py-2 text-white focus:outline-none focus:border-blue-500 shadow-inner text-sm md:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                  <button 
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                      <X size={16} />
                  </button>
              )}
              <button type="submit" className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-3 md:px-5 hover:bg-[#303030] transition-colors">
                  <Search size={18} className="text-gray-400" />
              </button>
          </div>
      </form>

      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        A
      </div>
    </div>
  </header>
);

const SidebarItem = ({ icon, label, active, onClick, open }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#272727] transition-colors ${active ? 'bg-[#272727] font-medium' : ''} ${!open ? 'justify-center' : ''}`}
  >
    <div className={active ? 'text-white' : 'text-gray-300'}>{icon}</div>
    {open && <span className={`text-sm ${active ? 'text-white' : 'text-gray-300'} truncate`}>{label}</span>}
  </button>
);

const Sidebar = ({ isMobile, isSidebarOpen, setIsSidebarOpen, view, setView, setActiveTag }) => (
  <>
      {isMobile && isSidebarOpen && (
          <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsSidebarOpen(false)}
          />
      )}

      <aside className={`
          fixed top-14 bottom-0 bg-[#0f0f0f] overflow-y-auto transition-all duration-300 z-50
          ${isMobile 
              ? (isSidebarOpen ? 'left-0 w-64 shadow-2xl' : '-left-full w-64') 
              : (isSidebarOpen ? 'left-0 w-60' : 'left-0 w-20')
          }
      `}>
          <div className="flex flex-col p-3 gap-1">
              <SidebarItem icon={<Home size={24} />} label="Beranda" active={view === 'home'} onClick={() => { setView('home'); setActiveTag('Semua'); if(isMobile) setIsSidebarOpen(false); }} open={!isMobile ? isSidebarOpen : true} />
              <SidebarItem icon={<Flame size={24} />} label="Populer" active={view === 'populer'} onClick={() => { setView('populer'); setActiveTag('Populer'); if(isMobile) setIsSidebarOpen(false); }} open={!isMobile ? isSidebarOpen : true} />
              <SidebarItem icon={<Sparkles size={24} />} label="Terbaru" active={view === 'new'} onClick={() => { setView('new'); setActiveTag('Terbaru'); if(isMobile) setIsSidebarOpen(false); }} open={!isMobile ? isSidebarOpen : true} />
              <div className="my-2 border-t border-[#303030]" />
              <SidebarItem icon={<MonitorPlay size={24} />} label="Koleksi" open={!isMobile ? isSidebarOpen : true} />
          </div>
      </aside>
  </>
);

const DramaCard = ({ drama, handleCardClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      onClick={() => handleCardClick(drama.drama_id)}
      className="group cursor-pointer flex flex-col gap-2"
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#202020]">
        {!imgError ? (
          <img 
            src={processImageUrl(drama.thumb_url)} 
            alt={drama.drama_name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
              <ImageOff size={32} />
              <span className="text-xs mt-2">No Image</span>
          </div>
        )}
        
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs text-white font-medium flex items-center gap-1">
           <List size={10} /> {drama.episode_count} Eps
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
            {drama.drama_name}
          </h3>
          <div className="text-[#aaaaaa] text-sm mt-1 flex items-center gap-1">
            <span>{drama.watch_value || '0'} views</span>
            <span className="text-[10px]">•</span>
            <span>{drama.tags?.[0] || 'Drama'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home'); 
  const [dramas, setDramas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDramaId, setSelectedDramaId] = useState(null);
  const [dramaDetail, setDramaDetail] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [episodeList, setEpisodeList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTag, setActiveTag] = useState('Semua');

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsSidebarOpen(false); 
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchData = async (type, query = '') => {
    setLoading(true);
    setDramas([]);
    try {
      let url = '';
      if (type === 'search') url = `${API_BASE}/search?q=${query}&result=20&page=1`;
      else if (type === 'new') url = `${API_BASE}/new?page=1`;
      else if (type === 'populer') url = `${API_BASE}/populer?page=1`;
      else url = `${API_BASE}/home?page=1`;

      const res = await fetch(url);
      const json = await res.json();

      if (json.message === 'success' && json.data && json.data.length > 0) {
        const books = json.data.flatMap(item => item.books || []);
        setDramas(books);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetail = async (id) => {
    setLoading(true);
    setDramaDetail(null);
    try {
      const res = await fetch(`${API_BASE}/detail/${id}`);
      const json = await res.json();
      if (json.message === 'success') {
        setDramaDetail(json.data);
        setEpisodeList(json.data.video_list || []);
      }
    } catch (error) {
      console.error("Error detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStream = async (videoId) => {
    try {
      const res = await fetch(`${API_BASE}/stream/${videoId}`);
      const json = await res.json();
      if (json.message === 'success') {
        const videoData = json.data;
        const quality = videoData.qualities ? videoData.qualities[videoData.qualities.length - 1] : null;
        
        setCurrentVideo({
          ...videoData,
          url: quality ? quality.url : '',
          videoId: videoId
        });
      }
    } catch (error) {
      console.error("Error stream:", error);
    }
  };

  useEffect(() => {
    if (view === 'home') fetchData('home');
    if (view === 'new') fetchData('new');
    if (view === 'populer') fetchData('populer');
  }, [view]);

  useEffect(() => {
    if (view === 'detail' && selectedDramaId) {
      fetchDetail(selectedDramaId);
    }
  }, [view, selectedDramaId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    performSearch(searchQuery);
  };

  const performSearch = (query) => {
    setView('search');
    setActiveTag(query);
    setSearchQuery(query);
    fetchData('search', query);
  };

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    if (tag === 'Semua') {
        setView('home');
        setSearchQuery('');
    } else {
        setSearchQuery(tag);
        setView('search');
        fetchData('search', tag);
    }
  };

  const handleCardClick = (id) => {
    setSelectedDramaId(id);
    setView('detail');
    setCurrentVideo(null);
  };

  const handleEpisodeClick = (video) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchStream(video.video_id);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const DetailView = () => {
    if (!dramaDetail && loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }
    
    if (!dramaDetail) return <div className="text-white">Data tidak ditemukan.</div>;

    return (
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <div className="flex-1">
            <div className="aspect-video bg-black rounded-xl overflow-hidden border border-[#303030] shadow-2xl mb-4 relative">
                {currentVideo ? (
                    <video 
                        controls 
                        autoPlay 
                        className="w-full h-full object-contain"
                        src={currentVideo.url}
                        poster={processImageUrl(currentVideo.poster)}
                    >
                        Browser Anda tidak mendukung tag video.
                    </video>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                        <img 
                            src={processImageUrl(dramaDetail.video_list?.[0]?.cover || dramaDetail.thumb_url)} 
                            className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
                            alt="Background"
                        />
                        <div className="z-10 text-center p-6 bg-black/60 rounded-xl backdrop-blur-md">
                            <h2 className="text-white text-xl font-bold mb-2">Pilih Episode untuk Memulai</h2>
                            <p className="text-gray-300">Silakan pilih episode di daftar sebelah kanan.</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <h1 className="text-2xl font-bold text-white">{dramaDetail.drama_name}</h1>
                <div className="flex items-center gap-4 text-sm text-[#aaaaaa] border-b border-[#303030] pb-4">
                    <div className="flex items-center gap-1">
                        <MonitorPlay size={16} />
                        {dramaDetail.watch_value || 'N/A'} Tayangan
                    </div>
                    <div className="flex items-center gap-1">
                        <List size={16} />
                        {dramaDetail.episode_count} Episode
                    </div>
                    <div className="bg-[#272727] px-2 py-0.5 rounded text-white text-xs">
                        {dramaDetail.is_new_book === "1" ? "Baru" : "Selesai"}
                    </div>
                </div>
                
                <div className="bg-[#272727]/50 p-4 rounded-xl mt-4 cursor-pointer hover:bg-[#272727] transition-colors">
                    <p className="text-sm text-gray-300 leading-relaxed">
                        <span className="font-bold text-white block mb-1">Sinopsis:</span>
                        {dramaDetail.description}
                    </p>
                </div>
            </div>
        </div>

        <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="bg-[#0f0f0f] border border-[#303030] rounded-xl overflow-hidden flex flex-col h-[calc(100vh-120px)] sticky top-20">
                <div className="p-4 border-b border-[#303030] bg-[#1e1e1e] flex justify-between items-center">
                    <h3 className="text-white font-bold">Daftar Episode</h3>
                    <span className="text-xs text-gray-400">{episodeList.length} Video</span>
                </div>
                <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
                    {episodeList.map((ep, idx) => (
                        <div 
                            key={ep.video_id}
                            onClick={() => handleEpisodeClick(ep)}
                            className={`flex gap-3 p-2 rounded-lg cursor-pointer transition-colors group ${currentVideo?.videoId === ep.video_id ? 'bg-[#272727]' : 'hover:bg-[#272727]'}`}
                        >
                            <div className="relative w-32 aspect-video bg-black rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                    src={processImageUrl(ep.cover)} 
                                    alt={`Ep ${ep.episode}`}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-white px-1 rounded">
                                    {Math.floor(ep.duration / 60)}:{String(Math.floor(ep.duration % 60)).padStart(2, '0')}
                                </span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <h4 className={`font-medium text-sm line-clamp-2 ${currentVideo?.videoId === ep.video_id ? 'text-blue-400' : 'text-white'}`}>
                                    Episode {ep.episode}
                                </h4>
                                <p className="text-xs text-gray-400 mt-1">Sonzai X</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen font-sans text-gray-100">
      <Header 
        toggleSidebar={toggleSidebar} 
        setView={setView} 
        setActiveTag={setActiveTag}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <Sidebar 
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        view={view}
        setView={setView}
        setActiveTag={setActiveTag}
      />

      <main 
        className={`pt-14 transition-all duration-300 min-h-screen
            ${isMobile ? 'ml-0' : (isSidebarOpen ? 'ml-60' : 'ml-20')}
        `}
      >
        <div className="p-4 md:p-6 lg:p-8">
          {view !== 'detail' && (
             <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide sticky top-14 bg-[#0f0f0f] z-30 py-2">
                {['Semua', 'Romantis', 'CEO', 'Balas Dendam', 'Fantasi', 'Komedi', 'Kerajaan', 'Sistem', 'Hamil'].map((tag, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleTagClick(tag)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors 
                        ${activeTag === tag 
                            ? 'bg-white text-black' 
                            : 'bg-[#272727] text-white hover:bg-[#3f3f3f]'}`}
                    >
                        {tag}
                    </button>
                ))}
             </div>
          )}

          {view === 'search' && (
            <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-4">Hasil: "{searchQuery}"</h2>
            </div>
          )}

          {view === 'detail' ? (
            <DetailView />
          ) : (
            <>
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2 animate-pulse">
                      <div className="bg-[#272727] aspect-[3/4] rounded-xl"></div>
                      <div className="h-4 bg-[#272727] rounded w-3/4"></div>
                      <div className="h-3 bg-[#272727] rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4">
                    {dramas.length > 0 ? (
                        dramas.map((book) => (
                            <DramaCard key={book.drama_id} drama={book} handleCardClick={handleCardClick} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-400">
                            Tidak ada drama yang ditemukan untuk "{searchQuery}".
                        </div>
                    )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-[#272727] flex justify-around p-2 z-50">
            <button onClick={() => { setView('home'); setActiveTag('Semua'); }} className={`flex flex-col items-center p-1 ${view === 'home' ? 'text-white' : 'text-gray-400'}`}>
                <Home size={20} />
                <span className="text-[10px] mt-1">Beranda</span>
            </button>
            <button onClick={() => { setView('populer'); setActiveTag('Populer'); }} className={`flex flex-col items-center p-1 ${view === 'populer' ? 'text-white' : 'text-gray-400'}`}>
                <Flame size={20} />
                <span className="text-[10px] mt-1">Populer</span>
            </button>
            <button onClick={() => { setView('new'); setActiveTag('Terbaru'); }} className={`flex flex-col items-center p-1 ${view === 'new' ? 'text-white' : 'text-gray-400'}`}>
                <Sparkles size={20} />
                <span className="text-[10px] mt-1">Baru</span>
            </button>
          </div>
      )}
    </div>
  );
}