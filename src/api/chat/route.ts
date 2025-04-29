import { NextRequest, NextResponse } from 'next/server';
import Groq from "groq-sdk";

// Define message interface for API communication
interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { message, history = [] } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Check if API key is configured
    const apiKey = process.env.GROQ_API_KEY ;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not configured in environment variables' },
        { status: 500 }
      );
    }
    
    // Initialize Groq client
    const groq = new Groq({ apiKey });
    
    // Create a comprehensive financial advisor system prompt
    const systemPrompt = `You are an AI financial advisor with expertise in personal finance, investments, retirement planning, 
    budgeting, debt management, tax optimization, and financial literacy.
    
    Provide accurate, practical financial advice that is:
    - Tailored to the user's specific financial situation and goals
    - Educational, explaining financial concepts clearly without jargon
    - Action-oriented with specific, implementable steps
    - Risk-aware, always discussing potential downsides and uncertainty
    - Compliant with financial regulations (include appropriate disclaimers)
    
    When giving investment advice:
    - Emphasize diversification and long-term perspectives
    - Discuss risk tolerance and time horizons
    - Avoid making specific stock picks or promising returns
    - Include appropriate disclaimers about investment risks
    
    For document analysis:
    - Focus on identifying portfolio imbalances, fee structures, and optimization opportunities
    - Compare current allocations to recommended benchmarks based on the user's profile
    - Identify potential tax inefficiencies or missed opportunities
    
    Always remind users that your advice is informational only and they should consult with a certified financial professional for personalized guidance.`;
    
    // Prepare conversation history with system message at the beginning
    const conversationHistory: Message[] = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message }
    ];
    
    // Send request to Groq with the entire conversation history
    const chatCompletion = await groq.chat.completions.create({
      messages: conversationHistory,
      model: "llama-3.3-70b-versatile", // Using Llama 3.3 70B model
      temperature: 0.7,                 // Balanced creativity and consistency
      max_tokens: 1000,                 // Generous response length for detailed financial advice
    });
    
    // Get the assistant's response
    const assistantResponse = chatCompletion.choices[0]?.message?.content || 
      "Sorry, I couldn't generate financial advice at this moment. Please try again or rephrase your question.";
    
    // Add the new assistant response to history for future context
    const updatedHistory = [
      ...history,
      { role: "user", content: message },
      { role: "assistant", content: assistantResponse }
    ];
    
    return NextResponse.json({
      content: assistantResponse,
      history: updatedHistory
    });
  } catch (error: any) {
    console.error('Groq API error:', error);
    
    // Provide a helpful error message based on the error type
    let errorMessage = 'Failed to process financial advice request';
    
    if (error.status === 429) {
      errorMessage = 'Our AI service is currently experiencing high demand. Please try again in a moment.';
    } else if (error.status === 401 || error.status === 403) {
      errorMessage = 'Authentication error with the AI service. Please contact support.';
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: error.status || 500 }
    );
  }
}