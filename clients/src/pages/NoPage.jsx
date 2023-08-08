import errorImg from "../../public/assets/error.png";
import "../App.css"   

const Nopage = () => {
  return (
    <div id="nopage" className="nopage-container">
        <div className="centered-div"> 
        <img src={errorImg} alt="404" className="w-50 h-50 "/>
        <div className="error-message">
  <p>Oops! An error occurred.</p>
  <p>Please try again later or contact support for assistance.</p>
</div>
        </div>
      
    </div>
  );
};

export default Nopage;
