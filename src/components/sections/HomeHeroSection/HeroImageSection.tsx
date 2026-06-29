'use client';


export default function HeroImageSection() {
  return (
    <div className="flex w-full items-center justify-center px-4 md:px-0">
      <div className="relative mx-auto w-full max-w-[1280px]">
        <img
          src="/images/hero-img.png"
          alt="Capitalmind Wealth platform dashboard showing investment strategies and portfolio statistics"
          width={1034}
          height={1042}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none h-auto w-full select-none object-contain"
        />
      </div>
    </div>
  );
}
