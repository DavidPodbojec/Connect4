import botImage from "../images/bot.png"
import TwoPlayerImage from "../images/two_player_white.png"
import Title from "./Title";

function StartScreen ({choice}) {
  
    return (
      <div>  
          <div>
            <Title/>
            <div className=" container" >
              
              
              <div>
                <button value="single-player" onClick={() => {choice("single-player")}}><img src={botImage} alt="bot"/></button>
                <h3>SINGLE PLAYER</h3>
              </div>
              <div>
                <button onClick={() => {choice("two-player")}}><img src={TwoPlayerImage} alt="two"/></button>
                <h3>TWO PLAYER</h3>
              </div>
            </div>
          </div>
        
      </div>
    );
  };
  
  export default StartScreen;