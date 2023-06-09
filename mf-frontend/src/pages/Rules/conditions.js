import React from 'react';
import { FaHome } from 'react-icons/fa';
import './conditions.css'; // Import the CSS file

const TermsAndConditions = () => {
  return (
    <div className="container"> {/* Add className here */}
      <h1>Terms and Conditions</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel nibh eu ante fringilla faucibus.
        Sed non hendrerit tellus. Vestibulum sed risus eu justo convallis pellentesque vel vel nunc.
        Curabitur sit amet malesuada leo. Integer vel fringilla lacus, id cursus mi.
        Suspendisse id condimentum turpis. Praesent non luctus erat, sed finibus lectus.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
        Morbi dignissim, risus vel hendrerit viverra, neque tortor tincidunt nunc, eget scelerisque mi libero eu neque.
      </p>
      <p>
        Vestibulum facilisis ullamcorper vulputate. Mauris vitae lacus nec nisi pharetra dignissim.
        Nullam eu massa diam. Aliquam efficitur, velit id gravida eleifend, lorem est consectetur ante,
        id pellentesque ligula lectus id sem. Nam id neque felis. Aliquam luctus malesuada eros eget congue.
        Ut feugiat ligula ut gravida interdum. Duis ut pellentesque quam, vel sollicitudin sem.
        Curabitur dapibus rutrum erat ac sagittis. Aliquam erat volutpat.
      </p>
      <p>
        Sed viverra velit eu orci egestas tincidunt. Duis a elit vel sem bibendum suscipit.
        Aliquam id erat ut leo pulvinar efficitur. Aenean sed bibendum elit.
        Nullam feugiat maximus neque, nec tempor nisi. Curabitur auctor, odio sit amet consectetur feugiat,
        nisi orci efficitur orci, vitae lobortis neque nulla nec est.
        Nulla facilisi. In consequat lacinia turpis at dapibus.
        Curabitur venenatis, tellus eget rhoncus lobortis, ex lorem rhoncus enim, in tristique urna justo non risus.
      </p>
      <button>
        <FaHome />
      </button>
    </div>
  );
};

export default TermsAndConditions;
