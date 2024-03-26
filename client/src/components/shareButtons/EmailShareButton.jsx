/* eslint-disable react/prop-types */
const EmailShareButton = ({ subject, body, children }) => {
  // URI encode the subject and body to ensure they are properly formatted for a URL.
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const mailtoHref = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;

  return (
    <a href={mailtoHref} style={{ textDecoration: "none" }}>
      {children || "Share via Email"}
    </a>
  );
};

export default EmailShareButton;
