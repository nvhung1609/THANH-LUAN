import React from 'react';

export default function A4ContractDocument({ contractData }) {
  const { partyA, partyB, financials, decorItems, menus, timelineMilestones, contractNumber, signingDate, signingPlace } = contractData;

  const formatVND = (val) => new Intl.NumberFormat('vi-VN').format(val) + ' VNĐ';

  return (
    <div className="a4-document-wrapper">
      {/* ==================== TRANG 1 ==================== */}
      <div className="a4-page">
        {/* Quốc hiệu & Đơn vị */}
        <div className="a4-page-header">
          <div className="a4-left-header">
            <div className="a4-org-name">{partyA.businessName}</div>
            <div className="a4-org-sub">Dịch Vụ Cưới Hỏi & Trang Trí Trọn Gói</div>
            <div style={{ fontSize: '9.5pt', color: '#374151', marginTop: '2px' }}>Hotline: {partyA.phone}</div>
          </div>
          <div className="a4-right-header">
            <div className="a4-nation-title">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div className="a4-motto">Độc lập – Tự do – Hạnh phúc</div>
            <div className="a4-divider"></div>
          </div>
        </div>

        {/* Tiêu đề hợp đồng */}
        <div className="a4-contract-title">
          <h2>HỢP ĐỒNG DỊCH VỤ</h2>
          <div className="a4-contract-no">Số: {contractNumber}</div>
        </div>

        {/* Căn cứ pháp lý & Lời mở đầu */}
        <div className="a4-intro-clause">
          "Hôm nay, ngày {signingDate}, tại {signingPlace}, chúng tôi gồm có:"
        </div>

        {/* Thông tin Bên A */}
        <div className="a4-party-block">
          <div className="a4-party-title">BÊN A: {partyA.businessName} (BÊN CHO THUÊ)</div>
          <div className="a4-party-content" style={{ paddingLeft: '15px' }}>
            <p>• <strong>Đại diện:</strong> {partyA.representative} &nbsp;&nbsp;&nbsp; <strong>Chức vụ:</strong> {partyA.role}</p>
            <p>• <strong>Địa chỉ:</strong> {partyA.address}</p>
            <p>• <strong>Số điện thoại:</strong> {partyA.phone}</p>
            <p>• <strong>Tài khoản ngân hàng:</strong> {partyA.accountNumber} tại {partyA.bankName} (Chủ TK: {partyA.accountHolder})</p>
          </div>
        </div>

        {/* Thông tin Bên B */}
        <div className="a4-party-block">
          <div className="a4-party-title">BÊN B: CÔ DÂU – CHÚ RỂ (KHÁCH HÀNG / BÊN THUÊ)</div>
          <div className="a4-party-content" style={{ paddingLeft: '15px' }}>
            <p>• <strong>Họ tên cô dâu / chú rể:</strong> {partyB.representative}</p>
            <p>• <strong>Địa chỉ:</strong> {partyB.address}</p>
            <p>• <strong>Số điện thoại:</strong> {partyB.phone}</p>
          </div>
        </div>

        <p style={{ fontStyle: 'italic', marginBottom: '8px', textAlign: 'justify', textIndent: '20px' }}>
          Sau khi bàn bạc, trao đổi, hai bên đồng ý ký kết Hợp đồng dịch vụ cưới trọn gói với các điều khoản cụ thể sau đây:
        </p>

        {/* ĐIỀU 1 */}
        <div className="a4-article-block">
          <div className="a4-article-title">ĐIỀU 1: NỘI DUNG DỊCH VỤ</div>
          <div className="a4-article-content">
            <p>
              Bên A đồng ý cung cấp cho Bên B gói dịch vụ tiệc cưới và trang trí trọn gói theo đúng các yêu cầu và hạng mục đã thỏa thuận, bao gồm:
            </p>
            <p className="a4-bullet">1. <strong>Cổng cưới:</strong> Cổng Rồng Phụng Tone Đỏ truyền thống nghệ thuật;</p>
            <p className="a4-bullet">2. <strong>Rạp cưới:</strong> Rạp Trang Trí Hiện Đại Tone Đỏ kiên cố chống mưa dông;</p>
            <p className="a4-bullet">3. <strong>Bàn, ghế:</strong> Bàn tiệc và bàn hai họ bọc nơ đỏ sang trọng đầy đủ phụ kiện sứ;</p>
            <p className="a4-bullet">4. <strong>Thùng tiền cưới:</strong> Thùng tiền decor nghệ thuật tone đỏ an toàn;</p>
            <p className="a4-bullet">5. <strong>Trang trí gia tiên:</strong> Bàn thờ gia tiên trang nghiêm, lư đồng, hoa lụa cao cấp tone đỏ;</p>
            <p className="a4-bullet">6. <strong>Sân khấu & Backdrop:</strong> Decor sân khấu tiệc cưới và backdrop chụp ảnh sân khấu;</p>
            <p className="a4-bullet">7. <strong>Thiệp mời:</strong> 350 thiệp mời cao cấp in ấn hoàn thiện bàn giao trước tiệc;</p>
            <p className="a4-bullet">8. <strong>Thực đơn tiệc cưới trọn gói:</strong> Phục vụ tiệc Mặn và tiệc Chay chi tiết theo Phụ lục 02 kèm theo.</p>
          </div>
        </div>

        {/* ĐIỀU 2 */}
        <div className="a4-article-block">
          <div className="a4-article-title">ĐIỀU 2: THỜI GIAN VÀ ĐỊA ĐIỂM THỰC HIỆN</div>
          <div className="a4-article-content">
            <p>1. <strong>Thời gian tổ chức:</strong> Ngày {partyB.eventDate} (theo lịch dương).</p>
            <p>2. <strong>Địa điểm tổ chức:</strong> {partyB.eventPlace}.</p>
            <p>3. <strong>Cam kết tiến độ giờ:</strong> Bên A có mặt và hoàn thiện toàn bộ công tác trang trí, lắp dựng rạp, bàn tiệc và bàn giao trước giờ đón khách tối thiểu 8 giờ (đảm bảo gia đình chủ động thời gian đón tiếp quan khách chu đáo, không lo cập rập hay trễ giờ).</p>
          </div>
        </div>

        {/* ĐIỀU 3 */}
        <div className="a4-article-block">
          <div className="a4-article-title">ĐIỀU 3: CHI PHÍ VÀ PHƯƠNG THỨC THANH TOÁN</div>
          <div className="a4-article-content">
            <p>
              1. <strong>Tổng giá trị hợp đồng:</strong> <strong>{formatVND(financials.totalAmount)}</strong> (Bằng chữ: <em>{financials.totalAmountInWords}</em>).
            </p>
            <p>
              2. <strong>Đặt cọc đợt 1:</strong> <strong>{formatVND(financials.depositAmount)}</strong> (tương đương {financials.depositPercentage} tổng giá trị hợp đồng) ngay sau khi ký hợp đồng ngày {financials.depositDate}.
            </p>
            <p>
              3. <strong>Phần còn lại:</strong> <strong>{formatVND(financials.remainingAmount)}</strong> thanh toán ngay sau khi bên cửa hàng bàn giao lại tiệc cho phía gia đình.
            </p>
            <p>
              4. <strong>Phương thức thanh toán:</strong> {financials.paymentMethods}
            </p>
          </div>
        </div>

        {/* Footer trang 1 */}
        <div className="a4-page-footer">
          <span className="a4-footer-doc-name">Hợp đồng dịch vụ cưới trọn gói — Thành Luân Wedding & Decor</span>
          <span className="a4-footer-page-num">Trang 1 / 4</span>
        </div>
      </div>

      {/* ==================== TRANG 2 ==================== */}
      <div className="a4-page">
        {/* ĐIỀU 4: TIMELINE TIẾN ĐỘ THI CÔNG */}
        <div className="a4-article-block">
          <div className="a4-article-title">ĐIỀU 4: KẾ HOẠCH VÀ TIMELINE THI CÔNG CHI TIẾT TỪNG CÔNG VIỆC</div>
          <div className="a4-article-content">
            <p>Để đảm bảo ngày hôn lễ diễn ra chu toàn nhất, hai bên thống nhất lịch trình các mốc triển khai cụ thể như sau:</p>
            <table className="a4-table" style={{ marginTop: '6px' }}>
              <thead>
                <tr>
                  <th style={{ width: '6%', textAlign: 'center' }}>STT</th>
                  <th style={{ width: '22%', textAlign: 'center' }}>Thời Gian</th>
                  <th style={{ width: '28%', textAlign: 'center' }}>Hạng Mục Công Việc</th>
                  <th style={{ width: '44%', textAlign: 'center' }}>Nội Dung Chi Tiết & Cam Kết Cụ Thể</th>
                </tr>
              </thead>
              <tbody>
                {timelineMilestones.map((milestone, idx) => (
                  <tr key={milestone.id}>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>
                    <td style={{ fontWeight: 600 }}>{milestone.date}</td>
                    <td style={{ fontWeight: 600, color: '#000' }}>{milestone.title}</td>
                    <td style={{ fontSize: '9.2pt', textAlign: 'justify' }}>{milestone.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ĐIỀU 5 */}
        <div className="a4-article-block" style={{ marginTop: '10px' }}>
          <div className="a4-article-title">ĐIỀU 5: QUYỀN VÀ NGHĨA VỤ CỦA CÁC BÊN</div>
          <div className="a4-article-content">
            <p><strong>1. Quyền và nghĩa vụ của Bên A:</strong></p>
            <p className="a4-bullet">• Cam kết hoàn thiện thi công decor, rạp tiệc và bàn giao trước giờ đón khách tối thiểu 8 giờ để gia đình kiểm tra chu đáo.</p>
            <p className="a4-bullet">• Đảm bảo kết cấu rạp cưới kiên cố, bạt che chống mưa dông tạt nước, trang bị quạt làm mát và hệ thống điện đèn an toàn.</p>
            <p className="a4-bullet">• Cam kết 100% nguyên liệu tươi sạch, chế biến đạt chuẩn Vệ Sinh An Toàn Thực Phẩm, món ăn phục vụ nóng sốt, chu đáo.</p>
            <p className="a4-bullet">• Cử nhân viên kỹ thuật và quản lý túc trực xử lý âm thanh, ánh sáng và phục vụ trong suốt thời gian diễn ra hôn lễ.</p>
            
            <p style={{ marginTop: '6px' }}><strong>2. Quyền và nghĩa vụ của Bên B:</strong></p>
            <p className="a4-bullet">• Cung cấp thông tin chính xác về mốc giờ đón khách, số lượng bàn tiệc và tạo điều kiện thuận lợi về mặt bằng, nguồn điện, nước.</p>
            <p className="a4-bullet">• Cùng đại diện Bên A kiểm tra nghiệm thu các hạng mục decor và bàn tiệc sau khi Bên A bàn giao trước giờ đón khách.</p>
            <p className="a4-bullet">• Hợp tác và thanh toán đầy đủ, đúng hạn số tiền còn lại theo đúng quy định tại Điều 3 của hợp đồng.</p>
          </div>
        </div>

        {/* ĐIỀU 6 */}
        <div className="a4-article-block" style={{ marginTop: '10px' }}>
          <div className="a4-article-title">ĐIỀU 6: CAM KẾT TIẾN ĐỘ, HỦY HỢP ĐỒNG VÀ GIẢI QUYẾT SỰ CỐ</div>
          <div className="a4-article-content">
            <p className="a4-bullet">• <strong>Cam kết tiến độ bàn giao:</strong> Nếu Bên A chậm trễ tiến độ làm ảnh hưởng đến thời gian đón khách của Bên B (ngoại trừ sự kiện bất khả kháng theo luật định), Bên A chịu phạt 10% tổng giá trị hợp đồng và bồi thường các chi phí phát sinh thực tế.</p>
            <p className="a4-bullet">• <strong>Chính sách dời ngày & thời tiết:</strong> Trường hợp thời tiết bất lợi hoặc gia đình có việc cần điều chỉnh, hai bên ưu tiên thiện chí hỗ trợ dời ngày tổ chức phù hợp mà không tính thêm phí phạt phát sinh.</p>
            <p className="a4-bullet">• <strong>Quy định hủy giao kèo:</strong> Nếu Bên B hủy hợp đồng trước ngày tổ chức dưới 15 ngày, Bên A giữ lại tiền đặt cọc để bù đắp chi phí nguyên vật liệu. Nếu hủy trước 30 ngày, hai bên thỏa thuận hoàn lại 50% tiền cọc hoặc bảo lưu chuyển tiệc sang dịp khác.</p>
            <p className="a4-bullet">• Nếu Bên A đơn phương hủy hợp đồng mà không có lý do chính đáng, Bên A hoàn trả 100% tiền đặt cọc và chịu phạt thêm một khoản tương đương số tiền cọc đã nhận.</p>
          </div>
        </div>

        {/* ĐIỀU 7 */}
        <div className="a4-article-block" style={{ marginTop: '10px' }}>
          <div className="a4-article-title">ĐIỀU 7: CAM KẾT CHUNG VÀ HIỆU LỰC HỢP ĐỒNG</div>
          <div className="a4-article-content">
            <p>• Hai bên cam kết thực hiện đúng, đầy đủ các điều khoản trên với tinh thần trách nhiệm và thiện chí cao nhất.</p>
            <p>• Mọi thay đổi, bổ sung chỉ có giá trị khi được lập thành văn bản hoặc phụ lục hợp đồng có chữ ký xác nhận của cả hai bên.</p>
            <p>• Hợp đồng này có hiệu lực kể từ ngày ký và được lập thành 02 (hai) bản có nội dung như nhau, mỗi bên giữ 01 bản có giá trị pháp lý như nhau.</p>
          </div>
        </div>

        {/* Footer trang 2 */}
        <div className="a4-page-footer">
          <span className="a4-footer-doc-name">Hợp đồng dịch vụ cưới trọn gói — Thành Luân Wedding & Decor</span>
          <span className="a4-footer-page-num">Trang 2 / 4</span>
        </div>
      </div>

      {/* ==================== TRANG 3 ==================== */}
      <div className="a4-page">
        {/* PHỤ LỤC 01 */}
        <div className="a4-article-block">
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '13pt', textTransform: 'uppercase', fontWeight: 700 }}>
              PHỤ LỤC 01: HẠN MỤC THI CÔNG & TRANG TRÍ DECOR
            </h3>
            <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>
              (Đính kèm Hợp đồng dịch vụ tiệc cưới số: {contractNumber})
            </div>
          </div>

          <table className="a4-table">
            <thead>
              <tr>
                <th style={{ width: '6%', textAlign: 'center' }}>STT</th>
                <th style={{ width: '24%', textAlign: 'center' }}>Hạng Mục</th>
                <th style={{ width: '28%', textAlign: 'center' }}>Quy Cách & Chi Tiết Thi Công</th>
                <th style={{ width: '42%', textAlign: 'center' }}>Yêu Cầu Chất Lượng & Tiêu Chuẩn</th>
              </tr>
            </thead>
            <tbody>
              {decorItems.map((item, idx) => (
                <tr key={item.id}>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>
                  <td style={{ fontWeight: 700 }}>{item.name}</td>
                  <td style={{ fontWeight: 600, color: '#9e1b32' }}>{item.specification}</td>
                  <td style={{ fontSize: '9pt' }}>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PHỤ LỤC 02 */}
        <div className="a4-article-block" style={{ marginTop: '12px' }}>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '13pt', textTransform: 'uppercase', fontWeight: 700 }}>
              PHỤ LỤC 02: HẠN MỤC THỰC ĐƠN TIỆC CƯỚI (MENU TIỆC)
            </h3>
            <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>
              (Cam kết 100% nguyên liệu tươi sạch, chế biến đạt chuẩn Vệ Sinh An Toàn Thực Phẩm)
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {/* Menu Mặn */}
            <div style={{ border: '1px solid #1e293b', borderRadius: '4px', padding: '8px 10px' }}>
              <div style={{ fontWeight: 700, textAlign: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '6px', color: '#9e1b32', textTransform: 'uppercase' }}>
                THỰC ĐƠN TIỆC MẶN (6 MÓN)
              </div>
              <ol style={{ paddingLeft: '18px', margin: 0, fontSize: '9.5pt', lineHeight: 1.6 }}>
                {menus.man.map((dish) => (
                  <li key={dish.step} style={{ marginBottom: '3px' }}>
                    <strong>{dish.name}</strong>
                    <div style={{ fontSize: '8.5pt', color: '#475569', fontStyle: 'italic' }}>{dish.desc}</div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Menu Chay */}
            <div style={{ border: '1px solid #1e293b', borderRadius: '4px', padding: '8px 10px' }}>
              <div style={{ fontWeight: 700, textAlign: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '6px', color: '#047857', textTransform: 'uppercase' }}>
                THỰC ĐƠN MÓN CHAY (6 MÓN)
              </div>
              <ol style={{ paddingLeft: '18px', margin: 0, fontSize: '9.5pt', lineHeight: 1.6 }}>
                {menus.chay.map((dish) => (
                  <li key={dish.step} style={{ marginBottom: '3px' }}>
                    <strong>{dish.name}</strong>
                    <div style={{ fontSize: '8.5pt', color: '#475569', fontStyle: 'italic' }}>{dish.desc}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* PHẦN KÝ TÊN VÀ ĐÓNG DẤU HAI BÊN */}
        <div className="keep-together" style={{ marginTop: '20px' }}>
          <div className="a4-signatures-container">
            {/* Đại diện Bên B */}
            <div className="a4-sig-col">
              <div className="a4-sig-title">ĐẠI DIỆN BÊN B</div>
              <div className="a4-sig-note">(Cô dâu & chú rể ký, ghi rõ họ tên)</div>
              <div className="a4-sig-space">
                {partyB.signatureImg ? (
                  <img src={partyB.signatureImg} alt="Chữ ký Bên B" className="a4-sig-img" />
                ) : null}
              </div>
              <div className="a4-sig-name">{partyB.representative}</div>
            </div>

            {/* Đại diện Bên A */}
            <div className="a4-sig-col">
              <div className="a4-sig-title">ĐẠI DIỆN BÊN A</div>
              <div className="a4-sig-note">(Bên Cửa Hàng ký và đóng dấu)</div>
              <div className="a4-sig-space">
                {partyA.signatureImg ? (
                  <img src={partyA.signatureImg} alt="Chữ ký Bên A" className="a4-sig-img" />
                ) : null}
              </div>
              <div className="a4-sig-name">{partyA.representative}</div>
            </div>
          </div>
        </div>

        {/* Footer trang 3 */}
        <div className="a4-page-footer">
          <span className="a4-footer-doc-name">Hợp đồng dịch vụ cưới trọn gói — Thành Luân Wedding & Decor</span>
          <span className="a4-footer-page-num">Trang 3 / 4</span>
        </div>
      </div>

      {/* ==================== TRANG 4: PHỤ LỤC HÌNH ẢNH THI CÔNG ==================== */}
      <div className="a4-page">
        <div className="a4-article-block">
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '13pt', textTransform: 'uppercase', fontWeight: 700 }}>
              PHỤ LỤC 03: HÌNH ẢNH MẪU THI CÔNG THỰC TẾ ĐÃ PHÊ DUYỆT
            </h3>
            <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>
              (Hình ảnh phối cảnh và mẫu decor thực tế đính kèm Hợp đồng số: {contractNumber})
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
            {/* Ảnh 1: Cổng Rồng Phụng */}
            <div style={{ border: '1px solid #1e293b', borderRadius: '6px', overflow: 'hidden', padding: '6px', background: '#ffffff' }}>
              <div style={{ height: '145px', overflow: 'hidden', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                <img 
                  src="./decor-cong-rong-phung.jpg" 
                  alt="Cổng cưới Rồng Phụng" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ fontSize: '9.5pt', fontWeight: 700, marginTop: '6px', color: '#9e1b32', textAlign: 'center' }}>
                1. Cổng Cưới Rồng Phụng Tone Đỏ
              </div>
              <div style={{ fontSize: '8.2pt', color: '#475569', textAlign: 'center', fontStyle: 'italic' }}>
                Rồng phụng chạm trổ tinh xảo, hoa tươi tone đỏ thịnh vượng
              </div>
            </div>

            {/* Ảnh 2: Rạp cưới & Bàn ghế */}
            <div style={{ border: '1px solid #1e293b', borderRadius: '6px', overflow: 'hidden', padding: '6px', background: '#ffffff' }}>
              <div style={{ height: '145px', overflow: 'hidden', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                <img 
                  src="./decor-rap-ban-ghe.jpg" 
                  alt="Rạp cưới & bàn ghế" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ fontSize: '9.5pt', fontWeight: 700, marginTop: '6px', color: '#9e1b32', textAlign: 'center' }}>
                2. Rạp Cưới Hiện Đại & Bàn Ghế
              </div>
              <div style={{ fontSize: '8.2pt', color: '#475569', textAlign: 'center', fontStyle: 'italic' }}>
                Trần lụa buông tone đỏ - trắng, bàn tròn phủ khăn nhung đỏ
              </div>
            </div>

            {/* Ảnh 3: Sân khấu & Backdrop */}
            <div style={{ border: '1px solid #1e293b', borderRadius: '6px', overflow: 'hidden', padding: '6px', background: '#ffffff', gridColumn: 'span 2' }}>
              <div style={{ height: '165px', overflow: 'hidden', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                <img 
                  src="./decor-san-khau-backdrop.jpg" 
                  alt="Sân khấu & Backdrop" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ fontSize: '9.5pt', fontWeight: 700, marginTop: '6px', color: '#9e1b32', textAlign: 'center' }}>
                3. Sân Khấu & Backdrop Check-in Tiệc Cưới
              </div>
              <div style={{ fontSize: '8.2pt', color: '#475569', textAlign: 'center', fontStyle: 'italic' }}>
                Vòm hoa nghệ thuật, thảm tiệc cưới kiên cố, in tên Cô dâu & Chú rể theo thiết kế
              </div>
            </div>
          </div>

          <div style={{ 
            marginTop: '16px', 
            padding: '10px 14px', 
            border: '1px dashed #64748b', 
            borderRadius: '6px', 
            fontSize: '9pt', 
            fontStyle: 'italic', 
            textAlign: 'justify' 
          }}>
            <strong>Cam kết chất lượng:</strong> Bên A có trách nhiệm thi công lắp dựng thực tế bảo đảm đúng quy chuẩn chất lượng, màu sắc, hoa tươi và kết cấu tương đương hoặc vượt trội so với các hình ảnh mẫu thực tế đã được hai bên phê duyệt tại Phụ lục này.
          </div>
        </div>

        {/* Footer trang 4 */}
        <div className="a4-page-footer">
          <span className="a4-footer-doc-name">Hợp đồng dịch vụ cưới trọn gói — Thành Luân Wedding & Decor</span>
          <span className="a4-footer-page-num">Trang 4 / 4</span>
        </div>
      </div>
    </div>
  );
}
