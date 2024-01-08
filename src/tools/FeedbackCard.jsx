import React from "react";
import { quotes } from "../assets";
import styles, { layout } from "../styles";
const FeedbackCard = ({ img, content, name, title }) => {
  return (
    <div className="flex flex-col justify-around rounded-[20px] max-w-[370px] h-[395px] feedback-card my-5 md:mr-8 sm:mr-5 mr-0">
      <img src={quotes} alt="quotes" className="w-[43px] h-auto m-4" />
      <p className={`${styles.paragraph} m-4 max-w-[300px] text-white font-normal`}>{content}</p>
      <div className="flex justify-start items-center ml-10 mt-5">
        <div className="w-[48px] h-[48px] object-contain rounded-full">
          <img src={img} alt="profile" className="w-full" />
        </div>
        <div className="ml-5 leading-[23px]">
          <h5 className='text-[20px]'>{name}</h5>
          <p className="text-[16px] text-dimWhite">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
