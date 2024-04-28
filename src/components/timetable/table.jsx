import React from 'react'
import './table.css'
const Table = () => {
const data = [
    {
        Id: 1,
        Subject: 'Meeting',
        StartTime: new Date(2023, 1, 15, 10, 0),
        EndTime: new Date(2023, 1, 15, 12, 30),
    },
];
return (
  <div className="schedule">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Thứ Hai</th>
          <th>Thứ Ba</th>
          <th>Thứ Tư</th>
          <th>Thứ Năm</th>
          <th>Thứ Sáu</th>
          <th>Thứ Bảy</th>
          <th>Chủ nhật</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='time'>9:00 - 10:00</td>
          <td className="event">
            <span className="subject">Văn học</span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td className = 'time'>12:00 - 13:00</td>
          <td></td>
          <td className="event">Lunch Meeting</td>
          <td></td>
          <td></td>
          <td className="event">Team Lunch</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td className = 'time'>16:00 - 17:00</td>
          <td></td>
          <td className="event">Afternoon Run</td>
          <td className="event">Project Review</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td className = 'time'>16:00 - 17:00</td>
          <td></td>
          <td className="event">Afternoon Run</td>
          <td className="event">Project Review</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td className = 'time'>9:00 - 10:00</td>
          <td className="event">Morning Yoga</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td className = 'time'>9:00 - 10:00</td>
          <td className="event">Morning Yoga</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td className = 'time'>9:00 - 10:00</td>
          <td className="event">Morning Yoga</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td className = 'time'>9:00 - 10:00</td>
          <td className="event">Morning Yoga</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td className = 'time'>9:00 - 10:00</td>
          <td className="event">Morning Yoga</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

      </tbody>
    </table>
  </div>
);
}

export default Table