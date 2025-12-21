import { flyerService } from '../services/flyerService.js';
import { aiService } from '../services/aiService.js';

export const flyerController = {
  /**
   * Handle flyer generation request
   */
  async generate(req, res) {
    try {
      const { template, data } = req.body;

      // Validation
      if (!template) {
        return res.status(400).json({ error: 'Template ID is required' });
      }
      if (!data || !data.title) {
        return res.status(400).json({ error: 'Flyer data with title is required' });
      }

      // Call Service
      const result = await flyerService.generateFlyer(template, data);

      const base64Pdf = result.buffer.toString('base64');

      return res.json({
        success: true,
        message: 'Flyer generated successfully',
        flyerUrl: `data:application/pdf;base64,${base64Pdf}`,
        filename: result.filename
      });

    } catch (error) {
      console.error('Controller Error:', error);
      return res.status(500).json({
        error: 'Failed to generate flyer',
        details: error.message
      });
    }
  },

  /**
   * Handle content enhancement request
   */
  async enhanceContent(req, res) {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }

      const enhanced = await aiService.enhanceContent(text);

      return res.json({
        success: true,
        enhanced
      });
    } catch (error) {
      console.error('AI Enhancement Error:', error);
      return res.status(500).json({
        error: 'Failed to enhance content',
        details: error.message
      });
    }
  },

  /**
   * List available templates
   */
  async getTemplates(req, res) {
    const templates = [
      { id: 'cheesy-pig', name: 'Cheesy Pig Promo', description: 'Fun and colorful for food promos' },
      { id: 'business-classic', name: 'Business Classic', description: 'Clean and professional' }
    ];
    return res.json({ templates });
  }
};
