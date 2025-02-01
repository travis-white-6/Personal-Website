import React, { useEffect, useState } from 'react';
import './App.css';
import ReactLogo from './react-logo.svg';
import FirebaseLogo from './firebase-icon-180.png';

const text = 'Howdy 👋 I\'m Travis White, a San Francisco based software engineer.';

const github = '🐙 GitHub https://github.com/travis-white-6';
const linkedin = '🏗️ LinkedIn https://www.linkedin.com/in/fungineering/';
const upwork = "👨‍💻 Upwork https://www.upwork.com/freelancers/~0185d87b7317ce58fb";
const email = '📧 Contact me@traviswhite.dev';

const speed = 50;

const TypeWriter = ({ text, className, basic = false, isMobile = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const lastWord = text.split(' ').pop();
  const indexLastWordStarts = text.indexOf(lastWord);
  const dontDisplayLinkText = isMobile && index >= indexLastWordStarts;

  useEffect(() => {
    if (index < text.length && !dontDisplayLinkText) {
      const timer = setTimeout(() => {
        setDisplayedText(displayedText + text.charAt(index));
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [index, text, displayedText]);

  let url = lastWord;
  if (url.includes('me@')) {
    url = `mailto:${url}`;
  }

  if (basic) {
    let cursor = null;
    if (index === text.length) {
      cursor = <span className="blink">|</span>;
    }

    return (
      <div className="bottom-margin" style={{flexDirection: 'row'}}>
        <code>{displayedText}</code>{cursor}
      </div>
    )
  }

  return (
    <div className="bottom-margin">
      <a target="_blank" rel="noopener noreferrer" className={className} href={url ? url : undefined}>{displayedText}</a><br />
    </div>
  );
}

function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);  // You can adjust the width breakpoint as needed
    };

    handleResize();  // Check on initial load
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}


export const App = () => {
  const isMobile = useMobileDetect();

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-container">
          <div className="typing-container">
            <TypeWriter className="typing-text" text={text} basic />
          </div>
        </div>
        <div className="secondary-container">
          <TypeWriter className="secondary-typing-text" text={github} isMobile={isMobile} />
          <br/>
          <TypeWriter className="secondary-typing-text" text={linkedin} isMobile={isMobile} />
          <br/>
          <TypeWriter className="secondary-typing-text" text={upwork} isMobile={isMobile} />
          <br/>
          <TypeWriter className="secondary-typing-text" text={email} isMobile={isMobile} />
        </div>
        <div className='footer'>
          <code className='small-text'>
            Built with React <img src={ReactLogo} className="App-logo" alt="react-logo" /> | 
            Hosted on Firebase <img src={FirebaseLogo} className="Firebase-logo" alt="firebase-logo" /> | 
            © 2021-2025 Travis White Consulting LLC
          </code>
        </div>
      </header>
    </div>
  );
}
