import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./conditions.scss";

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions-container">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to our game! These Terms and Conditions govern your use of the
        game and outline the rules and guidelines for participation. By
        accessing or using the game, you agree to comply with these terms. If
        you do not agree with any part of these terms, please refrain from using
        the game.
      </p>
      <span>1. User Accounts </span>
      <p> You may need to create a user account to access and use the game.</p>
      <p>
        You are responsible for maintaining the confidentiality of your account
        information and agree to accept responsibility for all activities that
        occur under your account.
      </p>
      <span> 2. Game Rules and Conduct </span>
      <p>
        You must abide by the game's rules and guidelines while participating.
        These rules ensure a fair and enjoyable experience for all players.
      </p>
      <p>
        You shall not engage in any behavior that violates the rights of others
        or disrupts the game's integrity. This includes cheating, hacking,
        exploiting, or engaging in any malicious activities.
      </p>
      <span> 3. Virtual Items and Currency </span>
      <p>
        The game may include virtual items or currency that can be earned,
        purchased, or obtained through gameplay. These virtual items hold no
        real-world value.
      </p>
      <p>
        You shall not sell, trade, or transfer virtual items or currency outside
        of the game.
      </p>
      <span> 4. Privacy </span>
      <p>
        Your privacy is important to us. Your personal information will be
        collected and used in accordance with our Privacy Policy.
      </p>
      <span> 5. Intellectual Property</span>
      <p>
        All content in the game, including graphics, designs, and trademarks, is
        the property of the game's creators and licensors.
      </p>
      <p>
        You may not reproduce, distribute, modify, or create derivative works
        based on the game's content without explicit permission.
      </p>
      <span> 6. Termination </span>
      <p>
        We reserve the right to suspend or terminate your access to the game for
        violating these Terms and Conditions or for any other reason at our
        discretion.
      </p>
      <span> 7. Disclaimer of Warranties </span>
      <p>
        The game is provided "as is" and without warranties of any kind, either
        expressed or implied.
      </p>
      <span> 8. Limitation of Liability</span>
      <p>
        We shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages arising out of your use or inability
        to use the game.
      </p>
      <span>9. Changes to Terms and Conditions</span>
      <p>
        We may update these Terms and Conditions over time without prior notice.
        By continuing to use the game, you accept any revised terms.
      </p>
      <span> 10. Governing Law </span>
      <p>
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of Policy, without regard to its conflict of
        law principles. By accessing and using the game, you acknowledge that
        you have read, understood, and agreed to these Terms and Conditions.
      </p>
      <div className="button-terms">
        <button>
          <Link to="/">
            <FaHome />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
