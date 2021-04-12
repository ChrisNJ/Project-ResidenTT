import React, { useEffect, useState, useRef, componentDidMount } from "react";

// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   InfoWindow,
//   MarkerClusterer,
// } from "@react-google-maps/api";
// require("dotenv").config();

// const containerStyle = {
//   width: "100%",
//   height: "60vh",
// };

// const Map = () => {
//   const [loading, setLoading] = useState(false);
//   const [crimeData, setCrimeData] = useState([]);
//   const [center, setCenter] = useState({
//     lat: 10.66493623435229,
//     lng: -61.40035327985661,
//   });
//   const zoom = 9;
//   const [selected, setSelected] = useState({});
//   const [currentPosition, setCurrentPosition] = useState({});

//   const mapRef = useRef();

//   const getCrimeData = async (range = 1) => {
//     try {
//       let res;
//       setLoading(true);
//       if (range >= 1) {
//         const body = { range };

//         res = await fetch("/crimereports/", {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify(body),
//         });
//       }

//       const parseData = await res.json();
//       let newData = parseData.map((element) => {
//         return {
//           createdAt: element.createdAt,
//           date: element.date,
//           division: element.divison,
//           id: element.id,
//           address: element.location,
//           offences: element.offences,
//           station: element.station,
//           time: element.time,
//           updatedAt: element.updatedAt,
//           location: {
//             lat: element.latitude,
//             lng: element.longitude,
//           },
//         };
//       });
//       setCrimeData(newData);
//       setLoading(false);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getCrimeData()
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(success,
//         data => {
//           console.log(data)

//         },
//       )
//     }

//   }, []);

//   const onSelect = (item) => {
//     setSelected(item);
//     setCenter(item.location);
//   };

//   const success = (position) => {
//     const currentPosition = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//     };
//     setCurrentPosition(currentPosition);
//   };

//   const options = {
//     imagePath:
//       "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
//   };

//   return (
//     <div>
//       <br />
//       <h1 style={{ textAlign: "center" }}>Trinidad and Tobago Crime Map</h1>
//       <br />
//       <div className="container">
//         <LoadScript googleMapsApiKey="AIzaSyC3pOnLyggdgCYC7Mv8CWSaeGNUUox2Qrg">
//           {loading ? (
//             <div className="container text-center">
//               <div
//                 className="spinner-grow text-info"
//                 role="status"
//                 style={{
//                   width: "4rem",
//                   height: "4rem",
//                 }}
//               >
//                 <span className="sr-only">Loading...</span>
//               </div>
//             </div>
//           ) : (
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               center={center}
//               zoom={zoom}
//               yesIWantToUseGoogleMapApiInternals
//               onBoundsChanged = {({map}) => {
//                 mapRef.current = map;
//               }}
//             >
//               {currentPosition.lat && (
//                 <Marker
//                   icon={
//                     "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
//                   }
//                   position={currentPosition}
//                   onClick={() => onSelect(currentPosition)}
//                 />
//               )}

//               <MarkerClusterer options={options}>
//                 {(clusterer) =>
//                   crimeData.map((item) => (
//                     <Marker
//                       icon={
//                         "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
//                       }
//                       key={item.id}
//                       position={item.location}
//                       clusterer={clusterer}
//                       onClick={() => onSelect(item)}
//                     />
//                   ))
//                 }
//               </MarkerClusterer>
//               {selected.location && (
//                 <InfoWindow
//                   position={selected.location}
//                   clickable={true}
//                   onCloseClick={() => setSelected({})}
//                 >
//                   <div>
//                     <p style={{ color: "black" }}>
//                       <b>Offence:</b> {selected.offences}
//                     </p>
//                     <p style={{ color: "black" }}>
//                       <b>Date:</b> {selected.date}
//                     </p>
//                     <p style={{ color: "black" }}>
//                       <b>Time:</b> {selected.time}
//                     </p>
//                   </div>
//                 </InfoWindow>
//               )}
//             </GoogleMap>
//           )}
//         </LoadScript>

//         <div className="btn-group" role="group" aria-label="Basic example">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => getCrimeData(1)}
//           >
//             3 Months
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => getCrimeData(2)}
//           >
//             6 Months
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => getCrimeData(3)}
//           >
//             1 Year
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => getCrimeData(4)}
//           >
//             2 Years
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => getCrimeData(5)}
//           >
//             3 Years
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => getCrimeData(6)}
//           >
//             4 Years
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => getCrimeData(7)}
//           >
//             5 Years
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import Supercluster from "supercluster";
import "./Map.css";

  const Marker = ({ children }) => children;

  // load and prepare data 
  // get map bounds
  // get clusters
  
  // return map 
  const Map = () => {  

    const mapRef = useRef();  
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(11); 
    const [loading, setLoading] = useState(false);
    const [crimeData, setCrimeData] = useState([]);  
    const [selected, setSelected] = useState({});
    const [currentPosition, setCurrentPosition] = useState({});   
    
    const alerted = false; 

    const points = crimeData.map(crime => ({ 
        type: "Feature",
        properties: { cluster: false, crimeId: crime.id,category: crime.offences,name:false},
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(crime.location.lng),
            parseFloat(crime.location.lat), 
          ]
        } 
      }));  

    const { clusters, supercluster } = useSupercluster({
        points, 
        alerted,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 } 
      });   
    
    // const onSelect = (item) => {
    //   setSelected(item);
    //   //setCurrentPosition(item.location);
    // };



    const getCrimeData = async (range = 1) => {
            try {
              let res;
              setLoading(true);
              if (range >= 1) {
                const body = { range };
        
                res = await fetch("/crimereports/", {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(body),
                });
              }
        
              const parseData = await res.json();
              let newData = parseData.map((element) => {
                return {
                  createdAt: element.createdAt,
                  date: element.date,
                  division: element.divison,
                  id: element.id,
                  address: element.location,
                  offences: element.offences,
                  station: element.station,
                  time: element.time,
                  updatedAt: element.updatedAt,
                  location: {
                    lat: element.latitude,
                    lng: element.longitude,
                  },
                };
              });
              setCrimeData(newData);
              setLoading(false);
            } catch (err) {
              console.error(err.message);
            }
          };  

          const nearCrime = () =>{  

            for(var x in clusters){ 
              console.log(clusters[x]);
              // console.log(clusters[x].geometry.coordinates);  
              // console.log(currentPosition); 
              var sendNotif = clusters[x].alerted;
              var c_lng = clusters[x].geometry.coordinates[0]; 
              var c_lat = clusters[x].geometry.coordinates[1]; 
              // console.log(c_lat,c_lng);
              // if((currentPosition.lat == c_lat) && (currentPosition.lng == c_lng)){  
              //   console.log("Near Crime");
              // }   
              console.log(Math.abs(currentPosition.lng - c_lng))
              if((Math.abs(currentPosition.lat - c_lat) < 0.003) && (Math.abs(currentPosition.lng - c_lng) < 0.005)){  
                console.log("Near Crime"); 

                if(sendNotif === false){
                  var options = {
                    body: 'You Near Crime Buddy'
                  };
                  new Notification('Crime Alert', options); 
                } 
                clusters[x].alerted = true; 
                //console.log(clusters[x].alerted);
              } 
              
            }
          }
          
          nearCrime() 

          useEffect(() => {
            getCrimeData() 
            navigator.geolocation.watchPosition((position)=>{ 
              const pos  = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    };
                //console.log(position); 
                setCurrentPosition(pos); 
                //nearCrime()
            },()=>null)          

            // if(currentPosition){ 
            //   for(var x in clusters){
            //     console.log(clusters[x].geometry.coordinates);  
            //     //console.log(currentPosition);
            //     var c_lng = clusters[x].geometry.coordinates[1]; 
            //     var c_lat = clusters[x].geometry.coordinates[0] 
            //     // if((currentPosition.lat == c_lat) && (currentPosition.lng == c_lng)){  
            //     //   console.log("Near Crime");
            //     // }   
            //     console.log(Math.abs(currentPosition.lat - c_lng))
            //     if(Math.abs(currentPosition.lat - c_lng) < 0.005){  
            //       console.log("Near Crime");
            //       var options = {
            //         body: 'You Near Crime Buddy'
            //       };
            //       new Notification('Successfully subscribed!', options);
            //     }
            //   }
            
            // }
          
          }, []); 
          
          

    return (
        <div style={{ height: "60vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyC3pOnLyggdgCYC7Mv8CWSaeGNUUox2Qrg"}}
                defaultCenter={{ lat: 10.66493623435229, lng: -61.40035327985661 }} 
                defaultZoom={9} 
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                  mapRef.current = map;
                }}  
                onChange={({ zoom, bounds }) => {
                  setZoom(zoom);
                  setBounds([
                    bounds.nw.lng,
                    bounds.se.lat,
                    bounds.se.lng,
                    bounds.nw.lat
                  ]);   
                   
                  
                  //nearCrime()
                  // for(var x in clusters){
                  //   console.log(clusters[x].geometry.coordinates);  
                  //   //console.log(currentPosition);
                  //   var c_lng = clusters[x].geometry.coordinates[1]; 
                  //   var c_lat = clusters[x].geometry.coordinates[0] 
                  //   // if((currentPosition.lat == c_lat) && (currentPosition.lng == c_lng)){  
                  //   //   console.log("Near Crime");
                  //   // }   
                  //   console.log(Math.abs(currentPosition.lat - c_lng))
                  //   if(Math.abs(currentPosition.lat - c_lng) < 0.005){  
                  //     console.log("Near Crime");
                  //     var options = {
                  //       body: 'You Near Crime Buddy'
                  //     };
                  //     new Notification('Successfully subscribed!', options);
                  //   }
                  // }
                }}
            >  
            {/* {console.log(zoom)}
            {console.log(currentPosition)} */}
            {currentPosition && (
                <Marker 
                  lat = {currentPosition.lat} 
                  lng = {currentPosition.lng}
                  //onClick={() => onSelect(currentPosition)}
                > 
                  <button className="crime-marker">
                    <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="User" />
                  </button>   
                </Marker>
              )} 

            {clusters.map(cluster => {
              const [longitude, latitude] = cluster.geometry.coordinates;  
              cluster.alerted = false;
              const { 
                cluster: isCluster, 
                point_count: pointCount,   
              } = cluster.properties; 

              if (isCluster) { 
                return (
                  <Marker
                    key={`cluster-${cluster.id}`}
                    lat={latitude}
                    lng={longitude} 

                  >
                    <div
                      className="cluster-marker"
                      style={{
                        width: `${10 + (pointCount / points.length) * 40}px`,
                        height: `${10 + (pointCount / points.length) * 40}px`
                      }}
                      onClick={() => {
                        const expansionZoom = Math.min(
                          supercluster.getClusterExpansionZoom(cluster.id),
                          20
                        );
                        mapRef.current.setZoom(expansionZoom);
                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                      }}
                    >
                      {pointCount}
                    </div>
                  </Marker>
                );
              }

              return (
                <Marker
                  key={`crime-${cluster.properties.crimeId}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <button className="crime-marker">
                    <img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="crime" />
                  </button>
                </Marker>
              );
            })}

            </GoogleMapReact> 

            <div className="btn-group" role="group" aria-label="Basic example">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => getCrimeData(3)} 
            >
                3 Months
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => getCrimeData(6)}
            >
                6 Months
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => getCrimeData(12)}
            >
                1 Year
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => getCrimeData(24)}
            >
                2 Years
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => getCrimeData(36)}
            >
                3 Years
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => getCrimeData(48)}
            >
                4 Years
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => getCrimeData(60)}
            >
                5 Years
            </button>
            </div>
        </div> 

          return (
            <Marker
              key={`crime-${cluster.properties.crimeId}`}
              lat={latitude}
              lng={longitude}
            >
              <button className="crime-marker">
                <img
                  src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  alt="crime"
                />
              </button>
            </Marker>
          );
        })}
      </GoogleMapReact>

      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => getCrimeData(1)}
        >
          3 Months
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => getCrimeData(2)}
        >
          6 Months
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => getCrimeData(3)}
        >
          1 Year
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => getCrimeData(4)}
        >
          2 Years
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => getCrimeData(5)}
        >
          3 Years
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => getCrimeData(6)}
        >
          4 Years
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => getCrimeData(7)}
        >
          5 Years
        </button>
      </div>
    </div>
  );
}; //end Map()

export default Map;
