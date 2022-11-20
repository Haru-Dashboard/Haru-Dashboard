import React from 'react';
import './CardComponent.css';

//Basic use
export type CardInputs = {
  cardContent: JSX.Element;
  cardWidth: string;
  cardHeight: string;
};
//Defalut Size Version, need to make it as overload
export type CardInputsDefalut = {
  cardContent: JSX.Element;
};

//CardComponent Base
export default function CardComponent({
  cardContent, //<div> ......all kinds of elements here......</div>
  cardWidth, //width+ /px, %,rem
  cardHeight, //height+/px, %,rem
}: CardInputs) {
  return (
    <div
      className="card-component cardcomponent-card"
      style={{
        width: cardWidth,
        height: cardHeight,
      }}>
      {cardContent}
    </div>
  );
}
//CardComponent Default Size Version
export function CardComponentDefault({ cardContent }: CardInputsDefalut) {
  return (
    <div className="card-component-defult cardcomponent-card">
      {cardContent}
    </div>
  );
}
