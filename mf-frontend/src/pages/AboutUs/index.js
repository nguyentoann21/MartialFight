import React, { useState } from 'react';
import './aboutUs.scss';
const members = [
  {
    name: 'S-Chat Key',
    role: 'Dev Fresher',
    lang: 'C#, JavaScript, Java',
    image: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/321503457_5895494533830248_5065466886470833900_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=jxDovRsELCYAX_NHf03&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfDLgrdfqL9T8Udmt3F9_Kw8pxc8qKU7xCW11F9bxK4YUQ&oe=645913A9',
    facebook: 'https://www.facebook.com/nvt.2001.sw/',
  },
  {
    name: 'Jane Doe',
    role: 'CTO',
    lang: 'Spanish',
    image: 'https://i.pinimg.com/736x/94/3f/cf/943fcf1ad73de4334e083475d1ab9541.jpg',
    facebook: 'https://www.facebook.com/janedoe',
  },
  {
    name: 'John Doe',
    role: 'CEO',
    lang: 'English',
    image: 'https://i.pinimg.com/736x/94/3f/cf/943fcf1ad73de4334e083475d1ab9541.jpg',
    facebook: 'https://www.facebook.com/johndoe',
  },
  {
    name: 'Jane Doe',
    role: 'CTO',
    lang: 'Spanish',
    image: 'https://i.pinimg.com/736x/94/3f/cf/943fcf1ad73de4334e083475d1ab9541.jpg',
    facebook: 'https://www.facebook.com/janedoe',
  },
  {
    name: 'John Doe',
    role: 'CEO',
    lang: 'English',
    image: 'https://i.pinimg.com/736x/94/3f/cf/943fcf1ad73de4334e083475d1ab9541.jpg',
    facebook: 'https://www.facebook.com/johndoe',
  }
  // Add more members here
];

const AboutUs = () => {
  const [activeMember, setActiveMember] = useState(null);

  const handleMemberClick = (member) => {
    setActiveMember(member);
    if(member !== null){
        window.location.href = member.facebook;
    }
  };

  return (
    <div className='about-us'>
      <h1>About Us</h1>
      <p className='team-introduction'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Adults PageMaker including versions of Lorem Ipsum.</p>
      <div className='members'>
        {members.map((member, index) => (
          <div
            key={index}
            className={`member ${activeMember === index ? 'active' : ''}`}
            onClick={() => handleMemberClick(member)}
          >
            <img
              src={member.image}
              alt={member.name}
              style={{ borderRadius: '50%' }}
            />
            <div className='info'>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p>{member.lang}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
