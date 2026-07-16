import React, { useState } from 'react';
import { 
  Folder, 
  File, 
  ChevronRight, 
  ArrowLeft, 
  Download, 
  Eye, 
  Image as ImageIcon, 
  Music, 
  Video, 
  Search,
  Grid,
  List
} from 'lucide-react';

export default function FileExplorer({ files, currentPath, onNavigate, onPreviewFile, onClose }) {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  // Filter files based on search
  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  // Split path for breadcrumbs
  const getBreadcrumbs = () => {
    if (!currentPath) return ['Storage'];
    const parts = currentPath.split('/').filter(Boolean);
    return ['Storage', ...parts];
  };

  const navigateToBreadcrumb = (index) => {
    if (index === 0) {
      onNavigate(null); // root
      return;
    }
    const parts = currentPath.split('/').filter(Boolean);
    const targetPath = '/' + parts.slice(0, index).join('/');
    onNavigate(targetPath);
  };

  const getFileIcon = (file) => {
    if (file.isDir) return <Folder className="w-8 h-8 text-indigo-400 fill-indigo-400/20" />;
    
    const ext = file.name.split('.').pop().toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
      return <ImageIcon className="w-8 h-8 text-pink-400" />;
    }
    if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext)) {
      return <Music className="w-8 h-8 text-emerald-400" />;
    }
    if (['mp4', 'mkv', 'avi', 'mov'].includes(ext)) {
      return <Video className="w-8 h-8 text-red-400" />;
    }
    return <File className="w-8 h-8 text-slate-400" />;
  };

  const handleItemClick = (file) => {
    if (file.isDir) {
      onNavigate(file.path);
    } else {
      // Preview or action for file
      onPreviewFile(file);
    }
  };

  // Format file size
  const formatSize = (bytes) => {
    if (!bytes) return '--';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-5xl h-[80vh] flex flex-col bg-white dark:bg-[#23140c] border border-[#E8622A]/15 dark:border-[#E8622A]/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FDF8F4] dark:bg-[#180d07] border-b border-[#E8622A]/10 dark:border-[#E8622A]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E8622A]/10 rounded-lg">
              <Folder className="w-6 h-6 text-[#E8622A]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#2C1A0E] dark:text-white">Remote File System</h2>
              <p className="text-xs text-[#7C5C44] dark:text-[#C4A992]">Explore and download files from your device</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold bg-[#FDF3EC] dark:bg-[#180d07] hover:bg-[#E8622A] hover:text-white border border-[#E8622A]/20 text-[#E8622A] rounded-xl transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-3 bg-[#FDF8F4]/50 dark:bg-[#180d07]/40 border-b border-[#E8622A]/10 dark:border-[#E8622A]/20">
          {/* Breadcrumbs */}
          <div className="flex items-center flex-wrap gap-1 text-sm text-[#2C1A0E] dark:text-[#FFF3EB]">
            {currentPath && (
              <button 
                onClick={() => {
                  const parts = currentPath.split('/').filter(Boolean);
                  parts.pop();
                  onNavigate(parts.length ? '/' + parts.join('/') : null);
                }}
                className="p-1.5 hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] rounded-lg text-[#7C5C44] hover:text-[#E8622A] transition-all mr-2 cursor-pointer border border-[#E8622A]/10"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            {getBreadcrumbs().map((bc, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#7C5C44]" />}
                <button
                  onClick={() => navigateToBreadcrumb(idx)}
                  className="px-2 py-1 rounded-lg hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] hover:text-[#E8622A] transition-all text-xs font-bold"
                >
                  {bc}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7C5C44]/60 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48 bg-[#FDF8F4] dark:bg-[#180d07] text-[#2C1A0E] dark:text-[#FFF3EB] text-xs pl-9 pr-4 py-2 rounded-xl border border-[#E8622A]/15 dark:border-[#E8622A]/30 focus:outline-none focus:border-[#E8622A] transition-all"
              />
            </div>

            <div className="flex bg-[#FDF8F4] dark:bg-[#180d07] p-1 rounded-xl border border-[#E8622A]/15 dark:border-[#E8622A]/30">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-[#E8622A] text-white' : 'text-[#7C5C44] hover:text-[#E8622A]'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'list' ? 'bg-[#E8622A] text-white' : 'text-[#7C5C44] hover:text-[#E8622A]'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-white/30 dark:bg-[#180d07]/10">
          {filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#7C5C44]/60 py-12">
              <Folder className="w-16 h-16 text-[#7C5C44]/30 mb-3 animate-pulse" />
              <p className="text-sm font-bold">This directory is empty or loading...</p>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.path || file.name}
                  onClick={() => handleItemClick(file)}
                  className="flex flex-col items-center p-4 bg-white dark:bg-[#23140c]/40 hover:bg-[#FFF9F4] dark:hover:bg-[#301c11]/60 border border-[#E8622A]/10 hover:border-[#E8622A]/30 rounded-2xl cursor-pointer transition-all text-center select-none shadow-sm hover:-translate-y-0.5"
                >
                  <div className="mb-3">
                    {getFileIcon(file)}
                  </div>
                  <span className="text-xs text-[#2C1A0E] dark:text-[#FFF3EB] font-bold truncate w-full px-1" title={file.name}>
                    {file.name}
                  </span>
                  <span className="text-[10px] text-[#7C5C44] dark:text-[#C4A992] mt-1">
                    {file.isDir ? 'Folder' : formatSize(file.size)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white dark:bg-[#23140c]/20 border border-[#E8622A]/10 dark:border-[#E8622A]/25 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-[#E8622A]/10 dark:border-[#E8622A]/20 text-xs text-[#7C5C44] dark:text-[#C4A992] bg-[#FDF8F4]/40 dark:bg-[#180d07]/40">
                      <th className="py-3 px-4 font-bold">Name</th>
                      <th className="py-3 px-4 font-bold">Type</th>
                      <th className="py-3 px-4 font-bold">Size</th>
                      <th className="py-3 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8622A]/5 dark:divide-[#E8622A]/15 text-xs text-[#2C1A0E] dark:text-[#FFF3EB]">
                    {filteredFiles.map((file) => (
                      <tr 
                        key={file.path || file.name}
                        onClick={() => handleItemClick(file)}
                        className="hover:bg-[#FFF9F4]/60 dark:hover:bg-[#301c11]/45 cursor-pointer transition-all animate-fade-in"
                      >
                        <td className="py-3 px-4 flex items-center gap-3 font-semibold">
                          <div className="scale-75 origin-left">{getFileIcon(file)}</div>
                          <span className="truncate max-w-xs sm:max-w-md" title={file.name}>{file.name}</span>
                        </td>
                        <td className="py-3 px-4 text-[#7C5C44] dark:text-[#C4A992]">
                          {file.isDir ? 'Folder' : 'File'}
                        </td>
                        <td className="py-3 px-4 text-[#7C5C44] dark:text-[#C4A992]">
                          {file.isDir ? '--' : formatSize(file.size)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {!file.isDir && (
                            <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                              <button 
                                onClick={() => onPreviewFile(file)}
                                className="p-1.5 hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] rounded-lg text-[#7C5C44] hover:text-[#E8622A] transition-all cursor-pointer border border-transparent hover:border-[#E8622A]/10"
                                title="View file"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
