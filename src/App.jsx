import styled from "styled-components";
import Bottomsheet from "./Bottomsheet";

const App = () => {
  // const handleClick = (e) => {
  //   console.log(e.target.getBoundingClientRect());
  // };

  return (
    <Parent>
      <Bottomsheet />
      {/* <Child onClick={handleClick}></Child> */}
    </Parent>
  );
};

const Parent = styled.div`
  /* position: relative;
  width: 100vw;
  height: 100vh; */
`;

const Child = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: blue;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default App;
