const images = [
  "/assets/aig-logo-1.png",
  "/assets/logo-mg-white.png",
  "/assets/Lincoln-Financial-Logo.png",
  "/assets/aig-black-and-white.png",
  "/assets/hsbc.png",
];

export default function VerticalCarousel() {
  return (
    <div className="h-full w-[120px] overflow-hidden">
      <div className="flex flex-col gap-4 animate-scroll">
        {[...images, ...images].map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="w-full h-26 object-cover rounded-xl shadow-lg transparent"
          />
        ))}
      </div>
    </div>
  );
}
