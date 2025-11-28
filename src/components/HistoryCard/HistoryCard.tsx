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
    TextField,
    Snackbar,
    CircularProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { UserResponseHistory, updateQuestionnaireReport } from '../../services/aiApi';

// Import your custom icons
const EditIcon = () => <img src="/src/assets/icons/edit.png" alt="Edit" style={{ width: 20, height: 20 }} />;
const ShareIcon = () => <img src="/src/assets/icons/share.png" alt="Share" style={{ width: 20, height: 20 }} />;
const CopyIcon = () => <img src="/src/assets/icons/copy.png" alt="Copy" style={{ width: 20, height: 20 }} />;
const CrossIcon = () => <img src="/src/assets/icons/deleteModal.png" alt="Close" style={{ width: 30, height: 30 }} />;
const BackIcon = () => <img src="/src/assets/icons/backward.png" alt="Undo" style={{ width: 20, height: 20 }} />;
const ForwardIcon = () => <img src="/src/assets/icons/forward.png" alt="Redo" style={{ width: 20, height: 20 }} />;
const SaveEdits = () => <img src="/src/assets/icons/saveEdits.png" alt="Redo" style={{ width: 40, height: 40 }} />;
interface HistoryCardProps {
    item: UserResponseHistory;
    showModal?: boolean;
    index: number;
    onReportUpdate?: (updatedItem: UserResponseHistory) => void; // Add this callback
}

const HistoryCard: React.FC<HistoryCardProps> = ({ item, showModal = true, index, onReportUpdate }) => {
    const [selectedReport, setSelectedReport] = useState<UserResponseHistory | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [chipColor, setChipColor] = useState<'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'>('default');
    
    // Edit mode states
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedText, setEditedText] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [redoStack, setRedoStack] = useState<string[]>([]);
    const [saveLoading, setSaveLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

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

    // Initialize edit mode when modal opens with report
    useEffect(() => {
        if (selectedReport && modalOpen) {
            setEditedText(selectedReport.cleanResponse);
            setHistory([selectedReport.cleanResponse]);
            setRedoStack([]);
        }
    }, [selectedReport, modalOpen]);

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

    // Handle text change with undo/redo tracking
    const handleTextChange = (newText: string) => {
        setEditedText(newText);
        setHistory(prevHistory => [...prevHistory, newText]);
        setRedoStack([]); // Clear redo when new input happens
    };

    // Undo functionality
    const handleUndo = () => {
        if (history.length > 1) {
            const newHistory = [...history];
            const last = newHistory.pop();
            setRedoStack(prev => [last!, ...prev]); // store undone value
            setHistory(newHistory);
            setEditedText(newHistory[newHistory.length - 1]);
        }
    };

    // Redo functionality
    const handleRedo = () => {
        if (redoStack.length > 0) {
            const [redoItem, ...rest] = redoStack;
            setHistory(prev => [...prev, redoItem]);
            setEditedText(redoItem);
            setRedoStack(rest);
        }
    };

    // Handle card click - OPEN MODAL
    const handleCardClick = () => {
        if (showModal) {
            setSelectedReport(item);
            setModalOpen(true);
            setIsEditMode(false); // Reset edit mode when opening modal
        }
    };

    // Handle modal close
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedReport(null);
        setIsEditMode(false);
        setEditedText('');
        setHistory([]);
        setRedoStack([]);
    };

    // Handle edit button click
    const handleEdit = () => {
        setIsEditMode(true);
    };

    // Handle save edited text - FIXED: Update parent component
    const handleSave = async () => {
        if (!selectedReport) return;

        try {
            setSaveLoading(true);
            const response = await updateQuestionnaireReport({
                id: selectedReport.id,
                updatedNarrative: editedText
            });

            if (response.success) {
                // Create updated report object
                const updatedReport = {
                    ...selectedReport,
                    cleanResponse: editedText
                };

                // Update the local state with the new text
                setSelectedReport(updatedReport);
                
                // Notify parent component about the update
                if (onReportUpdate) {
                    onReportUpdate(updatedReport);
                }
                
                setIsEditMode(false);
                setSnackbar({
                    open: true,
                    message: 'Report updated successfully',
                    severity: 'success'
                });
            } else {
                setSnackbar({
                    open: true,
                    message: response.message || 'Failed to update report',
                    severity: 'error'
                });
            }
        } catch (err: any) {
            console.error('🔴 Save error:', err);
            setSnackbar({
                open: true,
                message: 'Failed to update report. Please try again.',
                severity: 'error'
            });
        } finally {
            setSaveLoading(false);
        }
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setIsEditMode(false);
        // Reset to original text
        if (selectedReport) {
            setEditedText(selectedReport.cleanResponse);
            setHistory([selectedReport.cleanResponse]);
            setRedoStack([]);
        }
    };

    const handleShare = () => {
        console.log('Share report:', selectedReport?.id);
    };

    const handleCopy = () => {
        if (selectedReport?.cleanResponse) {
            navigator.clipboard.writeText(selectedReport.cleanResponse);
            setSnackbar({
                open: true,
                message: 'Report copied to clipboard',
                severity: 'success'
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
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
                        maxWidth: isEditMode ? '95vw' : '800px',
                        maxHeight: isEditMode ? '95vh' : '90vh',
                        height: isEditMode ? '95vh' : 'auto',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {/* Modal Header */}
                        <Box sx={{
                            p: { xs: 2, md: 3 },
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: 'white',
                            // background: isEditMode ? 'linear-gradient(135deg, rgba(14,97,192,1) 0%, rgba(82,149,226,1) 100%)' : 'transparent',
                        }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: isEditMode ? 'rgba(14, 97, 192, 1)' : 'rgba(14, 97, 192, 1)' }}>
                                Report-ID: {index * 2 + 1}
                            </Typography>

                            {/* Action Buttons */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {isEditMode ? (
                                    // Edit Mode Buttons: Undo, Redo, Save, Cancel
                                    <>
                                        <IconButton
                                            onClick={handleUndo}
                                            disabled={history.length <= 1}
                                            sx={{
                                                color: 'white',
                                                opacity: history.length <= 1 ? 0.5 : 1,
                                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                            }}
                                            size="small"
                                        >
                                            <BackIcon />
                                        </IconButton>

                                        <IconButton
                                            onClick={handleRedo}
                                            disabled={redoStack.length === 0}
                                            sx={{
                                                color: 'rgba(14, 97, 192, 1)',
                                                opacity: redoStack.length === 0 ? 0.5 : 1,
                                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                            }}
                                            size="small"
                                        >
                                            <ForwardIcon />
                                        </IconButton>

                                        <Button
                                            onClick={handleCancelEdit}
                                            sx={{
                                                color: 'white',
                                                fontWeight: 600,
                                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                            }}
                                        >

                                            <CrossIcon />
                                        </Button>

                                        <Button
                                            onClick={handleSave}
                                            disabled={saveLoading}
                                            sx={{
                                                color: 'white',
                                                fontWeight: 600,
                                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                            }}
                                        >
                                            {/* {saveLoading ? <CircularProgress size={20} /> : 'Save'} */}
                                            <SaveEdits />
                                        </Button>
                                    </>
                                ) : (
                                    // View Mode Buttons: Edit, Share, Copy, Close
                                    <>
                                        <IconButton
                                            onClick={handleEdit}
                                            sx={{
                                                color: 'rgba(14, 97, 192, 1)',
                                                '&:hover': { backgroundColor: 'rgba(14, 97, 192, 0.1)' }
                                            }}
                                            size="small"
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            onClick={handleShare}
                                            sx={{
                                                color: 'rgba(14, 97, 192, 1)',
                                                '&:hover': { backgroundColor: 'rgba(14, 97, 192, 0.1)' }
                                            }}
                                            size="small"
                                        >
                                            <ShareIcon />
                                        </IconButton>

                                        <IconButton
                                            onClick={handleCopy}
                                            sx={{
                                                color: 'rgba(14, 97, 192, 1)',
                                                '&:hover': { backgroundColor: 'rgba(14, 97, 192, 0.1)' }
                                            }}
                                            size="small"
                                        >
                                            <CopyIcon />
                                        </IconButton>

                                        <IconButton
                                            onClick={handleCloseModal}
                                            sx={{
                                                color: 'rgba(14, 97, 192, 1)',
                                                '&:hover': { backgroundColor: 'rgba(14, 97, 192, 0.1)' }
                                            }}
                                            size="small"
                                        >
                                            <CrossIcon />
                                        </IconButton>
                                    </>
                                )}
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
                                    {isEditMode ? (
                                        // Edit Mode: TextField for editing
                                        <TextField
                                            multiline
                                            fullWidth
                                            value={editedText}
                                            onChange={(e) => handleTextChange(e.target.value)}
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    minHeight: '70vh',
                                                    alignItems: 'flex-start',
                                                    '& textarea': {
                                                        fontSize: '16px',
                                                        lineHeight: 1.6,
                                                        color: '#334155',
                                                    }
                                                }
                                            }}
                                            inputProps={{
                                                style: {
                                                    minHeight: '70vh',
                                                }
                                            }}
                                        />
                                    ) : (
                                        // View Mode: Read-only text display
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                whiteSpace: 'pre-wrap',
                                                lineHeight: 1.6,
                                                color: '#334155',
                                                fontSize: { xs: '14px', md: '16px' },
                                                border: '2px solid #e2e8f0',
                                                borderRadius: 2,
                                                p: 2,
                                                minHeight: '200px',
                                            }}
                                        >
                                            {selectedReport.cleanResponse}
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Modal>
            )}

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: snackbar.severity === 'success' ? '#4caf50' : '#f44336',
                    }
                }}
            />
        </>
    );
};

export default HistoryCard;