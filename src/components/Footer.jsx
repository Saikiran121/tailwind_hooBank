import React from 'react'
import { footerLinks,socialMedia } from '../constants';
import styles,{layout} from '../styles';
import { logo } from '../assets';
const Footer = () => {
  return (
    <footer className={`${styles.flexCenter} ${styles.paddingY} flex-col `}>
      <div className='flex justify-start md:flex-row flex-col mb-8 w-full'>
        <div className='flex-1 flex flex-col justify-start mr-10'>
          <img src={logo} alt="footer-logo" className='w-[184px] h-[52px] object-contain'/>
          <p className={`${styles.paragraph} max-w-[312px] mt-4`}>A new way to make the payments easy, reliable and secure.</p>
        </div>
        <div className='flex-1 w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10'>
          {footerLinks.map((footerLink,index)=>(
            <div key={footerLink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
              <h4 className='font-medium text-[18px] text-white leading-[27px]'>{footerLink.title}</h4>
              <ul className='list-none mt-4'>
                {footerLink.links.map((link,index)=>(
                  <li key={link.name} className={`font-normal text-dimWhite text-[16px] hover:text-secondary ${index===footerLink.links.length-1 ? 'mb-0' : 'mb-2'}`}><a href={link.link}>{link.name}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={`w-full flex md:flex-row flex-col items-center justify-between border-t-[1px] border-[#3F3E45] pt-4`}>
        <p className='font-normal text-center text-dimWhite text-[18px]'>Copyright Ⓒ 2024 HooBank. All Rights Reserved.</p>
        <div className='flex flex-row md:mt-0 mt-6'>
          {socialMedia.map((media,index)=>(
            <img key={media.id} src={media.icon} alt={media.id} className={`w-[20px] h-[20px] object-contain cursor-pointer ${index===socialMedia.length-1 ? 'mr-0' : 'mr-6'} `} onClick={()=>(window.open(media.link))}/>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer;
