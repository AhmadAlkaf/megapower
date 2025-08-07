
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;

    // إخفاء جميع محتويات التبويبات
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // إزالة الكلاس "active" من جميع أزرار التبويبات
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // إظهار التبويب الحالي وإضافة الكلاس "active" لزر التبويب الذي تم النقر عليه
    // تأكد من وجود العنصر قبل محاولة الوصول إليه لمنع الأخطاء
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.style.display = "block";
        evt.currentTarget.className += " active";
    }
}


// --- MAIN SCRIPT (ينتظر حتى يتم تحميل محتوى DOM بالكامل) ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. INITIALIZE AOS (Animation On Scroll)
    // يجب أن يتم تهيئة AOS أولاً لضمان عمل الأنيميشن عند تحميل الصفحة
    AOS.init({
        duration: 800, // مدة الأنيميشن بالمللي ثانية
        once: true,    // الأنيميشن يعمل مرة واحدة فقط عند التمرير إلى العنصر
    });


    // 2. THEME (DARK/LIGHT MODE) SWITCHER
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    // استعادة الوضع المفضل من التخزين المحلي للمتصفح
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeSwitcher.textContent = '☀️'; // تغيير الأيقونة للوضع المظلم
        }
    }

    // إضافة مستمع حدث عند النقر على زر تبديل الوضع
    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('dark-mode'); // تبديل الكلاس بين 'light-mode' و 'dark-mode'
        let theme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        themeSwitcher.textContent = theme === 'dark-mode' ? '☀️' : '🌙'; // تحديث الأيقونة
        localStorage.setItem('theme', theme); // حفظ الوضع المفضل في التخزين المحلي
    });


    // 3. LANGUAGE SWITCHER AND TRANSLATIONS
    const langSwitcher = document.getElementById('lang-switcher');
    const html = document.documentElement; // الوصول إلى عنصر <html> لتغيير سمة 'lang' و 'dir'

    // كائن الترجمات: يحتوي على النصوص لكل لغة
    // يجب أن تكون جميع المفاتيح (data-lang-key) موجودة هنا
    const translations = {
        en: {
            navHome: "Home", navProducts: "Products", navByCategory: "By Category", navByCapacity: "By Capacity", navFeatured: "Featured: MP-H10", navProjects: "Projects", navNews: "News", navContact: "Contact Us",
            heroTitle: "Pure Energy for a Brighter Future", heroSubtitle: "Reliable and safe LiFePO4 battery storage systems.", heroButton: "Discover Products",
            featuredProductsTitle: "Featured Products", viewDetails: "View Details", projectsTitle: "Our Executed Projects", learnMore: "Learn More",
            latestNewsTitle: "Latest News", readMore: "Read More", viewAllNews: "View All News", certificationsTitle: "Certified Quality & Trust",
            footerSlogan: "Your trusted partner for energy storage solutions.", footerQuickLinks: "Quick Links", footerSupport: "Support", footerContactUs: "Contact Us",
            productTitle_MPH5: "MEGA POWER MP-H5", productSubtitle_MPH5: "5.12kWh Residential Energy Storage", downloadDatasheet: "Download Datasheet",
            tabDesc: "Description", tabSpecs: "Technical Specs", tabDownloads: "Downloads", productDesc_MPH5: "The MEGA POWER MP-H5 is the perfect solution for homeowners looking to store solar energy and ensure power during outages...",
            formTitle: "Request a Quote", sendRequest: "Send Request",
            newsPageTitle: "News & Insights", newsPageSubtitle: "Stay updated with our latest company news, events, and technical articles.",
            projectsPageTitle: "Our Success Stories", projectsPageSubtitle: "See how MEGA POWER is transforming energy usage across the region.",
            viewCaseStudy: "View Case Study", contactPageTitle: "Get In Touch",
            whyUsTitle: "Why Choose MEGA POWER?", feature1Title: "Ultimate Safety", feature1Desc: "Built with the safest LiFePO4 cells to ensure maximum protection for your family and home.",
            feature2Title: "Long Lifespan", feature2Desc: "Over 6000 cycles, providing reliable energy for more than 15 years of daily use.",
            feature3Title: "Smart BMS", feature3Desc: "Advanced Battery Management System for optimal performance, balancing, and protection.",
            viewAllProjects: "View All Projects", homeContactTitle: "Ready to Power Your Future?", homeContactSubtitle: "Contact us today for a free consultation or to find a distributor near you.", getStarted: "Get Started",
            filterSearch: "Search Products", filterCategories: "Product Categories",
        },
        ar: {
            navHome: "الرئيسية", navProducts: "المنتجات", navByCategory: "حسب الفئة", navByCapacity: "حسب السعة", navFeatured: "منتج مميز: MP-H10", navProjects: "المشاريع", navNews: "الأخبار", navContact: "اتصل بنا",
            heroTitle: "طاقة نقية لمستقبل مشرق", heroSubtitle: "أنظمة تخزين بطاريات LiFePO4 موثوقة وآمنة.", heroButton: "اكتشف المنتجات",
            featuredProductsTitle: "منتجات مميزة", viewDetails: "عرض التفاصيل", projectsTitle: "مشاريعنا المنفذة", learnMore: "اعرف المزيد",
            latestNewsTitle: "آخر الأخبار", readMore: "اقرأ المزيد", viewAllNews: "عرض كل الأخبار", certificationsTitle: "جودة وثقة معتمدة",
            footerSlogan: "شريكك الموثوق لحلول تخزين الطاقة.", footerQuickLinks: "روابط سريعة", footerSupport: "الدعم", footerContactUs: "تواصل معنا",
            productTitle_MPH5: "ميجا باور MP-H5", productSubtitle_MPH5: "نظام تخزين طاقة منزلي 5.12 كيلوواط ساعة", downloadDatasheet: "تحميل المواصفات",
            tabDesc: "الوصف", tabSpecs: "المواصفات الفنية", tabDownloads: "التحميلات", productDesc_MPH5: "بطارية ميجا باور MP-H5 هي الحل الأمثل لأصحاب المنازل الذين يتطلعون لتخزين الطاقة الشمسية وضمان توفر الطاقة أثناء الانقطاعات...",
            formTitle: "اطلب عرض سعر", sendRequest: "إرسال الطلب",
            newsPageTitle: "الأخبار والمقالات", newsPageSubtitle: "ابق على اطلاع بآخر أخبار الشركة وفعالياتها ومقالاتها الفنية.",
            projectsPageTitle: "قصص نجاحنا", projectsPageSubtitle: "شاهد كيف تُغيّر ميجا باور استخدام الطاقة في جميع أنحاء المنطقة.",
            viewCaseStudy: "عرض دراسة الحالة", contactPageTitle: "تواصل معنا",
            whyUsTitle: "لماذا تختار ميجا باور؟", feature1Title: "أمان فائق", feature1Desc: "مصممة بخلايا LiFePO4 الأكثر أمانًا لضمان أقصى حماية لعائلتك ومنزلك.",
            feature2Title: "عمر افتراضي طويل", feature2Desc: "أكثر من 6000 دورة شحن، توفر طاقة موثوقة لأكثر من 15 عامًا من الاستخدام اليومي.",
            feature3Title: "نظام إدارة ذكي", feature3Desc: "نظام إدارة بطارية متقدم لأداء مثالي، وموازنة، وحماية.",
            viewAllProjects: "عرض كل المشاريع", homeContactTitle: "هل أنت مستعد لتزويد مستقبلك بالطاقة؟", homeContactSubtitle: "تواصل معنا اليوم للحصول على استشارة مجانية أو للعثور على موزع بالقرب منك.", getStarted: "ابدأ الآن",
            filterSearch: "البحث عن المنتجات", filterCategories: "فئات المنتجات",
        }
    };

    // متغير لتخزين نسخة Swiper
    let mySwiper = null;

    // دالة لتطبيق اللغة
    const setLanguage = (lang) => {
        html.lang = lang; // تغيير سمة lang في HTML
        html.dir = lang === 'ar' ? 'rtl' : 'ltr'; // تغيير اتجاه الصفحة

        // تحديث النصوص في كل العناصر التي تحتوي على data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // --- الحل لمشكلة Swiper: تحديث السلايدر بعد تغيير اللغة ---
        // إذا كان السلايدر موجوداً وتم تهيئته، قم بتحديثه
        if (mySwiper) {
            mySwiper.update(); // هذا الأمر يخبر السلايدر بإعادة حساب كل شيء
        }

        localStorage.setItem('language', lang); // حفظ اللغة المفضلة
    };

    // تطبيق اللغة عند تحميل الصفحة (أو استعادة المفضلة)
    const currentLang = localStorage.getItem('language') || 'en';
    setLanguage(currentLang);

    // مستمع حدث لزر تبديل اللغة
    langSwitcher.addEventListener('click', () => {
        const newLang = html.lang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });


    // 4. PRODUCT FILTERING AND SEARCH (خاص بصفحة products.html)
    // نتحقق مما إذا كانت العناصر موجودة في الصفحة الحالية قبل محاولة الوصول إليها
    const productFilterButtons = document.querySelectorAll('.products-list-section .filter-btn');
    const searchInput = document.getElementById('product-search');
    const productCards = document.querySelectorAll('.products-grid-main .product-card');

    if (productFilterButtons.length > 0 && searchInput && productCards.length > 0) {
        
        // دالة مساعدة لفلترة المنتجات
        const filterProducts = (category, searchTerm) => {
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardName = card.getAttribute('data-name').toLowerCase();
                
                const categoryMatch = (category === 'all' || cardCategory === category);
                const searchMatch = cardName.includes(searchTerm); // البحث عن النص المدخل

                card.style.display = (categoryMatch && searchMatch) ? 'flex' : 'none'; // إظهار أو إخفاء البطاقة
            });
        };

        // مستمعات الأحداث لأزرار الفلترة
        productFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                productFilterButtons.forEach(btn => btn.classList.remove('active')); // إزالة النشاط من الكل
                button.classList.add('active'); // تفعيل الزر الحالي
                
                const selectedCategory = button.getAttribute('data-category');
                filterProducts(selectedCategory, searchInput.value.toLowerCase()); // تطبيق الفلترة
            });
        });

        // مستمع حدث لشريط البحث (عند كل ضغطة مفتاح)
        searchInput.addEventListener('keyup', () => {
            const selectedCategory = document.querySelector('.products-list-section .filter-btn.active').getAttribute('data-category');
            filterProducts(selectedCategory, searchInput.value.toLowerCase()); // تطبيق الفلترة مع نص البحث
        });
    }


    // 5. NEWS CATEGORY FILTERING (خاص بصفحة news.html)
    const newsFilterButtons = document.querySelectorAll('.category-filters .filter-btn');
    const newsCards = document.querySelectorAll('.news-list-grid .news-article-card');

    if (newsFilterButtons.length > 0 && newsCards.length > 0) {
        newsFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                newsFilterButtons.forEach(btn => btn.classList.remove('active')); // إزالة النشاط من الكل
                button.classList.add('active'); // تفعيل الزر الحالي
                
                const selectedCategory = button.getAttribute('data-category');
                
                newsCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    card.style.display = (selectedCategory === 'all' || cardCategory === selectedCategory) ? 'flex' : 'none'; // إظهار أو إخفاء البطاقة
                });
            });
        });
    }


    // 6. PRODUCT GALLERY (خاص بصفحة single-product.html)
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-images .thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.src; // تغيير الصورة الرئيسية إلى صورة المصغر
                // تحديث حالة 'active' على المصغرات
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }


    // 7. SWIPER JS INITIALIZATION (خاص بصفحة single-project.html)
    // تهيئة Swiper وتخزينه في المتغير mySwiper إذا كانت العناصر موجودة
    if (document.querySelector('.swiper-container') && !mySwiper) { // تأكد من عدم تهيئته مسبقًا
        mySwiper = new Swiper('.swiper-container', {
            loop: true, // تدوير لا نهائي
            autoplay: {
                delay: 5000, // 5 ثواني لكل شريحة
                disableOnInteraction: false, // لا تتوقف التدوير عند تفاعل المستخدم
            },
            
            pagination: { // إضافة نقاط التنقل
                el: '.swiper-pagination',
                clickable: true,
            },

            navigation: { // إضافة أزرار التنقل
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // خيارات Swiper التي تساعد في دعم RTL
            observer: true,       // يراقب التغييرات في DOM
            observeParents: true, // يراقب التغييرات في العناصر الأصلية
        });
    }

}); // نهاية DOMContentLoaded
