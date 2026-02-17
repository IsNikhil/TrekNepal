'use client';

import { useEffect, useRef } from 'react';
import type { Trail } from '@/data/trails';

interface Props {
  trail?: Trail;
  trails?: Trail[];
  height?: string;
  showRoute?: boolean;
}

export default function TrailMap({ trail, trails, height = '400px', showRoute = true }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;
    if (mapInstanceRef.current) return; // Already initialized

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Fix default marker icon path issue in Next.js
      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Center calculation
      let center: [number, number] = [28.2, 84.0];
      let zoom = 7;

      if (trail) {
        center = [trail.lat, trail.lng];
        zoom = 10;
      } else if (trails && trails.length > 0) {
        const avgLat = trails.reduce((s, t) => s + t.lat, 0) / trails.length;
        const avgLng = trails.reduce((s, t) => s + t.lng, 0) / trails.length;
        center = [avgLat, avgLng];
        zoom = 7;
      }

      const map = L.map(mapRef.current, {
        center,
        zoom,
        zoomControl: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // Map tiles — OpenTopoMap for trekking context
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
      }).addTo(map);

      const greenIcon = L.divIcon({
        className: '',
        html: `<div style="width:12px;height:12px;background:#1f7e1f;border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const startIcon = L.divIcon({
        className: '',
        html: `<div style="width:18px;height:18px;background:#1f7e1f;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center">
          <div style="width:6px;height:6px;background:white;border-radius:50%"></div>
        </div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const endIcon = L.divIcon({
        className: '',
        html: `<div style="width:18px;height:18px;background:#d4852a;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      if (trail) {
        // Draw route polyline
        if (showRoute && trail.coordinates.length > 0) {
          const polyline = L.polyline(trail.coordinates, {
            color: '#1f7e1f',
            weight: 4,
            opacity: 0.85,
            lineJoin: 'round',
            lineCap: 'round',
          }).addTo(map);

          // Start/end markers
          const start = trail.coordinates[0];
          const end = trail.coordinates[trail.coordinates.length - 1];

          L.marker(start, { icon: startIcon })
            .addTo(map)
            .bindPopup(`<b>Start:</b> ${trail.startPoint}`);

          L.marker(end, { icon: endIcon })
            .addTo(map)
            .bindPopup(`<b>End:</b> ${trail.endPoint}`);

          map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
        }

        // Lodge markers
        trail.lodges.forEach((lodge) => {
          // Approximate lodge positions along route
          const idx = Math.floor(trail.coordinates.length * 0.33);
          const pos = trail.coordinates[Math.min(idx, trail.coordinates.length - 1)];
          L.marker(pos, { icon: greenIcon })
            .addTo(map)
            .bindPopup(`<b>${lodge.name}</b><br>${lodge.elevation}m`);
        });
      } else if (trails) {
        // Multiple trail markers for Explore view
        trails.forEach((t) => {
          const customIcon = L.divIcon({
            className: '',
            html: `<div style="background:#1f7e1f;color:white;padding:4px 8px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:2px solid white">${t.name.split(' ')[0]}</div>`,
            iconAnchor: [40, 14],
          });
          L.marker([t.lat, t.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
              <div style="font-family:Inter,sans-serif;min-width:160px">
                <b style="font-size:13px">${t.name}</b><br>
                <span style="color:#6b7280;font-size:11px">${t.region}</span><br>
                <div style="margin-top:6px;display:flex;gap:8px;font-size:11px">
                  <span>⭐ ${t.rating}</span>
                  <span>📏 ${t.distance}km</span>
                  <span>⛰️ ${t.maxElevation}m</span>
                </div>
                <a href="/trails/${t.id}" style="display:block;margin-top:8px;background:#1f7e1f;color:white;text-align:center;padding:4px 0;border-radius:6px;font-size:11px;font-weight:600;text-decoration:none">View Trek</a>
              </div>
            `);
        });
      }
    });

    return () => {
      // Cleanup on unmount
    };
  }, [trail, trails, showRoute]);

  return (
    <div
      ref={mapRef}
      style={{ height, width: '100%' }}
      className="rounded-2xl overflow-hidden z-0"
    />
  );
}
