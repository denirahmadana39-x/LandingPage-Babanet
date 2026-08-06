/* ==========================================================================
 * translations.js — All UI strings for every supported language.
 * --------------------------------------------------------------------------
 * Structure: single object keyed by language code ("id" = Bahasa Indonesia,
 * "en" = English). Flat dot-notated keys, grouped by section.
 *
 * Adding a new language:
 *   1. Copy the "id" object, translate every value, keep the same keys.
 *   2. Register the code in js/language.js (SUPPORTED_LANGS + langLabels).
 *
 * Keys ending in "*.title" that must keep their inline <span class="text-gradient">
 * highlight are applied via `data-i18n-html` in the HTML and therefore contain
 * the span markup here. All other values are plain text (set via textContent).
 * ========================================================================== */
const translations = {
  id: {
    /* ---------- Navigation ---------- */
    'nav.home': 'Beranda',
    'nav.services': 'Layanan',
    'nav.hosting': 'Hosting',
    'nav.about': 'Tentang Kami',
    'nav.contact': 'Kontak',
    'nav.support': 'Dukungan',
    'nav.getStarted': 'Mulai Sekarang',

    /* ---------- Hero ---------- */
    'hero.badge': 'Solusi Teknologi untuk Bisnis, Pendidikan & Rumah',
    'hero.title': 'Satu Partner untuk Semua <span class="text-gradient">Kebutuhan IT</span>.',
    'hero.subtitle':
      'Baba Solution Information Technology menyediakan layanan Web Hosting, Instalasi WiFi, Pemasangan CCTV, Perakitan Komputer, Service Laptop & PC, serta Perancangan Infrastruktur Laboratorium Komputer untuk sekolah, perusahaan, dan UMKM.',
    'hero.getStarted': 'Mulai Sekarang',
    'hero.viewServices': 'Lihat Layanan',
    'hero.statProjects': 'Proyek',
    'hero.statClients': 'Klien',
    'hero.statSatisfaction': 'Kepuasan',
    'hero.statSupport': 'Dukungan',

    /* ---------- Hero mockup & floating cards ---------- */
    'mockup.title': 'Baba Dashboard',
    'mockup.online': 'Online',
    'float.webHosting': 'Web Hosting',
    'float.webHostingSmall': 'Uptime 99.9%',
    'float.cloudReady': 'Cloud Ready',
    'float.cloudReadySmall': 'Aman & Cepat',
    'float.wifi': 'WiFi Terpasang',
    'float.wifiSmall': 'Cakupan Penuh',
    'float.cctv': 'CCTV 24/7',
    'float.cctvSmall': 'Selalu Mengawasi',
    'float.pcLaptop': 'PC & Laptop',
    'float.pcSmall': 'Ahli Perbaikan',
    'float.networking': 'Jaringan',
    'float.networkingSmall': 'Infrastruktur',

    /* ---------- Services ---------- */
    'services.tag': 'Layanan Kami',
    'services.title': 'Solusi IT Lengkap, <span class="text-gradient">Satu Penyedia</span>',
    'services.desc':
      'Dari hosting hingga infrastruktur jaringan, kami menangani seluruh kebutuhan teknologi Anda dengan standar profesional.',
    'services.learnMore': 'Selengkapnya',
    'services.webHosting.title': 'Web Hosting',
    'services.webHosting.desc':
      'Hosting cepat, stabil, dan aman dengan dukungan SSD serta SSL gratis untuk website Anda.',
    'services.wifi.title': 'Instalasi WiFi',
    'services.wifi.desc':
      'Instalasi WiFi & Internet berkecepatan tinggi dengan jangkauan optimal di seluruh area.',
    'services.cctv.title': 'Instalasi CCTV',
    'services.cctv.desc':
      'Pemasangan CCTV HD dengan akses remote, memastikan keamanan properti Anda 24/7.',
    'services.assembly.title': 'Perakitan Komputer',
    'services.assembly.desc':
      'Perakitan komputer sesuai kebutuhan, dari workstation hingga PC gaming dan rendering.',
    'services.repair.title': 'Service Laptop & PC',
    'services.repair.desc':
      'Perbaikan laptop dan PC dengan teknisi berpengalaman dan komponen berkualitas.',
    'services.lab.title': 'Laboratorium Komputer',
    'services.lab.desc':
      'Perancangan dan pembangunan laboratorium komputer untuk sekolah dan instansi.',
    'services.network.title': 'Infrastruktur Jaringan',
    'services.network.desc':
      'Perancangan jaringan LAN/WAN, kabel fiber, rack server, dan manajemen jaringan.',
    'services.consult.title': 'Konsultasi IT',
    'services.consult.desc':
      'Konsultasi teknologi untuk membantu bisnis Anda memilih solusi IT yang tepat.',

    /* ---------- About / Why Choose Us ---------- */
    'about.tag': 'Mengapa Memilih Kami',
    'about.title': 'Kami Menyediakan <span class="text-gradient">Kualitas & Keandalan</span>',
    'about.desc':
      'Tim kami berkomitmen memberikan layanan IT terbaik dengan dukungan penuh di setiap tahap pekerjaan.',
    'about.badgeValue': '5+ Tahun',
    'about.badgeSmall': 'Pengalaman IT',
    'about.illustrationAlt': 'Ilustrasi tim IT profesional',
    'about.feature1.title': 'Tim Profesional',
    'about.feature1.desc': 'Tim profesional yang siap membantu Anda kapan saja.',
    'about.feature2.title': 'Respon Cepat',
    'about.feature2.desc': 'Respons cepat untuk setiap pertanyaan dan permintaan layanan.',
    'about.feature3.title': 'Engineer Bersertifikat',
    'about.feature3.desc': 'Teknisi dan engineer bersertifikat dengan pengalaman bertahun-tahun.',
    'about.feature4.title': 'Garansi & Dukungan Purna Jual',
    'about.feature4.desc': 'Garansi resmi serta dukungan purna jual yang terjamin.',
    'about.feature5.title': 'Harga Terjangkau',
    'about.feature5.desc': 'Harga terjangkau dengan kualitas yang tetap terjaga.',
    'about.feature6.title': 'Peralatan Berkualitas',
    'about.feature6.desc': 'Menggunakan peralatan dan komponen berkualitas terbaik.',

    /* ---------- Work Process ---------- */
    'process.tag': 'Proses Kerja',
    'process.title': 'Sederhana, Transparan, <span class="text-gradient">Langkah demi Langkah</span>',
    'process.desc': 'Proses kerja kami dirancang agar Anda selalu tahu perkembangan proyek Anda.',
    'process.step1.title': 'Konsultasi',
    'process.step1.desc': 'Diskusi kebutuhan dan tujuan IT Anda bersama tim kami.',
    'process.step2.title': 'Survey',
    'process.step2.desc': 'Survey lokasi dan analisis kebutuhan teknis di lapangan.',
    'process.step3.title': 'Perencanaan',
    'process.step3.desc': 'Perancangan solusi, estimasi biaya, dan jadwal pengerjaan.',
    'process.step4.title': 'Instalasi',
    'process.step4.desc': 'Pelaksanaan instalasi dan konfigurasi oleh teknisi ahli.',
    'process.step5.title': 'Pengujian',
    'process.step5.desc': 'Pengujian menyeluruh memastikan semuanya berfungsi sempurna.',
    'process.step6.title': 'Dukungan',
    'process.step6.desc': 'Dukungan dan pemeliharaan berkelanjutan setelah proyek selesai.',

    /* ---------- Computer Laboratory ---------- */
    'lab.illustrationAlt': 'Ilustrasi laboratorium komputer',
    'lab.badgeValue': 'Lab Siap Pakai',
    'lab.badgeSmall': 'Standar Nasional',
    'lab.tag': 'Laboratorium Komputer',
    'lab.title': 'Desain & Pembangunan <span class="text-gradient">Lab Sekolah Lengkap</span>',
    'lab.desc':
      'Kami merancang dan membangun laboratorium komputer sekolah yang lengkap, rapi, dan siap pakai — dari perencanaan ruangan hingga pemeliharaan.',
    'lab.check1': 'Perencanaan Ruangan',
    'lab.check2': 'Pemasangan Jaringan LAN',
    'lab.check3': 'Instalasi Server',
    'lab.check4': 'Rack Jaringan & Manajemen Kabel',
    'lab.check5': 'Koneksi Internet',
    'lab.check6': 'Pengujian & Pelatihan',
    'lab.check7': 'Kontrak Perawatan',
    'lab.cta': 'Konsultasi dengan Tim Kami',

    /* ---------- Hosting ---------- */
    'hosting.tag': 'Web Hosting',
    'hosting.title': 'Hosting Cepat & Aman <span class="text-gradient-light">Untuk Bisnis Anda</span>',
    'hosting.desc':
      'Dengan server berperforma tinggi dan sistem keamanan berlapis, website Anda selalu online dan cepat.',
    'hosting.check1': 'CPU & RAM Berperforma Tinggi',
    'hosting.check2': 'Penyimpanan SSD Besar',
    'hosting.check3': 'Sertifikat SSL Gratis',
    'hosting.check4': 'Domain Gratis',
    'hosting.check5': 'Proteksi CDN Cloudflare',
    'hosting.check6': 'Backup Otomatis Harian',
    'hosting.statUptime': 'Uptime',
    'hosting.statFreeSsl': 'SSL Gratis',
    'hosting.statMonitoring': 'Monitoring',
    'hosting.cta': 'Mulai Sekarang',
    'hosting.dash.title': 'Status Server',
    'hosting.dash.cpu': 'Penggunaan CPU',
    'hosting.dash.ram': 'Penggunaan RAM',
    'hosting.dash.ssd': 'Penyimpanan SSD',
    'hosting.dash.ssl': 'Sertifikat SSL',
    'hosting.dash.sslValue': 'Aktif',
    'hosting.dash.domain': 'Domain',
    'hosting.dash.domainValue': 'yourdomain.com',
    'hosting.dash.backup': 'Backup Harian',
    'hosting.dash.backupValue': 'Berhasil',
    'hosting.dash.secure': 'Aman',
    'hosting.dash.online': 'Online',
    'hosting.dash.done': 'Selesai',
    'hosting.float.cloudflare': 'Cloudflare',
    'hosting.float.cloudflareSmall': 'Terproteksi & Optimal',
    'hosting.float.online': 'Website Online',
    'hosting.float.onlineSmall': 'Waktu Respons Cepat',

    /* ---------- FAQ / Support ---------- */
    'faq.tag': 'Dukungan',
    'faq.title': 'Pertanyaan yang <span class="text-gradient">Sering Diajukan</span>',
    'faq.desc': 'Punya pertanyaan seputar layanan kami? Temukan jawabannya di bawah ini.',
    'faq.supportTitle': 'Masih punya pertanyaan?',
    'faq.supportDesc': 'Hubungi tim support kami — siap membantu 24/7.',
    'faq.contactSupport': 'Hubungi Dukungan',
    'faq.q1': 'Apakah Baba Solution melayani jasa instalasi WiFi di rumah?',
    'faq.a1':
      'Ya. Kami melayani instalasi WiFi dan internet untuk rumah, kantor, sekolah, hingga area publik dengan jaminan jangkauan sinyal yang optimal di seluruh area.',
    'faq.q2': 'Berapa lama proses pembuatan website?',
    'faq.a2':
      'Untuk website company profile umumnya selesai dalam 1–3 minggu, tergantung kompleksitas dan jumlah halaman. Kami akan memberikan timeline yang jelas sebelum proyek dimulai.',
    'faq.q3': 'Apakah ada garansi untuk jasa service laptop dan PC?',
    'faq.a3':
      'Ya, semua pekerjaan service kami dilengkapi garansi. Garansi mencakup jasa perbaikan dan komponen pengganti sesuai ketentuan yang disepakati.',
    'faq.q4': 'Apakah bisa membuat laboratorium komputer untuk sekolah?',
    'faq.a4':
      'Tentu. Kami melayani perancangan dan pembangunan laboratorium komputer sekolah secara lengkap — mulai dari tata letak ruangan, instalasi LAN, server, rack, hingga pelatihan penggunaan.',
    'faq.q5': 'Bagaimana cara memesan layanan?',
    'faq.a5':
      'Anda bisa menghubungi kami melalui formulir kontak, email, atau WhatsApp. Tim kami akan segera merespons untuk konsultasi awal dan penawaran harga.',

    /* ---------- Contact ---------- */
    'contact.tag': 'Hubungi Kami',
    'contact.title': 'Mari Bekerja <span class="text-gradient">Sama</span>',
    'contact.desc': 'Konsultasikan kebutuhan IT Anda — kami siap membantu.',
    'contact.address': 'Alamat',
    'contact.addressValue': 'Jalan Raya Tanjung Kait No.13 Kp.Kebon Baru, RT./RW.002/04, Marga Mulya, Kec. Mauk, Kabupaten Tangerang, Banten 15530, Indonesia',
    'contact.email': 'Email',
    'contact.emailValue': 'info@babasolution.com',
    'contact.whatsapp': 'WhatsApp',
    'contact.whatsappValue': '+62 812-8164-0680',
    'contact.hours': 'Jam Kerja',
    'contact.hoursValue': 'Sen – Sab, 08.00 – 17.00 WIB',
    'contact.form.nameLabel': 'Nama Lengkap',
    'contact.form.namePlaceholder': 'Nama Anda',
    'contact.form.nameError': 'Silakan masukkan nama Anda.',
    'contact.form.emailLabel': 'Email',
    'contact.form.emailPlaceholder': 'you@example.com',
    'contact.form.emailError': 'Silakan masukkan alamat email yang valid.',
    'contact.form.phoneLabel': 'Nomor HP',
    'contact.form.phonePlaceholder': '08xx-xxxx-xxxx',
    'contact.form.phoneError': 'Silakan masukkan nomor HP yang valid.',
    'contact.form.serviceLabel': 'Layanan yang Dibutuhkan',
    'contact.form.servicePlaceholder': 'Pilih layanan',
    'contact.form.serviceError': 'Silakan pilih layanan.',
    'contact.form.service.webDev': 'Pengembangan Website',
    'contact.form.service.lab': 'Perancangan & Pembangunan Laboratorium Komputer',
    'contact.form.service.laptop': 'Service Laptop',
    'contact.form.service.pc': 'Service PC',
    'contact.form.service.other': 'Lainnya',
    'contact.form.schoolLabel': 'Nama Sekolah',
    'contact.form.schoolPlaceholder': 'Masukkan nama sekolah',
    'contact.form.schoolError': 'Silakan masukkan nama sekolah.',
    'contact.form.messageLabel': 'Pesan',
    'contact.form.messagePlaceholder': 'Ceritakan tentang proyek Anda...',
    'contact.form.messageError': 'Silakan jelaskan kebutuhan Anda.',
    'contact.form.submit': 'Kirim via WhatsApp',
    'contact.whatsapp.greeting': 'Halo Baba Solution Information Technology,',
    'contact.whatsapp.intro': 'Saya ingin berkonsultasi mengenai layanan berikut.',
    'contact.whatsapp.name': 'Nama:',
    'contact.whatsapp.school': '🏫 Nama Sekolah:',
    'contact.whatsapp.email': 'Email:',
    'contact.whatsapp.phone': 'Nomor HP:',
    'contact.whatsapp.service': 'Layanan:',
    'contact.whatsapp.message': 'Pesan:',
    'contact.whatsapp.footer': 'Pesan dikirim melalui website Baba Solution.',

    /* ---------- Footer ---------- */
    'footer.aboutText':
      'Technology Solutions for Business, Education & Home. Partner terpercaya untuk seluruh kebutuhan IT Anda.',
    'footer.company': 'Perusahaan',
    'footer.companyAbout': 'Tentang Kami',
    'footer.companyProcess': 'Proses Kerja',
    'footer.companyContact': 'Kontak',
    'footer.services': 'Layanan',
    'footer.support': 'Dukungan',
    'footer.supportFaq': 'FAQ',
    'footer.supportHelp': 'Pusat Bantuan',
    'footer.supportQuote': 'Dapatkan Penawaran',
    'footer.supportReport': 'Laporkan Masalah',
    'footer.supportWhatsapp': 'Dukungan WhatsApp',
    'footer.rights': 'Hak cipta dilindungi.',
    'footer.tagline': 'Solusi Teknologi untuk Bisnis, Pendidikan & Rumah.',

    /* ---------- Accessibility labels ---------- */
    'aria.nav': 'Navigasi utama',
    'aria.navFooterCompany': 'Tautan perusahaan',
    'aria.navFooterServices': 'Tautan layanan',
    'aria.navFooterSupport': 'Tautan dukungan',
    'aria.brand': 'Beranda Baba Solution',
    'aria.toggle': 'Buka menu',
    'aria.backToTop': 'Kembali ke atas',
    'aria.chooseLanguage': 'Pilih bahasa',

    /* ---------- SEO / meta ---------- */
    'meta.title': 'Baba Solution Information Technology | Satu Partner untuk Semua Kebutuhan IT',
    'meta.description':
      'Baba Solution Information Technology — Solusi Teknologi untuk Bisnis, Pendidikan & Rumah. Web Hosting, Instalasi WiFi & CCTV, Perakitan Komputer, Service PC & Laptop, dan Laboratorium Komputer.',
    'meta.ogTitle': 'Baba Solution Information Technology',
    'meta.ogDescription':
      'Solusi Teknologi untuk Bisnis, Pendidikan & Rumah. Satu Partner untuk Semua Kebutuhan IT Anda.'
  },

  en: {
    /* ---------- Navigation ---------- */
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.hosting': 'Hosting',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.support': 'Support',
    'nav.getStarted': 'Get Started',

    /* ---------- Hero ---------- */
    'hero.badge': 'Technology Solutions for Business, Education & Home',
    'hero.title': 'One Partner for All Your <span class="text-gradient">IT Needs</span>.',
    'hero.subtitle':
      'Baba Solution Information Technology provides Web Hosting, WiFi Installation, CCTV Installation, Computer Assembly, Laptop & PC Repair, and Computer Laboratory Infrastructure design for schools, companies, and SMEs.',
    'hero.getStarted': 'Get Started',
    'hero.viewServices': 'View Services',
    'hero.statProjects': 'Projects',
    'hero.statClients': 'Clients',
    'hero.statSatisfaction': 'Satisfaction',
    'hero.statSupport': 'Support',

    /* ---------- Hero mockup & floating cards ---------- */
    'mockup.title': 'Baba Dashboard',
    'mockup.online': 'Online',
    'float.webHosting': 'Web Hosting',
    'float.webHostingSmall': 'Uptime 99.9%',
    'float.cloudReady': 'Cloud Ready',
    'float.cloudReadySmall': 'Secure & Fast',
    'float.wifi': 'WiFi Installed',
    'float.wifiSmall': 'Full Coverage',
    'float.cctv': '24/7 CCTV',
    'float.cctvSmall': 'Always Watching',
    'float.pcLaptop': 'PC & Laptop',
    'float.pcSmall': 'Repair Expert',
    'float.networking': 'Networking',
    'float.networkingSmall': 'Infrastructure',

    /* ---------- Services ---------- */
    'services.tag': 'Our Services',
    'services.title': 'Complete IT Solutions, <span class="text-gradient">One Provider</span>',
    'services.desc':
      'From hosting to network infrastructure, we handle all your technology needs with professional standards.',
    'services.learnMore': 'Learn More',
    'services.webHosting.title': 'Web Hosting',
    'services.webHosting.desc':
      'Fast, stable, and secure hosting with SSD support and a free SSL certificate for your website.',
    'services.wifi.title': 'WiFi Installation',
    'services.wifi.desc':
      'High-speed WiFi & Internet installation with optimal coverage throughout the area.',
    'services.cctv.title': 'CCTV Installation',
    'services.cctv.desc':
      'HD CCTV installation with remote access, keeping your property secure 24/7.',
    'services.assembly.title': 'Computer Assembly',
    'services.assembly.desc':
      'Computer assembly tailored to your needs, from workstations to gaming and rendering PCs.',
    'services.repair.title': 'Laptop & PC Repair',
    'services.repair.desc':
      'Laptop and PC repair with experienced technicians and quality components.',
    'services.lab.title': 'Computer Laboratory',
    'services.lab.desc':
      'Computer laboratory design and construction for schools and institutions.',
    'services.network.title': 'Network Infrastructure',
    'services.network.desc':
      'LAN/WAN network design, fiber cabling, server racks, and network management.',
    'services.consult.title': 'IT Consultation',
    'services.consult.desc':
      'Technology consultation to help your business choose the right IT solutions.',

    /* ---------- About / Why Choose Us ---------- */
    'about.tag': 'Why Choose Us',
    'about.title': 'We Deliver <span class="text-gradient">Quality & Reliability</span>',
    'about.desc':
      'Our team is committed to providing the best IT services with full support at every stage of the work.',
    'about.badgeValue': '5+ Years',
    'about.badgeSmall': 'Of IT Experience',
    'about.illustrationAlt': 'Professional IT team illustration',
    'about.feature1.title': 'Professional Team',
    'about.feature1.desc': 'Professional team ready to help you anytime.',
    'about.feature2.title': 'Fast Response',
    'about.feature2.desc': 'Fast response for every question and service request.',
    'about.feature3.title': 'Certified Engineers',
    'about.feature3.desc': 'Certified technicians and engineers with years of experience.',
    'about.feature4.title': 'Warranty & After Sales Support',
    'about.feature4.desc': 'Official warranty and guaranteed after-sales support.',
    'about.feature5.title': 'Affordable Pricing',
    'about.feature5.desc': 'Affordable pricing with maintained quality.',
    'about.feature6.title': 'Quality Equipment',
    'about.feature6.desc': 'Using the best quality equipment and components.',

    /* ---------- Work Process ---------- */
    'process.tag': 'Work Process',
    'process.title': 'Simple, Transparent, <span class="text-gradient">Step by Step</span>',
    'process.desc': 'Our work process is designed so you always know the progress of your project.',
    'process.step1.title': 'Consultation',
    'process.step1.desc': 'Discuss your IT needs and goals with our team.',
    'process.step2.title': 'Survey',
    'process.step2.desc': 'Location survey and technical needs analysis on site.',
    'process.step3.title': 'Planning',
    'process.step3.desc': 'Solution design, cost estimates, and work schedule.',
    'process.step4.title': 'Installation',
    'process.step4.desc': 'Installation and configuration by expert technicians.',
    'process.step5.title': 'Testing',
    'process.step5.desc': 'Thorough testing ensures everything works perfectly.',
    'process.step6.title': 'Support',
    'process.step6.desc': 'Ongoing support and maintenance after project completion.',

    /* ---------- Computer Laboratory ---------- */
    'lab.illustrationAlt': 'Computer laboratory illustration',
    'lab.badgeValue': 'Lab Ready',
    'lab.badgeSmall': 'National Standard',
    'lab.tag': 'Computer Laboratory',
    'lab.title': 'Complete School Lab <span class="text-gradient">Design & Build</span>',
    'lab.desc':
      'We design and build complete, neat, and ready-to-use school computer laboratories — from room planning to maintenance.',
    'lab.check1': 'Room Planning',
    'lab.check2': 'LAN Network Setup',
    'lab.check3': 'Server Installation',
    'lab.check4': 'Network Rack & Cable Management',
    'lab.check5': 'Internet Connection',
    'lab.check6': 'Testing & Training',
    'lab.check7': 'Maintenance Contract',
    'lab.cta': 'Consult Our Team',

    /* ---------- Hosting ---------- */
    'hosting.tag': 'Web Hosting',
    'hosting.title': 'Fast & Secure Hosting <span class="text-gradient-light">For Your Business</span>',
    'hosting.desc':
      'With high-performance servers and layered security systems, your website is always online and fast.',
    'hosting.check1': 'High Performance CPU & RAM',
    'hosting.check2': 'Large SSD Storage',
    'hosting.check3': 'Free SSL Certificate',
    'hosting.check4': 'Free Domain',
    'hosting.check5': 'Cloudflare CDN Protection',
    'hosting.check6': 'Daily Automatic Backup',
    'hosting.statUptime': 'Uptime',
    'hosting.statFreeSsl': 'Free SSL',
    'hosting.statMonitoring': 'Monitoring',
    'hosting.cta': 'Start Now',
    'hosting.dash.title': 'Server Status',
    'hosting.dash.cpu': 'CPU Usage',
    'hosting.dash.ram': 'RAM Usage',
    'hosting.dash.ssd': 'SSD Storage',
    'hosting.dash.ssl': 'SSL Certificate',
    'hosting.dash.sslValue': 'Active',
    'hosting.dash.domain': 'Domain',
    'hosting.dash.domainValue': 'yourdomain.com',
    'hosting.dash.backup': 'Daily Backup',
    'hosting.dash.backupValue': 'Success',
    'hosting.dash.secure': 'Secure',
    'hosting.dash.online': 'Online',
    'hosting.dash.done': 'Done',
    'hosting.float.cloudflare': 'Cloudflare',
    'hosting.float.cloudflareSmall': 'Protected & Optimized',
    'hosting.float.online': 'Website Online',
    'hosting.float.onlineSmall': 'Fast Response Time',

    /* ---------- FAQ / Support ---------- */
    'faq.tag': 'Support',
    'faq.title': 'Frequently Asked <span class="text-gradient">Questions</span>',
    'faq.desc': 'Have questions about our services? Find the answers below.',
    'faq.supportTitle': 'Still have questions?',
    'faq.supportDesc': 'Contact our support team — ready to help 24/7.',
    'faq.contactSupport': 'Contact Support',
    'faq.q1': 'Does Baba Solution provide WiFi installation services for homes?',
    'faq.a1':
      'Yes. We provide WiFi and internet installation for homes, offices, schools, and public areas with guaranteed optimal signal coverage throughout the area.',
    'faq.q2': 'How long does the website development process take?',
    'faq.a2':
      'For a company profile website, it typically takes 1–3 weeks depending on complexity and the number of pages. We will provide a clear timeline before the project starts.',
    'faq.q3': 'Is there a warranty for laptop and PC repair services?',
    'faq.a3':
      'Yes, all our repair work comes with a warranty. The warranty covers repair labor and replacement components according to the agreed terms.',
    'faq.q4': 'Can you build a computer laboratory for schools?',
    'faq.a4':
      'Of course. We provide complete school computer laboratory design and construction — from room layout, LAN installation, servers, racks, to usage training.',
    'faq.q5': 'How do I order a service?',
    'faq.a5':
      'You can reach us through the contact form, email, or WhatsApp. Our team will respond promptly for an initial consultation and pricing.',

    /* ---------- Contact ---------- */
    'contact.tag': 'Contact Us',
    'contact.title': "Let's Work <span class=\"text-gradient\">Together</span>",
    'contact.desc': "Consult us about your IT needs — we're ready to help.",
    'contact.address': 'Address',
    'contact.addressValue': 'Jalan Raya Tanjung Kait No.13 Kp.Kebon Baru, RT./RW.002/04, Marga Mulya, Kec. Mauk, Kabupaten Tangerang, Banten 15530, Indonesia',
    'contact.email': 'Email',
    'contact.emailValue': 'info@babasolution.com',
    'contact.whatsapp': 'WhatsApp',
    'contact.whatsappValue': '+62 812-8164-0680',
    'contact.hours': 'Working Hours',
    'contact.hoursValue': 'Mon – Sat, 08.00 – 17.00 WIB',
    'contact.form.nameLabel': 'Full Name',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.nameError': 'Please enter your name.',
    'contact.form.emailLabel': 'Email',
    'contact.form.emailPlaceholder': 'you@example.com',
    'contact.form.emailError': 'Please enter a valid email address.',
    'contact.form.phoneLabel': 'Phone Number',
    'contact.form.phonePlaceholder': '08xx-xxxx-xxxx',
    'contact.form.phoneError': 'Please enter a valid phone number.',
    'contact.form.serviceLabel': 'Service Needed',
    'contact.form.servicePlaceholder': 'Select a service',
    'contact.form.serviceError': 'Please select a service.',
    'contact.form.service.webDev': 'Website Development',
    'contact.form.service.lab': 'Computer Laboratory Design & Construction',
    'contact.form.service.laptop': 'Laptop Repair',
    'contact.form.service.pc': 'PC Repair',
    'contact.form.service.other': 'Other',
    'contact.form.schoolLabel': 'School Name',
    'contact.form.schoolPlaceholder': 'Enter school name',
    'contact.form.schoolError': 'Please enter your school name.',
    'contact.form.messageLabel': 'Message',
    'contact.form.messagePlaceholder': 'Tell us about your project...',
    'contact.form.messageError': 'Please describe your needs.',
    'contact.form.submit': 'Send via WhatsApp',
    'contact.whatsapp.greeting': 'Hello Baba Solution Information Technology,',
    'contact.whatsapp.intro': 'I would like to request information about your services.',
    'contact.whatsapp.name': 'Name:',
    'contact.whatsapp.school': '🏫 School Name:',
    'contact.whatsapp.email': 'Email:',
    'contact.whatsapp.phone': 'Phone:',
    'contact.whatsapp.service': 'Service:',
    'contact.whatsapp.message': 'Message:',
    'contact.whatsapp.footer': 'Sent from:\nBaba Solution Website',

    /* ---------- Footer ---------- */
    'footer.aboutText':
      'Technology Solutions for Business, Education & Home. Your trusted partner for all your IT needs.',
    'footer.company': 'Company',
    'footer.companyAbout': 'About Us',
    'footer.companyProcess': 'Work Process',
    'footer.companyContact': 'Contact',
    'footer.services': 'Services',
    'footer.support': 'Support',
    'footer.supportFaq': 'FAQ',
    'footer.supportHelp': 'Help Center',
    'footer.supportQuote': 'Get a Quote',
    'footer.supportReport': 'Report an Issue',
    'footer.supportWhatsapp': 'WhatsApp Support',
    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'Technology Solutions for Business, Education & Home.',

    /* ---------- Accessibility labels ---------- */
    'aria.nav': 'Main navigation',
    'aria.navFooterCompany': 'Footer company links',
    'aria.navFooterServices': 'Footer services links',
    'aria.navFooterSupport': 'Footer support links',
    'aria.brand': 'Baba Solution home',
    'aria.toggle': 'Toggle menu',
    'aria.backToTop': 'Back to top',
    'aria.chooseLanguage': 'Choose language',

    /* ---------- SEO / meta ---------- */
    'meta.title': 'Baba Solution Information Technology | One Partner for All Your IT Needs',
    'meta.description':
      'Baba Solution Information Technology — Technology Solutions for Business, Education & Home. Web Hosting, WiFi & CCTV Installation, Computer Assembly, PC & Laptop Repair, and Computer Laboratory.',
    'meta.ogTitle': 'Baba Solution Information Technology',
    'meta.ogDescription':
      'Technology Solutions for Business, Education & Home. One Partner for All Your IT Needs'
  }
};
