import React from 'react';
import SingleComponent from '../components/SingleComponent';
import jsonData from '../api/api.json';

const Single = () => {
    const articles = jsonData.articles;
    return (
        <div>
           <SingleComponent img={articles.image1}/>
        </div>
    )
};

export default Single;