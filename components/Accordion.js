import {useState, useRef, useEffect}from 'react';
import styles from '../styles/Accordion.module.scss';


export default function Accordion() {
     const [selected, setSelected ]= useState(0)

    const toggle = (index) => {
        if (selected === index) {
            return setSelected(null)
        }
        setSelected(index);
    }
    return (
        <div className={styles.accordianContainer}> 
        <div className={styles.accordian}>
            {data.map((item, index)=> (  
                <div className={styles.item} key={index}>
                    <div className={styles.title} onClick={() => toggle(index)}>
                        <h2>{item.year}</h2>
                        {/* <span>{selected === index ? '-' : '+'}</span> */}
                    </div>
                    <div className={
                        selected === index ? `${styles.content} ${styles.show}` : `${styles.content}`
                    }>{item.answer}</div>
                </div>
            ))}
            
        </div>
        </div>
    )
}


const data = [
    {
       year: '2021',
       answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        year: '2020',
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        year: '2019',
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        year: '2018',
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]