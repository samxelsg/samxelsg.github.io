import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import "mapbox-gl/dist/mapbox-gl.css";

const WW2Events = [
  { id: 1, year: 1939, title: "Invasi Polandia", lat: 52.0, lon: 19.0, description: "Jerman menginvasi Polandia, menandai dimulainya Perang Dunia II. Invasi ini menyebabkan Inggris dan Prancis menyatakan perang terhadap Jerman. Serangan cepat, yang dikenal sebagai Blitzkrieg, membuat pertahanan Polandia kewalahan.", image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTqIUtmqYh1eB7WcD9W2O93rMcyDDImsvrP0z27XbC_G1vpF5LB2GXoPIlnje2QDhxMd1x0HTV7fHExcj3Td5r3iByz0zMyM8XQMZsC2w", figure: "Adolf Hitler", figureImage: "https://cdn.britannica.com/58/129958-050-C0EF01A4/Adolf-Hitler-1933.jpg"  },
  { id: 2, year: 1940, title: "Pertempuran Prancis", lat: 48.8, lon: 2.3, description: "Jerman melancarkan serangan cepat ke Prancis melalui Ardennes, melewati Garis Maginot. Paris jatuh, dan Prancis menyerah dalam enam minggu.", image: "https://imgcdn.espos.id/@espos/images/2020/09/hitler.jpg?quality=60", figure: "Charles de Gaulle", figureImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/De_Gaulle-OWI.jpg/1200px-De_Gaulle-OWI.jpg"  },
  { id: 3, year: 1940, title: "Pertempuran Britania", lat: 51.5, lon: -0.1, description: "Luftwaffe Jerman meluncurkan kampanye udara besar-besaran terhadap Inggris, menargetkan lapangan udara dan kota-kota. Angkatan Udara Kerajaan berhasil mempertahankan Inggris, menandai kekalahan besar pertama Jerman.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrEEVvI1gjLQBuvFcnxHv0CWrzsOUfCQBZQ&s", figure: "Winston Churchill", figureImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFrKBLMdSTpHWNGB0pn8UtCYL5DOsOIT_HnQ&s"  },
  { id: 4, year: 1941, title: "Operasi Barbarossa", lat: 55.7, lon: 37.6, description: "Jerman meluncurkan invasi ke Uni Soviet, membuka Front Timur dan menyebabkan beberapa pertempuran paling mematikan dalam perang.", image: "https://asset.kompas.com/crops/g8-sg1sa8u9FvE_oFSj_v1kjaXo=/0x0:780x390/780x390/data/photo/2013/10/29/1618252Tentara-Jerman-Terjebak-di-Lumpur780x390.jpg", figure: "Joseph Stalin", figureImage: "hhttps://cdn.britannica.com/54/60154-050-055103B9/Joseph-Stalin-1950.jpg" },
  { id: 5, year: 1941, title: "Serangan di Pearl Harbor", lat: 21.3, lon: -157.8, description: "Jepang melancarkan serangan mendadak terhadap pangkalan angkatan laut AS di Pearl Harbor, menyebabkan Amerika Serikat secara resmi memasuki Perang Dunia II.", image: "https://cdn.britannica.com/81/71381-050-0042470B/battleship-attack-Pearl-Harbor-Japanese-Hawaii-December-7-1941.jpg", figure: "Franklin D. Roosevelt", figureImage: "https://cdn.britannica.com/06/3806-050-7952A19D/Franklin-D-Roosevelt-1937.jpg" },
  { id: 6, year: 1942, title: "Pertempuran Midway", lat: 28.2, lon: -177.4, description: "Pertempuran laut yang menentukan di mana Angkatan Laut AS mengalahkan armada Jepang, menandai titik balik dalam Perang Pasifik.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4RtJZgGisbuMNRiubPvpQrNzzcYPubOCavw&s", figure: "Chester Nimitz", figureImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcRGKqpTAcOyCoB-ZkjrBz00vTP6QL6yfz_g&s" },
  { id: 7, year: 1942, title: "Pertempuran Stalingrad", lat: 48.7, lon: 44.5, description: "Salah satu pertempuran paling mematikan dalam sejarah, di mana pasukan Soviet menghentikan kemajuan Jerman, menandai titik balik dalam perang.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc7rVJwjr-PmAjLcZXu3bXnCKZAjrSCNiGdA&s", figure: "Georgy Zhukov", figureImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbUKBJJkeEMABeerHXc80N-9X_AgC7YK64vg&s"  },
  { id: 8, year: 1944, title: "D-Day (Pendaratan Normandia)", lat: 49.4, lon: -0.9, description: "Pasukan Sekutu melancarkan invasi amfibi besar-besaran di pantai Normandia, memulai pembebasan Eropa Barat.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRekhOTVKK8PEBiZDVTuH9dM-uoBxdBJ6ZhcA&s", figure: "Dwight D. Eisenhower", figureImage: "https://i0.wp.com/prologue.blogs.archives.gov/wp-content/uploads/sites/9/2022/07/DA-SD-05-00591.jpeg?resize=685%2C1041"  },
  { id: 9, year: 1945, title: "Pertempuran Iwo Jima", lat: 24.8, lon: 141.3, description: "Pertempuran brutal di Pasifik di mana pasukan AS merebut Iwo Jima, membuka jalan bagi invasi ke Jepang.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwaClATXC-C2xGKGKcZ3HRc-r8HQpw_fzolA&s" },
  { id: 10, year: 1945, title: "Pertempuran Berlin", lat: 52.5, lon: 13.4, description: "Serangan besar terakhir di Eropa, di mana pasukan Soviet merebut Berlin, menyebabkan Hitler bunuh diri dan Jerman menyerah.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONBRhGoNBUYu3KgCFoonpv0aaEyGnwTGLkg&s", figure: "Georgy Zhukov", figureImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbUKBJJkeEMABeerHXc80N-9X_AgC7YK64vg&s"  },
  { id: 11, year: 1945, title: "Penjatuhan Bom Hiroshima dan Nagasaki", lat: 34.4, lon: 132.5, description: "AS menjatuhkan bom atom di Hiroshima dan Nagasaki, menyebabkan Jepang menyerah dan mengakhiri Perang Dunia II.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgzLqNWHTCGhQR_DWD-pSbUKpnChUOqzzYXg&s", figure: "Harry S. Truman", figureImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgCkPVsHCbZ0ejCEDsE2AZIMvCEgGpmUJ72Q&s"  }
];

export default function WW2Globe() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [year, setYear] = useState(1939);
  const [globe, setGlobe] = useState(null);

  useEffect(() => {
    if (globe) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
    }
  }, [globe]);

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 text-center font-bold text-xl">
        Peta Interaktif Perang Dunia II
      </header>
      <div className="absolute top-4 left-4 bg-white p-3 rounded shadow-md z-10">
        <label className="font-bold">Tahun: {year}</label>
        <input 
          type="range" 
          min="1939" 
          max="1945" 
          value={year} 
          onChange={(e) => setYear(Number(e.target.value))} 
          className="w-full"
        />
      </div>
      <Globe 
        ref={setGlobe}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        pointsData={WW2Events.filter(event => event.year <= year)}
        pointLat={event => event.lat}
        pointLng={event => event.lon}
        pointLabel={event => `${event.id}. ${event.title} (${event.year})`}
        pointColor={() => "red"}
        pointAltitude={0.2}
        pointRadius={0.5}
        labelsData={WW2Events.filter(event => event.year <= year)}
        labelLat={event => event.lat}
        labelLng={event => event.lon}
        labelText={event => `${event.id}`}
        labelSize={1.5}
        labelColor={() => "white"}
        onPointClick={setSelectedEvent}
        atmosphereColor="lightblue"
      />
      {selectedEvent && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-md animate-fadeIn">
          <h2 className="font-bold">{selectedEvent.id}. {selectedEvent.title} ({selectedEvent.year})</h2>
          <p>{selectedEvent.description}</p>
          <div className="flex gap-4">
            <img src={selectedEvent.image} alt={selectedEvent.title} className="w-1/2 h-40 object-cover mt-2" />
            <div>
              <h3 className="font-semibold">Tokoh Terkait: {selectedEvent.figure}</h3>
              <img src={selectedEvent.figureImage} alt={selectedEvent.figure} className="w-32 h-32 object-cover mt-2" />
            </div>
          </div>
          <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded" onClick={() => setSelectedEvent(null)}>
            Tutup
          </button>
        </div>
      )}
      <footer className="bg-gray-800 text-white p-4 text-center font-bold">
        © 2025 Peta Interaktif Perang Dunia II
      </footer>
    </div>
  );
}
