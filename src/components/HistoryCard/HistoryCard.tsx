// components/HistoryCard/HistoryCard.tsx
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Chip,
    Box,
    Typography,
    Modal,
    Button,
    IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { UserResponseHistory } from '../../services/aiApi';

// Import your custom icons
const EditIcon = () => <img src="/src/assets/icons/edit.png" alt="Edit" style={{ width: 20, height: 20 }} />;
const ShareIcon = () => <img src="/src/assets/icons/share.png" alt="Share" style={{ width: 20, height: 20 }} />;
const CopyIcon = () => <img src="/src/assets/icons/copy.png" alt="Copy" style={{ width: 20, height: 20 }} />;
const CrossIcon = () => <img src="/src/assets/icons/deleteModal.png" alt="Close" style={{ width: 30, height: 30 }} />;

interface HistoryCardProps {
    item: UserResponseHistory;
    showModal?: boolean;
    index: number;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ item, showModal = true, index }) => {
    const [selectedReport, setSelectedReport] = useState<UserResponseHistory | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [chipColor, setChipColor] = useState<'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'>('default');

    const getTimeLeftInMs = (createdAt: string) => {
        const createdTime = new Date(createdAt.endsWith("Z") ? createdAt : createdAt + "Z").getTime();
        const expireTime = createdTime + 24 * 60 * 60 * 1000;
        return expireTime - Date.now();
    };

    const getChipColor = (ms: number) => {
        const hoursLeft = ms / (1000 * 60 * 60);

        if (hoursLeft <= 1) return "error";      // red
        if (hoursLeft <= 12) return "warning";   // orange
        return "success";                         // green
    };

    const formatTime = (ms: number) => {
        if (ms <= 0) return "Expired";

        const sec = Math.floor(ms / 1000);
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;

        return `${h}h ${m}m ${s}s`;
    };

    useEffect(() => {
        if (!item.createdAt) return;

        const updateTimer = () => {
            const msLeft = getTimeLeftInMs(item.createdAt);
            setTimeLeft(formatTime(msLeft));
            setChipColor(getChipColor(msLeft));
        };

        updateTimer();

        const interval = setInterval(() => {
            const msLeft = getTimeLeftInMs(item.createdAt);

            if (msLeft <= 0) {
                clearInterval(interval);
                setTimeLeft("Expired");
                setChipColor("error");
            } else {
                updateTimer();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [item.createdAt]);

    // Helper function to extract summary from response text
    const getSummaryFromResponse = (responseText: string): string => {
        if (!responseText) return 'No details available';

        const summary = responseText.substring(0, 100).trim();
        return summary.length === 100 ? summary + '...' : summary;
    };

    // Helper function to format condition from response
    const getConditionFromResponse = (responseText: string): string => {
        if (!responseText) return 'Medical Report';

        const firstSentence = responseText.split('.')[0];
        const words = firstSentence.split(' ');

        const medicalKeywords = [
            'fever', 'cardiac', 'heart', 'stroke', 'accident', 'fracture',
            'injury', 'pain', 'emergency', 'symptoms', 'assessment', 'seizure'
        ];

        for (const word of words) {
            if (medicalKeywords.includes(word.toLowerCase())) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
        }

        return 'Medical Report';
    };

    // FIXED: Time display format - show minutes and seconds properly
    const formatTimeDisplay = (timeSinceCreation: string): string => {
        if (!timeSinceCreation) return 'Recently';

        const timeMatch = timeSinceCreation.match(/(\d+)\s+(\w+)/);
        if (timeMatch) {
            const number = timeMatch[1];
            const unit = timeMatch[2].toLowerCase();

            if (unit.includes('hour') || unit.includes('hr')) {
                return `${number} hr${number !== '1' ? 's' : ''}`;
            } else if (unit.includes('minute') || unit.includes('min')) {
                return `${number} min${number !== '1' ? 's' : ''}`;
            } else if (unit.includes('second') || unit.includes('sec')) {
                return `${number} sec${number !== '1' ? 's' : ''}`;
            } else if (unit.includes('day')) {
                return `${number} day${number !== '1' ? 's' : ''}`;
            } else if (unit.includes('week')) {
                return `${number} week${number !== '1' ? 's' : ''}`;
            } else if (unit.includes('month')) {
                return `${number} month${number !== '1' ? 's' : ''}`;
            }
        }

        return timeSinceCreation;
    };

    // Handle card click - OPEN MODAL
    const handleCardClick = () => {
        if (showModal) {
            setSelectedReport(item);
            setModalOpen(true);
        }
    };

    // Handle modal close
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedReport(null);
    };

    // Handle action buttons
    const handleEdit = () => {
        console.log('Edit report:', selectedReport?.id);
    };

    const handleShare = () => {
        console.log('Share report:', selectedReport?.id);
    };

    const handleCopy = () => {
        if (selectedReport?.cleanResponse) {
            navigator.clipboard.writeText(selectedReport.cleanResponse);
            console.log('Report copied to clipboard');
            // You can add a toast notification here
        }
    };

    return (
        <>
            <Card
                onClick={handleCardClick}
                sx={{
                    mb: { xs: 1.5, md: 2 },
                    borderRadius: { xs: 1.5, md: 2 },
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    '&:hover': {
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                        cursor: showModal ? 'pointer' : 'default',
                        transform: showModal ? 'translateY(-1px)' : 'none',
                        transition: 'all 0.2s ease-in-out',
                    },
                    width: '100%',
                    position: 'relative',
                    overflow: 'visible',
                    mt: 1,
                }}
            >
                {/* Blue ID Badge */}
                <Box sx={{
                    position: 'absolute',
                    top: -10,
                    left: { xs: 8, md: 12 },
                    background: 'linear-gradient(135deg, rgba(82,149,226,1) 0%, rgba(14,97,192,1) 100%)',
                    color: 'white',
                    px: { xs: 2, md: 3.5 },
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: { xs: '11px', md: '12px' },
                    fontWeight: 600,
                    boxShadow: '0 2px 4px rgba(14, 97, 192, 0.3)',
                    zIndex: 1,
                }}>
                    ID-{index * 2 + 1}

                </Box>

                <CardContent sx={{
                    p: { xs: 1.5, md: 2 },
                    '&:last-child': {
                        pb: { xs: 1.5, md: 1 }
                    },
                    pt: { xs: 2, md: 2 }
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        width: '100%',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 1, sm: 0 }
                    }}>
                        <Box sx={{
                            flex: 1,
                            mt: { xs: 0, sm: 0.5 }
                        }}>
                            <Typography
                                variant="body2"
                                color="#64748b"
                                sx={{
                                    fontSize: { xs: '12px', md: '13px' },
                                    lineHeight: 1.4
                                }}
                            >
                                {getConditionFromResponse(item.cleanResponse)} - {getSummaryFromResponse(item.cleanResponse)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>

                            <Box
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '10px', md: '11px' },
                                    minWidth: { xs: '70px', md: '80px' },
                                    textAlign: "right",
                                    color:
                                        chipColor === "success"
                                            ? "#16a34a"
                                            : chipColor === "warning"
                                                ? "#f59e0b"
                                                : "#dc2626",
                                }}
                            >
                                {timeLeft}
                            </Box>

                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Report Modal */}
            {showModal && (
                <Modal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: { xs: 2, md: 3 },
                    }}
                >
                    <Box sx={{
                        width: '100%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {/* Modal Header with Action Buttons in Top Right */}
                        <Box sx={{
                            p: { xs: 2, md: 3 },
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: 'white',
                        }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: 'rgba(14, 97, 192, 1)' }}>
                                Report-ID: {index * 2 + 1}

                            </Typography>

                            {/* Action Buttons in Header - Like the Image */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {/* Edit Button */}
                                <IconButton
                                    onClick={handleEdit}
                                    sx={{
                                        color: 'white',
                                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                    }}
                                    size="small"
                                >
                                    <EditIcon />
                                </IconButton>

                                {/* Share Button */}
                                <IconButton
                                    onClick={handleShare}
                                    sx={{
                                        color: 'white',
                                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                    }}
                                    size="small"
                                >
                                    <ShareIcon />
                                </IconButton>

                                {/* Copy Button */}
                                <IconButton
                                    onClick={handleCopy}
                                    sx={{
                                        color: 'white',
                                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                    }}
                                    size="small"
                                >
                                    <CopyIcon />
                                </IconButton>

                                {/* Close Button */}
                                <IconButton
                                    onClick={handleCloseModal}
                                    sx={{
                                        color: 'white',
                                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                    }}
                                    size="small"
                                >
                                    <CrossIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Modal Content */}
                        <Box sx={{
                            flex: 1,
                            overflow: 'auto',
                            p: { xs: 2, md: 3 },

                        }}>
                            {selectedReport && (
                                <Box>
                                    {/* Report Content */}
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            whiteSpace: 'pre-wrap',
                                            lineHeight: 1.6,
                                            color: '#334155',
                                            fontSize: { xs: '14px', md: '16px' },
                                            border: '2px solid #e2e8f0',
                                            // bgcolor: '#f9fafb',
                                            borderRadius: 6,
                                            p: 2,
                                            minHeight: '200px',
                                        }}
                                    >
                                        {selectedReport.cleanResponse}
                                    </Typography>
                                </Box>
                            )}
                        </Box>


                    </Box>
                </Modal>
            )}
        </>
    );
};

export default HistoryCard;