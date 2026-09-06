import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Home, 
  Armchair, 
  Gift, 
  HeartHandshake, 
  Crown, 
  Mail, 
  Utensils, 
  FileCheck, 
  AlertCircle,
  Printer,
  PenTool,
  QrCode,
  FileSignature,
  Maximize2,
  ZoomIn,
  Eye
} from 'lucide-react';

export default function ContractDashboard({ 
  contractData, 
  onPrint, 
  onOpenSignature, 
  onOpenQR, 
  onSwitchToA4,
  onOpenImage
}) {
  const [activeMenuTab, setActiveMenuTab] = useState('man');
  const { partyA, partyB, financials, decorItems, menus, timelineMilestones } = contractData;

  const formatVND = (val) => new Intl.NumberFormat('vi-VN').format(val) + ' VNĐ';

  const getDecorIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={20} />;
      case 'Home': return <Home size={20} />;
      case 'Armchair': return <Armchair size={20} />;
      case 'Gift': return <Gift size={20} />;
      case 'HeartHandshake': return <HeartHandshake size={20} />;
      case 'Crown': return <Crown size={20} />;
      case 'Mail': return <Mail size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  return (
    <div className="content-wrapper">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <span className="badge-gold">
            <Sparkles size={13} />
            HỢP ĐỒNG DỊCH VỤ TIỆC CƯỚI TRỌN GÓI
          </span>
          <span className="badge-crimson">
            <Calendar size={13} />
            NGÀY TỔ CHỨC: {partyB.eventDate}
          </span>
          <span className="badge-success">
            <ShieldCheck size={13} />
            ĐÃ KÝ KẾT PHÁP LÝ
          </span>
        </div>

        <h1 className="hero-title">
          Hôn Lễ: {partyB.representative}
        </h1>

        <div className="hero-info-grid">
          <div className="hero-info-item">
            <span className="hero-info-label">Đơn vị thực hiện:</span>
            <span className="hero-info-value">
              <strong>{partyA.businessName}</strong>
              <span className="hero-info-sub"> — Đại diện: {partyA.representative}</span>
            </span>
          </div>

          <div className="hero-info-item">
            <span className="hero-info-label">Địa điểm tổ chức:</span>
            <span className="hero-info-value">
              <strong>{partyB.eventPlace}</strong>
            </span>
          </div>
        </div>

        <div className="hero-action-buttons">
          <button className="btn btn-gold" onClick={onSwitchToA4}>
            <Printer size={16} />
            <span>Xem & In Bản Hợp Đồng A4</span>
          </button>
          <button className="btn btn-outline" onClick={onOpenQR}>
            <QrCode size={16} />
            <span>Mã VietQR Thanh Toán</span>
          </button>
          <button className="btn btn-outline" onClick={onOpenSignature}>
            <PenTool size={16} />
            <span>Ký Tên Điện Tử</span>
          </button>
        </div>
      </div>

      {/* Financial & Status Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card highlight">
          <div className="stat-card-header">
            <span className="stat-label">Tổng Giá Trị Hợp Đồng</span>
            <span className="badge-gold">Trọn Gói</span>
          </div>
          <div className="stat-value">{formatVND(financials.totalAmount)}</div>
          <div className="stat-sub" style={{ fontStyle: 'italic', color: '#854d0e' }}>
            {financials.totalAmountInWords}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Đặt Cọc Đợt 1</span>
            <span className="badge-success">{financials.depositPercentage} • Đã Cọc</span>
          </div>
          <div className="stat-value" style={{ color: '#059669' }}>{formatVND(financials.depositAmount)}</div>
          <div className="stat-sub">
            Đã thanh toán ngày ký kết ({financials.depositDate})
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Thanh Toán Đợt 2</span>
            <span className="badge-crimson">Bàn Giao Tiệc</span>
          </div>
          <div className="stat-value" style={{ color: '#b8233d' }}>{formatVND(financials.remainingAmount)}</div>
          <div className="stat-sub" style={{ fontWeight: 600, color: '#991b1b' }}>
            "{financials.remainingPaymentTerm}"
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Cam Kết Tiến Độ</span>
            <span className="badge-gold">Trước Giờ G</span>
          </div>
          <div className="stat-value" style={{ color: '#0284c7', fontSize: '1.45rem' }}>
            Trước giờ đón ≥ 8h
          </div>
          <div className="stat-sub">
            Hoàn thiện decor & bàn tiệc trước khi đón khách 8 tiếng
          </div>
        </div>
      </div>

      {/* Hai bên tham gia hợp đồng */}
      <div className="parties-grid">
        {/* Bên Cho Thuê - Bên A */}
        <div className="party-card">
          <div className="party-header">
            <span className="party-badge">BÊN CHO THUÊ (BÊN A)</span>
            <span className="badge-gold">Nhà Cung Cấp</span>
          </div>
          <h3 className="party-name">{partyA.businessName}</h3>
          
          <div className="party-row">
            <span className="party-row-label">Đại diện:</span>
            <span className="party-row-value">{partyA.representative}</span>
          </div>
          <div className="party-row">
            <span className="party-row-label">Chức vụ:</span>
            <span className="party-row-value">{partyA.role}</span>
          </div>
          <div className="party-row">
            <span className="party-row-label">Địa chỉ:</span>
            <span className="party-row-value">{partyA.address}</span>
          </div>
          <div className="party-row">
            <span className="party-row-label">Hotline / Zalo:</span>
            <span className="party-row-value" style={{ color: '#9e1b32', fontWeight: 700 }}>
              {partyA.phone}
            </span>
          </div>
          <div className="party-row">
            <span className="party-row-label">Số tài khoản:</span>
            <span className="party-row-value">
              {partyA.accountNumber} ({partyA.bankName})
            </span>
          </div>

          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #ecd8c2' }}>
            <button 
              className="btn btn-outline" 
              onClick={onOpenQR}
              style={{ width: '100%', fontSize: '0.82rem', padding: '6px 10px', color: '#9e1b32', borderColor: 'rgba(212, 175, 55, 0.4)', background: '#fffcf7' }}
            >
              <QrCode size={14} />
              <span>Xem Danh Thiếp MB Bank & Mã QR</span>
            </button>
          </div>
        </div>

        {/* Bên Thuê - Bên B */}
        <div className="party-card">
          <div className="party-header">
            <span className="party-badge" style={{ color: '#047857' }}>BÊN THUÊ DỊCH VỤ (BÊN B)</span>
            <span className="badge-crimson">Khách Hàng</span>
          </div>
          <h3 className="party-name">{partyB.representative}</h3>
          
          <div className="party-row">
            <span className="party-row-label">Tư cách:</span>
            <span className="party-row-value">{partyB.role}</span>
          </div>
          <div className="party-row">
            <span className="party-row-label">Số điện thoại:</span>
            <span className="party-row-value" style={{ color: '#9e1b32', fontWeight: 700 }}>
              {partyB.phone}
            </span>
          </div>
          <div className="party-row">
            <span className="party-row-label">Địa chỉ tư gia:</span>
            <span className="party-row-value">{partyB.address}</span>
          </div>
          <div className="party-row">
            <span className="party-row-label">Ngày tổ chức:</span>
            <span className="party-row-value" style={{ color: '#0369a1', fontWeight: 700 }}>
              {partyB.eventDate} (Dương Lịch)
            </span>
          </div>
          <div className="party-row">
            <span className="party-row-label">Địa điểm tiệc:</span>
            <span className="party-row-value">{partyB.eventPlace}</span>
          </div>
        </div>
      </div>

      {/* Timeline Tiến Độ 6 Giai Đoạn Trực Quan */}
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#9e1b32', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={22} />
              Lịch Trình & Timeline Thi Công Từng Mốc Cụ Thể
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
              Cam kết tiến độ rõ ràng theo từng ngày và mốc giờ thi công thực tế tại gia
            </p>
          </div>
          <span className="badge-gold">Quy Trình Chuẩn 6 Bước</span>
        </div>

        <div className="timeline-container">
          {timelineMilestones.map((item, index) => (
            <div className="timeline-step" key={item.id}>
              <div className="timeline-icon-box">
                {index + 1}
              </div>
              <div className="timeline-content-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
                  <span className="timeline-date-badge">{item.date}</span>
                  <span className={item.status === 'completed' ? 'badge-success' : 'badge-crimson'}>
                    {item.badge}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#1e293b', fontWeight: 700, marginBottom: '4px' }}>
                  {item.title}
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#9e1b32', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
                  {item.phase}
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7 Hạng Mục Thi Công Decor Chi Tiết */}
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#9e1b32', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={22} />
              Chi Tiết 7 Hạng Mục Thi Công Decor & Bàn Giao
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
              Toàn bộ vật tư, thiết bị trang trí cao cấp đồng bộ tone màu đỏ may mắn & thịnh vượng
            </p>
          </div>
          <span className="badge-crimson">Tone Màu Đỏ Hoàn Hảo</span>
        </div>

        <div className="decor-grid">
          {decorItems.map((item) => (
            <div className="decor-card" key={item.id}>
              <div className="decor-card-header">
                <div className="decor-icon">
                  {getDecorIcon(item.icon)}
                </div>
                <h3 className="decor-title">{item.name}</h3>
              </div>
              <div className="decor-spec">{item.specification}</div>
              <p className="decor-desc">{item.description}</p>

              {/* Hình ảnh thực tế khi có ảnh đính kèm */}
              {item.imageUrl && (
                <div 
                  className="decor-img-preview-box"
                  onClick={() => onOpenImage && onOpenImage({
                    url: item.imageUrl,
                    title: item.imageTitle || item.name,
                    subtitle: item.specification,
                    id: item.id
                  })}
                  title="Rê chuột & Nhấp để phóng to / thu nhỏ"
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="decor-img-thumbnail" 
                  />
                  <div className="decor-img-overlay">
                    <Maximize2 size={18} />
                    <span>Rê chuột & Nhấp để phóng to / thu nhỏ</span>
                  </div>
                  <span className="decor-img-badge">
                    <Eye size={12} />
                    Ảnh mẫu thực tế
                  </span>
                </div>
              )}

              <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px dashed #edd8c2', fontSize: '0.78rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} /> {item.status}
                </span>

                {item.imageUrl && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenImage && onOpenImage({
                        url: item.imageUrl,
                        title: item.imageTitle || item.name,
                        subtitle: item.specification,
                        id: item.id
                      });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9e1b32',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 4px',
                      borderRadius: '4px'
                    }}
                  >
                    <ZoomIn size={13} /> Phóng to
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thực Đơn Tiệc Cưới: Menu Mặn & Menu Chay */}
      <div className="glass-panel">
        <div className="menu-header-top">
          <div>
            <h2 className="menu-header-title">
              <Utensils size={22} className="menu-header-icon" />
              <span>Thực Đơn Tiệc Cưới Trọn Gói <span className="menu-header-sub">(Menu Tiệc)</span></span>
            </h2>
            <p className="menu-header-desc">
              Cam kết 100% nguyên liệu tươi sống mỗi ngày, chế biến hợp vệ sinh ATTP, phục vụ nóng sốt
            </p>
          </div>

          <div className="menu-tabs">
            <button 
              className={`menu-tab-btn ${activeMenuTab === 'man' ? 'active' : ''}`}
              onClick={() => setActiveMenuTab('man')}
            >
              Menu Tiệc Mặn (6 Món)
            </button>
            <button 
              className={`menu-tab-btn ${activeMenuTab === 'chay' ? 'active' : ''}`}
              onClick={() => setActiveMenuTab('chay')}
            >
              Menu Món Chay (6 Món)
            </button>
          </div>
        </div>

        <div className="menu-items-list">
          {menus[activeMenuTab].map((dish) => (
            <div className="menu-item-row" key={dish.step}>
              <div className="menu-item-num">{dish.step}</div>
              <div>
                <h4 className="menu-item-name">{dish.name}</h4>
                <p className="menu-item-desc">{dish.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cam Kết Pháp Lý & Nút Thao Tác Cuối */}
      <div className="glass-panel legal-commitment-panel" style={{ background: 'linear-gradient(135deg, #fffcf7 0%, #fff7eb 100%)', border: '1.5px solid #d4af37' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <ShieldCheck size={28} color="#9e1b32" />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#9e1b32' }}>
            Cam Kết Giá Trị Pháp Lý & Bảo Vệ Quyền Lợi Hai Bên
          </h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '16px', lineHeight: 1.6 }}>
          Hợp đồng được xác lập tuân thủ nghiêm ngặt theo các quy định của Bộ luật Dân sự 2015 và Luật Thương mại nước CHXHCN Việt Nam. Mọi điều khoản về an toàn kết cấu rạp, bảo hiểm chất lượng ẩm thực, trách nhiệm bảo mật và chính sách bồi thường khi phát sinh sự cố đều được quy định minh bạch, rõ ràng.
        </p>

        <div className="legal-footer-bar">
          <div className="legal-sign-status-row">
            <div className="legal-sign-status-card">
              <div className="legal-sign-left">
                <CheckCircle2 size={17} color="#059669" className="legal-sign-icon" />
                <span className="legal-sign-role">Bên A:</span>
                <strong className="legal-sign-name">{partyA.representative}</strong>
              </div>
              <span className="badge-success legal-sign-status-badge">Đã xác nhận</span>
            </div>

            <div className="legal-sign-status-card">
              <div className="legal-sign-left">
                <PenTool size={17} color={partyB.signatureImg ? '#059669' : '#b8860b'} className="legal-sign-icon" />
                <span className="legal-sign-role">Bên B:</span>
                <strong className="legal-sign-name">{partyB.representative}</strong>
              </div>
              <span className={partyB.signatureImg ? "badge-success legal-sign-status-badge" : "badge-gold legal-sign-status-badge"}>
                {partyB.signatureImg ? "Đã ký số" : "Sẵn sàng ký"}
              </span>
            </div>
          </div>

          <div className="legal-actions-group">
            <button className="btn btn-crimson" onClick={onOpenSignature}>
              <FileSignature size={16} />
              <span>Ký Tên Ngay</span>
            </button>
            <button className="btn btn-gold" onClick={onSwitchToA4}>
              <Printer size={16} />
              <span>Xuất / In Khổ A4</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
