import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: () => void;
}

export const useKeyboardShortcuts = () => {
  const { t } = useTranslation();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'h',
      description: t('shortcut_home', 'Go to Home'),
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      key: 'a',
      description: t('shortcut_about', 'Go to About'),
      action: () => {
        const aboutSection = document.querySelector('[data-section="about"]');
        aboutSection?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      key: 'p',
      description: t('shortcut_projects', 'Go to Projects'),
      action: () => {
        const projectsSection = document.querySelector('[data-section="projects"]');
        projectsSection?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      key: 'e',
      description: t('shortcut_experience', 'Go to Experience'),
      action: () => {
        const experienceSection = document.querySelector('[data-section="experience"]');
        experienceSection?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      key: 's',
      description: t('shortcut_skills', 'Go to Skills'),
      action: () => {
        const skillsSection = document.querySelector('[data-section="skills"]');
        skillsSection?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      key: 'c',
      description: t('shortcut_contact', 'Go to Contact'),
      action: () => {
        const contactSection = document.querySelector('[data-section="contact"]');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      key: 't',
      ctrl: true,
      description: t('shortcut_toggle_theme', 'Toggle Theme'),
      action: () => {
        const themeToggle = document.querySelector('[data-theme-toggle]') as HTMLElement;
        themeToggle?.click();
      }
    },
    {
      key: 'l',
      ctrl: true,
      description: t('shortcut_toggle_language', 'Toggle Language'),
      action: () => {
        const languageToggle = document.querySelector('[data-language-toggle]') as HTMLElement;
        languageToggle?.click();
      }
    },
    {
      key: 'f',
      ctrl: true,
      description: t('shortcut_search', 'Open Search'),
      action: () => {
        const searchInput = document.querySelector('[data-search-input]') as HTMLInputElement;
        searchInput?.focus();
      }
    },
    {
      key: 'Escape',
      description: t('shortcut_close', 'Close Modal/Dialog'),
      action: () => {
        const modal = document.querySelector('.modal.open') as HTMLElement;
        if (modal) {
          const closeButton = modal.querySelector('[data-close-modal]') as HTMLElement;
          closeButton?.click();
        }
      }
    },
    {
      key: 'ArrowUp',
      ctrl: true,
      description: t('shortcut_scroll_top', 'Scroll to Top'),
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      key: 'ArrowDown',
      ctrl: true,
      description: t('shortcut_scroll_bottom', 'Scroll to Bottom'),
      action: () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    },
    {
      key: '?',
      description: t('shortcut_help', 'Show Help'),
      action: () => {
        showShortcutsHelp();
      }
    }
  ];

  const showShortcutsHelp = useCallback(() => {
    // Remove existing help modal if any
    const existingModal = document.querySelector('.shortcuts-help-modal');
    if (existingModal) {
      existingModal.remove();
    }

    const helpModal = document.createElement('div');
    helpModal.className = 'shortcuts-help-modal fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm';
    helpModal.innerHTML = `
      <div class="bg-base-100 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold">${t('keyboard_shortcuts', 'Keyboard Shortcuts')}</h3>
          <button class="text-base-content/60 hover:text-primary text-xl" onclick="this.closest('.shortcuts-help-modal').remove()">×</button>
        </div>
        <div class="space-y-2 text-sm max-h-96 overflow-y-auto">
          ${shortcuts.map(shortcut => `
            <div class="flex items-center justify-between p-2 hover:bg-base-200 rounded">
              <span>${shortcut.description}</span>
              <kbd class="px-2 py-1 bg-base-300 rounded text-xs font-mono">
                ${shortcut.ctrl ? 'Ctrl+' : ''}${shortcut.shift ? 'Shift+' : ''}${shortcut.alt ? 'Alt+' : ''}${shortcut.key}
              </kbd>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(helpModal);
    
    // Auto-remove on escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        helpModal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Auto-remove on click outside
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) {
        helpModal.remove();
      }
    });
  }, [shortcuts, t]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      const pressedKey = event.key.toLowerCase();
      const isCtrl = event.ctrlKey;
      const isShift = event.shiftKey;
      const isAlt = event.altKey;

      const shortcut = shortcuts.find(s => {
        const keyMatch = s.key.toLowerCase() === pressedKey;
        const ctrlMatch = s.ctrl === isCtrl;
        const shiftMatch = s.shift === isShift;
        const altMatch = s.alt === isAlt;
        
        return keyMatch && ctrlMatch && shiftMatch && altMatch;
      });

      if (shortcut) {
        event.preventDefault();
        shortcut.action();
        
        // Show visual feedback
        showShortcutFeedback(shortcut);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  const showShortcutFeedback = (shortcut: KeyboardShortcut) => {
    // Remove existing feedback if any
    const existingFeedback = document.querySelector('.shortcut-feedback');
    if (existingFeedback) {
      existingFeedback.remove();
    }

    const feedback = document.createElement('div');
    feedback.className = 'shortcut-feedback fixed top-4 right-4 bg-primary text-primary-content px-4 py-2 rounded-lg shadow-lg z-[9999] animate-in slide-in-from-right';
    feedback.innerHTML = `
      <div class="flex items-center space-x-2">
        <span>${shortcut.description}</span>
        <kbd class="px-2 py-1 bg-primary-content/20 rounded text-xs font-mono">
          ${shortcut.ctrl ? 'Ctrl+' : ''}${shortcut.shift ? 'Shift+' : ''}${shortcut.alt ? 'Alt+' : ''}${shortcut.key}
        </kbd>
      </div>
    `;
    document.body.appendChild(feedback);
    
    // Auto-remove after 2 seconds
    setTimeout(() => {
      feedback.remove();
    }, 2000);
  };

  return { showShortcutsHelp };
}; 