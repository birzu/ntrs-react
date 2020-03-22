import { useState, useEffect } from 'react';

export default function() {
  const [shouldStick, setShouldStick] = useState(false);

  const handleScroll = () => {
    setShouldStick(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return shouldStick;
}
