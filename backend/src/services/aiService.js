const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const analyzeSafetyIncident = async (incident) => {
  try {
    // Example of AI image analysis (for unsafe conditions)
    const aiResult = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Analyze the following image description for safety risks: ${incident.description}`,
      max_tokens: 500,
    });

    const analysis = aiResult.data.choices[0].text;

    // Update incident AI analysis
    incident.aiAnalysis = {
      riskScore: Math.random() * 100, // Mock score
      suggestedActions: analysis.match(/Action\s*:\s*(.*?);/g) || [],
      analysisTimestamp: new Date(),
    };

    await incident.save();

    return incident.aiAnalysis;
  } catch (error) {
    console.error('AI analysis error:', error);
    throw error;
  }
};

const categorizeSuggestion = async (suggestion) => {
  try {
    const aiResult = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Categorize the following suggestion: ${suggestion.title} - ${suggestion.description}`,
      max_tokens: 50,
    });

    const analysis = aiResult.data.choices[0].text;

    // Update suggestion AI analysis
    suggestion.aiAnalysis = {
      category: analysis.match(/Category\s*:\s*(.*?);/i)[1] || 'other',
      confidence: Math.random(), // Mock confidence
      keywords: analysis.match(/Keyword\s*:\s*(.*?);/gi) || [],
      analyzedAt: new Date(),
    };

    await suggestion.save();

    return suggestion.aiAnalysis;
  } catch (error) {
    console.error('AI categorization error:', error);
    throw error;
  }
};

module.exports = {
  analyzeSafetyIncident,
  categorizeSuggestion
};
