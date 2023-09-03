import React from "react";
import "./guide.scss";

const Guide = () => {
  return (
    <div className="guide-page">
      <div className="guide-page-container">
        <h1 className="guide-title">Martial Fight</h1>
        <div className="guide-introduction">
          <h2 className="guide-introduction-title">Introduction</h2>
          <p className="guide-introduction-content">
            Welcome to Martial Fight! This is a PVP fighting game played on PC.
            With "Martial Fight," players can experience 1v1 pvp and can also
            practice with bots to learn the character's skills. In addition,
            players can also overcome levels to receive rewards.
          </p>
        </div>
        <div className="guide-how-to-play">
          <h2 className="guide-how-to-play-title">How To Play</h2>
          <p className="guide-how-to-play-content">
            To be able to play the game, players must first register themselves
            for an account to be able to log in to the game, and registration
            can only be done on this website (this is the homepage of the
            Martial Fight game).
          </p>
        </div>
        <div className="guide-sign-up">
          <h2 className="guide-sign-up-title">Sign Up Account</h2>
          <p className="guide-sign-up-content">
            To be able to play the game, players must first register themselves
            for an account to be able to log in to the game, and registration
            can only be done on this website (this is the homepage of the
            Martial Fight game).
          </p>
        </div>
        <div className="guide-sign-in">
          <h2 className="guide-sign-in-title">Sign In To The Game</h2>
          <p className="guide-sign-in-content">
            Users use the account they just created or registered on the website
            and enter the login form in the game's login screen to log in and
            start experiencing the game.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/login.png" alt="guide-login" />
          </div>
        </div>
        <div className="guide-select-character">
          <h2 className="guide-select-character-title">Choose Character</h2>
          <p className="guide-select-character-content">
            After logging in, players can choose a character to experience the
            game (note that after choosing a character, you cannot change to
            another character).
          </p>
          <div className="guide-image">
            <img
              src="/assets/guide/choose-character.png"
              alt="guide-choose-character"
            />
          </div>
        </div>
        <div className="guide-set-name">
          <h2 className="guide-set-name-title">Setup Name In-Game</h2>
          <p className="guide-set-name-content">
            The player sets an in-game name, and that name will be displayed in
            the game along with the avatar and level.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/set-name.png" alt="guide-set-name" />
          </div>
        </div>
        <div className="guide-gameplay">
          <h2 className="guide-gameplay-title">Main Screen GamePlay</h2>
          <p className="guide-gameplay-content">
            After the player sets the name in the game, it will be transferred
            to the main screen of the game.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/main-screen.png" alt="guide-main-screen" />
          </div>
        </div>
        <div className="guide-training">
          <h2 className="guide-training-title">Training</h2>
          <p className="guide-training-content">
            On the main screen, the user can select the "TRAINING" section to
            practice with the bot.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/training.png" alt="guide-training" />
          </div>
        </div>
        <div className="guide-ranking-board">
          <h2 className="guide-ranking-board-title">Ranking Board</h2>
          <p className="guide-ranking-board-content">
            On the main screen, users can select the "RANKBOARD" section to go
            to the rankings.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/ranking-board.png" alt="guide-ranking" />
          </div>
        </div>
        <div className="guide-inventory">
          <h2 className="guide-inventory-title">Inventory</h2>
          <p className="guide-inventory-content">
            On the main screen, users can select the "Inventory" section to go
            to the inventory. Here, you can view the existing equipment and
            devices on the account.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/inventory.png" alt="guide-bag" />
          </div>
        </div>
        <div className="guide-mission">
          <h2 className="guide-mission-title">Mission</h2>
          <p className="guide-mission-content">
            On the main screen, the user can select the "Mission" section to go
            to the mission section. Here you can view completed missions and the
            completion progress of completed missions. With a completed mission,
            the player can receive the rewards.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/mission.png" alt="guide-misstion" />
          </div>
        </div>
        <div className="guide-shop">
          <h2 className="guide-shop-title">Store</h2>
          <p className="guide-shop-content">
            On the main screen, the user can select the "Store" section to go to
            the store's section. Here, users can view the items for sale and
            their prices.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/shop.png" alt="guide-store" />
          </div>
        </div>
        <div className="guide-buy-item">
          <h2 className="guide-buy-item-title">Buy Item</h2>
          <p className="guide-buy-item-content">
            In the store, users select an item to see its details and can buy
            that item.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/buy-item.png" alt="guide-buy-item" />
          </div>
        </div>
        <div className="guide-recharge">
          <h2 className="guide-recharge-title">Recharge</h2>
          <p className="guide-recharge-content">
            Users can recharge money into the game. Each price will be converted
            into a certain amount of gold. Users can purchase items with gold.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/recharge.png" alt="guide-recharge" />
          </div>
        </div>
        <div className="guide-map">
          <h2 className="guide-map-title">Select Map</h2>
          <p className="guide-map-content">
            The user selects the Map section to go to the interface of the map.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/choose-map.png" alt="guide-map" />
          </div>
        </div>
        <div className="guide-area">
          <h2 className="guide-area-title">Choose Area</h2>
          <p className="guide-area-content">
            At the map interface, players can choose the area they want to
            overcome.
          </p>
          <div className="guide-image">
            <img src="/assets/guide/choose-area.png" alt="guide-area" />
          </div>
        </div>
        <div className="guide-challenge">
          <h2 className="guide-challenge-title">Choose Challenge</h2>
          <p className="guide-challenge-content">
            At the area interface, players can choose the challenge they want to
            overcome.
          </p>
          <div className="guide-image">
            <img
              src="/assets/guide/select-challenge.png"
              alt="guide-challenge"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
