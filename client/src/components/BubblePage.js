import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getColors } from "../actions/colors";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const dispatch = useDispatch();
  const colorList = useSelector(state => state.colorsReducer.colorList);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch])


  return (
    <>
      <ColorList />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
