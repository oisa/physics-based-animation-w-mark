import React, { useState, useEffect, useRef } from 'react';
import { useSpring, useTrail, a, config } from 'react-spring';
import mark from './images/mark.svg';
import wm from './images/wm.svg'
import reactSpringLogo from './images/react-spring-logo.svg'
import './App.css';

function App() {

  // Global Bits: Logo, Bg & Title Animation ////////////////////////////////////////////////////////////

  const aLogo = useSpring({
    config: { ...config.molasses },
    from: { opacity: 0, transform: 'translateY(100px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
  })

  const aBg = useSpring({
    config: { ...config.molasses },
    from: { scale: 1.3 },
    to: { scale: 1 },
  })

  const aTitle = useSpring({
    config: { ...config.molasses },
    delay: 150,
    from: { opacity: 0, transform: 'translateY(-100px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
  })

  //////////////////////////////////////////////////////////////////////////////
  // Interpolation /////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // Animation props ///////////////////////////////////////////////////////////

  const [properties, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))

  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]

  // Title
  const transTitle = (x, y) => `translate3d(${x / 40}px,${y / 40}px,0)`

  const trans1 = (x, y) => `translate3d(${x / 6}px,${y / 6}px,0)`
  const trans2 = (x, y) => `translate3d(${x / 3}px,${y / 3}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 5}px,${y / 5}px,0)`
  const trans4 = (x, y) => `translate3d(${x / 9}px,${y / 9}px,0)`
  const trans5 = (x, y) => `translate3d(${x / 2}px,${y / 2}px,0)`

  // Animation on scroll //////////////////////////////////////////////////////

  // Handles scroll y-value for use for animation sequencing
  const ref = useRef();
  const [{ offset }, setOffset] = useSpring(() => ({ offset: 0 }));

  const handleScroll = () => {
    const posY = ref.current.getBoundingClientRect().top;
    const offset = (window.pageYOffset - posY) / (window.innerHeight / 1);
    setOffset({ offset });
  };

  // Finding the current location on the page
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  //////////////////////////////////////////////////////////////////////////////
  // Trail animation ///////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  const marks = [
    mark,
    mark,
    mark,
    mark,
    mark,
    mark,
    mark,
    mark,
    mark,
    mark,
    mark,
    mark,
    mark,
    mark,
    mark
  ];

  const [unMark, setUnMark] = useState(false);

  const trail = useTrail(marks.length, {
    config: { ...config.gentle},
    delay: 1000,
    from: { opacity: 0, x: -20, y: 80, height: 200 },
    to: { opacity: 1, x: 0, y: 0, height: 200 },
    reverse: unMark
  });

  //////////////////////////////////////////////////////////////////////////////
  // Standard Button ///////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  const [hover, setHover] = useState(false);
  const stdButton = useSpring({
    config: { ...config.wobbly },
    from: { scale: 0.2, opacity: 0, transform: 'rotate(-80deg) translateY(100px)' },
    to: { scale: hover ? 1.8 : 1, opacity: hover ? 1 : 0.7, transform: hover ? 'rotate(10deg) translateY(0px)' : 'rotate(0deg) translateY(0px)' },
  })

  return (
    <a.div className="main-container" style={{ scale: aBg.scale }} ref={ref} onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>

      <a.h1 style={{ opacity: aTitle.opacity }}>Physics-based Animation<br />w/ React-Spring</a.h1>

      {/*Standard button*/}

      <section className="one">
        <a.img
          src={mark}
          onMouseOver={() => setHover(!hover)}
          onMouseOut={() => setHover(!hover)}
          style={{
            scale: stdButton.scale,
            opacity: stdButton.opacity,
            transform: stdButton.transform
          }} />
      </section>

      {/* Trail */}

      {/*<section className="two">
        {trail.map(({ x, y, height, ...rest }, index) => (
          <a.div
            key={marks[index]}
            style={{
              ...rest,
              transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
            }}
          >
            <a.img src={marks[index]} onClick={() => setUnMark(!unMark)} style={{ height }}/>
          </a.div>
        ))}
      </section>*/}

      {/* Interpolation */}

      {/*<section className="three">
        <a.img className="three-1" src={mark} style={{ transform: properties.xy.interpolate(trans1) }} />
        <a.img className="three-2" src={mark} style={{ transform: properties.xy.interpolate(trans2) }} />
        <a.img className="three-3" src={mark} style={{ transform: properties.xy.interpolate(trans3) }} />
        <a.img className="three-4" src={mark} style={{ transform: properties.xy.interpolate(trans4) }} />
        <a.img className="three-5" src={mark} style={{ transform: properties.xy.interpolate(trans5) }} />
      </section>*/}

      <a.img className="wm" src={wm} onClick={() => setUnMark(!unMark)} style={{ opacity: aLogo.opacity, transform: aLogo.transform }} />
      <a.img className="react-spring" src={reactSpringLogo} onClick={() => setUnMark(!unMark)} style={{ opacity: aLogo.opacity, transform: aLogo.transform }} />

    </a.div>
  );
}

export default App;
