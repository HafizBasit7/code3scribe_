// services/billingApi.ts
import axios from './axiosConfig';

const API_BASE_URL = '/api';

export interface InitializeSubscriptionRequest {
  userId: string;
  plan: number; // 1 for BLS (Free Trial)
}

export interface InitializeSubscriptionResponse {
  success: boolean;
  message: string;
  rawResponse?: string;
}

export interface SubscriptionDetails {
  id: number;
  userId: string;
  userEmail: string;
  isTrialUsed: boolean;
  isCancelled: boolean;
  status: number;
  currentPlan: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionDetailsResponse {
  success: boolean;
  data?: SubscriptionDetails;
  message?: string;
}

/**
 * Initialize user subscription after signup - BLS Free Trial
 */
export const initializeSubscription = async (
  data: InitializeSubscriptionRequest
): Promise<InitializeSubscriptionResponse> => {
  try {
    console.log('🟡 Initializing BLS Free Trial subscription for user:', {
      userId: data.userId,
      plan: data.plan
    });

    // Validate input
    if (!data.userId || data.userId.trim() === '') {
      throw new Error('User ID is required');
    }

    // Validate GUID format
    const userIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!userIdRegex.test(data.userId)) {
      throw new Error('Invalid User ID format');
    }

    // Only plan 1 (BLS Free Trial) is supported
    const plan = 1;

    const response = await axios.post(
      `${API_BASE_URL}/Billing/subscriptions/initialize`,
      {
        userId: data.userId.trim(),
        plan: plan
      }
    );

    console.log('🟢 BLS Free Trial initialization response:', {
      status: response.status,
      data: response.data
    });

    // Handle text/plain response
    if (typeof response.data === 'string') {
      const message = response.data.trim();
      
      if (response.status === 200) {
        return {
          success: true,
          message: message,
          rawResponse: message
        };
      } else {
        return {
          success: false,
          message: message || 'BLS Free Trial initialization failed',
          rawResponse: message
        };
      }
    }

    // Default success for 200 status
    if (response.status === 200) {
      return {
        success: true,
        message: 'BLS Free Trial started successfully',
        rawResponse: 'Empty response'
      };
    }

    throw new Error(`Unexpected response: ${response.status}`);

  } catch (error: any) {
    console.error('🔴 BLS Free Trial initialization error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.status === 500) {
      return {
        success: false,
        message: 'Subscription service temporarily unavailable'
      };
    } else if (error.response?.status === 401) {
      return {
        success: false,
        message: 'Authentication failed'
      };
    } else if (error.response?.status === 400) {
      return {
        success: false,
        message: error.response.data || 'Invalid subscription request'
      };
    } else if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        message: 'Subscription service timeout'
      };
    } else if (error.message?.includes('Network Error')) {
      return {
        success: false,
        message: 'Network error - unable to initialize subscription'
      };
    } else {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'BLS Free Trial initialization failed'
      };
    }
  }
};

/**
 * Get subscription details for a user
 */
export const getSubscriptionDetails = async (userId: string): Promise<SubscriptionDetailsResponse> => {
  try {
    console.log('🟡 Getting subscription details for user:', userId);

    // Validate input
    if (!userId || userId.trim() === '') {
      throw new Error('User ID is required');
    }

    // Validate GUID format
    const userIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!userIdRegex.test(userId)) {
      throw new Error('Invalid User ID format');
    }

    const response = await axios.get(
      `${API_BASE_URL}/Billing/GetSubscriptionDetails?userId=${userId}`
    );

    console.log('🟢 Subscription details received:', response.data);

    if (!response.data) {
      return {
        success: false,
        message: 'No subscription data found'
      };
    }

    return {
      success: true,
      data: response.data,
      message: 'Subscription details loaded successfully'
    };

  } catch (error: any) {
    console.error('🔴 Get subscription details error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.status === 404) {
      return {
        success: false,
        message: 'No subscription found for this user'
      };
    } else if (error.response?.status === 401) {
      return {
        success: false,
        message: 'Authentication failed'
      };
    } else if (error.response?.status === 500) {
      return {
        success: false,
        message: 'Server error while fetching subscription details'
      };
    } else if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        message: 'Request timeout while fetching subscription details'
      };
    } else {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to fetch subscription details'
      };
    }
  }
};

/**
 * Map API plan names to display names
 */
export const mapPlanName = (apiPlanName: string): string => {
  const planMappings: { [key: string]: string } = {
    'BLSlite': 'BLS Lite',
    'ALSPro': 'ALS Pro'
  };
  
  return planMappings[apiPlanName] || apiPlanName;
};

/**
 * Get plan features based on plan name - SEPARATE FEATURES FOR EACH PLAN
 */
export const getPlanFeatures = (planName: string): Array<{ name: string; included: boolean; comingSoon?: boolean }> => {
  // BLS Lite Features (Free Plan) - Only free features
  const blsLiteFeatures = [
    { name: 'Voice-to-Text Narrative Entry', included: true },
    { name: 'Guided Question Workflow', included: true },
    { name: 'Smart Spell & Grammar Review', included: true },
    { name: 'Feedback Tool: AI-powered suggestions to improve your PCRs', included: true },
    { name: ' Voice-to-Text Narrative Entry', included: true, },
    { name: 'County Protocol Search', included: true, comingSoon: true },
    { name: 'Find Jobs Feature', included: true, comingSoon: true },
    { name: 'HIPAA-Compliant Storage', included: true },
  ];

  // ALS Pro Features (Paid Plan) - Only pro features
  const alsProFeatures = [
    { name: 'Unlimited Narratives (Voice & Guided)', included: true },
    { name: 'AI Spell Check & Narrative Polishing', included: true },
    { name: 'HIPAA-Compliant Storage', included: true },
    { name: 'Feedback Tool: Get detailed insights to sharpen your PCRs', included: true },
    { name: 'County Protocol Search', included: true, comingSoon: true },
    { name: 'Find Jobs Feature', included: true, comingSoon: true },
  ];

  if (planName === 'ALS Pro' || planName === 'ALSPro') {
    return alsProFeatures;
  }
  
  // Default to BLS Lite features
  return blsLiteFeatures;
};

/**
 * Get plan pricing information
 */
export const getPlanPricing = (planName: string): { price: string; duration: string; subtitle: string } => {
  if (planName === 'ALS Pro' || planName === 'ALSPro') {
    return { price: '$10.99', duration: '/month', subtitle: '$10.99/month' };
  }
  
  // Default to BLS Lite (Free Trial)
  return { price: 'FREE', duration: '', subtitle: 'Free Trial' };
};