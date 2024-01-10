import { useCallback, useState } from 'react';
import ScrollToTop from 'react-scroll-to-top';
import { useDispatch, useSelector } from 'react-redux';
import { getBrickSoldAmount } from '../actions/brick';
import { useEffect } from 'react';
import axios from 'axios';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import Image8 from '../assets/img/about/about8.png';
import { getContents, updateContent } from '../actions/content';
import ImageUpload from '../components/ImageUpload';
import EditableParagraph from '../components/EditableParagraph';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const base_URL = `${import.meta.env.VITE_BACKEND_URL}`;
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const [imgSrc, setImageSrc] = useState({
    About1: '',
    About2: '',
    About3: '',
    About4: '',
    About5: '',
    About6: '',
    About7: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrickSoldAmount());
    dispatch(getContents());
  }, [dispatch]);

  const fileList = Object.keys(imgSrc);

  const handleFileChange = async (file, fileName) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target.result;
        const imageData = { [fileName]: base64String };
        setUploadImageLoading(true);
        sendFileData(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendFileData = async (imageData) => {
    try {
      if (Object.keys(imageData).length === 0) {
        console.log('No imageData to send');
        return;
      }
      const response = await axios.post(
        `${base_URL}/api/upload/image`,
        JSON.stringify({ imageData }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Image uploaded', response.data);
      loadImage();
      setUploadImageLoading(false);
    } catch (error) {
      console.error('Image upload failed', error.response || error.message);
    }
  };

  const loadImage = useCallback(() => {
    fileList.forEach((name) => {
      // Changed from map to forEach since you don't use the returned array
      fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/${name}.txt`)
        .then((response) => response.text())
        .then((base64Text) => {
          setImageSrc((prevImgSrc) => ({
            ...prevImgSrc,
            [name]: `${base64Text}`, // Assuming [name] is a unique key
          }));
        })
        .catch(console.error);
    });
  }, [fileList]);

  useEffect(() => {
    loadImage();
  }, [dispatch, loadImage]);

  const { contents } = useSelector((state) => state.content);

  const onBlur = (name, content) => {
    const contentData = {
      name,
      content,
    };
    dispatch(updateContent(contentData));
  };

  return (
    <div className='relative '>
      <Navbar />
      <div className=''>
        <div className='flex flex-wrap bg-gray-300 pt-32 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-44 2xl:px-64 py-12'>
          <div className='w-full lg:w-1/2 lg:px-0 flex items-center justify-center'>
            <ImageUpload
              fileName={fileList[0]}
              previewFile={imgSrc[fileList[0]]}
              onFileSelect={handleFileChange}
              loading={uploadImageLoading}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='w-full lg:w-1/2 flex flex-col mt-12 lg:mt-0 lg:pl-8 xl:pl-12 py-4 md:py-12'>
            <EditableParagraph
              name='AboutText1'
              content={contents.AboutText1 || 'Welcome to Alpha Hospice'}
              onBlur={onBlur}
              className='text-center lg:text-left text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-sky-600 font-montserrat font-bold'
            />
            <EditableParagraph
              name='AboutText2'
              content={
                contents.AboutText2 ||
                'A sanctuary of compassion and care at the heart of Alpha Palliative Care’s mission. Here, we dedicate ourselves to providing comfort and dignity to those facing life’s final journey. embodying our belief in the nobility of easing pain and suffering. As a cornerstone of the alpha Charitable Trust. Alpha Hospice is more than a facility; it’s a commitment to enhancing the quality f life foe those in need. one individual at a time.'
              }
              onBlur={onBlur}
              className='text-lg sm:text-xl md:text-2xl lg:text-lg xl:text-xl 2xl:text-2xl font-raleway text-gray-500 pt-5'
            />
          </div>
        </div>

        <div className='flex flex-wrap px-8 sm:px-16 md:px-24 lg:px-32 xl:px-44 2xl:px-64 py-24 mx-auto relative'>
          <div className='hidden lg:flex bg-gray-100 w-3/4 h-2/3 left-0 bottom-12 z-0 absolute'></div>
          <div className='w-full lg:w-1/2 flex flex-col lg:mt-0 lg:pr-6 xl:pr-12 z-10'>
            <EditableParagraph
              name='AboutText3'
              content={contents.AboutText3 || 'Our Foundation:'}
              onBlur={onBlur}
              className='text-center lg:text-left text-3xl text-sky-700'
            />
            <EditableParagraph
              name='AboutText4'
              content={contents.AboutText4 || 'The Alpha Charitable Trust'}
              onBlur={onBlur}
              className='text-center lg:text-left text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl 2xl:text-6xl text-sky-700 font-montserrat font-normal'
            />
            <EditableParagraph
              name='AboutText5'
              content={
                contents.AboutText5 ||
                'Founded in 2004 by Mr. K. M. Noordeen and Mrs. Thahira Noordeen. The Alpha Charitable Trust is the driving force behind our Hospice. It stands on the principle that alleviating suffering and ensuring quality of life are noble pursuit. Our Trust is propelled by a team of dedicated professionals and volunteers, commited to delivering holistic care, spanning physical, mental, and emotional support. Each initiative, including Alpha Hospice, is a tesament to our unwavering commitment to serve humanity with compassion and dignity.'
              }
              onBlur={onBlur}
              className='text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-xl 2xl:text-2xl font-raleway text-gray-500 pt-5'
            />
          </div>
          <div className='w-full lg:w-1/2 flex flex-wrap mt-12 lg:nt-0 items-center z-10'>
            <div className='w-1/2 h-full lg:h-auto object-fill rounded-lg p-3'>
              <ImageUpload
                fileName={fileList[1]}
                previewFile={imgSrc[fileList[1]]}
                loading={uploadImageLoading}
                onFileSelect={handleFileChange}
              />
            </div>
            <div className='w-1/2 h-full lg:h-auto object-fill rounded-lg p-3'>
              <ImageUpload
                fileName={fileList[2]}
                previewFile={imgSrc[fileList[2]]}
                loading={uploadImageLoading}
                onFileSelect={handleFileChange}
              />
            </div>
          </div>
        </div>

        <div
          className='w-full py-12 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 pt-24 xl:pt-32 mx-auto  relative'
          style={{
            backgroundImage: `url(${Image8})`,
            backgroundSize: '2500px, 900px',
          }}
        >
          <EditableParagraph
            name='AboutText6'
            content={contents.AboutText6 || 'The Hub and spoke model of care'}
            onBlur={onBlur}
            className='w-full lg:w-2/3 text-gray-800  text-center mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-montserrat font-bold z-10'
          />
          <EditableParagraph
            name='AboutText7'
            content={
              contents.AboutText7 ||
              'At Alpha Hospice, we embrace a unique ‘Hub and spoke’ model. designed to extend our reach of palliative care to as many as possible. The hospice service as the central hub, providing intensive symptom control and support, white our Link Centers, the spokers, offer vital ome care services in the community. This innovative approach ensures that comprehensive care is accessible and personalized, meeting patients right where they are. Through this model, we’re able to bring comfort and relief to those in need, ensuring no one is beyond the reach of our care.'
            }
            onBlur={onBlur}
            className='text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-xl 2xl:text-2xl text-center text-gray-700 font-raleway p-5 z-10'
          />
          <div className='flex justify-center mt-12 mx-auto'>
            <ImageUpload
              fileName={fileList[3]}
              previewFile={imgSrc[fileList[3]]}
              onFileSelect={handleFileChange}
              loading={uploadImageLoading}
              className='object-cover lg:w-1/2'
            />
          </div>
        </div>

        <div className='flex flex-wrap justify-center w-full px-8 sm:px-16 lg:px-24 xl:px-40 2xl:px-64 pt-32 py-24 relative'>
          <div className='w-full sm:w-3/4 lg:w-1/2 z-10'>
            <ImageUpload
              fileName={fileList[4]}
              previewFile={imgSrc[fileList[4]]}
              onFileSelect={handleFileChange}
              loading={uploadImageLoading}
              className='w-full h-full object-fill rounded-lg p-3'
            />
          </div>
          <div className='bg-gray-100 w-3/4 h-3/5 right-0 bottom-12 z-0 absolute'></div>
          <div className='w-full lg:w-1/2 flex flex-col mt-12 lg:mt-0 lg:pl-6 xl:pl-12 py-12 z-10'>
            <EditableParagraph
              name='AboutText8'
              content={contents.AboutText8 || 'Our Services:'}
              onBlur={onBlur}
              className='text-center lg:text-left text:2xl text-xl sm:text-2xl md:text-3xl lg:text-lx xl:text-2xl 2xl:text-3xl text-sky-700 lg:py-8'
            />
            <EditableParagraph
              name='AboutText9'
              content={contents.AboutText9 || 'Alpha Hospice and Link Centers'}
              onBlur={onBlur}
              className='text-center lg:text-left text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl 2xl:text-6xl text-sky-700 font-montserrat font-normal'
            />
            <EditableParagraph
              name='AboutText10'
              content={
                contents.AboutText10 ||
                'Alpha Hospice, at the core of our services, offers a haven for symptom control and short-term care, operating 24/7 to address the immediate needs of those in distress. Our hospice is not just a facility; it’s a comforting home for patients to receive comprehensive care, including pain management and emotional support. complementing this, our alpha Link Centers, provide indisoensable home care services. These centers across various communities, form the backbone of our service delivery, ensuring continuous and accessible care. Together, Alpha Hospice and the Link Centers embody our dedication to holistic, community-centric palliative care.'
              }
              onBlur={onBlur}
              className='text-lg sm:text-xl md:text-2xl lg:text-lg xl:text-xl 2xl:text-2xl font-raleway text-gray-500 pt-5'
            />
          </div>
        </div>

        <div className='flex flex-wrap justify-center w-full px-12 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 py-12 relative'>
          <div className='w-full lg:w-1/2 flex flex-col mt-12 lg:mt-0 lg:pr-12 xl:pr-24 z-10'>
            <EditableParagraph
              name='AboutText11'
              content={contents.AboutText11 || 'Our Volunteers:'}
              onBlur={onBlur}
              className='text-center lg:text-left text:2xl text-xl sm:text-2xl md:text-3xl lg:text-lx xl:text-2xl 2xl:text-3xl text-sky-700 lg:py-8'
            />
            <EditableParagraph
              name='AboutText12'
              content={contents.AboutText12 || 'The Heart of Alpha'}
              onBlur={onBlur}
              className='text-center lg:text-left text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-sky-700 font-montserrat font-normal'
            />
            <EditableParagraph
              name='AboutText13'
              content={
                contents.AboutText13 ||
                'Our volunteers are the lifeblood of Alpha Hospice, bringing energy, compassion, and dedicated service to every aspect of our mission. These selfless individuals come from all walks of life, united by a common purpose to alleviate suffering and improve the quality of life for our patients. They contribute in myriad ways, from providing family support and patient care to assisting in daily operations and community outreach. Their commitment and humanitarian spirit not only drive our initiatives forward but also infuse our hospice with warmth and hope. making a profound difference in the lives we touch.'
              }
              onBlur={onBlur}
              className='text-lg sm:text-xl md:text-2xl lg:text-lg xl:text-xl 2xl:text-2xl font-raleway text-gray-500 pt-5'
            />
          </div>
          <div className='w-full lg:w-1/2 flex flex-wrap mt-12 lg:nt-0 items-center z-10'>
            <div className='w-1/2 h-full lg:h-auto relative'>
              <ImageUpload
                fileName={fileList[6]}
                previewFile={imgSrc[fileList[6]]}
                onFileSelect={handleFileChange}
                loading={uploadImageLoading}
                className='w-full h-full object-fill rounded-lg p-3'
              />
            </div>
            <div className='w-1/2 h-full lg:h-auto relative'>
              <ImageUpload
                fileName={fileList[5]}
                previewFile={imgSrc[fileList[5]]}
                onFileSelect={handleFileChange}
                loading={uploadImageLoading}
                className='w-1/2 h-full lg:h-auto object-fill rounded-lg p-3'
              />
            </div>
          </div>
        </div>

        <div className='flex flex-wrap justify-center w-full bg-[#A9D18E] py-24 px-12 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 mx-auto'>
          <div className='w-full lg:w-1/2 flex flex-wrap lg:py-24 xl:py-24 lg:pt-0 z-20'>
            <EditableParagraph
              name='AboutText14'
              content={contents.AboutText14 || 'Join our Mission:'}
              onBlur={onBlur}
              className='w-full text-center lg:text-left text:2xl text-xl sm:text-2xl md:text-3xl lg:text-lx xl:text-2xl 2xl:text-3xl text-white p-2'
            />
            <div className='w-full lg:w-1/2 p-2'>
              <input
                placeholder='First Name'
                className='w-full p-3 border border-gray-100 drop-shadow-sm'
              />
            </div>
            <div className='w-full lg:w-1/2 p-2'>
              <input
                placeholder='Last Name'
                className='w-full p-3 border border-gray-100 drop-shadow-sm'
              />
            </div>
            <div className='w-full p-2'>
              <input
                placeholder='Email ID'
                className='w-full p-3 border border-gray-100 drop-shadow-sm'
              />
            </div>
            <div className='w-full p-2'>
              <input
                placeholder='Mobile No'
                className='w-full p-3 border border-gray-100 drop-shadow-sm'
              />
            </div>

            <div className='w-full lg:w-1/2 p-2'>
              <input
                placeholder='Date of Birth'
                className='w-full p-3 border border-gray-100 drop-shadow-sm'
              />
            </div>

            <div className='w-full lg:w-1/2 p-2'>
              <input
                placeholder='Occupation'
                className='w-full p-3 border border-gray-100 drop-shadow-sm'
              />
            </div>

            <div className='w-full p-2'>
              <button className='w-full py-3 bg-green-700 text-white'>
                I WOULD LIKE TO VOLUNTEER
              </button>
            </div>
          </div>
          <div className='w-full lg:w-1/2 flex flex-col mt-12 lg:mt-0 lg:pl-12 xl:pl-24 py-12 z-10'>
            <EditableParagraph
              name='AboutText15'
              content={contents.AboutText15 || 'Become a volunteer'}
              onBlur={onBlur}
              className='text-white text-center lg:text-left text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-whitefont-montserrat font-normal'
            />
            <EditableParagraph
              name='AboutText16'
              content={
                contents.AboutText16 ||
                'Alpha Hospice welcomes you to join our mission of compassion and care as a volunteer. Your involvement. whether in providing emotional support, assisting with daily operations, or aiding in community outreach, can profoundly impact the lives of those we serve. By volunteering with us, you become an integral part of our journey, bringing hope and comfort so many. Interested in making a difference? Please fill out our volunteer form alongside this section or reach out to us at volunteer@alphapalliativecare.org. Your step towards volunteering is a step towards enriching lives and strengthening our community.'
              }
              onBlur={onBlur}
              className='text-lg sm:text-xl md:text-2xl lg:text-lg xl:text-xl 2xl:text-2xl font-raleway text-gray-800  pt-5'
            />
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop
        className='flex fixed shadow-md shadow-gray-500 justify-center items-center rounded-full z-50 bottom-6 right-6'
        smooth
      />
    </div>
  );
};

export default About;
