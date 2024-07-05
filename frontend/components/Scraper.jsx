import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {getScrapeData} from '../services'

const Scraper = () => {
  const [link, setLink] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isButtonVisible, setButtonVisible] = useState(true);

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     console.log(acceptedFiles);
  //     if (acceptedFiles.length > 0) {
  //       const droppedLink = acceptedFiles;
  //       setLink(droppedLink);
  //     }
  //   },
  // });

  const handleInputChange = (e) => {
    setLink(e.target.value);
  };

  const handleButtonClick = async () => {
    const response = await getScrapeData(link);
    setHtmlContent(response)
    setButtonVisible(false);
  };
  const modifyHtmlContent = (htmlContent) => {
    // Replace <pre> with <p>
    const modifiedHtml = htmlContent.replace(/<pre/g, '<p').replace(/<\/pre>/g, '</p>');
    return modifiedHtml;
  };

  return (
    <div className='position: sticky  mx-3 my-3 rounded bg-[#2c3e50]'>
      {isButtonVisible ? (
        <>
          {/* <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a link here, or click to select a link</p>
          </div> */}
          <textarea 
              rows="1"
              placeholder={`Enter a Link`} 
              value={link} 
              style={{ resize: "none" }}
              onChange={handleInputChange} 
              className=" position: center text-black w-3/4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)]  hover:shadow transition duration-200 bg-white mt-5 mx-2 "
              >
            </textarea>
          <button onClick={handleButtonClick} className='transition duration-500 transform hover:-translate-y-1 hover:bg-indigo-900 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-1 cursor-pointer'
          >Submit</button>
        </>
      ) : (
      <div>
        <div className='lg:col-span-1  mt-1 mx-3 text-white'
          dangerouslySetInnerHTML={{ __html: modifyHtmlContent(htmlContent) }}
          style={{ fontSize: '18px' }}
        > 
        </div> 
        <div >
        <textarea 
              rows="1"
              placeholder={`Enter a Link`} 
              value={link} 
              style={{ resize: "none" }}
              onChange={handleInputChange} 
              className=" position: center text-black w-3/4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)]  hover:shadow transition duration-200 bg-white mt-2 mx-5"
              >
            </textarea>
          
          <button onClick={handleButtonClick} className='transition duration-500 transform hover:-translate-y-1 hover:bg-indigo-900 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-1 my-2 cursor-pointer'
          >Submit</button>
        </div> 
        </div>  
      )}
    </div>
  );
};

const dropzoneStyle = {
  width: '100%',
  height: '80px',
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  cursor: 'pointer',
};

export default Scraper;
