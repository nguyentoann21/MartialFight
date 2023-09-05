import React, { useState } from "react";
import "./aboutUs.scss";
const members = [
  {
    name: "Nguyen Van Toan",
    role: "Website Developer - Member",
    lang: "C#, JavaScript, ReactJs and Sass",
    image: "/assets/images/nguyenvantoan.png",
    facebook: "",
  },
  {
    name: "Nguyen Chanh Tong",
    role: "Game Developer - Leader",
    lang: "C#, Unity",
    image: "/assets/images/nguyenchanhtong.jpg",
    facebook: "",
  },
  {
    name: "Huynh Minh Nhat",
    role: "Game Developer - Member",
    lang: "C#, Unity",
    image: "/assets/images/huynhminhnhat.png",
    facebook: "",
  },
  {
    name: "Tran Thanh Liem",
    role: "Game Developer - Member",
    lang: "C#, Unity",
    image: "/assets/images/tranthanhliem.png",
    facebook: "",
  },
  {
    name: "Huynh Van Doi",
    role: "Game Developer - Member",
    lang: "C#, Unity",
    image: "/assets/images/huynhvandoi.jpg",
    facebook: "",
  },
];

const AboutUs = () => {
  const [activeMember, setActiveMember] = useState(null);

  const handleMemberClick = (member) => {
    setActiveMember(member);
    if (member !== null) {
      window.location.href = member.facebook;
    }
  };

  return (
    <div className="about-us-page">
      <div className="about-us">
        <h1>About Us</h1>
        <p className="team-introduction">
          We are a passionate and talented game development team focused on
          delivering the best gaming experience for the player community. With a
          shared goal of bringing an exciting and unique game to life, we
          are a creative and constantly evolving team, aiming to cater to the
          diverse preferences and desires of players. Utilizing a range of
          skills and expertise, we actively listen to feedback from the
          community to continually enhance and enrich our game. We take pride in
          the game we've created and are eager to share this joy with you.
        </p>
        <div className="members">
          {members.map((member, index) => (
            <div
              key={index}
              className={`member ${activeMember === index ? "active" : ""}`}
              onClick={() => handleMemberClick(member)}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{ borderRadius: "50%" }}
              />
              <div className="info">
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <span>{member.lang}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
