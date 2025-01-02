const imagebase64 =async(image)=>{
    const reader = new FileReader();
    reader.readAsDataURL(image);
    const data = await new Promise((resolve, reject) => {
        reader.onloadend = () => {
            resolve(reader.result)
        };
        reader.onerror = reject;
    });
    return data;

}
export default imagebase64;