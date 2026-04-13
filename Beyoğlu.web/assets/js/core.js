/**
 * BEYOĞLU YEMEKCILIK - Core Data & Logic
 * This module manages the central data structure and business rules.
 */

const Beyoglu_DataCore = {
    config: {
        version: "2.5.0",
        lastUpdate: "2024-04-11",
        owner: "Beyoğlu Yemekcılık Ltd. Şti.",
        establishmentYear: 1987,
        contact: {
            phone: "+90 212 555 14 87",
            whatsapp: "+90 530 555 14 87",
            address: "İstiklal Cad. No:142, Beyoğlu, İstanbul",
            email: "bilgi@beyogluyemekcilik.com"
        }
    },

    services: [
        { id: "onsite", icon: "🏠", title: "Yerimizde Servis", tag: "Rezervasyon Gerekli" },
        { id: "catering", icon: "🚐", title: "Catering Hizmeti", tag: "İstanbul Geneli" },
        { id: "wedding", icon: "💍", title: "Düğün Yemeği", tag: "Özel Menü Tasarımı" },
        { id: "funeral", icon: "🕊️", title: "Cenaze Yemeği", tag: "7/24 Ulaşılabilir" },
        { id: "mevlut", icon: "📿", title: "Mevlüt Yemeği", tag: "Helal Sertifikalı" },
        { id: "iftar", icon: "🌙", title: "İftar Yemeği", tag: "Ramazan Özel" }
    ],

    stats: {
        years: 37,
        guests: "50K+",
        events: "5000+",
        satisfaction: "%98"
    },

    init() {
        console.log("%c BEYOĞLU YEMEKCILIK CORE LOADED ", "background: #C06020; color: #fff; font-weight: bold;");
        this.updateDynamicContent();
    },

    updateDynamicContent() {
        // Logic to update year-based stats automatically
        const currentYear = new Date().getFullYear();
        this.stats.years = currentYear - this.config.establishmentYear;
    }
};

Beyoglu_DataCore.init();
export default Beyoglu_DataCore;
