import React from "react";
import Chips from "react-chips";
import { useProfileGets } from "../../redux/Slice/profileSlice";
// import "./CommonChip.scss"

const CommonChip = (props) => {
  const profileGets = useProfileGets();
  const { chips = [], onChange, keys = [13, 32], placeholder } = props;


  return (
    <div className="hey bg-chatlook-grayLight relative text-chatlook-gray">
      {/* {chips.length == 0 && (<label htmlFor="asd" className="absolute z-10 text-sm text-gray-400 ml-4 mt-3">{placeholder}</label>)
      } */}
      <Chips
        value={chips}
        onChange={onChange}
        fromSuggestionsOnly={false}
        createChipKeys={keys}
        className="chipss"
      />
    </div>
  );
};

export default CommonChip;
