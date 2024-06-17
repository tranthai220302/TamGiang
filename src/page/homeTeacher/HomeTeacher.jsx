import React, { useState, useEffect } from 'react';
import newRequest from '../../ults/newRequest';
import { useNavigate } from 'react-router-dom';
import { tableStyle, thSecondChildStyle, tiet, ts } from '../sortTimeTable/data';

const HomeTeacher = () => {
  const [timeTable, setTimeTable] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const navigate = useNavigate();

  useEffect(() => {
    generateTimeTable(1);
  }, []);

  const generateTimeTable = (isMorning) => {
    setIsLoading(true);
    newRequest.get(`/teacher/schedule?isMorning=${isMorning}`)
      .then((res) => {
        setTimeTable(res.data);
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
            {tiet.map((item, index) => (
              <th key={index} style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Tiết {item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ts.map((day) => (
            <tr key={day}>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontWeight: '600', fontSize: '17px' }}>Thứ {day}</td>
              {tiet.map((period) => (
                <td key={`${day}-${period}`} style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                  {timeTable[`${day}-${period}`] && timeTable[`${day}-${period}`].map((lesson, i) => (
                    lesson.Teacher.User.name === user.name ?
                      <div key={i} style={{ backgroundColor: '#1eb2a6', padding: '5px', borderRadius: '5px' }}>
                        <div style={{ fontSize: "14px", fontWeight: '600' }}>{lesson.SchoolClass.name}</div>
                        <div style={{ fontSize: "13px", fontWeight: '400' }}>({lesson.Subject.name})</div>
                      </div> :
                      <div key={i} style={{ backgroundColor: '#1eb2a6', padding: '5px', borderRadius: '5px' }}></div>
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

export default HomeTeacher;
