import React from 'react'
import Accordion from '../components/Accordion';


export default function accordion() {
    return (
        <>
          <style jsx global>
  {`
      body {
          background: #efe5df;
       }
   `}
</style>
        <div>
            <Accordion/>
        </div>

    </>
    )
}
