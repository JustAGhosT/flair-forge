import { FlyerData } from '../types';

const API_BASE = '/api';

export const api = {
  /**
   * Generates a flyer using the backend API
   */
  async generateFlyer(templateId: string, data: Partial<FlyerData>): Promise<{ flyerUrl: string; filename: string }> {
    const response = await fetch(`${API_BASE}/generate-flyer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template: templateId,
        data,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate flyer');
    }

    return response.json();
  },

  /**
   * Enhances content using the backend AI API
   */
  async enhanceContent(text: string): Promise<{ enhanced: string }> {
    const response = await fetch(`${API_BASE}/enhance-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to enhance content');
    }

    return response.json();
  },

  /**
   * Fetches available templates
   */
  async getTemplates(): Promise<{ id: string; name: string; description: string }[]> {
    const response = await fetch(`${API_BASE}/templates`);
    if (!response.ok) {
      throw new Error('Failed to fetch templates');
    }
    const data = await response.json();
    return data.templates;
  }
};
