import React from 'react';
import { Image } from '@mui/icons-material';
import moment from 'moment-timezone';
moment.tz.setDefault('Europe/Stockholm');

const BannerContent = () => {
  return (
    <div className="content">
      <div className="title">Hello <span>Thai</span></div>
      <div className="date">
        <span className="dateIcon">
          {/* <Image
            src={datePath}
            width={20}
            height={20}
            loading='eager'
            alt='Date'
            priority
          /> */}
        </span>
        <span className="dateText">{moment().format("DD MMMM")}</span>
      </div>
    </div>
  );
};

export default BannerContent;
