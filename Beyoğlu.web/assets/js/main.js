/**
 * YEMEKCILIK - Main UI Logic
 * Manages animations, navigation, and user interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const UI = {
        navbar: document.getElementById('navbar'),
        hamburger: document.getElementById('hamburger'),
        mobileMenu: document.getElementById('mobileMenu'),
        form: document.querySelector('.contact-form'),
        foodCards: document.querySelectorAll('.food-card'),
        pendingMessage: null,

        init() {
            this.handleScroll();
            this.initObserver();
            this.setupListeners();
            this.initParallax();
            this.initAboutSlider();
        },

        initAboutSlider() {
            const slider = document.getElementById('aboutSlider');
            if (!slider) return;
            const slides = slider.querySelectorAll('.slide');
            const prevBtn = document.getElementById('prevSlide');
            const nextBtn = document.getElementById('nextSlide');
            let currentSlide = 0;
            let autoPlayInterval;

            const showSlide = (n) => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (n + slides.length) % slides.length;
                slides[currentSlide].classList.add('active');
            };

            const startAutoPlay = () => {
                autoPlayInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
            };

            const resetAutoPlay = () => {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            };

            if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); resetAutoPlay(); });
            if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); resetAutoPlay(); });

            startAutoPlay();
        },

        handleScroll() {
            if (!this.navbar) return;
            window.addEventListener('scroll', () => {
                const isScrolled = window.scrollY > 50;
                this.navbar.classList.toggle('scrolled', isScrolled);
            });
        },

        initParallax() {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                this.foodCards.forEach((card, index) => {
                    const speed = 0.05 + (index * 0.02);
                    const yPos = -(scrollY * speed);
                    card.style.transform = `translateY(${yPos % 50}px)`;
                });
            });
        },

        setupListeners() {
            // WhatsApp Modal Logic
            const waTriggers = document.querySelectorAll('.wa-trigger');
            const waModal = document.getElementById('waModal');
            if (waModal) {
                const waClose = waModal.querySelector('.wa-modal-close');
                const waOpts = waModal.querySelectorAll('.wa-opt');

                const openWaModal = (msg = null) => {
                    this.pendingMessage = msg;
                    waModal.classList.add('open');
                };

                waTriggers.forEach(t => t.addEventListener('click', () => openWaModal()));
                if (waClose) waClose.addEventListener('click', () => waModal.classList.remove('open'));
                waModal.addEventListener('click', (e) => {
                    if(e.target === waModal) waModal.classList.remove('open');
                });

                waOpts.forEach(opt => {
                    opt.addEventListener('click', (e) => {
                        e.preventDefault();
                        const num = opt.getAttribute('data-num');
                        let url = `https://wa.me/${num}`;
                        if (this.pendingMessage) {
                            url += `?text=${encodeURIComponent(this.pendingMessage)}`;
                        }
                        window.open(url, '_blank');
                        waModal.classList.remove('open');
                        this.pendingMessage = null;
                    });
                });
            }

            // Mobile Menu Toggle
            if (this.hamburger) {
                this.hamburger.addEventListener('click', () => this.toggleMenu());
            }

            // Smooth Scroll for Nav Links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', e => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') {
                        e.preventDefault();
                        this.closeMenu();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        const target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            this.closeMenu();
                            const offset = window.innerWidth <= 768 ? 60 : 70;
                            window.scrollTo({
                                top: target.offsetTop - offset,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });

            // Form Handling
            if (this.form) {
                this.form.addEventListener('submit', e => this.handleFormSubmit(e));
            }
        },

        toggleMenu() {
            if (!this.hamburger || !this.mobileMenu) return;
            this.hamburger.classList.toggle('open');
            this.mobileMenu.classList.toggle('open');
            document.body.style.overflow = this.mobileMenu.classList.contains('open') ? 'hidden' : '';
        },

        closeMenu() {
            if (!this.hamburger || !this.mobileMenu) return;
            this.hamburger.classList.remove('open');
            this.mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        },

        initObserver() {
            const options = {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, options);

            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .process-step').forEach(el => {
                observer.observe(el);
            });
        },

        handleFormSubmit(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Gather Data
            const nameInput = e.target.querySelector('input[type="text"]');
            const phoneInput = e.target.querySelector('input[type="tel"]');
            const serviceSelect = e.target.querySelector('select');
            const notesTextarea = e.target.querySelector('textarea');

            const name = nameInput ? nameInput.value : '';
            const phone = phoneInput ? phoneInput.value : '';
            const service = serviceSelect ? serviceSelect.value : '';
            const notes = notesTextarea ? notesTextarea.value : '';

            // Loading state
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner"></span> Hazırlanıyor...';

            // Construct WhatsApp Message
            const message = `*Yeni Teklif Talebi (Beyoğlu Yemekçilik)*\n\n` +
                          `👤 *Müşteri:* ${name}\n` +
                          `📞 *Telefon:* ${phone}\n` +
                          `🍽️ *Hizmet:* ${service}\n` +
                          `📝 *Notlar:* ${notes || 'Belirtilmedi'}\n\n` +
                          `_Bu mesaj web sitesinden otomatik oluşturuldu._`;
            
            // Show Selection UI
            setTimeout(() => {
                btn.innerHTML = '✓ Alıcı Seçiniz';
                btn.style.background = '#25D366';
                btn.style.color = '#FFFFFF';
                
                const waModal = document.getElementById('waModal');
                if (waModal) {
                    this.pendingMessage = message;
                    waModal.classList.add('open');
                }

                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    e.target.reset();
                }, 4000);
            }, 800);
        }
    };

    UI.init();
});
