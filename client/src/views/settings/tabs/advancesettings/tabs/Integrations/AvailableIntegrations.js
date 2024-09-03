import React from 'react';
import { Plus } from 'react-feather';
import { Badge, Card, CardTitle } from 'reactstrap';
const AvailableIntegrations = () => {
  return (
    <div className="d-flex x flex-wrap">
      {list.map((item) => (
        <Card className="w-25 m-1">
          <div className="d-flex justify-content-center p-1">
            <img
              height={100}
              width={100}
              src={item?.image}
              className="d-flex justify-content-center rounded-circle"
            />
          </div>
          <CardTitle className="h1 d-flex justify-content-center mb-0">{item?.title}</CardTitle>
          <div className="col-md-12 col-sm-8 p-1 d-flex text-center">
            <p className=" d-flex justify-content-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis et perspiciatis nihil
              assumenda mollitia excepturi ratione eaque a magni amet incidunt quaerat, tenetur
              sunt, cupiditate sapiente inventore nemo veniam molestias.
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default AvailableIntegrations;

const list = [
  {
    image: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
    title: 'Book',
    descripition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    email: 'tcumes0@ocn.ne.jp',
    gender: 'Male',
    ip_address: '118.66.255.225'
  },
  {
    image: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
    title: 'Book',
    descripition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    email: 'tcanedo1@mysql.com',
    gender: 'Female',
    ip_address: '134.122.125.223'
  },
  {
    image: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
    title: 'Book',
    descripition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    email: 'lchoupin2@latimes.com',
    gender: 'Male',
    ip_address: '179.50.230.127'
  },
  {
    image: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
    title: 'Book',
    descripition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    email: 'dgilyatt3@hp.com',
    gender: 'Male',
    ip_address: '108.71.124.181'
  },
  {
    image: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
    title: 'Book',
    descripition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    email: 'dsign4@apache.org',
    gender: 'Female',
    ip_address: '34.236.255.176'
  },
  {
    image: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
    title: 'Book',
    descripition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    email: 'dketley5@opera.com',
    gender: 'Female',
    ip_address: '51.109.134.21'
  },
  {
    image: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
    title: 'Book',
    descripition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    email: 'lcorona6@ehow.com',
    gender: 'Female',
    ip_address: '231.0.143.106'
  },
  {
    image: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
    title: 'Book',
    descripition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    email: 'aorry7@comcast.net',
    gender: 'Male',
    ip_address: '9.105.17.200'
  },
  {
    image: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
    title: 'Book',
    descripition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    email: 'mrizzello8@pen.io',
    gender: 'Female',
    ip_address: '148.57.213.109'
  },
  {
    image: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
    title: 'Book',
    descripition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    email: 'vsteffan9@pcworld.com',
    gender: 'Male',
    ip_address: '71.109.172.11'
  }
];
