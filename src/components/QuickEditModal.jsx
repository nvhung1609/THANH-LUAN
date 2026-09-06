import React, { useState } from 'react';
import { X, Save, Edit3, RotateCcw } from 'lucide-react';

export default function QuickEditModal({ isOpen, onClose, contractData, onUpdateContractData }) {
  const [formData, setFormData] = useState(contractData);

  if (!isOpen) return null;

  const handleTextChange = (path, value) => {
    setFormData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateContractData(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit3 color="#9e1b32" size={22} />
            <h3>Chỉnh Sửa Nhanh Dữ Liệu Hợp Đồng</h3>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ color: '#9e1b32', borderBottom: '1px solid #fee2e2', paddingBottom: '4px', fontSize: '0.95rem' }}>
              1. Thông Tin Bên Thuê (Bên B - Khách Hàng)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Họ Tên Cô Dâu / Chú Rể:</label>
                <input 
                  type="text" 
                  value={formData.partyB.representative} 
                  onChange={(e) => handleTextChange('partyB.representative', e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Số Điện Thoại:</label>
                <input 
                  type="text" 
                  value={formData.partyB.phone} 
                  onChange={(e) => handleTextChange('partyB.phone', e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Địa Chỉ Tổ Chức / Tư Gia:</label>
              <input 
                type="text" 
                value={formData.partyB.address} 
                onChange={(e) => handleTextChange('partyB.address', e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Ngày Tổ Chức Tiệc:</label>
                <input 
                  type="text" 
                  value={formData.partyB.eventDate} 
                  onChange={(e) => handleTextChange('partyB.eventDate', e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Địa Điểm Tổ Chức:</label>
                <input 
                  type="text" 
                  value={formData.partyB.eventPlace} 
                  onChange={(e) => handleTextChange('partyB.eventPlace', e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <h4 style={{ color: '#9e1b32', borderBottom: '1px solid #fee2e2', paddingBottom: '4px', fontSize: '0.95rem', marginTop: '8px' }}>
              2. Chi Phí & Thanh Toán
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Tổng Giá Trị Hợp Đồng (VNĐ):</label>
                <input 
                  type="number" 
                  value={formData.financials.totalAmount} 
                  onChange={(e) => {
                    const total = Number(e.target.value);
                    const dep = formData.financials.depositAmount;
                    handleTextChange('financials.totalAmount', total);
                    handleTextChange('financials.remainingAmount', total - dep);
                  }}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontWeight: 600 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Đặt Cọc Đợt 1 (VNĐ):</label>
                <input 
                  type="number" 
                  value={formData.financials.depositAmount} 
                  onChange={(e) => {
                    const dep = Number(e.target.value);
                    const total = formData.financials.totalAmount;
                    handleTextChange('financials.depositAmount', dep);
                    handleTextChange('financials.remainingAmount', total - dep);
                  }}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontWeight: 600 }}
                />
              </div>
            </div>

            <h4 style={{ color: '#9e1b32', borderBottom: '1px solid #fee2e2', paddingBottom: '4px', fontSize: '0.95rem', marginTop: '8px' }}>
              3. Bên Cho Thuê (Bên A - THÀNH LUÂN WEDDING & DECOR)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Đại Diện Cửa Hàng:</label>
                <input 
                  type="text" 
                  value={formData.partyA.representative} 
                  onChange={(e) => handleTextChange('partyA.representative', e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>Hotline / Zalo:</label>
                <input 
                  type="text" 
                  value={formData.partyA.phone} 
                  onChange={(e) => handleTextChange('partyA.phone', e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn btn-crimson">
              <Save size={16} />
              <span>Lưu Cập Nhật</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
