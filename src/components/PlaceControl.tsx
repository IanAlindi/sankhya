import { useState } from 'react';
import type { Place } from '../lib/astro';

export function PlaceControl({ place, setPlace }: { place: Place; setPlace: (p: Place) => void }) {
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState(place.lat.toFixed(3));
  const [lon, setLon] = useState(place.lon.toFixed(3));
  const [label, setLabel] = useState(place.label);
  const [msg, setMsg] = useState('');

  const locate = () => {
    if (!('geolocation' in navigator)) { setMsg('This browser cannot share a location. Enter it by hand.'); setOpen(true); return; }
    setMsg('Asking for your location…');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPlace({ lat: pos.coords.latitude, lon: pos.coords.longitude, label: 'Your location', source: 'device' });
        setMsg('');
      },
      () => { setMsg('Location was not shared. Enter latitude and longitude by hand.'); setOpen(true); },
      { timeout: 10000, maximumAge: 3600000 },
    );
  };

  const save = () => {
    const a = Number(lat), o = Number(lon);
    if (!(a >= -90 && a <= 90) || !(o >= -180 && o <= 180)) { setMsg('Latitude runs −90 to 90 and longitude −180 to 180 (east positive).'); return; }
    setPlace({ lat: a, lon: o, label: label.trim() || 'Custom place', source: 'manual' });
    setOpen(false); setMsg('');
  };

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <p className="small muted">
        Times for <b style={{ color: 'var(--fg)' }}>{place.label}</b> ({place.lat.toFixed(2)}°, {place.lon.toFixed(2)}°)
        {place.source === 'zone' ? ', guessed from your time zone.' : '.'} Clock times are in this device's time zone.
      </p>
      <div className="row" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="btn" type="button" onClick={locate}>Use my location</button>
        <button className="btn ghost" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>Set by hand</button>
      </div>
      {open && (
        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', alignItems: 'end' }}>
          <div className="field"><label htmlFor="pl-label">Place name</label><input id="pl-label" value={label} onChange={(e) => setLabel(e.target.value)} /></div>
          <div className="field"><label htmlFor="pl-lat">Latitude</label><input id="pl-lat" inputMode="decimal" value={lat} onChange={(e) => setLat(e.target.value)} /></div>
          <div className="field"><label htmlFor="pl-lon">Longitude</label><input id="pl-lon" inputMode="decimal" value={lon} onChange={(e) => setLon(e.target.value)} /></div>
          <button className="btn primary" type="button" onClick={save}>Use this place</button>
        </div>
      )}
      {msg && <p className="small" role="status" style={{ color: 'var(--muted)' }}>{msg}</p>}
    </div>
  );
}
