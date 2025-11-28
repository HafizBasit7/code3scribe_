// pages/Subscription.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Radio,
  Chip
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Check,
  RadioButtonUnchecked
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUserId } from '../store/selectors/authSelectors';
import { 
  getSubscriptionDetails, 
  SubscriptionDetails,
  mapPlanName,
  getPlanFeatures,
  getPlanPricing,
  initializeSubscription
} from '../services/billingApi';

interface Plan {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  features: Array<{ name: string; included: boolean; comingSoon?: boolean }>;
  isActive: boolean;
}

const Subscription: React.FC = () => {
  const [expandedPlan, setExpandedPlan] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upgrading, setUpgrading] = useState(false);

  // Redux selectors
  const userId = useSelector(selectUserId);

  // Fetch subscription details
  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      if (!userId) {
        console.log('🟡 No user ID available for fetching subscription details');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('🟡 Fetching subscription details for user:', userId);
        const response = await getSubscriptionDetails(userId);

        if (response.success && response.data) {
          console.log('🟢 Subscription data received:', response.data);
          setSubscriptionData(response.data);
          
          // Set the active plan as selected radio button
          const activePlanId = mapPlanName(response.data.currentPlan).toLowerCase().replace(' ', '-');
          setSelectedPlan(activePlanId);
        } else {
          setError(response.message || 'Failed to load subscription details');
          console.warn('🟡 Subscription fetch warning:', response.message);
        }
      } catch (err: any) {
        console.error('🔴 Error fetching subscription details:', err);
        setError('Failed to load subscription details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionDetails();
  }, [userId]);

  // Handle plan selection (radio button click)
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  // Handle upgrade to ALS Pro
  const handleUpgradeToPro = async () => {
    if (!userId) {
      setError('User ID not available');
      return;
    }

    try {
      setUpgrading(true);
      setError(null);
      
      // TODO: Implement actual ALS Pro subscription initialization
      // For now, just show a message
      setError('ALS Pro upgrade functionality will be available soon!');
      
      // This would be the actual implementation:
      // const response = await initializeSubscription({
      //   userId: userId,
      //   plan: 2 // Assuming 2 is for ALS Pro
      // });
      
      // if (response.success) {
      //   // Refresh subscription data
      //   const updatedResponse = await getSubscriptionDetails(userId);
      //   if (updatedResponse.success && updatedResponse.data) {
      //     setSubscriptionData(updatedResponse.data);
      //   }
      // } else {
      //   setError(response.message || 'Failed to upgrade to ALS Pro');
      // }
      
    } catch (err: any) {
      console.error('🔴 Error upgrading to ALS Pro:', err);
      setError('Failed to upgrade to ALS Pro. Please try again later.');
    } finally {
      setUpgrading(false);
    }
  };

  // Generate active plan from subscription data
  const getActivePlan = (): Plan | null => {
    if (!subscriptionData) return null;

    const planName = mapPlanName(subscriptionData.currentPlan);
    const pricing = getPlanPricing(subscriptionData.currentPlan);
    const features = getPlanFeatures(planName);

    return {
      id: planName.toLowerCase().replace(' ', '-'),
      title: planName,
      subtitle: pricing.subtitle,
      description: subscriptionData.isTrialUsed 
        ? 'Your free trial is active. Enjoy full access to all features during your trial period.'
        : `Your ${planName} subscription is active. Full access to all included features.`,
      price: pricing.price,
      duration: pricing.duration,
      features: features,
      isActive: true
    };
  };

  // Available plans - Only BLS and ALS with separate features
  const allPlans: Plan[] = [
    {
      id: 'bls-lite',
      title: 'BLS Lite',
      subtitle: 'Free Trial',
      description: 'Try Code3Scribe with 15 reports or 30 days of access, whichever comes first.',
      price: 'FREE',
      duration: '',
      features: getPlanFeatures('BLS Lite'), // Only free features
      isActive: false
    },
    {
      id: 'als-pro',
      title: 'ALS Pro',
      subtitle: '$10.99/month',
      description: 'Full access for EMS professionals who want speed, accuracy, and clean reports.',
      price: '$10.99',
      duration: '/month',
      features: getPlanFeatures('ALS Pro'), // Only pro features
      isActive: false
    }
  ];

  const handlePlanClick = (planId: string) => {
    if (expandedPlan === planId) {
      setExpandedPlan('');
    } else {
      setExpandedPlan(planId);
    }
  };

  const renderPlanCard = (plan: Plan) => {
    const isActivePlan = getActivePlan()?.id === plan.id;
    const isSelected = selectedPlan === plan.id;

    return (
      <Card 
        key={plan.id}
        sx={{ 
          borderRadius: 2,
          border: isSelected ? '2px solid rgba(14, 97, 192, 1)' : '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          overflow: 'visible',
          mb: 2
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Plan Header - Always Visible */}
          <Box 
            sx={{ 
              p: 2, 
              display: 'flex', 
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(14, 97, 192, 0.02)',
              }
            }}
            onClick={() => handlePlanClick(plan.id)}
          >
            {/* Left Side - Basic Info */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'rgba(14, 97, 192, 1)'
                    }}
                  >
                    {plan.title}
                  </Typography>
                  <Box 
                    sx={{ 
                      color: '#fff',
                      fontWeight: 500,
                      bgcolor:'rgba(54, 128, 218, 1)',
                      borderRadius: 10,
                      px: 2,
                      py: '3px',
                      fontSize: '12px'
                    }}
                  >
                    {plan.subtitle}
                  </Box>
                </Box>
                
                <Typography 
                  variant="body2" 
                  sx={{ color: '#64748b', mb: 1 }}
                >
                  {plan.description}
                </Typography>
              </Box>
            </Box>

            {/* Right Side - Radio Button and Expand Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Radio Button - Show for all plans */}
              <Radio
                checked={isSelected}
                onChange={() => handlePlanSelect(plan.id)}
                onClick={(e) => e.stopPropagation()}
                icon={<RadioButtonUnchecked />}
                checkedIcon={<Check sx={{ color: 'rgba(14, 97, 192, 1)' }} />}
                sx={{ 
                  color: 'rgba(14, 97, 192, 0.5)',
                  '&.Mui-checked': {
                    color: 'rgba(14, 97, 192, 1)',
                  }
                }}
              />
              
              {/* Expand/Collapse Icon */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: 'rgba(14, 97, 192, 1)',
                }}
              >
                {expandedPlan === plan.id ? <ExpandLess /> : <ExpandMore />}
              </Box>
            </Box>
          </Box>

          {/* Expandable Features Section */}
          <Collapse in={expandedPlan === plan.id} timeout="auto" unmountOnExit>
            <Divider />
            <Box sx={{ p: 3 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'rgba(14, 97, 192, 1)',
                  mb: 2
                }}
              >
                Features Included:
              </Typography>
              
              <List dense sx={{ py: 0 }}>
                {plan.features.map((feature: any, index: number) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {feature.included ? (
                        <Check sx={{ color: '#10b981', fontSize: 20 }} />
                      ) : (
                        <Box sx={{ width: 20, height: 20, border: '2px solid #e2e8f0', borderRadius: '50%' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {feature.name}
                          {feature.comingSoon && (
                            <Chip
                              label="Coming Soon"
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                                color: '#f57c00',
                                fontWeight: 500,
                                fontSize: '10px',
                                height: '20px'
                              }}
                            />
                          )}
                        </Box>
                      }
                      primaryTypographyProps={{
                        fontSize: '14px',
                        color: feature.included ? '#374151' : '#94a3b8',
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              {/* Action Button */}
              <Box sx={{ mt: 3 }}>
                {isActivePlan ? (
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#10b981',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1
                      }}
                    >
                      <Check sx={{ fontSize: 18 }} />
                      Currently Active
                    </Typography>
                    {subscriptionData && (
                      <Typography 
                        variant="caption" 
                        sx={{ color: '#64748b', display: 'block' }}
                      >
                        {subscriptionData.isTrialUsed ? 'Trial ends' : 'Renews'} on: {new Date(subscriptionData.currentPeriodEnd).toLocaleDateString()}
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (plan.id === 'als-pro') {
                        handleUpgradeToPro();
                      }
                    }}
                    disabled={upgrading && plan.id === 'als-pro'}
                    sx={{
                      background: 'linear-gradient(135deg, rgba(82,149,226,1) 0%, rgba(14,97,192,1) 100%)',
                      color: 'white',
                      borderRadius: 2,
                      px: 4,
                      py: 1,
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(14,97,192,1) 0%, rgba(82,149,226,1) 100%)',
                      },
                      '&:disabled': {
                        background: '#e0e0e0',
                        color: '#9e9e9e'
                      }
                    }}
                  >
                    {upgrading && plan.id === 'als-pro' ? (
                      <CircularProgress size={20} sx={{ color: 'white' }} />
                    ) : plan.title === 'BLS Lite' ? (
                      'Start Free Trial'
                    ) : (
                      'Upgrade to ALS Pro'
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    );
  };

  const activePlan = getActivePlan();

  // Mark active plan in the allPlans array
  const plansWithActiveStatus = allPlans.map(plan => ({
    ...plan,
    isActive: activePlan ? plan.id === activePlan.id : false
  }));

  return (
    <Box sx={{ 
      p: 3, 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      minWidth: 0,
      overflow: 'auto',
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: 'rgba(14, 97, 192, 1)',
            mb: 2
          }}
        >
          Subscription Plans
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: '#64748b' }}
        >
          Choose the plan that works best for you
        </Typography>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={40} sx={{ color: 'rgba(14, 97, 192, 1)' }} />
        </Box>
      )}

      {/* Error State */}
      {error && !loading && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Plans Section */}
      {!loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {plansWithActiveStatus.map(plan => renderPlanCard(plan))}
        </Box>
      )}
    </Box>
  );
};

export default Subscription;