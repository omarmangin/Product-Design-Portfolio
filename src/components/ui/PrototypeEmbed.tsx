interface PrototypeEmbedProps {
  embedUrl?: string;
  title?: string;
  caption?: string;
}

export function PrototypeEmbed({
  embedUrl,
  title,
  caption,
}: PrototypeEmbedProps) {
  if (!embedUrl) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-[896px] flex-col justify-start gap-[16px] rounded-[24px] bg-white p-[24px] text-[#212529] shadow-[0px_2px_6px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col justify-start gap-[4px]">
        <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
          {title || "Interactive prototype"}
        </h3>
        {caption && (
          <p className="font-sans text-[14px] leading-[20px] text-[#495057]">
            {caption}
          </p>
        )}
      </div>
      <div className="aspect-video w-full overflow-hidden rounded-[16px] border border-black/15">
        <iframe
          src={embedUrl}
          title={title || "Interactive prototype"}
          className="h-full w-full"
          allowFullScreen
        />
      </div>
    </div>
  );
}
