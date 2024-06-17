import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { Paper, Rating, TextareaAutosize } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import newRequest from '../../../../ults/newRequest';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import uploadImg from '../../../../ults/uploadImg';


dayjs.extend(customParseFormat);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: "90%",
  overflow: 'auto'
};

export default function ModalCreate({ openModal, setOpenModal, getEvents }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState({
    name: '',
    start_date: null,
    end_date: null,
    start_time: '',
    end_time: '',
    desc: '',
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        imagesArray.push(e.target.result);
        if (imagesArray.length === files.length) {
          setSelectedImages(imagesArray);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: dayjs(value).format('YYYY-MM-DD')
    }));
  };

  const createEvent = async() => {
    setIsLoading(true)
    let img = []
      for(let i = 0 ; i < selectedImages.length; i++){
        const imgItem = await uploadImg(selectedImages[i]);
        img.push(imgItem);
    }
    newRequest.post('/event/create', {
      name: data.name,
      start_time: data.start_time,
      end_time: data.start_time,
      start_date : data.start_date,
      end_date : data.end_date,
      desc: data.desc,
      img : img
    }).then((res) => {
      getEvents();
      setOpenModal(false);
      setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false)
      console.log(error);
    })
  }
  return (
    <div>
      <Modal
        keepMounted
        open={openModal}
        onClose={() => { setOpenModal(false) }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >

        <Box sx={style}>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 , height : "100%"}}
            open={isLoading}

          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={2}>
              <TextField
                id="outlined-helperText"
                label="Tên sự kiện"
                size='small'
                name='name'
                onChange={handleChange}
              />
              <Stack direction="row" spacing={1} alignItems="center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Ngày bắt đầu"
                    sx={{ width: "100%" }}
                    value={data.start_date}
                    onChange={(newValue) => handleDateChange('start_date', newValue)}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Ngày kết thúc"
                    sx={{ width: "100%" }}
                    value={data.end_date}
                    onChange={(newValue) => handleDateChange('end_date', newValue)}
                  />
                </LocalizationProvider>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  id="outlined-helperText"
                  label="Thời gian bắt đầu"
                  size='small'
                  sx={{ width: "100%" }}
                  name='start_time'
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-helperText"
                  label="Thời gian kết thúc"
                  size='small'
                  sx={{ width: "100%" }}
                  name='end_time'
                  onChange={handleChange}
                />
              </Stack>
              <TextField
                id="outlined-multiline-static"
                label="Nội dung"
                multiline
                rows={4}
                name='desc'
                onChange={handleChange}
              />
              <Paper sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 30px', justifyContent: 'flex-start' }}>
                <Stack direction={'column'} width={'100%'} spacing={2} borderBottom='1px solid #e7e7e7' paddingBottom={'20px'}>
                  <Stack border={'2px dashed #e7e7e7'} display={'flex'} flexDirection={'column'} alignItems={'center'} spacing={3} padding={'20px 0'}>
                    <span>Kéo và thả hoặc</span>
                    <label htmlFor="1" style={{ width: '30%', display: 'flex', alignContent: 'center' }} >
                      <div style={{ textAlign: 'center', padding: '5px 0', border: '1px solid #0077cc', width: '100%', cursor: 'pointer', borderRadius: '5px' }}>Chọn ảnh</div>
                      <input
                        id="1"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <span className='titleH2'>jpg/jpeg hoặc png, tối đa 47MB mỗi file</span>
                  </Stack>
                </Stack>
                <Stack direction={'column'} width={'100%'} spacing={1} marginTop={'20px'}>
                  <span style={{ fontWeight: '600' }}>Danh sách ảnh của quý vị :</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {selectedImages.map((image, index) => (
                      <div key={index} style={{ margin: '10px', textAlign: 'center', position: 'relative' }}>
                        <img src={image} alt={`Image ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          style={{ position: 'absolute', top: '-50px', right: '-40%', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                          <BackspaceIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                </Stack>
              </Paper>
              <Button variant='contained' onClick={() => { createEvent() }}>Tạo sự kiện</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
