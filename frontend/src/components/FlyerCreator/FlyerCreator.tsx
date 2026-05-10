import React from 'react';
import styles from './FlyerCreator.module.css';
import { useAppStore } from '../../store/useAppStore';
import { api } from '../../services/api';

interface FlyerCreatorProps {
  onClose: () => void;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'An unexpected error occurred';
}

export function FlyerCreator({ onClose }: FlyerCreatorProps) {
  const [step, setStep] = React.useState<'template'|'content'|'ai'|'preview'|'export'>('template');
  const [error, setError] = React.useState<string|null>(null);
  const [loading, setLoading] = React.useState(false);
  const [aiInput, setAiInput] = React.useState('');
  const [aiOutput, setAiOutput] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(false);
  const [exportMsg, setExportMsg] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const { flyerData, updateFlyerData } = useAppStore();

  // AI enhancement
  const handleEnhance = async () => {
    if (!aiInput) return;
    setLoading(true);
    try {
      const result = await api.enhanceContent(aiInput);
      setAiOutput(result.enhanced);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Generate Flyer
  const handleGenerate = async () => {
    if (!flyerData.title) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await api.generateFlyer(flyerData.selectedTemplate, {
        title: flyerData.title,
        description: flyerData.description,
        contact: flyerData.contact,
        colorScheme: flyerData.colorScheme
      });

      setPreviewUrl(result.flyerUrl);
      updateFlyerData({ finalImageUrl: result.flyerUrl });

      setShowPreview(true);
      setStep('preview');
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (type: string) => {
    setExportMsg(`Downloading ${type.toUpperCase()}...`);

    // Create a temporary link to download
    if (previewUrl && (type === 'pdf' || type === 'png')) {
      const a = document.createElement('a');
      a.href = previewUrl;
      a.download = `flyer-${Date.now()}.${type === 'png' ? 'png' : 'pdf'}`; // The backend returns PDF data URI, but for this POC we pretend
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    setTimeout(() => setExportMsg(''), 2000);
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
            disabled={loading}
            onClick={handleGenerate}
          >
            {loading ? 'Generating...' : 'Generate Flyer'}
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
          <button
            data-testid="enhance-content-button"
            onClick={handleEnhance}
            disabled={loading}
          >
            {loading ? 'Enhancing...' : 'Enhance'}
          </button>
          <div data-testid="enhanced-content">{aiOutput}</div>
        </div>
      )}

      {step==='preview' && showPreview && (
        <div data-testid="flyer-preview" className={styles.flyerPreview}>
          <h3 data-testid="flyer-title">{flyerData.title}</h3>
          <p data-testid="flyer-description">{flyerData.description}</p>
          <p>Contact: {flyerData.contact}</p>

          {previewUrl && (
            <div className={styles.previewContainer}>
              <iframe
                src={previewUrl}
                width="100%"
                height="500px"
                title="Flyer PDF Preview"
                style={{ border: 'none', marginBottom: '1rem' }}
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button data-testid="export-png-button" className={styles.primary} onClick={()=>handleExport('png')}>Download PNG</button>
            <button data-testid="export-pdf-button" className={styles.primary} onClick={()=>handleExport('pdf')}>Download PDF</button>
          </div>
          {exportMsg && <div style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>{exportMsg}</div>}
        </div>
      )}

      {error && <div data-testid="error-message" className={styles.error}>{error}</div>}
    </div>
  );
}
