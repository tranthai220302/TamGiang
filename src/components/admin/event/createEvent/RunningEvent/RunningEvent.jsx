// import React from 'react'
// import { Button } from '@mui/material'
// const RunningEvent = () => {
//     return (
//         <div className=running>
//           <div className=header>
//             <h3>Runing event</h3>
//             <span className={isRunning ? styles.greenBadge : styles.redBadge} />
//           </div>
//           <div className=preview>
//             <div style={{width: '100%', height: '250px'}}>
//               <Image
//                 src={running.image}
//                 layout='fill'
//                 alt='Running'
//                 objectFit='cover'
//               />
//             </div>
//             <div className=content>
//               <div className=name>{running.realTitle}</div>
//               <div className=date>{moment(running.start).format('DD MMMM')}</div>
//             </div>
//           </div>
//           <div className=footer>
//             <div className=toolbar>
//               <div className=toolbarItem>
//                 <div className=toolbarLabel>
//                   <div className={`$toolbarIcon} icon`}>
//                     <Image
//                       src={isRunning ? userBadgePath : peoplePath}
//                       width={24}
//                       height={24}
//                       alt='Check ins'
//                     />
//                   </div>
//                   <div className=toolbarText>{isRunning ? "Check Ins" : "Pre-Checks"}</div>
//                 </div>
//                 <div className=toolbarValue>{runningCheckins}</div>
//               </div>
//               <div className=toolbarItem>
//                 <div className=toolbarLabel>
//                   <div className={`$toolbarIcon} icon`}>
//                     <Image
//                       src={timePath}
//                       width={24}
//                       height={24}
//                       alt='Time'
//                     />
//                   </div>
//                   <div className=toolbarText}>{isRunning ? "Time until End" : "Time until Event"}</div>
//                 </div>
//                 <div className=toolbarValue}>
//                   {
//                     isRunning 
//                     ? remainingTime(running.end, running.end_time)
//                     : remainingTime(running.start, running.start_time)
//                   }
//                 </div>
//               </div>
//             </div>
//             <Button
//               text='Preview event'
//               size={ButtonSizes.SM}
//               colored
//               type={ButtonTypes.Button}
//               onClick={() => showEventInfo(running)}
//             />
//           </div>
//         </div>
//     )
// }

// export default RunningEvent