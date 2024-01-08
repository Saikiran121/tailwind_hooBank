import React from 'react'
import styles from '../styles';
import Button from '../tools/Button';
const CTA = () => {
  return (
    <section className={`rounded-[20px] ${styles.flexCenter} ${styles.marginY} ${styles.padding} bg-black-gradient-2 box-shadow sm:flex-row flex-col`}>
      <div className={`flex-1 flex flex-col`}>
        <h2 className={`${styles.heading2}`}>
        Let’s try our service now!
        </h2>
        <p className={`${styles.paragraph} max-w-[445px] mt-5`}>Everything you need to accept card payments and grow your business anywhere on the planet.</p>
      </div>
      <Button styles={'sm:mt-0 mt-10'}/>
    </section>
  )
}

export default CTA;
