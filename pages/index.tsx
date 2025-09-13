import React from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useStore } from '../lib/store';
import { useRouter } from 'next/router';

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { control, handleSubmit } = useForm<LoginFormInputs>({
    defaultValues: { username: '', password: '' },
  });

  const login = useStore(s => s.login);
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  
  const onSubmit = async (data: LoginFormInputs) => {
    const ok = await login(data.username, data.password);
    if (ok) {
      router.push('/home');
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login — CMS App
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Username" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
              />
            )}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>

        {/* <Typography sx={{ mt: 2 }} variant="body2">Use <b>admin</b> / <b>password123</b></Typography> */}
      </Paper>
    </Container>
  );
}
