/**
 * BEYOĞLU YEMEKCILIK - Security Infrastructure
 * Implements protection against unauthorized inspection and code tampering.
 */

(function() {
    'use strict';

    const SecurityCore = {
        init() {
            this.disableRightClick();
            this.disableKeyCombinations();
            this.watchDeveloperTools();
            this.protectImages();
        },

        disableRightClick() {
            document.addEventListener('contextmenu', e => e.preventDefault());
        },

        disableKeyCombinations() {
            document.addEventListener('keydown', e => {
                // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
                if (
                    e.keyCode === 123 || 
                    (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
                    (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83))
                ) {
                    e.preventDefault();
                    return false;
                }
            });
        },

        watchDeveloperTools() {
            let lastCheck = 0;
            const threshold = 100;

            setInterval(() => {
                const start = performance.now();
                debugger;
                const end = performance.now();
                
                if (end - start > threshold) {
                    // DevTools likely open
                    this.onDevToolsOpen();
                }
            }, 1000);
        },

        onDevToolsOpen() {
            console.clear();
            console.log("%c BEYOĞLU YEMEKCILIK - GÜVENLİK SİSTEMİ ", "background: #16100A; color: #D4A040; font-size: 20px; font-weight: bold; padding: 20px;");
            console.log("%c İzinsiz kod incelemesi kısıtlanmıştır. ", "color: #C06020; font-size: 14px;");
        },

        protectImages() {
            document.querySelectorAll('img').forEach(img => {
                img.addEventListener('dragstart', e => e.preventDefault());
            });
        }
    };

    SecurityCore.init();
})();
