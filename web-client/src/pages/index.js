import * as React from 'react';
import globalcss from '../global.css';
import phone from '../images/phone.png';
import googlePlay from '../images/Google Play.png';
import appStore from '../images/App Store.png';

// styles
const pageStyles = {
  backgroundColor: '#14233c',
  color: '#232129',
  padding: 16,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
  margin: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const containerStyles = {
  width: '90%',
};

const headingStyles = {
  marginTop: 0,
  marginBottom: 32,
  fontFamily: 'Mulish',
  fontSize: 64,
  color: '#fff',
  textAlign: 'center',
};

const imageContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const imageStyles = {
  maxWidth: 200,
};

const paragraphContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

const paragraphStyles = {
  color: '#fff',
  fontFamily: 'Mulish',
  fontSize: 22,
  marginLeft: '5%',
  marginRight: '5%',
  textAlign: 'center',
};

const buttonContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '90%',
  marginLeft: '5%',
  marginRight: '5%',
};

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <div style={containerStyles}>
        <h1 style={headingStyles}>
          Welcome to the Watson Wedding
          <span role='img' aria-label='Party popper emojis' style={{ marginLeft: 15 }}>
            🎉
          </span>
        </h1>
        {/* <p style={paragraphStyles}>
        Edit <code style={codeStyles}>src/pages/index.js</code> to see this page update in real-time.{' '}
        <span role='img' aria-label='Sunglasses smiley emoji'>
          😎
        </span>
      </p> */}
        <div style={imageContainerStyles}>
          <img src={phone} style={imageStyles} />
          <div style={paragraphContainerStyles}>
            <p style={paragraphStyles}>
              Download the app from the Apple App store or Google Play store and scan your invitation!
            </p>
            <div style={buttonContainer}>
              <a
                href='https://play.google.com/store/apps/details?id=com.rbrnx.watsonwedding'
                style={{ marginBottom: 15 }}
              >
                <img src={googlePlay} style={{ maxWidth: 200 }} />
              </a>
              <a href='https://apps.apple.com/us/app/watson-weddings/id1576160072'>
                <img src={appStore} style={{ maxWidth: 200 }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
