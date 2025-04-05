import React, { useState } from 'react';
import { z } from 'zod'; 
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';
import { Icon } from '../atoms/Icon';
import { useAppDispatch } from '../hooks/redux';
import { registerUser } from '../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { signupSchema } from '../@types/zodValidationSchema';
import AuthHeader from '../molecules/AuthHeader';

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    type SignupField = keyof SignupFormData;
  
    const isSignupField = (id: string): id is SignupField => {
      return id === "name" || id === "email" || id === "password";
    };
  
    if (isSignupField(id)) {
      setFormData((prev) => ({ ...prev, [id]: value }));
  
      const fieldSchema = signupSchema.pick({ [id]: true } as { [K in SignupField]?: true });
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
    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignupFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setSubmitted(false);
      setApiError(null);
    } else {
      setErrors({});
      setApiError(null);

      try {
        const response = await dispatch(registerUser(result.data)).unwrap();
        console.log('Registration successful:', response);
        setSubmitted(true);
        navigate('/');
      } catch (error: any) {
        console.log('API Error:', error);

        const errorMessage =
          error  || 'Something went wrong. Please try again.';
        setApiError(errorMessage);
        setSubmitted(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-1.5 md:w-2/6 p-6 mb-2">
      <AuthHeader heading='Sign Up'  text='SignUp for free'/>
      <FormField label="Your Name" htmlFor="name">
        <Input
          id="name"
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>}
      </FormField>

      <FormField label="Your E-mail" htmlFor="email">
        <Input
          id="email"
          type="email"
          placeholder="Your E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>}
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
        <Text className="mt-4 text-green-500 text-center">Registered successfully!</Text>
      )}

      <Text className="mt-6 text-center">
        <span className="text-gray-600">Have an account? </span>
        <a href="/signin" className="text-green-600 hover:underline">Log in</a>
      </Text>
    </form>
  );
};