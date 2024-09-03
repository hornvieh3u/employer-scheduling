import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
// ** Reactstrap Imports
import { Card, CardHeader, CardBody, ButtonGroup, Button } from 'reactstrap';

import { useState } from 'react';
// ** Third Party Components
import SwiperCore, { Thumbs, Navigation } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import '@styles/react/libs/swiper/swiper.scss'

import img1 from '@src/assets/images/form/form1.jpg'
import img2 from '@src/assets/images/form/bg1.jpg'
import img3 from '@src/assets/images/form/form2.png'
import img4 from '@src/assets/images/form/bg2.jpg'

SwiperCore.use([Thumbs, Navigation]);

const InvitationPreview = (props) => {

    const { eventInfo } = props.eventInfo;
    const { eventId } = useParams();
    const [invitationTypeIndex, setInvitationTypeIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    const params = {
        className: 'swiper-gallery',
        spaceBetween: 10,
        navigation: true,
        slidesPerView: 1,
        thumbs: { swiper: thumbsSwiper }
    }

    const paramsThumbs = {
        className: 'gallery-thumbs',
        spaceBetween: 10,
        slidesPerView: 2,
        freeMode: true,
        watchSlidesProgress: true,
        onSwiper: setThumbsSwiper
    }

    return (
        <Card>
            <CardHeader>Invitation Theme</CardHeader>

            <CardBody>
                <div className="swiper-gallery" style={{ backgroundColor: "#22292f" }}>
                    <Swiper {...params}
                        onSlideChange={(slide) => { setInvitationTypeIndex(slide.activeIndex) }}>
                        <SwiperSlide>
                            <img
                                src={img1}
                                alt="swiper 1"
                                className="img-fluid"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={img3}
                                alt="swiper 2"
                                className="img-fluid"
                            />
                        </SwiperSlide>
                    </Swiper>
                    <Swiper {...paramsThumbs}>
                        <SwiperSlide>
                            <img
                                src={img2}
                                alt="swiper 1"
                                className="img-fluid"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={img4}
                                alt="swiper 2"
                                className="img-fluid"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

            </CardBody>
        </Card>
    );
};

export default InvitationPreview;
