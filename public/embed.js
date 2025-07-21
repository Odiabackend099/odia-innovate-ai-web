
// Agent Odia Widget Embed Script
// Usage: <script src="https://yourdomain.com/embed.js" data-position="bottom-right"></script>

(function() {
    'use strict';
    
    // Get the script tag that loaded this file
    const scriptTag = document.currentScript || document.querySelector('script[src*="embed.js"]');
    
    if (!scriptTag) {
        console.error('Agent Odia Widget: Could not find embed script tag');
        return;
    }
    
    // Extract configuration from data attributes
    const config = {
        position: scriptTag.getAttribute('data-position') || 'bottom-right',
        theme: scriptTag.getAttribute('data-theme') || 'light',
        language: scriptTag.getAttribute('data-language') || 'en',
        customColors: {
            primary: scriptTag.getAttribute('data-primary-color') || '#25D366',
            secondary: scriptTag.getAttribute('data-secondary-color') || '#128C7E',
            background: scriptTag.getAttribute('data-background-color') || '#ECE5DD'
        }
    };
    
    // Determine the widget URL (adjust this to your actual domain)
    const widgetUrl = scriptTag.src.replace('/embed.js', '/widget');
    
    // Create widget container
    const container = document.createElement('div');
    container.id = 'agent-odia-widget-container';
    container.style.cssText = `
        position: fixed;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    `;
    
    // Apply position styles
    switch (config.position) {
        case 'bottom-left':
            container.style.bottom = '24px';
            container.style.left = '24px';
            break;
        case 'top-right':
            container.style.top = '24px';
            container.style.right = '24px';
            break;
        case 'top-left':
            container.style.top = '24px';
            container.style.left = '24px';
            break;
        default: // bottom-right
            container.style.bottom = '24px';
            container.style.right = '24px';
    }
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = widgetUrl;
    iframe.style.cssText = `
        width: 380px;
        height: 600px;
        border: none;
        border-radius: 12px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        transition: all 0.3s ease;
    `;
    iframe.allow = 'microphone';
    iframe.title = 'Agent Odia Voice Assistant';
    
    // Handle mobile responsiveness
    function handleResize() {
        if (window.innerWidth <= 640) {
            container.style.cssText += `
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
            `;
            iframe.style.width = '100vw';
            iframe.style.height = '100vh';
            iframe.style.borderRadius = '0';
        } else {
            // Reset mobile styles and reapply position
            container.style.width = 'auto';
            container.style.height = 'auto';
            
            switch (config.position) {
                case 'bottom-left':
                    container.style.bottom = '24px';
                    container.style.left = '24px';
                    container.style.top = 'auto';
                    container.style.right = 'auto';
                    break;
                case 'top-right':
                    container.style.top = '24px';
                    container.style.right = '24px';
                    container.style.bottom = 'auto';
                    container.style.left = 'auto';
                    break;
                case 'top-left':
                    container.style.top = '24px';
                    container.style.left = '24px';
                    container.style.bottom = 'auto';
                    container.style.right = 'auto';
                    break;
                default: // bottom-right
                    container.style.bottom = '24px';
                    container.style.right = '24px';
                    container.style.top = 'auto';
                    container.style.left = 'auto';
            }
            
            iframe.style.width = '380px';
            iframe.style.height = '600px';
            iframe.style.borderRadius = '12px';
        }
    }
    
    // Wait for DOM to be ready
    function init() {
        container.appendChild(iframe);
        document.body.appendChild(container);
        
        window.addEventListener('resize', handleResize);
        handleResize();
        
        console.log('Agent Odia Widget loaded successfully');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
