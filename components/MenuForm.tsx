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
  groupId?: string;
  initial?: { id?: string; title?: string; url?: string };
  onClose: () => void;
};

const schema = yup.object({
  title: yup.string().required('Title required'),
  url: yup.string().url('Must be a valid URL').notRequired(),
});

type MenuFormInputs = yup.InferType<typeof schema>;

export default function MenuForm({ open, groupId, initial, onClose }: Props) {
  const addMenu = useStore((s) => s.addMenu);
  const updateMenu = useStore((s) => s.updateMenu);

  const { control, handleSubmit, reset } = useForm<MenuFormInputs>({
    defaultValues: { title: initial?.title || '', url: initial?.url || '' },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset({ title: initial?.title || '', url: initial?.url || '' });
  }, [initial, reset]);

  const onSubmit = async (data: MenuFormInputs) => {
    if (!groupId) return;

    if (initial?.id) {
      await updateMenu(initial.id!, data.title, data.url || undefined);
    } else {
      await addMenu(groupId, data.title, data.url || undefined);
    }

    reset({ title: '', url: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initial?.id ? 'Edit Menu' : 'Add Menu'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Title"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="url"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="URL (optional)"
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
