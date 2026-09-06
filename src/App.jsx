import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { initialContractData } from './data/contractData';
import Header from './components/Header';
import ContractDashboard from './components/ContractDashboard';
import A4ContractDocument from './components/A4ContractDocument';
import SignatureModal from './components/SignatureModal';
import QuickEditModal from './components/QuickEditModal';
import PaymentQRCode from './components/PaymentQRCode';
import ImageLightboxModal from './components/ImageLightboxModal';
import { Printer, ArrowLeft, PenTool, QrCode, CheckCircle2, FileDown } from 'lucide-react';
import './App.css';

export default function App() {
  const decorGallery = [
    {
      id: 'cong-cuoi',
      url: './decor-cong-rong-phung.jpg',
      title: 'Mẫu Cổng Cưới Rồng Phụng Tone Đỏ Thực Tế',
      subtitle: 'Rồng phụng chạm trổ tinh xảo, hoa đỏ thịnh vượng, đèn LED nghệ thuật'
    },
    {
      id: 'rap-cuoi',
      url: './decor-rap-ban-ghe.jpg',
      title: 'Mẫu Rạp Cưới Hiện Đại Lụa Buông & Bàn Ghế Tone Đỏ',
      subtitle: 'Khung không gian kiên cố chống mưa dông, trần lụa buông đỏ - trắng sang trọng'
    },
    {
      id: 'san-khau',
      url: './decor-san-khau-backdrop.jpg',
      title: 'Mẫu Sân Khấu & Backdrop Check-in Thực Tế',
      subtitle: 'Vòm backdrop nghệ thuật, cụm hoa rực rỡ, thảm cỏ xanh tiệc cưới'
    },
    {
      id: 'qr-card',
      url: './thanh-luan-qr-card.png',
      title: 'Card Danh Thiếp & Mã QR MB Bank',
      subtitle: 'STK: 0907895911 — MB Bank Chi Nhánh Tây Đô — Nguyễn Thành Luân'
    }
  ];

  const [contractData, setContractData] = useState(() => {
    const saved = localStorage.getItem('tlw_wedding_contract_2026');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initialContractData,
          ...parsed,
          partyA: {
            ...initialContractData.partyA,
            ...parsed.partyA,
            bankName: "MB Bank Chi Nhánh Tây Đô",
            qrCardImg: "./thanh-luan-qr-card.png",
            accountHolder: "Nguyễn Thành Luân"
          },
          timelineMilestones: initialContractData.timelineMilestones,
          decorItems: initialContractData.decorItems.map(item => {
            const savedItem = parsed.decorItems?.find(d => d.id === item.id);
            return { ...item, ...(savedItem || {}) };
          })
        };
      } catch (e) {
        return initialContractData;
      }
    }
    return initialContractData;
  });

  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'a4'
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isQuickEditModalOpen, setIsQuickEditModalOpen] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Lưu tự động vào LocalStorage
  useEffect(() => {
    localStorage.setItem('tlw_wedding_contract_2026', JSON.stringify(contractData));
  }, [contractData]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handlePrint = () => {
    // Nếu đang ở dashboard, tự động chuyển tạm sang A4 để in
    if (currentView !== 'a4') {
      setCurrentView('a4');
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      window.print();
    }
  };

  const handleSaveSignature = (targetParty, dataUrl) => {
    setContractData((prev) => {
      const updated = { ...prev };
      if (targetParty === 'partyA') {
        updated.partyA = { ...updated.partyA, signatureImg: dataUrl };
      } else {
        updated.partyB = { ...updated.partyB, signatureImg: dataUrl };
      }
      return updated;
    });

    // Bắn pháo hoa ăn mừng ký kết thành công
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#b8233d', '#f6e27a', '#ffffff']
    });

    showToast(`Đã lưu thành công chữ ký cho ${targetParty === 'partyA' ? 'Bên A (Thành Luân)' : 'Bên B (Nguyễn Việt Hưng)'}!`);
  };

  const handleUpdateContractData = (newData) => {
    setContractData(newData);
    showToast('Đã cập nhật thông tin hợp đồng thành công!');
  };

  const handleCopySummary = () => {
    const summaryText = `💍 HỢP ĐỒNG DỊCH VỤ CƯỚI TRỌN GÓI
Số hợp đồng: ${contractData.contractNumber}
Ngày lập: ${contractData.signingDate} tại ${contractData.signingPlace}
━━━━━━━━━━━━━━━━━━
🏢 ĐƠN VỊ THI CÔNG (BÊN A):
• ${contractData.partyA.businessName}
• Đại diện: ${contractData.partyA.representative}
• Hotline/Zalo: ${contractData.partyA.phone}
• Địa chỉ: ${contractData.partyA.address}
• STK: ${contractData.partyA.accountNumber} — ${contractData.partyA.bankName} (Chủ TK: ${contractData.partyA.accountHolder})

🤵👰 KHÁCH HÀNG (BÊN B):
• Họ tên: ${contractData.partyB.representative}
• SĐT: ${contractData.partyB.phone}
• Địa chỉ: ${contractData.partyB.address}
• Ngày tổ chức: ${contractData.partyB.eventDate}
• Địa điểm: ${contractData.partyB.eventPlace}

💰 CHI PHÍ & THANH TOÁN:
• Tổng trọn gói: ${new Intl.NumberFormat('vi-VN').format(contractData.financials.totalAmount)} VNĐ (${contractData.financials.totalAmountInWords})
• Đặt cọc Đợt 1 (${contractData.financials.depositPercentage}): ${new Intl.NumberFormat('vi-VN').format(contractData.financials.depositAmount)} VNĐ (Đã thanh toán)
• Đợt 2 Còn lại: ${new Intl.NumberFormat('vi-VN').format(contractData.financials.remainingAmount)} VNĐ
👉 "${contractData.financials.remainingPaymentTerm}"

✨ 7 HẠNG MỤC THI CÔNG DECOR:
1. Cổng cưới: Cổng Rồng Phụng Tone Đỏ
2. Rạp cưới: Rạp Trang Trí Hiện Đại Tone Đỏ
3. Bàn, ghế: Bàn tiệc & Bàn hai họ sang trọng bọc nơ
4. Thùng tiền cưới: Thùng tiền decor nghệ thuật an toàn
5. Trang trí gia tiên: Bàn thờ gia tiên trang nghiêm tone đỏ
6. Sân khấu & Backdrop: Decor sân khấu tiệc cưới & Backdrop check-in
7. Thiệp mời: 350 thiệp mời cao cấp

🍲 MENU TIỆC CƯỚI: 6 món Tiệc Mặn & 6 món Tiệc Chay
⏰ TIẾN ĐỘ: Bên A có mặt hoàn thiện trước giờ đón khách tối thiểu 8 giờ.
━━━━━━━━━━━━━━━━━━
🌐 Xem chi tiết & in hợp đồng A4 tại: http://localhost:5173/`;

    navigator.clipboard.writeText(summaryText);
    showToast('Đã sao chép tóm tắt hợp đồng! Bạn có thể dán (Ctrl + V) gửi qua Zalo ngay.');
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#047857',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 9999,
          fontWeight: 600,
          fontSize: '0.9rem',
          animation: 'fadeIn 0.3s ease'
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onPrint={handlePrint}
        onOpenSignature={() => setIsSignatureModalOpen(true)}
        onOpenQuickEdit={() => setIsQuickEditModalOpen(true)}
        onOpenQR={() => setIsQRModalOpen(true)}
        onCopySummary={handleCopySummary}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentView === 'dashboard' ? (
          <ContractDashboard
            contractData={contractData}
            onPrint={handlePrint}
            onOpenSignature={() => setIsSignatureModalOpen(true)}
            onOpenQR={() => setIsQRModalOpen(true)}
            onSwitchToA4={() => setCurrentView('a4')}
            onOpenImage={(img) => setActiveLightboxImage(img)}
          />
        ) : (
          <div className="a4-preview-mode">
            {/* Top Bar inside A4 preview for convenience */}
            <div className="no-print" style={{
              maxWidth: '210mm',
              width: '100%',
              boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              color: '#f8fafc'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setCurrentView('dashboard')}
                  style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                >
                  <ArrowLeft size={15} />
                  <span>Về Bảng Quản Trị</span>
                </button>
                <span style={{ fontSize: '0.9rem', color: '#fef3c7', fontWeight: 600 }}>
                  Chế Độ Xem Khổ A4 (Trọn Bộ 3 Trang Chuẩn Pháp Lý)
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn btn-gold" 
                  onClick={handlePrint}
                  style={{ padding: '6px 16px', fontSize: '0.88rem' }}
                >
                  <Printer size={15} />
                  <span>Xuất File PDF / In Ngay</span>
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setIsSignatureModalOpen(true)}
                  style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                >
                  <PenTool size={15} />
                  <span>Ký Số</span>
                </button>
              </div>
            </div>

            {/* A4 Document Pages Component */}
            <A4ContractDocument contractData={contractData} />
          </div>
        )}
      </main>

      {/* Signature Modal */}
      <SignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onSaveSignature={handleSaveSignature}
        partyAName={contractData.partyA.representative}
        partyBName={contractData.partyB.representative}
      />

      {/* Quick Edit Modal */}
      <QuickEditModal
        isOpen={isQuickEditModalOpen}
        onClose={() => setIsQuickEditModalOpen(false)}
        contractData={contractData}
        onUpdateContractData={handleUpdateContractData}
      />

      {/* Payment QR Modal */}
      {isQRModalOpen && (
        <PaymentQRCode
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          financials={contractData.financials}
          partyA={contractData.partyA}
          partyB={contractData.partyB}
        />
      )}

      {/* Image Lightbox Modal: Phóng To / Thu Nhỏ Ảnh Thực Tế */}
      <ImageLightboxModal
        isOpen={!!activeLightboxImage}
        onClose={() => setActiveLightboxImage(null)}
        initialImage={activeLightboxImage}
        gallery={decorGallery}
      />
    </div>
  );
}
