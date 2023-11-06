// import React, { useState } from 'react';

// function InputNumber() {
//   const [childseat, setChildseat] = useState(0);

//   const handleChange = (event) => {
//     setChildseat(parseInt(event.target.value));
//   };

//   return (
//     <div className="col-5 d-flex d-flex align-items-center justify-content-around">
//       <span className="me-3">兒童座椅</span>
//       <button className='btn btn-outline-secondary fs-5 px-3 py-0' onClick={() => setChildseat(childseat - 1)}>-</button>
//       <input type="number" style={{ width: "20%" }} id='childseat' name='childseat' className='mx-2 text-center' min={0} placeholder='0' value={childseat} onChange={handleChange} />
//       <button className='btn btn-outline-secondary fs-5' onClick={() => setChildseat(childseat + 1)} style={{ padding: "0 13px" }}>+</button>
//     </div>
//   );
// }

// export default InputNumber;

import React, { useState, useRef } from 'react';

function InputNumber() {
  const [childseat, setChildseat] = useState(0);
  const inputRef = useRef(null);

  const handleIncrement = () => {
    setChildseat(prevCount => prevCount + 1);
    inputRef.current.value = childseat + 1;
  };

  const handleDecrement = () => {
    setChildseat(prevCount => prevCount - 1);
    inputRef.current.value = childseat - 1;
  };

  return (
    <div className="col-5 d-flex d-flex align-items-center justify-content-around">
      <span className="me-3">兒童座椅</span>
      <button className='btn btn-outline-secondary fs-5 px-3 py-0' onClick={handleDecrement}>-</button>
      <input type="number" style={{ width: "20%" }} id='childseat' name='childseat' className='mx-2 text-center' min={0} placeholder='0' value={childseat} ref={inputRef} readOnly />
      <button className='btn btn-outline-secondary fs-5' onClick={handleIncrement} style={{ padding: "0 13px" }}>+</button>
    </div>
  );
}

export default InputNumber;
