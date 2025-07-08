import { useFooterData } from '../hooks/usePortfolioData';
import { useLanguageFont } from '../hooks/useLanguageFont';

const Footer = () => {
  const { data: footerData, loading } = useFooterData();
  const { fontClass, body } = useLanguageFont();

  if (loading || !footerData) {
    return (
      <footer className={`w-full py-6 bg-base-200/90 border-t border-base-300/40 text-center ${fontClass}`}>
        <div className="loading loading-spinner loading-sm"></div>
      </footer>
    );
  }

  return (
    <footer className={`w-full py-6 bg-base-200/90 border-t border-base-300/40 text-center ${fontClass}`}>
      <span className={body + " text-base-content/60 text-sm"}>
        Made with <span className="text-pink-500">❤️</span> by Muhammad Zaman · © {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer; 