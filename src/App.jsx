import React, { useEffect, useState } from 'react';
import './App.css';

const text = 'Howdy 👋 I\'m Travis White, a San Francisco based software engineer.';

const github = '🐙 GitHub https://github.com/travis-white-6';
const linkedin = '🏗️ LinkedIn https://www.linkedin.com/in/fungineering/';
const email = '📧 Contact me@traviswhite.dev';

const speed = 50;

const TypeWriter = ({ text, className, basic = false }) => {

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(displayedText + text.charAt(index));
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [index, text, displayedText]);

  let url = '';
  if (index === text.length && (text.includes('https://') || text.includes('me@'))) {
    const stringArr = text.split(' ');
    url = stringArr[stringArr.length - 1];
  }

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


export const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-container">
          <div className="typing-container">
            <TypeWriter className="typing-text" text={text} basic />
          </div>
        </div>
        <div className="secondary-container">
          <TypeWriter className="secondary-typing-text" text={github} />
          <TypeWriter className="secondary-typing-text" text={linkedin} />
          <TypeWriter className="secondary-typing-text" text={email} />
        </div>
      </header>
    </div>
  );
}
