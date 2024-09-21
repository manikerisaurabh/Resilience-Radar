import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));

// const Profile = () => {
//     const [open, setOpen] = React.useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <React.Fragment>
//             <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mt: 2 }}>
//                 View Profile
//             </Button>
//             <BootstrapDialog
//                 onClose={handleClose}
//                 aria-labelledby="customized-dialog-title"
//                 open={open}
//             >
//                 <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" sx={{ backgroundColor: '#f0f0f0' }}>
//                     Profile Details
//                     <IconButton
//                         aria-label="close"
//                         onClick={handleClose}
//                         sx={{
//                             position: 'absolute',
//                             right: 8,
//                             top: 8,
//                             color: (theme) => theme.palette.grey[500],
//                         }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent dividers>
//                     <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
//                         <img src="/path/to/profile-pic.jpg" alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
//                     </div>
//                     <Typography variant="subtitle1" gutterBottom>
//                         Name: John Doe
//                     </Typography>
//                     <Typography variant="subtitle1" gutterBottom>
//                         Email: john.doe@example.com
//                     </Typography>
//                     <Typography variant="subtitle1" gutterBottom>
//                         Occupation: Software Engineer
//                     </Typography>
//                     <Typography variant="subtitle1" gutterBottom>
//                         Location: New York, USA
//                     </Typography>
//                     <Typography variant="subtitle1" gutterBottom>
//                         Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at
//                         urna ac velit consequat vehicula. Nulla facilisi.
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions sx={{ justifyContent: 'center' }}>
//                     <Button autoFocus onClick={handleClose} variant="outlined" sx={{ minWidth: '120px', borderRadius: '20px', borderColor: '#3f51b5', color: '#3f51b5' }}>
//                         Close
//                     </Button>
//                 </DialogActions>
//             </BootstrapDialog>
//         </React.Fragment>
//     );
// };

// export default Profile;



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Profile = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mt: 2 }}>
                View Profile
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" sx={{ backgroundColor: '#f0f0f0' }}>
                    Profile Details
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <img
                            src="/path/to/profile-pic.jpg"
                            alt="Profile"
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                        />
                    </div>
                    <Typography variant="subtitle1" gutterBottom>
                        Name: John Doe
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Email: john.doe@example.com
                    </Typography>
                    {/* Add more profile details here */}
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
};

export default Profile;