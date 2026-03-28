type SocialLinksProps = {
  instagramUrl: string;
};

export default function SocialLinks({ instagramUrl }: Readonly<SocialLinksProps>) {
  return (
    <div className="social-links">
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-link"
        aria-label="Follow AR Perfumes on Instagram"
      >
        Follow on Instagram
      </a>
    </div>
  );
}
