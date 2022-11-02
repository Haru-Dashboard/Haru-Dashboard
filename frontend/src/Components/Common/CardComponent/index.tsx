import React from 'react';
import './CardComponent.css';

//Basic use
export type CardInputs = {
  cardContent: JSX.Element;
  cardWidth: number;
  cardHeight: number;
  cardWidthUnit: string;
  cardHeightUnit: string;
};
//Defalut Size Version, need to make it as overload
export type CardInputsDefalut = {
  cardContent: JSX.Element;
};

//CardComponent Base
export default function CardComponent({
  cardContent, //<div> ......all kinds of elements here......</div>
  cardWidth, //width
  cardWidthUnit, //px, %,rem
  cardHeight, //height
  cardHeightUnit, //px % rem
}: CardInputs) {
  return (
    <div
      className="card-component cardcomponent-card"
      style={{
        width: cardWidth + '' + cardWidthUnit,
        height: cardHeight + '' + cardHeightUnit,
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
