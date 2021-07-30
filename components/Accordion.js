import {useState, useRef, useEffect}from 'react';
import styles from '../styles/Accordion.module.scss';
import { motion } from "framer-motion";


const banner = {
    animate: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.1,
      },
    },
  };
  
  const letterAni = {
    initial: { y: 220 },
    animate: {
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1.1,
      },
    },
  };
  const AnimatedYearTitle = ({ title, disabled }) => {
      // console.log(title); these are strings
    return (
    <motion.div
      className='row-title'
      variants={disabled ? null : banner}
      initial='initial'
      animate='animate'>
      {[...title].map((letter,i) => (
        <motion.span
        key={i}
          className='row-letter'
          variants={disabled ? null : letterAni}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  )};
  const Projects = ({projects}) => {
      //console.log(projects)
      const project = projects.map((project, index) => {
          return (
              <div key={index} className={styles.projectLinkContainer}>
            <p className={styles.projectLink}><span className={styles.helNueCon}>{project.month}</span>  <span>{project.projectName}</span> </p>
            </div>
          )
    
      });
      return (
          <div>
              {project}
          </div>
      )

  }

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
        <motion.div className={styles.accordian}>
            {data.map((item, index)=> {

                //item[index].projects.map((i,x) => console.log(i))

                return (
                <div className={styles.item} key={index}>
                    <div className={styles.title} onClick={() => toggle(index)}>
                        {/* <h2>{item.year}</h2> */}
                        {/* <span>{selected === index ? '-' : '+'}</span> */}
                        <AnimatedYearTitle title={item.year}/>
                    </div>
                    <div className={
                        selected === index ? `${styles.content} ${styles.show}` : `${styles.content}`
                    }>
                        <Projects projects={item.projects}/>
                    </div>
                </div>
                 )
            })}
           
        </motion.div>
        </div>
    )
}


const data = [
    {
       year: '2021',
       projects: [{projectName: 'glasses project', month: 'febuary2021'}, {projectName: 'glasses project', month: 'febuary2021-2'}]
    },
    {
        year: '2020',
        projects: [{projectName: 'glasses project', month: 'febuary2020'}, {projectName: 'glasses project', month: 'febuary2020-2'}]
    },
    {
        year: '2019',
        projects: [{projectName: 'glasses project', month: 'febuary2019'}, {projectName: 'glasses project', month: 'febuary2019-2'}]
    },
    {
        year: '2018',
        projects: [{projectName: 'glasses project', month: 'febuary2018'}, {projectName: 'glasses project', month: 'febuary2018-2'}]
    }
]

/*
 {/* {.projects.map((project) => {
                        <>
                           {project.projectName}
                        </> */
