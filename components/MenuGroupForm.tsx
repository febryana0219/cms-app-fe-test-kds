import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '../lib/store';

type Props = {
  open: boolean;
  initial?: { id?: string; name?: string };
  onClose: () => void;
};

const schema = yup.object({
  name: yup.string().required('Group name is required').min(2, 'Min 2 characters'),
});

type MenuGroupFormInputs = yup.InferType<typeof schema>;

export default function MenuGroupForm({ open, initial, onClose }: Props) {
  const addMenuGroup = useStore((s) => s.addMenuGroup);
  const updateMenuGroup = useStore((s) => s.updateMenuGroup);

  const { control, handleSubmit, reset } = useForm<MenuGroupFormInputs>({
    defaultValues: { name: initial?.name || '' },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset({ name: initial?.name || '' });
  }, [initial, reset]);
  
  const onSubmit = async (data: MenuGroupFormInputs) => {
    if (initial?.id) {
      await updateMenuGroup(initial.id, data.name);
    } else {
      await addMenuGroup(data.name);
    }
    reset({ name: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initial?.id ? 'Edit Menu Group' : 'Add Menu Group'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Group Name"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
