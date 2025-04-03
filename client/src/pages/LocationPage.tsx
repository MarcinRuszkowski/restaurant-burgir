const locations = [
  {
    city: "KATOWICE",
    address: "Ul. Katowicka 111",
    postalCode: "40-500",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d187019.9495268883!2d18.84283284536604!3d50.2139805736094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce2336a1ccd1%3A0xb9af2a350559fabb!2sKatowice!5e1!3m2!1spl!2spl!4v1743677791591!5m2!1spl!2spl",
  },
  {
    city: "KRAKÓW",
    address: "Ul. Krakowska 222",
    postalCode: "31-400",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d375348.32024522964!2d19.67447387276507!3d50.04687227682794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471644c0354e18d1%3A0xb46bb6b576478abf!2zS3Jha8Ozdw!5e1!3m2!1spl!2spl!4v1743676585251!5m2!1spl!2spl",
  },
  {
    city: "GDAŃSK",
    address: "Ul. Gdańska 333",
    postalCode: "80-000",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d170007.87899659944!2d18.75022605!3d54.428927949999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd731c14d4fa6f%3A0x9bb9fbf163b7be8d!2zR2RhxYRzaw!5e1!3m2!1spl!2spl!4v1743676641498!5m2!1spl!2spl",
  },
];

export const LocationPage = () => {
  return (
    <div className="space-y-12 p-6">
      <h1 className="text-4xl text-center font-bold">
        ZNAJDUJEMY SIĘ W TYCH MIASTACH
      </h1>

      {locations.map((location, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center gap-6 "
        >
          <iframe
            className="w-[750px] h-[300px] rounded-xl shadow-lg"
            title={`Mapa ${location.city}`}
            src={location.mapSrc}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="text-left">
            <h3 className="text-3xl font-semibold">{location.city}</h3>
            <div className="mt-2 text-lg">
              <span className="block">{location.address}</span>
              <span className="block">{location.postalCode}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
