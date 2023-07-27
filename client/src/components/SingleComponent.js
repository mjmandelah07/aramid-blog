import '../styles/App.css';
import '../styles/single.css';

const SingleComponent = ({ img, }) => {
    return (
        <>
        <div className='site-cover site-cover-sm same-height overlay single-page' style={{backgroundImage: `url(${img})`}}>
           <div className='container'>
           <div className="row same-height justify-content-center">
           <div className="col-md-12 col-lg-10">
           <div className="post-entry text-center">
           <span className="post-category text-white bg-success mb-3">Nature</span>
           </div>
             </div>
           </div>
           </div>
        </div>
        
      
        </>
        
    )
};

export default SingleComponent;