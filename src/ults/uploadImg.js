import axios from "axios";

const uploadImg= async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "echr8vz9");

  try {
    const res = await axios.post('https://api.cloudinary.com/v1_1/dopoie6jm/image/upload', data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};
export default uploadImg;