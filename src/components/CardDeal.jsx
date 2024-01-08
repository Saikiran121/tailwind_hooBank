import React from 'react'
import styles,{layout} from '../styles';
import Button from '../tools/Button';
import {card} from '../assets';
const CardDeal = () => {
  return (
    <section className={`${layout.section}`}>
      <div className={`${layout.sectionInfo}`}>
        <h2 className={`${styles.heading2}`}>Find a better card <br className='sm:block hidden'/>deal in few easy steps.</h2>
        <p className={`${styles.paragraph} max-w-[470px]`}>Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.</p>
        <Button styles={'mt-6'}/>
      </div>
      <div className={`${layout.sectionImg}`}>
        <img src={card} alt="cardDeal" className='w-[100%] h-[100%]'/>
      </div>
    </section>
  )
}

export default CardDeal;
