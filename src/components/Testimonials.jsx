import React from "react";
import styles, { layout } from "../styles";
import { feedback } from "../constants";
import FeedbackCard from "../tools/FeedbackCard";
const Clients = () => {
  return (
    <section
      id="clients"
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
    >
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient" />
      <div
        className={`flex md:flex-row flex-col justify-between items-center w-full relative sm:mb-10 mb-6`}
      >
        <h1 className={`${styles.heading2}`}>
          What people are <br className="sm:block hidden" /> saying about us
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] text-left w-full`}>
          Everything you need to accept card payments and grow your business
          anywhere on the planet.
        </p>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container z-[1]">
        {feedback.map((item, index) => (
          <FeedbackCard key={item.id} {...item} index={index} />
        ))}
      </div>
      {/* <div className='w-[50%] h-[50%] z-[2] right-0 absolute white__gradient rounded-full'/> */}
    </section>
  );
};

export default Clients;
