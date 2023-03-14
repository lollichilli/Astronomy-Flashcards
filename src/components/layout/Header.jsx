import React, { Component } from "react";
import cards from "../../../server/card";
import "./Header.css"

const Header = () => {
  return (
    <div className="header">
      <h2>Who wants to be a millionaire?</h2>
      <h3>Test how knowledgeable you are about astronomy!</h3>
      <h4 className="info">{`There are ${cards.length} cards in total`}</h4>    
    </div>
  )
};

export default Header;

