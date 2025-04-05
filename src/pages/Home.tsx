import React from 'react';
import { AppTemplate } from '../templates/AppTemplate';
import URLShortenerCard from '../organisums/UrlInputCard';

const Home: React.FC = () => {
    return (
        <AppTemplate>
         <div className='flex justify-center items-center h-[30rem]'>
         <URLShortenerCard  />
         </div>
        </AppTemplate>
    )
}
export default Home;