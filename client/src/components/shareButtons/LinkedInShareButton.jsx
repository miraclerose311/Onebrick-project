import { LinkedinIcon } from "react-share";
import shareimage from "../../assets/img/WallofHope/alpha_building_high_res.jpg";

const LinkedInShareButton = () => {
  const shareOnLinkedIn = () => {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareimage)}`;
    window.open(linkedInShareUrl, "_blank", "width=600,height=600");
  };

  return (
    <button onClick={shareOnLinkedIn} className="flex items-center">
      <LinkedinIcon round size={24} />
    </button>
  );
};

export default LinkedInShareButton;
