'use client'

import style from './style.module.scss'

type Props = {};

export default function page({}: Props) {

    const click = () => {
        setTimeout(() => {
            window.open('https://subsquid.deform.cc/testnetnodeapplication/', '_blank');
          }, 1000);
    }

    return (
        <section className={style["worker"]}>
            <a 
                href="https://subsquid.deform.cc/testnetnodeapplication/" 
                onClick={(e)=>{
                        e.preventDefault()
                        click()
                    }
                }
            >Redirecting</a>
        </section>
    )
}
