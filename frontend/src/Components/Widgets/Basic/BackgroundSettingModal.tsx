import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';

const BackgroundSettingModal = ({ show, handleClose }: any) => {
  const imgs = [
    'Sunset.png',
    'Whale.jpeg',
    'Forest.jpeg',
    'Night.jpeg',
    'City.jpeg',
  ];

  const [clickedImg, setClickedImg] = useState('Sunset.png');

  return (
    <div>
      <Modal show={show} onHide={handleClose} className="w-100 h-100">
        <Modal.Header closeButton>
          <Modal.Title>
            <SmallTitle title="Background" color="black" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="w-100 h-100 container">
          <div className="row">
            {imgs.map((img: string) => {
              return (
                <div className="w-40 col-6">
                  <img
                    src={`../img/${img}`}
                    alt={`${img}`}
                    className="w-100 m-1 hover"
                    style={{
                      opacity: `${clickedImg === img ? '0.5' : '1'}`,
                    }}
                    onClick={(e) => setClickedImg(img)}
                  />
                  <p className="text-center">{img.split('.')[0]}</p>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" size="sm">
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BackgroundSettingModal;
