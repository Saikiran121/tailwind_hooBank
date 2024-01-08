import React from "react";
import { bill, apple, google } from "../assets";
import styles, { layout } from "../styles";
const Billing = () => {
  return (
    <section id="product" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img
          src={bill}
          alt="billing"
          className="w-[100%] h-[100%] z-[5] relative"
        />
        <div className="w-[50%] h-[50%] absolute z-[3] -left-1/2 top-0 rounded-full white__gradient"></div>
        <div className="w-[50%] h-[50%] z-[0] -left-1/2 bottom-0 rounded-full absolute pink__gradient"></div>
        <div className="w-[50%] h-[50%] z-[2]  right-0 rounded-full absolute blue__gradient"></div>
      </div>
      <div className={`${layout.sectionInfo}`}>
        <h2 className={`${styles.heading2}`}>
          Easily control your <br className="sm:block hidden" /> billing &
          invoicing.
        </h2>
        <p className="text-[18px] font-normal text-dimWhite max-w-[470px] mt-5">
          Elit enim sed massa etiam. Mauris eu adipiscing ultrices ametodio
          aenean neque. Fusce ipsum orci rhoncus aliporttitor integer platea
          placerat.
        </p>
        <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          <img
            src={apple}
            alt="appleStore"
            className="w-[129px] h-[48px] object-contain mr-6 cursor-pointer "
          />
          <img
            src={google}
            alt="googleStore"
            className="w-[129px] h-[48px] object-contain ml-6 cursor-pointer "
          />
        </div>
      </div>
    </section>
  );
};

export default Billing;
