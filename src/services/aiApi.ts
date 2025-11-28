// services/aiApi.ts
import axios from './axiosConfig';

const API_BASE_URL = '/api';

export interface GenerateQuestionnaireRequest {
  userId: string;
  medicalReason: string;
}

export interface GenerateQuestionnaireResponse {
  questions: string[];
  assistantMessage: string | null;
  success?: boolean;
  message?: string;
}

export interface GenerateReportRequest {
  userId: string;
  medicalReason: string;
  questionAnswerString: string;
}

export interface GenerateReportResponse {
  report: string;
  success: boolean;
  message?: string;
}

export interface UserResponseHistory {
  id: string;
  cleanResponse: string;
  source: number;
  createdAt: string;
  timeSinceCreation: string;
}

export interface UserResponseHistoryResponse {
  success: boolean;
  data?: UserResponseHistory[];
  message?: string;
}

// Generate questionnaire messages
export const generateQuestionnaire = async (data: GenerateQuestionnaireRequest): Promise<GenerateQuestionnaireResponse> => {
  try {
    console.log('🟡 Sending GenerateQuestionnaire request:', {
      userId: data.userId,
      medicalReason: data.medicalReason,
      userIdLength: data.userId?.length,
      medicalReasonLength: data.medicalReason?.length
    });

    // Validate data before sending
    if (!data.userId || data.userId.trim() === '') {
      throw new Error('User ID is required');
    }
    
    if (!data.medicalReason || data.medicalReason.trim() === '') {
      throw new Error('Medical reason is required');
    }

    // Ensure userId is a valid GUID format
    const userIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!userIdRegex.test(data.userId)) {
      throw new Error('Invalid User ID format');
    }

    const response = await axios.post(`${API_BASE_URL}/Ai/GenerateQuestionnaire`, {
      userId: data.userId,
      medicalReason: data.medicalReason
    });

    console.log('🟢 GenerateQuestionnaire response:', response.data);
    
    if (!response.data) {
      throw new Error('Empty response from server');
    }

    // Handle the actual API response format
    const apiResponse = response.data;
    
    // Convert the API response to our expected format
    return {
      questions: apiResponse.questions || [],
      assistantMessage: apiResponse.assistantMessage,
      success: true,
      message: 'Questions generated successfully'
    };

  } catch (error: any) {
    console.error('🔴 GenerateQuestionnaire error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        data: error.config?.data
      }
    });
    
    // Re-throw with more descriptive error
    if (error.response?.status === 500) {
      throw new Error('Server error: Unable to generate questionnaire. Please try again later.');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid request. Please check your input and try again.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else {
      throw new Error(error.response?.data?.message || error.message || 'Failed to generate questionnaire');
    }
  }
};

// Generate final report
export const generateReport = async (data: GenerateReportRequest): Promise<GenerateReportResponse> => {
  try {
    console.log('🟡 Sending GenerateReport request:', { 
      userId: data.userId,
      medicalReason: data.medicalReason,
      questionAnswerStringLength: data.questionAnswerString?.length
    });

    // Validate data
    if (!data.userId || data.userId.trim() === '') {
      throw new Error('User ID is required');
    }
    
    if (!data.medicalReason || data.medicalReason.trim() === '') {
      throw new Error('Medical reason is required');
    }

    if (!data.questionAnswerString || data.questionAnswerString.trim() === '') {
      throw new Error('Question-answer string is required');
    }

    const response = await axios.post(`${API_BASE_URL}/Ai/GenerateReportQuestionnaire`, {
      userId: data.userId,
      medicalReason: data.medicalReason,
      questionAnswerString: data.questionAnswerString
    });

    console.log('🟢 GenerateReport response:', response.data);
    
    if (!response.data) {
      throw new Error('Empty response from server');
    }

    // Handle the actual API response format
    const apiResponse = response.data;
    
    // Map the API response to our expected format
    return {
      report: apiResponse.response || apiResponse.report || '',
      success: true,
      message: 'Report generated successfully'
    };

  } catch (error: any) {
    console.error('🔴 GenerateReport error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    
    if (error.response?.status === 500) {
      throw new Error('Server error: Unable to generate report. Please try again later.');
    } else {
      throw new Error(error.response?.data?.message || error.message || 'Failed to generate report');
    }
  }
};

/**
 * Get user response history by user ID
 */
export const getUserResponseHistory = async (userId: string, authToken: string): Promise<UserResponseHistoryResponse> => {
  try {
    console.log('🟡 Getting user response history for:', userId);

    // Validate input
    if (!userId || userId.trim() === '') {
      throw new Error('User ID is required');
    }

    if (!authToken) {
      throw new Error('Authentication token is required');
    }

    // Validate GUID format
    const userIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!userIdRegex.test(userId)) {
      throw new Error('Invalid User ID format');
    }

    const response = await axios.get(
      `${API_BASE_URL}/Ai/GetUserResponsebyUserID/${userId}`
    );

    console.log('🟢 User response history received:', {
      status: response.status,
      dataLength: response.data?.length
    });

    if (!response.data) {
      return {
        success: true,
        data: [],
        message: 'No history data found'
      };
    }

    // Handle array response
    if (Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data,
        message: 'History loaded successfully'
      };
    }

    // Handle single object response (if API returns object instead of array)
    if (response.data && typeof response.data === 'object') {
      return {
        success: true,
        data: [response.data],
        message: 'History loaded successfully'
      };
    }

    return {
      success: true,
      data: [],
      message: 'No history data available'
    };

  } catch (error: any) {
    console.error('🔴 Get user response history error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.status === 404) {
      return {
        success: true,
        data: [],
        message: 'No history found for this user'
      };
    } else if (error.response?.status === 401) {
      return {
        success: false,
        message: 'Authentication failed'
      };
    } else if (error.response?.status === 500) {
      return {
        success: false,
        message: 'Server error while fetching history'
      };
    } else if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        message: 'Request timeout while fetching history'
      };
    } else {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to fetch history'
      };
    }
  }
};



// services/aiApi.ts - Add this interface and function

export interface DeleteResponsesRequest {
  responseIds: string[];
}

export interface DeleteResponsesResponse {
  success: boolean;
  message?: string;
  deletedCount?: number;
}

/**
 * Delete user responses by IDs
 */
export const deleteUserResponses = async (responseIds: string[]): Promise<DeleteResponsesResponse> => {
  try {
    console.log('🟡 Deleting user responses:', responseIds);

    // Validate input
    if (!responseIds || responseIds.length === 0) {
      throw new Error('No response IDs provided');
    }

    // Validate each ID is a valid GUID
    const idRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    for (const id of responseIds) {
      if (!idRegex.test(id)) {
        throw new Error(`Invalid response ID format: ${id}`);
      }
    }

    const response = await axios.post(
      `${API_BASE_URL}/Ai/DeleteResponses`,
      responseIds, // Send array directly as per API spec
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('🟢 Delete responses successful:', response.data);

    return {
      success: true,
      message: 'Responses deleted successfully',
      deletedCount: responseIds.length
    };

  } catch (error: any) {
    console.error('🔴 Delete responses error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      return {
        success: false,
        message: 'Authentication failed'
      };
    } else if (error.response?.status === 404) {
      return {
        success: false,
        message: 'One or more responses not found'
      };
    } else if (error.response?.status === 500) {
      return {
        success: false,
        message: 'Server error while deleting responses'
      };
    } else {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to delete responses'
      };
    }
  }
};





// services/aiApi.ts - Add this interface and function

export interface UpdateQuestionnaireReportRequest {
  id: string;
  updatedNarrative: string;
}

export interface UpdateQuestionnaireReportResponse {
  success: boolean;
  message?: string;
  updatedReport?: string;
}

/**
 * Update questionnaire report narrative
 */
export const updateQuestionnaireReport = async (data: UpdateQuestionnaireReportRequest): Promise<UpdateQuestionnaireReportResponse> => {
  try {
    console.log('🟡 Updating questionnaire report:', {
      id: data.id,
      narrativeLength: data.updatedNarrative?.length
    });

    // Validate input
    if (!data.id || data.id.trim() === '') {
      throw new Error('Report ID is required');
    }

    if (!data.updatedNarrative || data.updatedNarrative.trim() === '') {
      throw new Error('Updated narrative is required');
    }

    // Validate ID is a valid GUID
    const idRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!idRegex.test(data.id)) {
      throw new Error('Invalid report ID format');
    }

    const response = await axios.post(
      `${API_BASE_URL}/Ai/UpdateQuestionnaireReport`,
      {
        id: data.id,
        updatedNarrative: data.updatedNarrative
      }
    );

    console.log('🟢 Update report successful:', response.data);

    return {
      success: true,
      message: 'Report updated successfully',
      updatedReport: data.updatedNarrative
    };

  } catch (error: any) {
    console.error('🔴 Update report error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      return {
        success: false,
        message: 'Authentication failed'
      };
    } else if (error.response?.status === 404) {
      return {
        success: false,
        message: 'Report not found'
      };
    } else if (error.response?.status === 500) {
      return {
        success: false,
        message: 'Server error while updating report'
      };
    } else {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to update report'
      };
    }
  }
};