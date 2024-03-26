import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

import exampleImage from "../../assets/img/WallofHope/alpha_building_high_res.jpg";
import HeadMetaTags from "../HeadMetaTags";

const NewShareModal = () => {
  const shareUrl = "https://api.alphahospice.org";
  const title = "Alpha Hospice";
  const image =
    "https://www.mckinsey.com/~/media/mckinsey/business%20functions/people%20and%20organizational%20performance/our%20insights/the%20state%20of%20organizations%202023/soo-covermockups-standard-1536x1536-v2.jpg";

  return (
    <div
      className="w-64 absolute inset-0 bg-gray-600 bg-opacity-75 flex flex-wrap justify-center items-center"
      style={{ zIndex: 500 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-h-full w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Share</h3>

        <div className="flex flex-wrap justify-between items-center">
          {/* Below this line, each button + icon combination is wrapped in a div with Tailwind classes */}
          <div className="p-2">
            <FacebookShareButton url={shareUrl} quote={title} image={image}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>

          <div className="p-2">
            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>

          <div className="p-2">
            <TelegramShareButton url={shareUrl} title={title} image={image}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>

          <div className="p-2">
            <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>

          <div className="p-2">
            <LinkedinShareButton
              url={shareUrl}
              windowWidth={750}
              windowHeight={600}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>

          <div className="p-2">
            <PinterestShareButton
              url={String(window.location)}
              media={`${String(window.location)}/${exampleImage}`}
              windowWidth={1000}
              windowHeight={730}
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </div>

          <div className="p-2">
            <EmailShareButton url={shareUrl} subject={title} body="body">
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewShareModal;
