import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

// Actions
import { loadDrawingFromSessionRequest } from 'actions';

export default function SessionModal() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const previousDrawing = localStorage.getItem('drawing');

    if (previousDrawing) {
      setDialogOpen(true);
    }
  }, []);

  const closeDialog = () => setDialogOpen(false);
  const loadDrawing = useCallback(() => {
    closeDialog();
    dispatch(loadDrawingFromSessionRequest());
  }, []);

  if (!isDialogOpen) return null;

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        You have an unfinished drawing
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Would you like to restore the previous session or create a new one?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          No
        </Button>
        <Button onClick={loadDrawing} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
