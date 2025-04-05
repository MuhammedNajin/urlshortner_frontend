import React, { useState } from 'react';
import { z } from 'zod';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';
import { Icon } from '../atoms/Icon';
import { useAppDispatch } from '../hooks/redux';
import { loginUser } from '../redux//actions/actions';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../@types/zodValidationSchema';
import AuthHeader from '../molecules/AuthHeader';

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  
  type LoginField = "email" | "password";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
  
    const isLoginField = (id: string): id is LoginField => {
      return id === "email" || id === "password";
    };
  
    if (isLoginField(id)) {
      setFormData((prev) => ({ ...prev, [id]: value }));
  

      const fieldSchema =
        id === "email"
          ? loginSchema.pick({ email: true })
          : loginSchema.pick({ password: true });
  
      const result = fieldSchema.safeParse({ [id]: value });
  
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          [id]: result.error.errors[0].message,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [id]: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setSubmitted(false);
      setApiError(null);
    } else {
      setErrors({});
      setApiError(null);

      try {
        await dispatch(loginUser(result.data)).unwrap();
        navigate('/');
        setSubmitted(true);
      } catch (error: any) {
        console.log('API Error:', error);
        const errorMessage = error || 'Something went wrong. Please try again.';
        setApiError(errorMessage);
        setSubmitted(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-1.5 md:w-2/6 p-6">
      <AuthHeader heading='Sign In'  text='Create and manage short links'/>
      <FormField label="Username or Email" htmlFor="email">
        <Input
          id="email"
          type="text"
          placeholder="Username or Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
        )}
      </FormField>

      <FormField label="Password" htmlFor={"password"}>
    <div className="relative">
      <Input
        id="password"
        type="password"
        placeholder="At least 8 characters"
        value={formData.password}
        onChange={handleChange}
      />
      <Icon className="absolute right-3 top-1/2 transform translate-y-1 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </Icon>
    </div>
  </FormField>
      {errors.password && <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>}

      {apiError && (
        <Text className="text-red-500 text-sm mt-4 text-center">{apiError}</Text>
      )}

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 transition-colors flex justify-between items-center mt-6"
      >
        <span></span>
        <span>Continue</span>
        <Icon>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </Icon>
      </Button>

      {submitted && !apiError && (
        <Text className="mt-4 text-green-500 text-center">Logged in successfully!</Text>
      )}

    </form>
  );
};