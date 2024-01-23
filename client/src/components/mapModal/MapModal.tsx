import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import tt from '@tomtom-international/web-sdk-maps';
import { IHouse } from '../../interfaces';
import './mapModal.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

type Props = {
    openMap: boolean;
    setOpenMap: React.Dispatch<React.SetStateAction<boolean>>;
    data: IHouse | null;
};

type Location = {
    lat: number;
    lon: number;
};

const MapModal = ({ openMap, setOpenMap, data }: Props) => {
    const mapElement = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<tt.Map | undefined>();
    const [location, setLocation] = useState<Location | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);

    const findLocation = async () => {
        if (!data) return;

        setLoading(true);

        try {
            const address = `${data.address} ${data.city}`;
            const url = `https://api.tomtom.com/search/2/geocode/${address}.json?key=${import.meta.env.VITE_API_KEY}`;

            const response = await axios.get(url);
            const position = response.data.results[0]?.position;
            if (position) {
                setLocation(position);
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        findLocation();
    }, [data, openMap]);

    const createMap = (location: Location) => {
        if (!mapElement.current) return;

        const map = tt.map({
            key: import.meta.env.VITE_API_KEY,
            container: mapElement.current as HTMLDivElement,
            center: [location.lon, location.lat],
            zoom: 14,
        });

        setMap(map);

        new tt.Marker().setLngLat([location.lon, location.lat]).addTo(map);

        return () => {
            map.remove();
        };
    };

    useEffect(() => {
        if (location) {
            createMap(location);
        }
    }, [location]);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setOpenMap(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    if (!openMap) return null;

    return createPortal(
        <div className="modal">
            <div className="modal-container" ref={modalRef}>
                <div className="modal-body">
                    {loading && <div>Loading...</div>}
                    <div ref={mapElement} className="map"></div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') as Element
    );
};

export default MapModal;
