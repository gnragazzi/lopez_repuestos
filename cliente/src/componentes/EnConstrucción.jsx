/* eslint-disable react/prop-types */
import { GiBarrier } from "react-icons/gi";
const EnConstrucción = ({ titulo }) => {
  return (
    <div>
      <h1>{titulo}</h1>
      <p>
        <GiBarrier className="en_construcción" />
        En Construcción...
        <GiBarrier className="en_construcción" />
      </p>
    </div>
  );
};

export default EnConstrucción;
