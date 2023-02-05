import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [boxState, setBoxState] = useState(getBoxes('initial'));
  const [order, setOrder] = useState(0);
  const [isAllClicked, setIsAllClicked] = useState(false);

  const noOfBoxes = 7;

  const changeToGreen = (i, j) => {
    let temp = [...boxState];
    const selectedBox = temp.find((item) => item.i === i && item.j === j);
    selectedBox.isClicked = true;
    selectedBox.order = order + 1;
    setOrder(() => order + 1);
    temp.sort((a, b) => (a.order > b.order ? 1 : -1));
    setBoxState(temp);
  };

  function getBoxes(type) {
    const boxesData = [];
    const boxes = [0, 1, 2].map((i) => {
      return (
        <div key={`row row-${i + 1}`} className={`row row-${i + 1}`}>
          {[0, 1, 2].map((j) => {
            if (!(i === 1 && j > 0)) {
              if (type === 'initial') {
                return boxesData.push({ i, j, isClicked: false, order: null });
              }
              return (
                <div
                  onClick={() => changeToGreen(i, j)}
                  key={`row-${i + 1}-col-${j + 1} box`}
                  className={`row-${i + 1}-col-${j + 1} box ${
                    boxState.find(
                      (box) => box.i === i && box.j === j && box.isClicked
                    ) && 'apply-animation-green'
                  }`}></div>
              );
            }
            return undefined;
          })}
        </div>
      );
    });
    if (type === 'initial') {
      return boxesData;
    }
    return boxes;
  }

  useEffect(() => {
    if (order === noOfBoxes) {
      setIsAllClicked(true);
    }
  }, [order]);

  useEffect(() => {
    if (isAllClicked) {
      boxState.forEach((box, index) => {
        setTimeout(() => {
          let temp = [...boxState];
          temp[index].isClicked = false;
          temp[index].order = null;
          setBoxState(temp);
        }, 1000 * (index + 1));
      });
      setOrder(0);
      setIsAllClicked(false);
    }
  }, [isAllClicked, boxState]);

  return (
    <div className='App'>
      <div className='container'>{getBoxes()}</div>
    </div>
  );
}

export default App;
