import React from 'react';

const Footer = () => {
  return (
    <footer style={{ marginTop: 'auto', padding: '10px', backgroundColor: '#343a40', color: 'white', textAlign: 'center' }}>
      &copy; {new Date().getFullYear()} WeddingWise. All rights reserved.
    </footer>
  );
};

export default Footer;
