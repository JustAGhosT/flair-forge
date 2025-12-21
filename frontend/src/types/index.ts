// Type definitions for FlairForge Flyer Generator

export interface Product {
  name: string;
  price?: string;
  description?: string;
}

export interface FlyerData {
  title: string;
  subtitle: string;
  contact?: string; // Added contact field
  type: FlyerType;
  products: Product[];
  description: string;
  enhancedContent: EnhancedContent | null;
  selectedTemplate: TemplateType;
  colorScheme: ColorScheme;
  finalImageUrl: string | null;
}

export interface EnhancedContent {
  title: string;
  description: string;
}

export interface OriginalContent {
  title: string;
  subtitle: string;
  description: string;
}

export interface AppState {
  currentStep: WorkflowStep;
  flyerData: FlyerData;
  originalContent: OriginalContent | null;
}

export type WorkflowStep = 'template' | 'content' | 'ai' | 'preview' | 'export';

export type FlyerType = 'products' | 'events' | 'catalog' | 'promotion' | 'custom' | '';

export type TemplateType = string; // Changed to string to support dynamic templates

export type ColorScheme = 'default' | 'green' | 'blue' | 'purple';

export interface DOMElements {
  workflowSteps: NodeListOf<HTMLElement>;
  workflowContent: NodeListOf<HTMLElement>;
  inputForm: HTMLFormElement;
  flyerTitle: HTMLInputElement;
  flyerSubtitle: HTMLInputElement;
  flyerType: HTMLSelectElement;
  flyerProducts: HTMLTextAreaElement;
  flyerDescription: HTMLTextAreaElement;
  btnAiEnhance: HTMLButtonElement;
  btnSkipAi: HTMLButtonElement;
  aiProcessing: HTMLElement;
  aiResults: HTMLElement;
  tabButtons: NodeListOf<HTMLButtonElement>;
  tabContents: NodeListOf<HTMLElement>;
  originalTitle: HTMLElement;
  originalDescription: HTMLElement;
  enhancedTitle: HTMLElement;
  enhancedDescription: HTMLElement;
  btnAcceptCopy: HTMLButtonElement;
  btnRevertCopy: HTMLButtonElement;
  btnToTemplates: HTMLButtonElement;
  templateCards: NodeListOf<HTMLElement>;
  colorOptions: NodeListOf<HTMLElement>;
  btnGeneratePreview: HTMLButtonElement;
  flyerPreview: HTMLElement;
  btnEditContent: HTMLButtonElement;
  btnChangeTemplate: HTMLButtonElement;
  btnFinalize: HTMLButtonElement;
  finalFlyerImage: HTMLImageElement;
  btnDownloadJpg: HTMLButtonElement;
  btnDownloadPdf: HTMLButtonElement;
  btnDownloadHtml: HTMLButtonElement;
  btnShareWhatsapp: HTMLButtonElement;
  btnShareEmail: HTMLButtonElement;
  btnShareLink: HTMLButtonElement;
  btnSaveFlyer: HTMLButtonElement;
  btnCreateNew: HTMLButtonElement;
}
