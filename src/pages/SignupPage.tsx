import React from 'react';
import { AppTemplate } from '../templates/AppTemplate';
import { LoginForm } from '../organisums/SigninForm';

const SignupPage: React.FC = () => {
    return (
        <AppTemplate>
           <div className='flex justify-center items-center mt-20 h-[20rem]'>
             <LoginForm />
           </div>
        </AppTemplate>
    )
}

export default SignupPage;