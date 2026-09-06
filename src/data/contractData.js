// contractData.js - Dữ liệu Hợp Đồng Dịch Vụ Cưới Trọn Gói Thành Luân Wedding & Decor

export const initialContractData = {
  contractNumber: "HĐ-TLW/2026-0906/AG",
  signingDate: "06/09/2026",
  signingPlace: "P. Long Tuyền, TP. Cần Thơ",
  
  partyA: {
    title: "BÊN CHO THUÊ DỊCH VỤ (BÊN A)",
    businessName: "THÀNH LUÂN WEDDING & DECOR",
    representative: "Ông Nguyễn Thành Luân",
    role: "Chủ cơ sở / Đại diện pháp nhân",
    address: "198/11 Đinh Công Chánh, Phường Long Tuyền, TP. Cần Thơ",
    phone: "090 789 5911",
    email: "thanhluankontum@gmail.com",
    taxCode: "1801689899",
    bankName: "MB Bank Chi Nhánh Tây Đô",
    accountNumber: "0907895911",
    accountHolder: "Nguyễn Thành Luân",
    qrCardImg: "./thanh-luan-qr-card.png",
    signatureImg: null // Chữ ký số
  },

  partyB: {
    title: "BÊN THUÊ DỊCH VỤ (BÊN B)",
    role: "Cô Dâu – Chú Rể (Khách Hàng)",
    representative: "Ông Nguyễn Việt Hưng",
    idNumber: "089096001234",
    phone: "033 881 2063",
    address: "Tổ 16, Ấp Bình An, Xã Châu Phú, Tỉnh An Giang",
    eventDate: "18/11/2026",
    eventPlace: "Tại gia (Tổ 16, Ấp Bình An, Xã Châu Phú, Tỉnh An Giang)",
    guestCount: "350 - 400 khách",
    signatureImg: null
  },

  financials: {
    totalAmount: 63900000,
    totalAmountInWords: "Sáu Mươi Ba Triệu Chín Trăm Nghìn Đồng",
    depositAmount: 19900000,
    depositPercentage: "31%",
    depositDate: "06/09/2026",
    depositMethod: "Chuyển khoản / Tiền mặt",
    remainingAmount: 44000000,
    remainingPaymentTerm: "Phần còn lại thanh toán ngay sau khi bên cửa hàng bàn giao lại tiệc cho phía gia đình",
    paymentMethods: "Tiền mặt hoặc chuyển khoản theo thông tin Bên A cung cấp."
  },

  decorItems: [
    {
      id: "cong-cuoi",
      name: "Cổng cưới",
      specification: "Cổng Rồng Phụng Tone Đỏ",
      description: "Thiết kế rồng bay phụng múa tỉ mỉ, kết hoa tươi và hoa lụa cao cấp tone đỏ thịnh vượng, đèn LED hắt sáng nghệ thuật ban đêm.",
      icon: "Sparkles",
      status: "Đã duyệt mẫu thực tế",
      imageUrl: "./decor-cong-rong-phung.jpg",
      imageTitle: "Mẫu Cổng Cưới Rồng Phụng Tone Đỏ Thực Tế"
    },
    {
      id: "rap-cuoi",
      name: "Rạp cưới",
      specification: "Rạp Trang Trí Hiện Đại Tone Đỏ",
      description: "Khung không gian sắt hộp kiên cố chống mưa dông, bạt cách nhiệt cao cấp, trần lụa buông rủ tone đỏ - trắng, đèn chùm chiếu sáng sang trọng.",
      icon: "Home",
      status: "Đã duyệt mẫu rạp thực tế",
      imageUrl: "./decor-rap-ban-ghe.jpg",
      imageTitle: "Mẫu Rạp Cưới Hiện Đại Lụa Buông Tone Đỏ Thực Tế"
    },
    {
      id: "ban-ghe",
      name: "Bàn, ghế",
      specification: "Bàn tiệc & Bàn hai họ sang trọng",
      description: "Bộ bàn tròn tiệc cưới cao cấp phủ khăn đỏ nhung viền vàng, ghế bọc nơ đỏ sang trọng, đầy đủ bộ ly chén sứ trắng tinh tươm.",
      icon: "Armchair",
      status: "Đã duyệt mẫu bàn ghế",
      imageUrl: "./decor-rap-ban-ghe.jpg",
      imageTitle: "Không Gian Bàn Ghế Tiệc Cưới Tone Đỏ Thực Tế"
    },
    {
      id: "thung-tien",
      name: "Thùng tiền cưới",
      specification: "Thùng tiền decor nghệ thuật tone đỏ",
      description: "Họa tiết Song Hỷ / Trống đồng hiện đại, đồng bộ tone đỏ may mắn, có khóa bảo mật an toàn cho gia đình.",
      icon: "Gift",
      status: "Đã niêm phong bàn giao"
    },
    {
      id: "gia-tien",
      name: "Trang trí gia tiên",
      specification: "Không gian thờ gia tiên trang nghiêm",
      description: "Phông rèm đỏ nhung chữ Hỷ mạ vàng, bàn thờ tổ tiên trang hoàng tôn nghiêm, bộ lư đồng sáng bóng, 2 bình hoa lụa cao cấp, bàn hai họ 12 ghế bọc nơ, bộ ấm trà sứ cao cấp đón tiếp họ hàng.",
      icon: "HeartHandshake",
      status: "Thi công ngày 17/11/2026"
    },
    {
      id: "san-khau",
      name: "Sân khấu & Backdrop",
      specification: "Decor sân khấu tiệc cưới & Backdrop check-in",
      description: "Bục sân khấu kiên cố bọc thảm đỏ/cỏ xanh, backdrop vòm in tên Cô Dâu & Chú Rể theo thiết kế riêng, cụm hoa lụa tone đỏ & pastel rực rỡ, hệ thống par LED tạo hiệu ứng lung linh.",
      icon: "Crown",
      status: "Đã duyệt mẫu sân khấu thực tế",
      imageUrl: "./decor-san-khau-backdrop.jpg",
      imageTitle: "Mẫu Sân Khấu & Backdrop Check-in Thực Tế"
    },
    {
      id: "thiep-moi",
      name: "Thiệp mời cưới",
      specification: "350 thiệp mời cao cấp",
      description: "In ấn hoàn thiện theo mẫu thiết kế riêng sang trọng, phong bì ép kim, kèm bản đồ hướng dẫn đường đi cho khách, bàn giao trước tiệc để gửi sớm.",
      icon: "Mail",
      status: "Đã hoàn tất in ấn & bàn giao"
    }
  ],

  menus: {
    man: [
      { step: "1", name: "Súp Cua", desc: "Súp thịt cua biển tuyết nhĩ khai vị nóng hổi bổ dưỡng" },
      { step: "2", name: "Khai Vị 4 Món", desc: "Chả giò hải sản, Gỏi ngó sen tôm thịt, Mực chiên giòn, Nem nướng miền Tây" },
      { step: "3", name: "Tôm Uyên Ương + Bánh Đúc", desc: "Tôm sú hấp nước dừa uyên ương ăn kèm bánh đúc truyền thống đậm đà" },
      { step: "4", name: "Bao Tử Nấu Tiêu + Bánh Mì", desc: "Bao tử hầm tiêu xanh Phú Quốc cay ấm ăn kèm bánh mì giòn rụm" },
      { step: "5", name: "Lẩu Cua Đồng Hải Sản + Rau Bún", desc: "Nồi lẩu riêu cua đồng ngọt thanh kết hợp hải sản, rau mồng tơi và bún tươi" },
      { step: "6", name: "Tráng miệng: Sữa Chua", desc: "Sữa chua nhà làm tráng miệng thanh mát sảng khoái" }
    ],
    chay: [
      { step: "1", name: "Súp Cua Chay", desc: "Súp nấm đông cô, bắp non và đậu hũ thanh đạm ấm bụng" },
      { step: "2", name: "Khai Vị 4 Món Chay", desc: "Chả giò chay giòn rụm, Gỏi củ hủ dừa đậu phộng, Nấm đùi gà chiên xù, Nem chay chua ngọt" },
      { step: "3", name: "Gỏi Bò Khoai Môn Chay", desc: "Gỏi sợi bò lát chay giòn cùng khoai môn bào sợi chiên vàng thơm ngậy" },
      { step: "4", name: "Dê Né Hoa Thiên Lý Chay", desc: "Thịt dê chay xào lăn bản gang cùng hoa thiên lý xào giòn thơm ngọt" },
      { step: "5", name: "Lẩu Nấm Thập Cẩm + Rau Bún", desc: "Lẩu nấm linh chi, bào ngư, đông cô thanh mát kèm rau xanh vườn quê và bún" },
      { step: "6", name: "Tráng miệng: Sữa Chua", desc: "Sữa chua lên men tự nhiên thanh mát" }
    ]
  },

  timelineMilestones: [
    {
      id: "phase-1",
      date: "06/09/2026",
      phase: "GIAI ĐOẠN 1: KÝ KẾT & TẠM ỨNG",
      title: "Ký kết hợp đồng & Khảo sát thực địa",
      description: "Hai bên ký kết Hợp đồng dịch vụ cưới trọn gói. Bên B đặt cọc đợt 1: 19.900.000 VNĐ. Bên A cử chuyên viên kỹ thuật xuống tận nơi khảo sát mặt bằng tại Tổ 16 Ấp Bình An, xã Châu Phú, tỉnh An Giang để lên bản vẽ không gian dựng rạp.",
      status: "completed",
      badge: "Đã hoàn thành",
      icon: "FileCheck"
    },
    {
      id: "phase-2",
      date: "10/09/2026 - 25/09/2026",
      phase: "GIAI ĐOẠN 2: THIỆP CƯỚI & NỘI DUNG",
      title: "Thiết kế & Bàn giao 350 thiệp mời",
      description: "Chốt ma-két thiết kế thiệp cưới tone đỏ sang trọng. Tiến hành in ấn chuẩn sắc nét 350 bộ thiệp kèm phong bì và bản đồ chỉ đường, bàn giao trước 25/09/2026 để Bên B kịp gửi thiệp mời quan khách.",
      status: "completed",
      badge: "Đã bàn giao",
      icon: "MailCheck"
    },
    {
      id: "phase-3",
      date: "01/10/2026 - 05/11/2026",
      phase: "GIAI ĐOẠN 3: DUYỆT 3D & THỰC ĐƠN",
      title: "Chốt Demo 3D Cổng Rồng Phụng & Số Lượng Bàn",
      description: "Thống nhất thiết kế 3D Cổng Rồng Phụng tone đỏ, backdrop sân khấu mang tên CD-CR, maket bàn thờ gia tiên. Chốt danh sách số lượng bàn tiệc mặn & tiệc chay, định mức nguyên liệu tươi mới.",
      status: "ready",
      badge: "Đã phê duyệt",
      icon: "Palette"
    },
    {
      id: "phase-4",
      date: "16/11/2026 (Trước tiệc 2 ngày)",
      phase: "GIAI ĐOẠN 4: DỰNG KHUNG RẠP",
      title: "Tập kết vật tư & Thi công dựng rạp cưới",
      description: "Đội thi công Bên A có mặt tại tư gia lúc 08:00 sáng, dựng khung rạp không gian kiên cố chống mưa dông bão gió, kéo rèm trần lụa tone đỏ hiện đại, đi dây điện an toàn và lắp đặt hệ thống đèn chiếu sáng.",
      status: "upcoming",
      badge: "Chuẩn bị thi công",
      icon: "Hammer"
    },
    {
      id: "phase-5",
      date: "17/11/2026 (Trước tiệc 1 ngày)",
      phase: "GIAI ĐOẠN 5: TRANG TRÍ DECOR TRỌN GÓI",
      title: "Dựng Cổng Rồng Phụng, Gia Tiên & Sân Khấu",
      description: "Tiến hành thi công trọn bộ: Kết cổng Rồng Phụng đỏ rực rỡ, trang trí bàn thờ gia tiên trang nghiêm với lư đồng & hoa tươi, dựng backdrop sân khấu hoành tráng, sắp xếp bàn ghế tiệc bọc nơ đỏ, đặt thùng tiền cưới kiểm tra hoàn thiện.",
      status: "upcoming",
      badge: "Tiến hành lúc 07:00",
      icon: "Sparkles"
    },
    {
      id: "phase-6",
      date: "18/11/2026 (NGÀY TRỌNG ĐẠI)",
      phase: "GIAI ĐOẠN 6: PHỤC VỤ TIỆC & BÀN GIAO",
      title: "Hoàn thiện trước giờ đón khách 8 giờ & Bàn giao tiệc",
      description: "05:00 sáng: Bên A có mặt kiểm tra tổng thể âm thanh, ánh sáng, bàn hoa, quạt làm mát rạp (đảm bảo hoàn thiện bàn giao trước giờ đón khách tối thiểu 8 giờ theo Điều 2). Bếp phục vụ thực đơn tiệc mặn và tiệc chay nóng sốt, chu đáo. Ngay sau khi Bên A bàn giao lại tiệc cho phía gia đình, Bên B thanh toán phần còn lại 44.000.000 VNĐ. Chiều cùng ngày thu dọn thiết bị và dọn vệ sinh trả lại mặt bằng.",
      status: "upcoming",
      badge: "Mốc chính 18/11/2026",
      icon: "PartyPopper"
    }
  ]
};
