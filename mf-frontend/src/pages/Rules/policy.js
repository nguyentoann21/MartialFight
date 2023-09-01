import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./policy.scss";

const Policy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>
        We greatly value your trust and are committed to protecting players'
        personal information. This Privacy Policy describes how we collect, use,
        and safeguard your personal information when you participate in our PvP
        game.
      </p>
      <p>
        We Collect We may collect certain necessary personal information to
        provide you with the best gaming experience. Types of information we may
        collect include: Player's name Email address Game account username IP
        address Device and operating system information In-game activity data
      </p>
      <p>
        Provide and maintain the game, including related features and services.
        Send notifications and updates about the game, including new features,
        events, and relevant news. Address technical issues and provide
        technical support for the game. Analyze and improve the gaming
        experience. Comply with legal requirements and manage risks related to
        the game.
      </p>
      <p>
        We are committed to protecting your personal information and
        implementing appropriate security measures to prevent unauthorized
        access or misuse.
      </p>
      <p>
        We do not sell, rent, or share your personal information with third
        parties without your consent, except when required by law or to protect
        our rights, assets, and the safety of ourselves and other players.
      </p>
      <p>
        You have the right to request access, modify, or delete your personal
        information from our system at any time.
      </p>
      <p>
        We may update this Privacy Policy over time without prior notice. The
        latest version will always be posted on our website. We place
        significant importance on safeguarding your personal information and
        ensuring a safe and enjoyable gaming experience.
      </p>
      <button>
        <Link to="/">
          <FaHome />
        </Link>
      </button>
    </div>
  );
};

export default Policy;
