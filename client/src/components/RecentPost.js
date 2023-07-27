import React from 'react';
import jsonData from "../api/api.json"
import PostComponent from "./Post";
import Headshot from "../images/headshot.jpg";


const RecentPost = () => {
  // const [jsonData, setJsonData] = useState(data);
  const articles = jsonData.articles;
  const lastSixItems = articles.slice(-6); 
  
  

  return (
    <div className="site-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <h2>Recent Posts</h2>
          </div>
        </div>
        <div className="row">
         
         {lastSixItems.map((data) => {
          const summarry = data.description.split(' ').slice(0, 38).join(' ');
        
          return (
            <PostComponent key={data.id} img={data.image1}
            categories={data.categories}
            headshot={Headshot}
            author={`${data.author.firstname} ${data.author.lastname}`}
            title={data.title}
            date={`${data.date.month} ${data.date.day}, ${data.date.year}`}
            summarry={summarry}
          />
          )
         })}

          
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
