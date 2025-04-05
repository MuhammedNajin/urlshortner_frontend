import React from 'react';
import { AppTemplate } from '../templates/AppTemplate';
import { LoginForm } from '../organisums/SigninForm';

const SigninPage: React.FC = () => {
    return (
        <AppTemplate>
         <div className='flex justify-center items-center mt-20 h-[25rem]'>
           <LoginForm/>
         </div>
        </AppTemplate>
    )
}
export default SigninPage;