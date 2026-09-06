import React, { useRef, useState, useEffect } from 'react';
import { X, Eraser, Check, Pen, FileSignature, Sparkles } from 'lucide-react';

export default function SignatureModal({ 
  isOpen, 
  onClose, 
  onSaveSignature,
  partyAName,
  partyBName 
}) {
  const canvasRef = useRef(null);
  const [targetParty, setTargetParty] = useState('partyB'); // 'partyA' hoặc 'partyB'
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Khởi tạo Canvas nét ký
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set kích thước thực tế
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Reset background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }, [isOpen, targetParty]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Mẫu chữ ký giống ảnh gốc của Bên A (Nguyễn Thành Luân)
  const applySampleSignaturePartyA = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    clearCanvas();

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const w = canvas.width;
    const h = canvas.height;
    const cx = w * 0.4;
    const cy = h * 0.5;

    // Vẽ nét ký nghệ thuật tương tự mẫu ảnh 4
    ctx.beginPath();
    ctx.moveTo(cx - 50, cy + 30);
    ctx.bezierCurveTo(cx - 30, cy - 20, cx - 10, cy - 40, cx, cy - 20);
    ctx.bezierCurveTo(cx + 10, cy + 10, cx - 20, cy + 35, cx - 5, cy + 25);
    ctx.bezierCurveTo(cx + 25, cy + 5, cx + 50, cy - 35, cx + 80, cy - 20);
    ctx.bezierCurveTo(cx + 95, cy - 10, cx + 70, cy + 20, cx + 110, cy + 5);
    ctx.bezierCurveTo(cx + 130, cy - 5, cx + 150, cy, cx + 160, cy);
    ctx.stroke();

    // Nét gạch dưới phóng khoáng
    ctx.beginPath();
    ctx.moveTo(cx - 20, cy + 15);
    ctx.quadraticCurveTo(cx + 60, cy + 30, cx + 140, cy + 18);
    ctx.stroke();

    setHasDrawn(true);
  };

  // Mẫu chữ ký mẫu cho Bên B (Nguyễn Việt Hưng)
  const applySampleSignaturePartyB = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    clearCanvas();

    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const w = canvas.width;
    const h = canvas.height;
    const cx = w * 0.35;
    const cy = h * 0.5;

    // Nét chữ ký Hưng phóng khoáng
    ctx.beginPath();
    ctx.moveTo(cx - 40, cy + 25);
    ctx.lineTo(cx - 30, cy - 35);
    ctx.bezierCurveTo(cx - 20, cy - 10, cx - 10, cy - 5, cx, cy - 30);
    ctx.lineTo(cx + 10, cy + 25);
    ctx.bezierCurveTo(cx + 25, cy + 10, cx + 45, cy - 20, cx + 60, cy - 10);
    ctx.bezierCurveTo(cx + 70, cy, cx + 85, cy + 20, cx + 110, cy + 15);
    ctx.quadraticCurveTo(cx + 130, cy + 10, cx + 150, cy + 20);
    ctx.stroke();

    // Vòng cung phong thủy
    ctx.beginPath();
    ctx.arc(cx + 60, cy - 5, 28, 0.2 * Math.PI, 1.6 * Math.PI);
    ctx.stroke();

    setHasDrawn(true);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSaveSignature(targetParty, dataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileSignature color="#9e1b32" size={22} />
            <h3>Ký Tên Điện Tử Trực Tiếp</h3>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Chọn bên ký */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
              Chọn Bên Thực Hiện Ký Tên:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className={`btn ${targetParty === 'partyB' ? 'btn-crimson' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '8px 12px', fontSize: '0.88rem' }}
                onClick={() => setTargetParty('partyB')}
              >
                <span>Bên B: {partyBName} (Khách Hàng)</span>
              </button>
              <button
                type="button"
                className={`btn ${targetParty === 'partyA' ? 'btn-crimson' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '8px 12px', fontSize: '0.88rem' }}
                onClick={() => setTargetParty('partyA')}
              >
                <span>Bên A: {partyAName}</span>
              </button>
            </div>
          </div>

          {/* Vùng Canvas ký */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.84rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Pen size={14} /> Dùng ngón tay hoặc chuột để vẽ chữ ký vào ô bên dưới
              </span>
              <button
                type="button"
                onClick={clearCanvas}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#dc2626', 
                  fontSize: '0.82rem', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 600
                }}
              >
                <Eraser size={14} /> Xóa làm lại
              </button>
            </div>

            <div style={{ 
              border: '2px dashed #cbd5e1', 
              borderRadius: '12px', 
              background: '#ffffff',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}>
              <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '180px', display: 'block', touchAction: 'none', cursor: 'crosshair' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
          </div>

          {/* Nút dùng chữ ký mẫu theo thực tế ảnh gốc */}
          <div style={{ 
            background: '#f8fafc', 
            borderRadius: '8px', 
            padding: '10px 14px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ fontSize: '0.82rem', color: '#475569' }}>
              {targetParty === 'partyA' ? 'Áp dụng chữ ký gốc của Nguyễn Thành Luân:' : 'Áp dụng chữ ký mẫu nhanh cho Nguyễn Việt Hưng:'}
            </span>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.8rem', gap: '4px' }}
              onClick={targetParty === 'partyA' ? applySampleSignaturePartyA : applySampleSignaturePartyB}
            >
              <Sparkles size={13} color="#c59b27" />
              <span>Nạp Mẫu Ký</span>
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Hủy Bỏ
          </button>
          <button 
            type="button" 
            className="btn btn-crimson" 
            onClick={handleSave}
            disabled={!hasDrawn}
          >
            <Check size={16} />
            <span>Lưu Chữ Ký Vào Hợp Đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
