import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [noOfBoxesClicked, setNoOfBoxesClicked] = useState([]);
  const noOfBoxes = 7;

  const changeToGreen = (e) => {
    if (
      !e.target.classList.contains('apply-animation-green') &&
      noOfBoxesClicked.length < noOfBoxes
    ) {
      e.target.classList.add('apply-animation-green');
      setNoOfBoxesClicked(() => [...noOfBoxesClicked, e.target]);
    }
  };

  const removeGreen = () => {
    if (noOfBoxesClicked.length === noOfBoxes) {
      for (let i = 0; i < noOfBoxesClicked.length; i++) {
        let box = noOfBoxesClicked[i];
        setTimeout(() => {
          box.classList.remove('apply-animation-green');
        }, i * 1000);
      }
    }
    setNoOfBoxesClicked([]);
  };

  useEffect(() => {
    if (noOfBoxesClicked.length === noOfBoxes) {
      setTimeout(() => {
        removeGreen();
      }, 1500);
    }
  });

  function getBoxes() {
    const boxes = [0, 1, 2].map((i) => {
      return (
        <div key={`row row-${i + 1}`} className={`row row-${i + 1}`}>
          {[0, 1, 2].map((j) => {
            if (!(i === 1 && j > 0)) {
              return (
                <div
                  onClick={changeToGreen}
                  key={`row-${i + 1}-col-${j + 1} box`}
                  className={`row-${i + 1}-col-${j + 1} box`}></div>
              );
            }
            return undefined;
          })}
        </div>
      );
    });
    return boxes;
  }

  return (
    <div className='App'>
      <div className='container'>{getBoxes()}</div>
    </div>
  );
}

export default App;
