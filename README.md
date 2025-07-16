# Portfolio - Full Stack Developer

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features internationalization, dark/light themes, and comprehensive testing.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Internationalization**: i18next with Arabic and English support
- **State Management**: Zustand for efficient state management
- **Animations**: Framer Motion for smooth animations
- **Responsive Design**: Mobile-first responsive design
- **Dark/Light Theme**: Toggle between themes
- **Performance Optimized**: Code splitting and lazy loading
- **Path Aliases**: Clean imports using `@` prefixes
- **Comprehensive Testing**: Unit tests with Vitest and E2E tests with Playwright
- **Analytics**: Google Analytics integration with Web Vitals
- **Security**: Input validation, rate limiting, and CSRF protection
- **SEO Optimized**: Meta tags, structured data, and performance monitoring

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and data services
│   ├── stores/             # Zustand state stores
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── test/                   # Test files
│   ├── components/         # Component tests
│   └── e2e/               # End-to-end tests
├── public/
│   ├── data/              # JSON data files
│   └── fonts/             # Custom fonts
└── docs/                  # Documentation
```

## 🛠️ Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of relative paths
import Component from '../../components/Component'

// Use path aliases
import Component from '@components/Component'
import { hook } from '@hooks/hook'
import { service } from '@services/service'
import { type } from '@types/type'
```

### Available Aliases

- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@hooks/*` → `src/hooks/*`
- `@services/*` → `src/services/*`
- `@stores/*` → `src/stores/*`
- `@types/*` → `src/types/*`
- `@utils/*` → `src/utils/*`
- `@test/*` → `test/*`

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # EmailJS Configuration
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   
   # Google Analytics
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   
   # Data Path
   VITE_DATA_PATH=/data
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run unit tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests with UI

# Linting & Formatting
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier

# Analysis
npm run analyze          # Analyze bundle size
npm run type-check       # TypeScript type checking

# CI/CD
npm run ci               # Run CI pipeline
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Coverage Report
```bash
npm run test:coverage
```

## 📊 Analytics & Monitoring

The app includes Google Analytics integration with:

- Page view tracking
- Custom event tracking
- Web Vitals monitoring
- Error tracking
- Offline event queuing

## 🔒 Security Features

- Input validation and sanitization
- Rate limiting for contact forms
- CSRF protection
- Security headers
- Secure connection validation

## 🎨 Customization

### Adding New Languages

1. Create data files in `public/data/{language}/`
2. Update `src/i18n.ts` with new language configuration
3. Add language toggle in `src/components/LanguageToggle.tsx`

### Adding New Sections

1. Create component in `src/components/`
2. Add data files in `public/data/{language}/`
3. Update `src/App.tsx` to include the new section
4. Add translations to language files

### Styling

The project uses Tailwind CSS with DaisyUI. Customize themes in `tailwind.config.cjs`.

## 📚 Documentation

- [Path Aliases](./docs/PATH_ALIASES.md) - Complete guide to using path aliases
- [Testing Guide](./docs/TESTING.md) - Testing setup and best practices
- [Enhancements](./docs/ENHANCEMENTS.md) - List of implemented features
- [Installation](./INSTALLATION.md) - Detailed installation guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [i18next](https://www.i18next.com/) - Internationalization
- [Vitest](https://vitest.dev/) - Testing framework
- [Playwright](https://playwright.dev/) - E2E testing

---

Built with ❤️ using modern web technologies
