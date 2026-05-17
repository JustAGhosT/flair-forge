import styles from './TemplateSelector.module.css';

interface TemplateSummary {
  readonly id: string;
  readonly image: string;
  readonly title: string;
  readonly description: string;
}

interface TemplateSelectorProps {
  readonly templates: readonly TemplateSummary[];
  readonly onSelect: (id: string) => void;
}

export default function TemplateSelector({ templates, onSelect }: TemplateSelectorProps) {
  const safeTemplates = templates || [];
  return (
    <div className={styles.templatesGrid}>
      {safeTemplates.map(template => (
        <div
          key={template.id}
          className={styles.templateCard}
          onClick={() => onSelect(template.id)}
        >
          <div className={styles.templatePreview}>
            <img src={template.image} alt={`${template.title} Preview`} />
          </div>
          <div className={styles.templateInfo}>
            <div className={styles.templateTitle}>{template.title}</div>
            <div className={styles.templateDescription}>{template.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
} 
