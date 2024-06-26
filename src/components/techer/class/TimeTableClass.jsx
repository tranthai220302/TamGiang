import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../ults/newRequest';
import { tableStyle, thSecondChildStyle, tiet, ts } from '../../../page/sortTimeTable/data';


const TimeTableClass = () => {
  const [timeTable, setTimeTable] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const navigate = useNavigate();

  useEffect(() => {
    generateTimeTable(1);
  }, []);

  const generateTimeTable = (isMorning) => {
    setIsLoading(true);
    newRequest.get(`/class/schedule/${isMorning}`)
      .then((res) => {
        setTimeTable(res.data);
        console.log(res.data)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <div className='container' style={{ padding: "10px 0 40px 0", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{display : 'flex', justifyContent : 'left', width: "100%"}}>
        <button onClick={()=>{generateTimeTable(1)}}>
          Thời khoá biểu buổi sáng
        </button>
        <button onClick={()=>{generateTimeTable(0)}}>
          Thời khoá biểu chiều
        </button>
      </div>
      <table style={{ borderCollapse: 'collapse', border: '1px solid #ddd', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}></th>
            {ts.map((item, index) => (
              <th key={index} style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Thứ {item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tiet.map((day) => (
            <tr key={day}>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontWeight: '600', fontSize: '17px' }}>Tiết {day}</td>
              {ts.map((period) => (
                <td key={`${period}-${day}`} style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                  {timeTable[`${period}-${day}`] && timeTable[`${period}-${day}`].map((lesson, i) => (
                    lesson?.SchoolClass?.id === user.Teacher.SchoolClass?.id &&
                      <div key={i} style={{ padding: '5px', borderRadius: '5px' }}>
                        <div style={{ fontSize: "14px", fontWeight: '600' }}>{lesson.Subject.name}</div>
                        <div style={{ fontSize: "13px", fontWeight: '400' }}>{lesson.Teacher?.User?.name && (lesson.Teacher?.User?.name)}</div>
                      </div> 
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default TimeTableClass;
