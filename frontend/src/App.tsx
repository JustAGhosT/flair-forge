import React from 'react';
import creationOptions from './data/creationOptions.json';
import './global.css';
import { useAppStore } from './store/useAppStore';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import styles from './App.module.css';
import Header from './components/Header';
import { FlyerCreator } from './components/FlyerCreator/FlyerCreator';

// Local UI state for the TemplateStep selection
const useTemplateStepStore = create<{ selectedOption: string | null; setSelectedOption: (option: string) => void }>((set: any) => ({
  selectedOption: null,
  setSelectedOption: (option: string) => set({ selectedOption: option }),
}));

function MainLayout() {
  const [showFlyerCreator, setShowFlyerCreator] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  return (
    <main className={styles.appMain}>
      <div className={styles.container}>
        <div className={styles.spacer} />
        <Header />
        <button data-testid="create-flyer-button" className={styles.primary} onClick={() => setShowFlyerCreator(true)}>
          Create Flyer
        </button>
        <button data-testid="mobile-menu-button" className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(v => !v)}>
          ☰
        </button>
        {mobileMenuOpen && (
          <nav data-testid="mobile-menu" className={styles.mobileMenu}>
            <ul>
              <li><button data-testid="templates-tab">Templates</button></li>
              <li><button data-testid="ai-enhancement-tab">AI Enhancement</button></li>
            </ul>
          </nav>
        )}
        {showFlyerCreator && <FlyerCreator onClose={() => setShowFlyerCreator(false)} />}
      </div>
    </main>
  );
}

// Below are placeholder components for other routes/flows if needed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TemplateStep() {
  const { selectedOption, setSelectedOption } = useTemplateStepStore();

  return (
    <section className={`${styles.workflowContent} active`}>
      <div className={styles.contentHeader}>
        <h2>How would you like to create your flyer?</h2>
      </div>
      <div className={styles.templateCreationOptions}>
        <div className={styles.creationGrid}>
          {creationOptions.map(option => (
            <div
              key={option.id}
              className={`${styles.creationOption}${selectedOption === option.action ? ` ${styles.selected}` : ''}`}
              onClick={() => setSelectedOption(option.action)}
              tabIndex={0}
              role="button"
              aria-pressed={selectedOption === option.action}
            >
              <div className={styles.creationIcon}>{option.icon}</div>
              <h4>{option.title}</h4>
              <p>{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ContentStep() {
  const updateFlyerData = useAppStore(state => state.updateFlyerData);

  // Example prepopulated content
  const prepopulated = [
    {
      id: 'featured-products',
      icon: '🥩',
      title: 'Featured Products Showcase',
      description: 'Premium pork products with featured highlights and special offers',
      flyerData: { title: 'Featured Products', description: 'Premium pork products...', products: [] }
    },
    {
      id: 'complete-catalog',
      icon: '📋',
      title: 'Complete Product Catalog',
      description: 'Comprehensive product range with pre-orders and special offers',
      flyerData: { title: 'Complete Catalog', description: 'Comprehensive product range...', products: [] }
    }
  ];

  return (
    <section className={`${styles.workflowContent} active`}>
      <div className={styles.contentHeader}>
        <h2>Add Your Content</h2>
        <p className={styles.description}>Choose from existing content or create your own.</p>
      </div>
      <div className={styles.contentSelection}>
        <h3>Quick Start with Prepopulated Content</h3>
        <div className={styles.prepopulatedGrid}>
          {prepopulated.map(card => (
            <div key={card.id} className={styles.prepopulatedCard} onClick={() => updateFlyerData(card.flyerData)}>
              <div className={styles.prepopulatedThumbnail}>{card.icon}</div>
              <div className={styles.prepopulatedInfo}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
                <button className={`${styles.useContent} ${styles.primary}`} type="button">Use This Content</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AIStep() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['aiEnhance'],
    queryFn: async () => {
      // Simulate async AI enhancement
      await new Promise(res => setTimeout(res, 1500));
      return { original: 'Original content', enhanced: 'AI Enhanced content' };
    },
  });

  return (
    <section className={`${styles.workflowContent} active`}>
      <div className={styles.contentHeader}>
        <h2>AI Content Enhancement</h2>
        <p className={styles.description}>Our AI is analyzing your content and enhancing it for better marketing impact.</p>
      </div>
      {isLoading && (
        <div className={styles.aiProcessing}>
          <div className={styles.spinner}></div>
          <p>Processing your content with AI...</p>
          <div className={`${styles.progressBar} ${styles.progressBar65}`}></div>
        </div>
      )}
      {isError && <div>Error enhancing content.</div>}
      {data && (
        <div className={styles.aiResults}>
          <h3>Enhanced Content</h3>
          <div className={`${styles.tabContent} active`}>
            <div className={styles.comparison}>
              <div className={styles.original}>
                <h4 className={styles.sectionTitle}>Original</h4>
                <p>{data.original}</p>
              </div>
              <div className={styles.enhanced}>
                <h4 className={styles.sectionTitle}>AI Enhanced</h4>
                <p>{data.enhanced}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function App() {
  return <MainLayout />;
}
