import React from 'react';
import { 
  Printer, 
  FileText, 
  LayoutDashboard, 
  PenTool, 
  QrCode, 
  PenLine, 
  Share2
} from 'lucide-react';

export default function Header({ 
  currentView, 
  setCurrentView, 
  onPrint, 
  onOpenSignature, 
  onOpenQuickEdit, 
  onOpenQR,
  onCopySummary
}) {
  return (
    <header className="app-header no-print">
      <div className="header-inner">
        {/* Brand info */}
        <div className="brand-wrapper">
          <div className="brand-logo-emblem" title="Thành Luân Wedding & Decor">
            TL
          </div>
          <div className="brand-text">
            <h1>THÀNH LUÂN WEDDING & DECOR</h1>
            <p>Hợp Đồng Dịch Vụ Cưới Trọn Gói • Số: HĐ-TLW/2026-0906/AG</p>
          </div>
        </div>

        {/* View mode switcher */}
        <div className="view-switcher">
          <button
            className={`switcher-btn ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
            title="Xem giao diện quản trị tổng quan"
          >
            <LayoutDashboard size={16} />
            <span>Quản Lý Tiến Độ</span>
          </button>
          <button
            className={`switcher-btn ${currentView === 'a4' ? 'active' : ''}`}
            onClick={() => setCurrentView('a4')}
            title="Xem trước văn bản in ấn A4 chuẩn pháp lý"
          >
            <FileText size={16} />
            <span>Bản In A4 Pháp Lý</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="header-actions">
          <button 
            className="btn btn-gold" 
            onClick={onPrint}
            title="Mở hộp thoại In hoặc Lưu file PDF khổ A4 chuẩn"
          >
            <Printer size={17} />
            <span>Xuất / In A4 (PDF)</span>
          </button>

          <button 
            className="btn btn-outline" 
            onClick={onOpenSignature}
            title="Ký tên số cho Đại diện Bên A và Bên B"
          >
            <PenTool size={16} />
            <span>Ký Điện Tử</span>
          </button>

          <button 
            className="btn btn-outline" 
            onClick={onOpenQR}
            title="Xem mã VietQR chuyển khoản thanh toán"
          >
            <QrCode size={16} />
            <span>Mã QR TT</span>
          </button>

          <button 
            className="btn btn-outline" 
            onClick={onOpenQuickEdit}
            title="Chỉnh sửa thông tin hợp đồng linh hoạt"
          >
            <PenLine size={16} />
            <span>Sửa Nhanh</span>
          </button>

          <button 
            className="btn btn-outline" 
            onClick={onCopySummary}
            title="Sao chép bản tóm tắt hợp đồng định dạng chuẩn để gửi Zalo cho khách hàng"
          >
            <Share2 size={16} />
            <span>Gửi Zalo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
