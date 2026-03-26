import Image from 'next/image';

type LeadershipCardProps = Readonly<{
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
}>;

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function LeadershipCard({ name, title, bio, imageUrl }: LeadershipCardProps) {
  return (
    <article className="flex gap-4 rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c8937a]">
      {/* PLACEHOLDER: IMAGE - Professional portrait for leadership card, 1:1 aspect */}
      <div className="flex-shrink-0">
        {imageUrl ? (
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[#e0c89344]">
            <Image src={imageUrl} alt={`${name} portrait`} fill className="object-cover" sizes="80px" />
          </div>
        ) : (
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border border-[#e0c89344] bg-[#1d1813]"
            aria-hidden="true"
          >
            <span className="text-lg font-medium text-[#c8a86b]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>
      <div className="grid content-start gap-1.5">
        <h3 className="text-xl font-normal text-[#f2e7cf]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>
          {name}
        </h3>
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#c9ad76]">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-[#b7ac97]">{bio}</p>
      </div>
    </article>
  );
}
