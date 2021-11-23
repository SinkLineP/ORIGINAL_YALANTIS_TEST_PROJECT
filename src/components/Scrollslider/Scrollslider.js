import React, { useEffect, useRef, useState } from 'react';

const Scrollslider = (props) => {
  let ref = useRef();

  const [state, setState] = useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });

  const onMouseMove = (e) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      return;
    }
    e.preventDefault();

    const { clientX, scrollX, isScrolling } = state;

    if (isScrolling) {
      ref.current.scrollLeft = scrollX - e.clientX + clientX;
      let sX = scrollX - e.clientX + clientX;
      let cX = e.clientX;
      setState({
        ...state,
        scrollX: sX,
        clientX: cX,
      });
    }
  };

  const onMouseUp = (e) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      return;
    }
    e.preventDefault();
    ref.current.style.cursor = 'default';
    setState({
      ...state,
      isScrolling: false,
    });
  };

  const onMouseDown = (e) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      return;
    }
    e.preventDefault();
    // console.log(ref.current);
    // ref.current.class.remove = 'cursor-hover';
    ref.current.style.cursor = 'grabbing';
    setState({
      ...state,
      isScrolling: true,
      clientX: e.clientX,
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  });

  return (
    <div
      ref={ref}
      className={props._class}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {props.children}
    </div>
  );
};

export default Scrollslider;
