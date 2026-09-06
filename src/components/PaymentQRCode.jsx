import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  ShieldCheck, 
  Download, 
  Sparkles,
  CreditCard,
  Loader2
} from 'lucide-react';

// Hàm vẽ khung bo tròn góc tương thích mọi trình duyệt
function drawRoundRectPath(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export default function PaymentQRCode({ isOpen, onClose, financials, partyA, partyB }) {
  const [cardTheme, setCardTheme] = useState('crimson'); // 'crimson' | 'gold'
  const [copiedField, setCopiedField] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [qrBase64, setQrBase64] = useState('');

  // Nội dung chuyển khoản theo yêu cầu chính xác của người dùng
  const transferNote = 'Nguyen Viet Hung Tien cuoi 18/112026';

  // URL VietQR Napas 24/7 mẫu compact sắc nét (mã QR to rõ)
  const vietQrUrl = `https://img.vietqr.io/image/MB-0907895911-compact.png?addInfo=${encodeURIComponent(transferNote)}&accountName=NGUYEN%20THANH%20LUAN`;

  // Chuyển ảnh QR sang Base64 để vẽ lên Canvas mượt mà, không dính lỗi CORS
  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    fetch(vietQrUrl)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (isMounted) setQrBase64(reader.result);
        };
        reader.readAsDataURL(blob);
      })
      .catch(err => {
        console.warn('Lỗi load base64 VietQR:', err);
      });
    return () => { isMounted = false; };
  }, [isOpen, vietQrUrl]);

  if (!isOpen) return null;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Tải về toàn bộ tấm thẻ thanh toán VIP (khung vàng, nền nhung đỏ, logo, STK, mã QR, slogan)
  const handleDownloadCard = () => {
    setIsDownloading(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const onImageLoaded = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 760;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Không thể tạo Canvas 2D context');

        const theme = cardTheme;

        // 1. Khung bo tròn viền ngoài
        drawRoundRectPath(ctx, 0, 0, 1200, 760, 36);
        ctx.save();
        ctx.clip();

        // 2. Nền Gradient nhung cao cấp
        const bgGrad = ctx.createLinearGradient(0, 0, 1200, 760);
        if (theme === 'crimson') {
          bgGrad.addColorStop(0, '#4a040f');
          bgGrad.addColorStop(0.45, '#750819');
          bgGrad.addColorStop(1, '#350208');
        } else {
          bgGrad.addColorStop(0, '#1c1917');
          bgGrad.addColorStop(0.5, '#292524');
          bgGrad.addColorStop(1, '#0f0d0c');
        }
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1200, 760);

        // 3. Chữ Hỷ chìm phong thủy
        ctx.font = 'bold 260px "Playfair Display", "Times New Roman", serif';
        ctx.fillStyle = theme === 'crimson' ? 'rgba(212, 175, 55, 0.055)' : 'rgba(246, 226, 122, 0.055)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText('囍', 1180, 750);

        // 4. Viền vàng ngoài
        ctx.restore(); // Bỏ clip để vẽ stroke sắc nét
        ctx.lineWidth = 6;
        ctx.strokeStyle = theme === 'crimson' ? '#d4af37' : '#f6e27a';
        drawRoundRectPath(ctx, 3, 3, 1194, 754, 33);
        ctx.stroke();

        // 5. Viền chỉ vàng đứt khúc bên trong
        ctx.lineWidth = 2;
        ctx.strokeStyle = theme === 'crimson' ? 'rgba(212, 175, 55, 0.45)' : 'rgba(246, 226, 122, 0.45)';
        ctx.setLineDash([10, 8]);
        drawRoundRectPath(ctx, 14, 14, 1172, 732, 26);
        ctx.stroke();
        ctx.setLineDash([]); // Reset nét đứt

        // 6. Header: Canh giữa Logo TL + Tên thương hiệu
        const logoCenterX = 345;
        const logoCenterY = 82;
        const logoRadius = 32;

        // Vẽ logo tròn TL
        const logoGrad = ctx.createLinearGradient(logoCenterX - logoRadius, logoCenterY - logoRadius, logoCenterX + logoRadius, logoCenterY + logoRadius);
        logoGrad.addColorStop(0, '#d4af37');
        logoGrad.addColorStop(1, '#8a6b12');
        ctx.fillStyle = logoGrad;
        ctx.beginPath();
        ctx.arc(logoCenterX, logoCenterY, logoRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#f6e59e';
        ctx.beginPath();
        ctx.arc(logoCenterX, logoCenterY, logoRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '800 26px "Playfair Display", Georgia, serif';
        ctx.fillStyle = '#382003';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('TL', logoCenterX, logoCenterY + 1);

        // Tên thương hiệu bên cạnh logo
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.font = 'bold 30px "Playfair Display", Georgia, serif';
        ctx.fillStyle = '#fef08a';
        ctx.fillText('CƯỚI HỎI TRỌN GÓI THÀNH LUÂN', logoCenterX + 46, 76);

        ctx.font = '600 15px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#fed7aa';
        ctx.fillText('HỢP ĐỒNG DỊCH VỤ CƯỚI & TRANG TRÍ SỰ KIỆN', logoCenterX + 46, 102);

        // Đường kẻ phân cách Header
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = theme === 'crimson' ? 'rgba(212, 175, 55, 0.35)' : 'rgba(246, 226, 122, 0.35)';
        ctx.beginPath();
        ctx.moveTo(50, 136);
        ctx.lineTo(1150, 136);
        ctx.stroke();

        // 7. Cột Trái: Khung trắng vuông vức chuẩn tỷ lệ 1:1 chứa mã QR
        const qrFrameX = 75;
        const qrFrameY = 175;
        const qrFrameSize = 390; // Vuông vức 1:1 hoàn hảo
        drawRoundRectPath(ctx, qrFrameX, qrFrameY, qrFrameSize, qrFrameSize, 22);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#d4af37';
        ctx.stroke();

        // Vẽ ảnh VietQR chuẩn vuông vức 1:1 không bị bóp méo
        const qrImgPad = 12;
        const qrImgSize = qrFrameSize - qrImgPad * 2; // 366 x 366 px
        ctx.drawImage(img, qrFrameX + qrImgPad, qrFrameY + qrImgPad, qrImgSize, qrImgSize);

        // 8. Cột Phải: Thông tin chi tiết tài khoản
        const detailX = 505;
        ctx.textAlign = 'left';

        // Mục 1: STK
        ctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#fed7aa';
        ctx.fillText('SỐ TÀI KHOẢN MB BANK:', detailX, 210);

        ctx.font = '800 46px "Courier New", Courier, monospace';
        ctx.fillStyle = '#fef08a';
        ctx.fillText('0907  895  911', detailX, 262);

        // Mục 2: Chủ TK
        ctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#fed7aa';
        ctx.fillText('CHỦ TÀI KHOẢN:', detailX, 322);

        ctx.font = 'bold 30px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('NGUYỄN THÀNH LUÂN', detailX, 360);

        // Mục 3: Ngân hàng
        ctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#fed7aa';
        ctx.fillText('NGÂN HÀNG:', detailX, 418);

        ctx.font = '500 23px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#f1f5f9';
        ctx.fillText('MB Bank — Chi Nhánh Tây Đô (Cần Thơ)', detailX, 454);

        // Mục 4: Cơ sở thi công
        ctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#fed7aa';
        ctx.fillText('CƠ SỞ THI CÔNG:', detailX, 512);

        ctx.font = '500 23px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#f1f5f9';
        ctx.fillText('198 Đinh Công Chánh, P. Long Tuyền, TP. Cần Thơ', detailX, 548);

        ctx.font = '500 23px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#f1f5f9';
        ctx.fillText('198 Đinh Công Chánh, P. Long Tuyền, TP. Cần Thơ', detailX, 542);

        // 9. Đường kẻ phân cách Footer
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = theme === 'crimson' ? 'rgba(212, 175, 55, 0.35)' : 'rgba(246, 226, 122, 0.35)';
        ctx.beginPath();
        ctx.moveTo(50, 620);
        ctx.lineTo(1150, 620);
        ctx.stroke();

        // 10. Footer: Slogan & Cảm ơn
        ctx.textAlign = 'center';
        ctx.font = 'italic 31px "Alex Brush", cursive, "Playfair Display", serif';
        ctx.fillStyle = '#fef08a';
        ctx.fillText('"Cưới Hỏi Trọn Gói Thành Luân Vẽ Tiếp Câu Chuyện Tình Của Bạn"', 600, 672);

        ctx.font = '500 18px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#fed7aa';
        ctx.fillText('Thành Luân Xin Cảm Ơn Dâu Rể Đã Tin Tưởng 💕', 600, 712);

        // 11. Xuất file PNG
        const imageUri = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `The-Thanh-Toan-Thanh-Luan-${theme === 'crimson' ? 'Do-Nhung' : 'Vang-Luxury'}.png`;
        link.href = imageUri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Lỗi khi vẽ thẻ VIP:', err);
      } finally {
        setIsDownloading(false);
      }
    };

    img.onload = onImageLoaded;
    img.onerror = () => {
      setIsDownloading(false);
      console.error('Không tải được ảnh VietQR');
    };
    img.src = qrBase64 || vietQrUrl;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '660px' }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <QrCode color="#9e1b32" size={22} />
            <h3>Thẻ Thanh Toán & Mã VietQR Thành Luân</h3>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Thanh hướng dẫn & Tùy chọn Theme thẻ */}
          <div className="payment-modal-top-bar">
            <div className="payment-modal-hint">
              <Sparkles size={15} color="#d4af37" />
              <span>Quét mã bằng App Ngân Hàng — Số tiền tùy ý</span>
            </div>

            {/* Đổi màu theme thẻ */}
            <div className="payment-modal-theme-btns">
              <button
                type="button"
                onClick={() => setCardTheme('crimson')}
                className={`theme-toggle-btn ${cardTheme === 'crimson' ? 'active crimson' : ''}`}
                title="Tone Đỏ Nhung Hoàng Gia"
              >
                Đỏ Nhung
              </button>
              <button
                type="button"
                onClick={() => setCardTheme('gold')}
                className={`theme-toggle-btn ${cardTheme === 'gold' ? 'active gold' : ''}`}
                title="Tone Vàng Titanium Sang Trọng"
              >
                Vàng Luxury
              </button>
            </div>
          </div>

          {/* ================= THẺ THANH TOÁN VIP RENDER SẮC NÉT ================= */}
          <div className={`luxury-payment-card theme-${cardTheme}`}>
            {/* Khung viền chỉ vàng */}
            <div className="luxury-card-inner-border"></div>
            {/* Chữ Hỷ chìm phong thủy */}
            <div className="luxury-card-watermark">囍</div>

            {/* Header Thẻ */}
            <div className="luxury-card-header">
              <div className="luxury-card-brand">
                <div className="luxury-card-logo">TL</div>
                <div className="luxury-card-brand-text">
                  <h4>CƯỚI HỎI TRỌN GÓI THÀNH LUÂN</h4>
                  <p>Hợp Đồng Dịch Vụ Cưới & Trang Trí Sự Kiện</p>
                </div>
              </div>
            </div>

            {/* Thân Thẻ: 2 Cột Sắc Nét */}
            <div className="luxury-card-body">
              {/* Cột 1: Mã VietQR HD To Rõ */}
              <div className="luxury-qr-frame">
                <img 
                  src={qrBase64 || vietQrUrl} 
                  alt="Mã VietQR Chuyển Khoản MB Bank Thành Luân" 
                  className="luxury-qr-img"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    // Fallback nếu kết nối mạng chậm
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div style={{ display: 'none', padding: '24px 6px', color: '#64748b' }}>
                  <CreditCard size={36} style={{ margin: '0 auto 6px', color: '#9e1b32' }} />
                  <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>0907895911</p>
                </div>
              </div>

              {/* Cột 2: Thông tin chi tiết */}
              <div className="luxury-card-details">
                {/* Số tài khoản */}
                <div className="luxury-detail-item">
                  <span className="luxury-detail-label">Số Tài Khoản MB Bank:</span>
                  <div className="luxury-stk-row">
                    <span className="luxury-stk-number">0907 895 911</span>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard('0907895911', 'acc')}
                      className="luxury-copy-btn"
                      title="Sao chép số tài khoản"
                    >
                      {copiedField === 'acc' ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copiedField === 'acc' ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                </div>

                {/* Chủ tài khoản */}
                <div className="luxury-detail-item">
                  <span className="luxury-detail-label">Chủ Tài Khoản:</span>
                  <span className="luxury-holder-name">NGUYỄN THÀNH LUÂN</span>
                </div>

                {/* Ngân hàng & Chi nhánh */}
                <div className="luxury-detail-item">
                  <span className="luxury-detail-label">Ngân Hàng:</span>
                  <span className="luxury-detail-sub">MB Bank — Chi Nhánh Tây Đô (Cần Thơ)</span>
                </div>

                {/* Địa chỉ cơ sở */}
                <div className="luxury-detail-item">
                  <span className="luxury-detail-label">Cơ Sở Thi Công:</span>
                  <span className="luxury-detail-sub">198 Đinh Công Chánh, P. Long Tuyền, TP. Cần Thơ</span>
                </div>
              </div>
            </div>

            {/* Footer Thẻ */}
            <div className="luxury-card-footer">
              <div className="luxury-slogan">
                "Cưới Hỏi Trọn Gói Thành Luân Vẽ Tiếp Câu Chuyện Tình Của Bạn"
              </div>
              <div className="luxury-thanks">
                Thành Luân Xin Cảm Ơn Dâu Rể Đã Tin Tưởng 💕
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#059669" />
            Tài khoản chính thức đã được xác thực của Cơ sở THÀNH LUÂN WEDDING & DECOR
          </p>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
          <button
            type="button"
            className="btn btn-gold"
            onClick={handleDownloadCard}
            disabled={isDownloading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            {isDownloading ? <Loader2 size={16} className="spin-anim" /> : <Download size={16} />}
            <span>{isDownloading ? 'Đang xuất ảnh thẻ...' : 'Tải Ảnh Thẻ Thanh Toán VIP'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
