import React from 'react';
import styles from './FlyerCreator.module.css';
import { useAppStore } from '../../store/useAppStore';

interface FlyerCreatorProps {
  onClose: () => void;
}

export function FlyerCreator({ onClose }: FlyerCreatorProps) {
  const [step, setStep] = React.useState<'template'|'content'|'ai'|'preview'|'export'>('template');
  const [error, setError] = React.useState<string|null>(null);
  const [aiInput, setAiInput] = React.useState('');
  const [aiOutput, setAiOutput] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(false);
  const [exportMsg, setExportMsg] = React.useState('');

  const { flyerData, updateFlyerData } = useAppStore();

  // Simulate AI enhancement
  const handleEnhance = () => {
    setTimeout(() => setAiOutput(aiInput ? `${aiInput} (Enhanced)` : ''), 500);
  };

  // Simulate export
  const handleExport = (type: string) => {
    setExportMsg(`Exported as ${type.toUpperCase()}`);
    setTimeout(() => setExportMsg(''), 1500);
  };

  return (
    <div data-testid="flyer-creator" className={styles.flyerCreatorPanel}>
      <button onClick={onClose} className={styles.closeBtn}>X</button>
      <div className={styles.tabs}>
        <button
          data-testid="templates-tab"
          className={step==='template' ? styles.activeTab : ''}
          onClick={()=>setStep('template')}
        >
          Templates
        </button>
        <button
          data-testid="ai-enhancement-tab"
          className={step==='ai' ? styles.activeTab : ''}
          onClick={()=>setStep('ai')}
        >
          AI Enhancement
        </button>
      </div>

      {step==='template' && (
        <div>
          <h2>Select a Template</h2>
          <div data-testid="templates-grid" className={styles.templatesGrid}>
            <button
              data-testid="template-cheesy-pig"
              className={flyerData.selectedTemplate==='cheesy-pig' ? styles.selectedTemplate : ''}
              onClick={()=>updateFlyerData({ selectedTemplate: 'cheesy-pig' })}
            >
              Cheesy Pig
            </button>
            <button
              data-testid="template-business-classic"
              className={flyerData.selectedTemplate==='business-classic' ? styles.selectedTemplate : ''}
              onClick={()=>updateFlyerData({ selectedTemplate: 'business-classic' })}
            >
              Business Classic
            </button>
          </div>
          <div data-testid="selected-template">{flyerData.selectedTemplate}</div>
          <div data-testid="template-preview" className={styles.templatePreview}>
            Template Preview: {flyerData.selectedTemplate}
          </div>
          <button
            data-testid="generate-flyer-button"
            className={styles.primary}
            onClick={() => {
              if (!flyerData.selectedTemplate) {
                setError('Please select a template');
                return;
              }
              setStep('content');
              setError(null);
            }}
          >
            Next
          </button>
        </div>
      )}

      {step==='content' && (
        <div>
          <h2>Enter Flyer Details</h2>
          <input
            data-testid="title-input"
            placeholder="Title"
            value={flyerData.title}
            onChange={e=>updateFlyerData({ title: e.target.value })}
          />
          {error && <div data-testid="title-error" className={styles.error}>{error}</div>}
          <input
            data-testid="description-input"
            placeholder="Description"
            value={flyerData.description}
            onChange={e=>updateFlyerData({ description: e.target.value })}
          />
          <input
            data-testid="contact-input"
            placeholder="Contact"
            value={flyerData.contact || ''}
            onChange={e=>updateFlyerData({ contact: e.target.value })}
          />
          <button
            data-testid="generate-flyer-button"
            className={styles.primary}
            onClick={() => {
              if (!flyerData.title) {
                setError('Title is required');
                return;
              }
              setShowPreview(true);
              setStep('preview');
              setError(null);
            }}
          >
            Generate Flyer
          </button>
        </div>
      )}

      {step==='ai' && (
        <div data-testid="ai-enhancement-panel">
          <h2>AI Enhancement</h2>
          <input
            data-testid="content-input"
            placeholder="Content to enhance"
            value={aiInput}
            onChange={e=>setAiInput(e.target.value)}
          />
          <button data-testid="enhance-content-button" onClick={handleEnhance}>Enhance</button>
          <div data-testid="enhanced-content">{aiOutput}</div>
        </div>
      )}

      {step==='preview' && showPreview && (
        <div data-testid="flyer-preview" className={styles.flyerPreview}>
          <h3 data-testid="flyer-title">{flyerData.title}</h3>
          <p data-testid="flyer-description">{flyerData.description}</p>
          <p>Contact: {flyerData.contact}</p>
          <button data-testid="export-png-button" onClick={()=>handleExport('png')}>Export as PNG</button>
          <button data-testid="export-pdf-button" onClick={()=>handleExport('pdf')}>Export as PDF</button>
          {exportMsg && <div>{exportMsg}</div>}
        </div>
      )}

      {error && <div data-testid="error-message" className={styles.error}>{error}</div>}
    </div>
  );
}
