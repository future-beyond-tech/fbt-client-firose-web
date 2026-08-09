type EvidencePlaceholderProps = Readonly<{
  title: string;
  description: string;
}>;

export default function EvidencePlaceholder({ title, description }: EvidencePlaceholderProps) {
  return (
    <article className="grid min-h-40 content-between gap-5 rounded-2xl border border-dashed border-[#e0c89345] bg-[#15120e8f] p-4">
      <div className="grid gap-2">
        <h3 className="text-xl font-normal text-[#f2e7cf]">{title}</h3>
        <p className="text-sm leading-relaxed text-[#b7ac97]">{description}</p>
      </div>
      <p className="w-fit rounded-full border border-[#e0c89335] bg-[#221b136e] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#c9ad76]">
        Awaiting verified business asset
      </p>
    </article>
  );
}
