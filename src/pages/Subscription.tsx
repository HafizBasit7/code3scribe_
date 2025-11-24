import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Check,
  RadioButtonUnchecked
} from '@mui/icons-material';

const Subscription: React.FC = () => {
  const [expandedPlan, setExpandedPlan] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('bls-lite');

  const activePlan = {
    id: 'bls-lite',
    title: 'BLS Lite',
    subtitle: 'Free Trial',
    description: 'Try Code3Scribe with 15 reports or 15 days of access, whichever comes first.',
    price: 'FREE',
    duration: '',
    features: [
      { name: 'Voice-to-Text Narrative Entry', included: true },
      { name: 'Guided Question Workflow', included: true },
      { name: 'Smart Spell & Grammar Review', included: true },
      { name: 'Feedback Tool: AI-powered suggestions to improve your PCRs', included: true },
      { name: 'County Protocol Search', included: true },
      { name: 'Find Jobs Feature', included: true },
      { name: 'HIPAA-Compliant Storage', included: true },
      { name: 'Advanced Analytics Dashboard', included: false },
      { name: 'Priority Support', included: false }
    ],
    isActive: true
  };

  const morePlans = [
    {
      id: 'als-pro',
      title: 'ALS Pro',
      subtitle: '$10.99/month',
      description: 'Full access for EMS professionals who want speed, accuracy, and clean reports.',
      price: '$10.99',
      duration: '/month',
      features: [
        { name: 'Voice-to-Text Narrative Entry', included: true },
        { name: 'Guided Question Workflow', included: true },
        { name: 'Smart Spell & Grammar Review', included: true },
        { name: 'Feedback Tool: AI-powered suggestions to improve your PCRs', included: true },
        { name: 'County Protocol Search', included: true },
        { name: 'Find Jobs Feature', included: true },
        { name: 'HIPAA-Compliant Storage', included: true },
        { name: 'Advanced Analytics Dashboard', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Unlimited Reports', included: true },
        { name: 'Custom Templates', included: true },
        { name: 'Team Management', included: true }
      ],
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

  const handleRadioChange = (planId: string) => {
    setSelectedPlan(planId);
  };

  const renderPlanCard = (plan: any, showRadio: boolean = true) => (
    <Card 
      key={plan.id}
      sx={{ 
        borderRadius: 2,
        border: selectedPlan === plan.id ? '2px solid rgba(14, 97, 192, 1)' : '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        overflow: 'visible',
        mb: 1
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

          {/* Right Side - Radio and Expand Icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Radio Button - Only show if enabled */}
            {showRadio && (
              <Radio
                checked={selectedPlan === plan.id}
                onChange={() => handleRadioChange(plan.id)}
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
            )}
            
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
                    primary={feature.name}
                    primaryTypographyProps={{
                      fontSize: '14px',
                      color: feature.included ? '#374151' : '#94a3b8',
                    //   textDecoration: feature.included ? 'none' : 'line-through'
                    }}
                  />
                </ListItem>
              ))}
            </List>

            {/* Action Button */}
            <Box sx={{ mt: 3 }}>
              {plan.isActive ? (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#10b981',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Check sx={{ fontSize: 18 }} />
                  Currently Active
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, rgba(82,149,226,1) 0%, rgba(14,97,192,1) 100%)',
                    color: 'white',
                    borderRadius: 2,
                    px: 4,
                    py: 1,
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(14,97,192,1) 0%, rgba(82,149,226,1) 100%)',
                    }
                  }}
                >
                  Upgrade to {plan.title}
                </Button>
              )}
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );

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
      {/* <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: 'rgba(14, 97, 192, 1)',
            mb: 2
          }}
        >
          Subscription
        </Typography>
      </Box> */}

      {/* Active Plan Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600, 
            color: 'rgba(85, 85, 85, 1)',
            mb: 3
          }}
        >
          Active Plan
        </Typography>
        {renderPlanCard(activePlan, true)}
      </Box>

      {/* More Plans Section */}
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600, 
            color: 'rgba(85, 85, 85, 1)',
            mb: 3
          }}
        >
          More Plans
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {morePlans.map(plan => renderPlanCard(plan, true))}
        </Box>
      </Box>

  
    </Box>
  );
};

export default Subscription;