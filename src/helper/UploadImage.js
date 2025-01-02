

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUNDINARY}/image/upload`
const UploadImage = async(image) => {
    const Data = new FormData()
    Data.append("file",image)
    Data.append("upload_preset","hbi4or0r") //upload preset name

    const dataresponce =await fetch(url,{
        method:"POST",
        body:Data
    })
 return dataresponce.json()
      


}

export default UploadImage;