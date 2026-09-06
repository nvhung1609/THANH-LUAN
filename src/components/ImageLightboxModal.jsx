import React, { useState, useEffect } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  RotateCcw, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Download,
  Eye
} from 'lucide-react';

export default function ImageLightboxModal({ 
  isOpen, 
  onClose, 
  initialImage, 
  gallery = [] 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Tìm index của ảnh được click
  useEffect(() => {
    if (!isOpen) return;
    const foundIdx = gallery.findIndex(img => img.url === initialImage?.url || img.url === initialImage);
    if (foundIdx !== -1) {
      setCurrentIndex(foundIdx);
    } else {
      setCurrentIndex(0);
    }
    // Reset zoom & pan
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, [isOpen, initialImage, gallery]);

  // Phím tắt bàn phím
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
      if (e.key === '0') handleReset();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, scale]);

  if (!isOpen || gallery.length === 0) return null;

  const currentItem = gallery[currentIndex] || gallery[0];

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 4));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % gallery.length);
    handleReset();
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + gallery.length) % gallery.length);
    handleReset();
  };

  // Zoom qua con lăn chuột (Mouse Wheel)
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale(prev => Math.min(prev + 0.15, 4));
    } else {
      setScale(prev => Math.max(prev - 0.15, 0.5));
    }
  };

  // Kéo di chuyển ảnh khi đang phóng to
  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{ 
        background: 'rgba(0, 0, 0, 0.92)', 
        zIndex: 99999, 
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Top Controls Bar */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
          color: '#ffffff',
          zIndex: 10
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.15rem', color: '#fef08a', margin: 0, fontFamily: 'var(--font-display)' }}>
            {currentItem.title}
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: '2px 0 0 0' }}>
            {currentItem.subtitle || `Hình ảnh thực tế ${currentIndex + 1} / ${gallery.length}`} • Cuộn chuột hoặc bấm nút để Phóng to / Thu nhỏ
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleZoomOut}
            title="Thu nhỏ (-)"
            style={{ padding: '7px 12px', fontSize: '0.85rem' }}
          >
            <ZoomOut size={16} />
          </button>

          <span style={{ fontSize: '0.88rem', color: '#fef3c7', minWidth: '46px', textAlign: 'center', fontWeight: 600 }}>
            {Math.round(scale * 100)}%
          </span>

          <button
            type="button"
            className="btn btn-outline"
            onClick={handleZoomIn}
            title="Phóng to (+)"
            style={{ padding: '7px 12px', fontSize: '0.85rem' }}
          >
            <ZoomIn size={16} />
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={handleReset}
            title="Khôi phục kích thước ban đầu (100%)"
            style={{ padding: '7px 12px', fontSize: '0.85rem' }}
          >
            <Maximize2 size={16} />
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={handleRotate}
            title="Xoay 90 độ"
            style={{ padding: '7px 12px', fontSize: '0.85rem' }}
          >
            <RotateCw size={16} />
          </button>

          <a
            href={currentItem.url}
            download={`${currentItem.id || 'decor'}.jpg`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-gold"
            title="Tải ảnh gốc về máy"
            style={{ padding: '7px 14px', fontSize: '0.85rem' }}
          >
            <Download size={16} />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-crimson"
            title="Đóng (Esc)"
            style={{ padding: '7px 14px', marginLeft: '8px', fontSize: '0.85rem' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div 
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          userSelect: 'none'
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Previous Button */}
        {gallery.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 20,
              transition: 'all 0.2s'
            }}
            title="Xem ảnh trước (Phím mũi tên trái)"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Display Image */}
        <div style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={currentItem.url}
            alt={currentItem.title}
            style={{
              maxWidth: '85vw',
              maxHeight: '75vh',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Navigation Next Button */}
        {gallery.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 20,
              transition: 'all 0.2s'
            }}
            title="Xem ảnh kế tiếp (Phím mũi tên phải)"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Bottom Thumbnails Strip */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: '12px 20px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          overflowX: 'auto',
          zIndex: 10
        }}
      >
        {gallery.map((img, idx) => (
          <div
            key={img.id || idx}
            onClick={() => {
              setCurrentIndex(idx);
              handleReset();
            }}
            style={{
              width: '76px',
              height: '52px',
              borderRadius: '6px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: idx === currentIndex ? '2px solid #eab308' : '2px solid rgba(255,255,255,0.25)',
              opacity: idx === currentIndex ? 1 : 0.6,
              transform: idx === currentIndex ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.2s',
              boxShadow: idx === currentIndex ? '0 0 12px rgba(234, 179, 8, 0.5)' : 'none',
              flexShrink: 0
            }}
            title={img.title}
          >
            <img 
              src={img.url} 
              alt={img.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
