import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Stack, Box, Paper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addAgent, updateAgent, Agent } from '../redux/agentSlice';
import { useAgentContext } from '../context/AgentContext';

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  qualification: string;
  age: number;
  birthdate: string;
  address?: string;
  department?: string;
  experience?: number;
}

const AgentForm = ({ initialData, onClose }: { initialData?: Agent; onClose?: () => void }) => {
  const { control, handleSubmit, reset, setValue } = useForm<FormData>({
    defaultValues: initialData ? {
      name: initialData.name,
      email: initialData.email,
      password: initialData.password,
      phone: initialData.phone,
      qualification: initialData.qualification,
      age: initialData.age,
      birthdate: initialData.birthdate,
      address: initialData.address,
      department: initialData.department,
      experience: initialData.experience,
    } : undefined
  });
  const dispatch = useDispatch();
  const { setDrawerOpen, setSelectedAgent } = useAgentContext();

  useEffect(() => {
    if (initialData) {
      // populate form when editing
      Object.entries(initialData).forEach(([k, v]) => {
        if (k in initialData && v !== undefined) {
          // @ts-ignore
          setValue(k, v);
        }
      });
    } else {
      reset();
    }
  }, [initialData, reset, setValue]);

  const onSubmit = (data: FormData) => {
    if (initialData) {
      dispatch(updateAgent({ ...data, id: initialData.id } as Agent));
    } else {
      dispatch(addAgent({ ...data, id: Date.now() } as Agent));
    }
    reset();
    setSelectedAgent(null);
    setDrawerOpen(false);
    if (onClose) onClose();
  };

  const handleCancel = () => {
    reset();
    setSelectedAgent(null);
    setDrawerOpen(false);
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Box>
            <Typography variant="subtitle1" mb={1}>{initialData ? 'Edit Agent' : 'Add Agent'}</Typography>
            <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
            <Box>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field, fieldState }) => (
                  <TextField {...field} fullWidth size="small" variant="outlined" label="Name" error={!!fieldState.error} helperText={fieldState.error?.message} />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                }}
                render={({ field, fieldState }) => (
                  <TextField {...field} fullWidth size="small" variant="outlined" label="Email" error={!!fieldState.error} helperText={fieldState.error?.message} />
                )}
              />
            </Box>

            <Box>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } }}
                render={({ field, fieldState }) => (
                  <TextField {...field} fullWidth size="small" variant="outlined" label="Password" type="password" error={!!fieldState.error} helperText={fieldState.error?.message} />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Phone required', minLength: { value: 10, message: 'Must be 10 digits' }, maxLength: { value: 10, message: 'Must be 10 digits' }, pattern: { value: /^\d{10}$/, message: 'Must be 10 digits' } }}
                render={({ field, fieldState }) => (
                  <TextField {...field} fullWidth size="small" variant="outlined" label="Phone" error={!!fieldState.error} helperText={fieldState.error?.message} />
                )}
              />
            </Box>

            <Box>
              <Controller
                name="qualification"
                control={control}
                rules={{ required: 'Qualification required' }}
                render={({ field, fieldState }) => (
                  <TextField {...field} fullWidth size="small" variant="outlined" label="Qualification" error={!!fieldState.error} helperText={fieldState.error?.message} />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="age"
                control={control}
                rules={{ required: 'Age required', min: { value: 18, message: 'Must be >=18' } }}
                render={({ field, fieldState }) => (
                  <TextField {...field} fullWidth size="small" variant="outlined" label="Age" type="number" error={!!fieldState.error} helperText={fieldState.error?.message} />
                )}
              />
            </Box>

            <Box>
              <Controller
                name="birthdate"
                control={control}
                rules={{ required: 'Birthdate required' }}
                render={({ field, fieldState }) => (
                  <TextField {...field} fullWidth size="small" variant="outlined" type="date" label="Birthdate" InputLabelProps={{ shrink: true }} error={!!fieldState.error} helperText={fieldState.error?.message} />
                )}
              />
            </Box>

            <Box>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth size="small" variant="outlined" label="Experience (years, optional)" type="number" />
                )}
              />
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth size="small" variant="outlined" label="Department (optional)" />
                )}
              />
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth size="small" variant="outlined" multiline minRows={2} label="Address (optional)" />
                )}
              />
            </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            <Button onClick={handleCancel} sx={{ width: { xs: '100%', sm: 'auto' } }}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" sx={{ width: { xs: '100%', sm: 'auto' } }}>{initialData ? 'Save Changes' : 'Add Agent'}</Button>
          </Box>
        </Stack>
      </Paper>
    </form>
  );
};

export default AgentForm;
