import { flyerService } from '../services/flyerService.js';

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

      // Return the PDF directly or a URL/Base64
      // For this POC, we'll return Base64 so the frontend can display it easily without blob complexity
      // (or we could stream the binary)

      const base64Pdf = result.buffer.toString('base64');

      return res.json({
        success: true,
        message: 'Flyer generated successfully',
        flyerUrl: `data:application/pdf;base64,${base64Pdf}`, // Data URI for easy preview
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
   * List available templates
   */
  async getTemplates(req, res) {
    // Mock data - in real app would come from DB or file system
    const templates = [
      { id: 'cheesy-pig', name: 'Cheesy Pig Promo', description: 'Fun and colorful for food promos' },
      { id: 'business-classic', name: 'Business Classic', description: 'Clean and professional' }
    ];
    return res.json({ templates });
  }
};
