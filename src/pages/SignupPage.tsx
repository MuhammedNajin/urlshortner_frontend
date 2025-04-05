import React from 'react';
import { AppTemplate } from '../templates/AppTemplate';
import { SignupForm } from '../organisums/SignupForm';

const SignupPage: React.FC = () => {
    return (
        <AppTemplate>
           <div className='flex justify-center items-center mt-20 h-[20rem]'>
             <SignupForm />
           </div>
        </AppTemplate>
    )
}

export default SignupPage;