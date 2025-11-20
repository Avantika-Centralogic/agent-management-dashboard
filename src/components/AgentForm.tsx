import React from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
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
  age: number | '';
  birthdate: string;
  address?: string;
  department?: string;
  experience?: number | '';
}

// helper to compute age from birthdate string (YYYY-MM-DD)
const computeAgeFromBirthdate = (birthdate: string) => {
  if (!birthdate) return null;
  const b = new Date(birthdate);
  if (isNaN(b.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - b.getFullYear();
  const m = today.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age--;
  return age;
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  // strong password: at least 8 chars, uppercase, lowercase, number, special char, no spaces
  password: Yup.string()
    .required('Password is required')
    .matches(/^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character, and contain no spaces'),
  phone: Yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
  qualification: Yup.string().required('Qualification is required'),
  age: Yup.number().typeError('Age must be a number').integer('Age must be an integer').min(18, 'Minimum age is 18').max(100, 'Maximum age is 100').required('Age is required')
    .test('matches-birthdate', 'Age does not match birthdate', function (value) {
      const { birthdate } = this.parent as { birthdate?: string };
      if (!birthdate || value === undefined || value === null) return true;
      const computed = computeAgeFromBirthdate(birthdate);
      if (computed === null) return true;
      return Number(value) === computed;
    }),
  birthdate: Yup.string().required('Birthdate is required'),
  address: Yup.string().optional(),
  department: Yup.string().optional(),
  experience: Yup.number().typeError('Experience must be a number').min(0, 'Cannot be negative').optional(),
});

const AgentForm: React.FC<{ initialData?: Agent; onClose?: () => void }> = ({ initialData, onClose }) => {
  const dispatch = useDispatch();
  const { setDrawerOpen, setSelectedAgent } = useAgentContext();

  const initialValues: FormData = {
    name: initialData?.name ?? '',
    email: initialData?.email ?? '',
    password: initialData?.password ?? '',
    phone: initialData?.phone ?? '',
    qualification: initialData?.qualification ?? '',
    age: initialData?.age ?? '',
    birthdate: initialData?.birthdate ?? '',
    address: initialData?.address ?? '',
    department: initialData?.department ?? '',
    experience: initialData?.experience ?? '',
  };

  const handleCancel = () => {
    setSelectedAgent(null);
    setDrawerOpen(false);
    if (onClose) onClose();
  };

  const handleSubmit = (values: FormData, formikHelpers: FormikHelpers<FormData>) => {
    const payload: Agent = {
      id: initialData ? initialData.id : Date.now(),
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      qualification: values.qualification,
      age: Number(values.age),
      birthdate: values.birthdate,
      address: values.address || undefined,
      department: values.department || undefined,
      experience: values.experience === '' || values.experience === undefined ? undefined : Number(values.experience),
    };

    if (initialData) dispatch(updateAgent(payload)); else dispatch(addAgent(payload));
    formikHelpers.resetForm();
    setSelectedAgent(null);
    setDrawerOpen(false);
    if (onClose) onClose();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
      {(formik: FormikProps<FormData>) => (
        <form onSubmit={formik.handleSubmit}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Box>
                <Typography variant="subtitle1" mb={1}>{initialData ? 'Edit Agent' : 'Add Agent'}</Typography>
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                  <Box>
                    <TextField size="small" variant="outlined" fullWidth label="Name" {...formik.getFieldProps('name')} error={Boolean(formik.touched.name && formik.errors.name)} helperText={formik.touched.name && formik.errors.name ? String(formik.errors.name) : ''} />
                  </Box>
                  <Box>
                    <TextField size="small" variant="outlined" fullWidth label="Email" {...formik.getFieldProps('email')} error={Boolean(formik.touched.email && formik.errors.email)} helperText={formik.touched.email && formik.errors.email ? String(formik.errors.email) : ''} />
                  </Box>

                  <Box>
                    <TextField size="small" variant="outlined" fullWidth label="Password" type="password" {...formik.getFieldProps('password')} error={Boolean(formik.touched.password && formik.errors.password)} helperText={formik.touched.password && formik.errors.password ? String(formik.errors.password) : ''} />
                  </Box>
                  <Box>
                    <TextField size="small" variant="outlined" fullWidth label="Phone" {...formik.getFieldProps('phone')} error={Boolean(formik.touched.phone && formik.errors.phone)} helperText={formik.touched.phone && formik.errors.phone ? String(formik.errors.phone) : ''} />
                  </Box>

                  <Box>
                    <TextField size="small" variant="outlined" fullWidth label="Qualification" {...formik.getFieldProps('qualification')} error={Boolean(formik.touched.qualification && formik.errors.qualification)} helperText={formik.touched.qualification && formik.errors.qualification ? String(formik.errors.qualification) : ''} />
                  </Box>
                  <Box>
                    <TextField size="small" variant="outlined" fullWidth label="Age" type="number" {...formik.getFieldProps('age')} error={Boolean(formik.touched.age && formik.errors.age)} helperText={formik.touched.age && formik.errors.age ? String(formik.errors.age) : ''} />
                  </Box>

                  <Box>
                    <TextField size="small" variant="outlined" fullWidth type="date" label="Birthdate" InputLabelProps={{ shrink: true }} {...formik.getFieldProps('birthdate')} error={Boolean(formik.touched.birthdate && formik.errors.birthdate)} helperText={formik.touched.birthdate && formik.errors.birthdate ? String(formik.errors.birthdate) : ''} />
                  </Box>

                  <Box>
                    <TextField size="small" variant="outlined" fullWidth label="Experience (years, optional)" type="number" {...formik.getFieldProps('experience')} error={Boolean(formik.touched.experience && formik.errors.experience)} helperText={formik.touched.experience && formik.errors.experience ? String(formik.errors.experience) : ''} />
                  </Box>

                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <TextField size="small" variant="outlined" fullWidth label="Department (optional)" {...formik.getFieldProps('department')} error={Boolean(formik.touched.department && formik.errors.department)} helperText={formik.touched.department && formik.errors.department ? String(formik.errors.department) : ''} />
                  </Box>

                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <TextField size="small" variant="outlined" fullWidth multiline minRows={2} label="Address (optional)" {...formik.getFieldProps('address')} error={Boolean(formik.touched.address && formik.errors.address)} helperText={formik.touched.address && formik.errors.address ? String(formik.errors.address) : ''} />
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
      )}
    </Formik>
  );
};

export default AgentForm;
