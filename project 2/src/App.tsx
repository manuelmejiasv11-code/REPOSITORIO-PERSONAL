import { useMemo, useState } from 'react';
import {
  ArrowDown,
  Cable,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  Globe2,
  House,
  Layers3,
  MapPin,
  Maximize2,
  Network,
  Printer,
  Router,
  Search,
  Server,
  ShieldCheck,
  Wifi,
  X,
} from 'lucide-react';

type NodeKind = 'isp' | 'core' | 'fdt' | 'nap' | 'onu';
type IconProps = { size?: number | string; strokeWidth?: number | string };
type IconComponent = React.ComponentType<IconProps>;
type DiagramNode = { label: string; kind: NodeKind; children?: DiagramNode[] };
type Sheet = { number: number; section: string; title: string; subtitle: string; nodes: DiagramNode[] };

const line = (label: string, kind: NodeKind, children?: DiagramNode[]): DiagramNode => ({ label, kind, children });
const child = (label: string, kind: NodeKind = 'core', children?: DiagramNode[]) => line(label, kind, children);
const nap = (count = 1): DiagramNode => line('NAP', 'nap', Array.from({ length: count }, () => child('ONU Cliente', 'onu')));
const access = (number: number, section: string, title: string, root: string, fdts: [string, number][]): Sheet => ({
  number,
  section,
  title,
  subtitle: 'Detalle de acceso / Red FTTH',
  nodes: [line(root, 'core', fdts.map(([label, count]) => child(label, 'fdt', [nap(count)])))],
});

const sheets: Sheet[] = [
  {
    number: 1,
    section: 'Núcleo / Core',
    title: 'DIAGRAMA N° 1: TOPOLOGÍA NACIONAL Y ENLACES ISP',
    subtitle: 'Arquitectura de interconexión nacional',
    nodes: [
      line("ISP: CORPORACIÓN MATRIX TV, C.A. | Parcelamiento el recreo, calle 95r N° 75-83, Maracaibo, Zulia | 10°38'55.0\"N 71°40'50.0\"O", 'isp', [
        child("CC ZULIA: NODO PUERTOS DE ALTAGRACIA / OLT 4 | Av. Nro. 5 con Calle Nro. 15, Altagracia, Miranda, Zulia | 10°42'54.0\"N 71°31'15.6\"O"),
        child("CC FALCÓN: NODO CHICHIRIVICHE / OLT 1 | Av. Cuare con Calle Zamora, Chichiriviche, Monseñor Iturriza, Falcón | 10°55'44.4\"N 68°16'30.0\"O"),
      ]),
      line("ISP: CIRION TECHNOLOGIES, S.A. | La Urbina, Calle 7, Edificio Cirion, Petare, Miranda | 10°29'35.2\"N 66°48'16.2\"O", 'isp', [
        child("CC DISTRITO CAPITAL: NODO LIBERTADOR / OLT 15 | Av. Principal de Propatria, C.C. Propatria, Santa Cruz, Libertador, Dto. Capital | 10°30'12.6\"N 66°57'10.6\"O"),
        child("CC MIRANDA: NODO SUCRE / OLT 14 | Calle Canteras de Miranda / Isaías Medina Angarita, Petare, Sucre, Miranda | 10°27'31.0\"N 66°48'04.3\"O"),
      ]),
      line("ISP: CORPORACIÓN VNET, C.A. | Av.5 sector las acacias, Multicentro el recreo, Valera, Trujillo | 9°18'15.7\"N 70°36'35.8\"O", 'isp', [
        child("CC TRUJILLO: NODO SANTA ISABEL / OLT 10 | Carretera El Taladro, Santa Isabel, Andrés Bello, Trujillo | 9°37'47.1\"N 70°48'30.8\"O"),
        child("CC CARABOBO: NODO VALENCIA / OLT 12 | Av. Henry Ford, C.C. Paseo Las Industrias, Miguel Peña, Valencia, Carabobo | 10°09'50.2\"N 67°57'37.6\"O"),
        child("CC YARACUY: NODO SAN FELIPE / OLT 11 | Av. 5 Libertador, Centro Bazar Único, San Javier, San Felipe, Yaracuy | 10°20'21.3\"N 68°44'09.1\"O"),
        child("CC LARA: NODO CARORA / OLT 16 | Av. El Estadio con Cristo Rey, Carora, Torres, Lara | 10°09'52.0\"N 70°04'50.3\"O"),
        child("CC ARAGUA: NODO MARACAY / OLT 13 | Av. Constitución / Calle Mariño, C.C. Paseo Estación Central, Girardot, Aragua | 10°14'53.4\"N 67°36'07.3\"O"),
      ]),
    ],
  },
  {
    number: 2,
    section: 'Transporte · Zulia',
    title: 'DIAGRAMA N° 2: RED DE DISTRIBUCIÓN - ESTADO ZULIA (OLT 4 HACIA OLTs SECUNDARIAS)',
    subtitle: 'Red de transporte regional',
    nodes: [line("CC ZULIA: NODO PUERTOS DE ALTAGRACIA / OLT 4 | Av. Nro. 5 con Calle Nro. 15, Altagracia, Miranda, Zulia | 10°42'54.0\"N 71°31'15.6\"O", 'core', [
      child("NODO MARACAIBO / OLT 5 | Av. 75-1 con Calle 68B, Raul Leoni, Maracaibo, Zulia | 10°41'14.6\"N 71°39'36.9\"O"),
      child("NODO SAN FRANCISCO / OLT 6 | Av.40, Villa Bolivariana, Bloque 002, San Francisco, Zulia | 10°34'08.1\"N 71°38'10.3\"O"),
      child("NODO LA CONCEPCIÓN / OLT 7 | Av. Principal, Sector Santa Marta, La Concepción, Lossada, Zulia | 10°37'34.0\"N 71°50'34.4\"O"),
      child("NODO NUEVA LUCHA / OLT 8 | Carretera El Mojan, hacia Coop Comaxdi, Ricaute, Mara, Zulia | 10°49'05.8\"N 71°45'31.9\"O"),
      child("NODO SINAMAICA / OLT 9 | Troncal del Caribe, Calle 16, Sinamaica, Guajira, Zulia | 11°05'05.6\"N 71°51'27.3\"O"),
    ])],
  },
  {
    number: 3,
    section: 'Transporte · Falcón',
    title: 'DIAGRAMA N° 3: RED DE DISTRIBUCIÓN - ESTADO FALCÓN (OLT 1 HACIA OLTs SECUNDARIAS)',
    subtitle: 'Red de transporte regional',
    nodes: [line("CC FALCÓN: NODO CHICHIRIVICHE / OLT 1 | Av. Cuare con Calle Zamora, Chichiriviche, Monseñor Iturriza, Falcón | 10°55'44.4\"N 68°16'30.0\"O", 'core', [
      child("NODO PUEBLO NUEVO / OLT 2 | Av. Bolívar con Calle Reyes, Pueblo Nuevo, Baraived, Falcón, Falcón | 11°56'52.9\"N 69°55'11.9\"O"),
      child("NODO CARIRUBANA / OLT 3 | C.C. Ciudad del Viento, Local 21, Carirubana, Punto Fijo, Falcón | 11°41'25.2\"N 70°11'45.8\"O"),
    ])],
  },
  access(4, 'Acceso · Falcón', 'DIAGRAMA N° 4: RED DE ACCESO - NODO CHICHIRIVICHE (OLT 1)', "NODO CHICHIRIVICHE / OLT 1 | Av. Cuare con Calle Zamora, Chichiriviche, Falcón | 10°55'44.4\"N 68°16'30.0\"O", [
    ["FDT 1 | Calle Zamora frente a viviendas, Chichiriviche, Falcón | 10°55'51.6\"N 68°16'44.4\"O", 2], ["FDT 2 | Av. Cuare con Calle Ruiz Pineda, Chichiriviche, Falcón | 10°55'37.2\"N 68°16'44.4\"O", 1], ["FDT 3 | Av. Zavarce con Av. Bello y Calle Comercio, Chichiriviche, Falcón | 10°55'37.2\"N 68°16'22.8\"O", 1], ["FDT 4 | Av. Bello con Calle Comercio, Chichiriviche, Falcón | 10°55'26.4\"N 68°16'22.8\"O", 1], ["FDT 5 | Av. Cuare Playa Norte, Chichiriviche, Falcón | 10°55'19.2\"N 68°16'37.2\"O", 1], ["FDT 6 | Av. Piar con Calle Aragua, Chichiriviche, Falcón | 10°55'08.4\"N 68°16'30.0\"O", 2],
  ]),
  access(5, 'Acceso · Falcón', 'DIAGRAMA N° 5: RED DE ACCESO - NODO PUEBLO NUEVO (OLT 2)', "NODO PUEBLO NUEVO / OLT 2 | Av. Bolívar con Calle Reyes, Pueblo Nuevo, Falcón | 11°56'52.9\"N 69°55'11.9\"O", [["FDT 7 | Av. Bolívar con Calle Reyes, Pueblo Nuevo, Falcón | 11°56'52.9\"N 69°55'11.9\"O", 2], ["FDT 8 | Av. Bolívar con Calle Miranda, Pueblo Nuevo, Falcón | 11°56'51.7\"N 69°55'24.1\"O", 1], ["FDT 9 | Detrás del cementerio, Sector Providencia, Pueblo Nuevo, Falcón | 11°56'31.1\"N 69°55'23.3\"O", 1]]),
  access(6, 'Acceso · Falcón', 'DIAGRAMA N° 6: RED DE ACCESO - NODO CARIRUBANA (OLT 3)', "NODO CARIRUBANA / OLT 3 | C.C. Ciudad del Viento, Local 21, Punto Fijo, Falcón | 11°41'25.2\"N 70°11'45.8\"O", [["FDT 10 | Av. Los Caobos con Calle Girardot, Punto Fijo, Falcón | 11°41'24.1\"N 70°11'45.1\"O", 2], ["FDT 11 | Av. Los Mangos con Calle Peninsular, Punto Fijo, Falcón | 11°41'14.5\"N 70°11'53.5\"O", 1], ["FDT 12 | Av. San Miguel con Calle Apure, Punto Fijo, Falcón | 11°41'20.8\"N 70°11'30.3\"O", 1]]),
  access(7, 'Acceso · Zulia', 'DIAGRAMA N° 7: RED DE ACCESO - NODO PUERTOS DE ALTAGRACIA (OLT 4)', "NODO PUERTOS DE ALTAGRACIA / OLT 4 | Av. Nro. 5 con Calle Nro. 15, Altagracia, Miranda, Zulia | 10°42'54.0\"N 71°31'15.6\"O", [["FDT 13 | Av 4 con Calle 15, Puertos de Altagracia, Zulia | 10°42'57.6\"N 71°31'22.8\"O", 2], ["FDT 14 | Av 3 con Calle 16, Puertos de Altagracia, Zulia | 10°43'01.2\"N 71°31'19.2\"O", 1], ["FDT 15 | Calle 15 entre Av 5 y 6, Puertos de Altagracia, Zulia | 10°42'54.0\"N 71°31'12.0\"O", 1], ["FDT 16 | Av 7 con Calle 12, Puertos de Altagracia, Zulia | 10°42'39.6\"N 71°31'15.6\"O", 1], ["FDT 17 | Av 4 con Calle 11, Puertos de Altagracia, Zulia | 10°42'43.2\"N 71°31'26.4\"O", 1], ["FDT 18 | Corredor Vial Ramona Acurero con Calle 16, Puertos de Altagracia, Zulia | 10°42'50.4\"N 71°31'01.2\"O", 2]]),
  access(8, 'Acceso · Zulia', 'DIAGRAMA N° 8: RED DE ACCESO - NODO MARACAIBO (OLT 5)', "NODO MARACAIBO / OLT 5 | Av. 75-1 con Calle 68B, Raul Leoni, Maracaibo, Zulia | 10°41'14.6\"N 71°39'36.9\"O", [["FDT 19 | Av. 75-1 con Calle 68B, Maracaibo, Zulia | 10°41'14.6\"N 71°39'37.5\"O", 2], ["FDT 20 | Av. 75 con Calle 71, Maracaibo, Zulia | 10°41'08.6\"N 71°39'37.1\"O", 1], ["FDT 21 | Av. 74B con Calle 66, Maracaibo, Zulia | 10°41'22.4\"N 71°39'30.6\"O", 1]]),
  access(9, 'Acceso · Zulia', 'DIAGRAMA N° 9: RED DE ACCESO - NODO SAN FRANCISCO (OLT 6)', "NODO SAN FRANCISCO / OLT 6 | Av.40, Villa Bolivariana, Bloque 002, San Francisco, Zulia | 10°34'08.1\"N 71°38'10.3\"O", [["FDT 22 | Villa Bolivariana, Bloque 02, San Francisco, Zulia | 10°34'08.1\"N 71°38'10.5\"O", 2], ["FDT 23 | Villa Bolivariana, Bloque 22, San Francisco, Zulia | 10°34'13.1\"N 71°38'12.4\"O", 1], ["FDT 24 | Villa Bolivariana, Bloque 10, San Francisco, Zulia | 10°34'04.8\"N 71°38'12.7\"O", 1]]),
  access(10, 'Acceso · Zulia', 'DIAGRAMA N° 10: RED DE ACCESO - NODO LA CONCEPCIÓN (OLT 7)', "NODO LA CONCEPCIÓN / OLT 7 | Av. Principal, Sector Santa Marta, La Concepción, Lossada, Zulia | 10°37'34.0\"N 71°50'34.4\"O", [["FDT 25 | Sector Santa Marta, La Concepción, Zulia | 10°37'34.1\"N 71°50'33.3\"O", 2], ["FDT 26 | Sector Santa Marta, Diag. La Pizarra, La Concepción, Zulia | 10°37'30.1\"N 71°50'31.1\"O", 1], ["FDT 27 | Av. Principal, Sector Santa Marta, La Concepción, Zulia | 10°37'36.7\"N 71°50'31.6\"O", 1]]),
  access(11, 'Acceso · Zulia', 'DIAGRAMA N° 11: RED DE ACCESO - NODO NUEVA LUCHA (OLT 8)', "NODO NUEVA LUCHA / OLT 8 | Carretera El Mojan, hacia Coop Comaxdi, Ricaute, Mara, Zulia | 10°49'05.8\"N 71°45'31.9\"O", [["FDT 28 | Carretera El Mojan, hacia Coop Comaxdi, Mara, Zulia | 10°49'08.7\"N 71°45'33.3\"O", 2], ["FDT 29 | Troncal del Caribe, Sector Gonzalo Antonio, Mara, Zulia | 10°49'02.8\"N 71°45'39.6\"O", 1], ["FDT 30 | Troncal del Caribe, Sector 9 de Enero, Mara, Zulia | 10°48'51.8\"N 71°45'34.9\"O", 1]]),
  access(12, 'Acceso · Zulia', 'DIAGRAMA N° 12: RED DE ACCESO - NODO SINAMAICA (OLT 9)', "NODO SINAMAICA / OLT 9 | Troncal del Caribe, Calle 16, Sinamaica, Guajira, Zulia | 11°05'05.6\"N 71°51'27.3\"O", [["FDT 31 | Troncal del Caribe, Calle 16, Sinamaica, Zulia | 11°05'07.9\"N 71°51'23.1\"O", 2], ["FDT 32 | Troncal del Caribe, Calle 15, Sinamaica, Zulia | 11°05'03.8\"N 71°51'20.6\"O", 1], ["FDT 33 | Troncal del Caribe, Calle 16, Alcaldía, Sinamaica, Zulia | 11°05'04.3\"N 71°51'10.9\"O", 1]]),
  access(13, 'Acceso · Trujillo', 'DIAGRAMA N° 13: RED DE ACCESO - ESTADO TRUJILLO (NODO SANTA ISABEL / OLT 10)', "NODO SANTA ISABEL / OLT 10 | Carretera El Taladro, Santa Isabel, Andrés Bello, Trujillo | 9°37'47.1\"N 70°48'30.8\"O", [["FDT 34 | Carretera El Taladro, Santa Isabel, Trujillo | 9°37'51.2\"N 70°48'30.4\"O", 2], ["FDT 35 | Carretera Principal, Santa Isabel, Trujillo | 9°38'04.5\"N 70°48'31.8\"O", 1], ["FDT 36 | Vía Comando Guardia Nacional, Santa Isabel, Trujillo | 9°37'53.2\"N 70°48'41.1\"O", 1]]),
  access(14, 'Acceso · Yaracuy', 'DIAGRAMA N° 14: RED DE ACCESO - ESTADO YARACUY (NODO SAN FELIPE / OLT 11)', "NODO SAN FELIPE / OLT 11 | Av. 5 Libertador, Centro Bazar Único, San Javier, San Felipe, Yaracuy | 10°20'21.3\"N 68°44'09.1\"O", [["FDT 37 | Av. 7 con Calle 8, San Felipe, Yaracuy | 10°20'27.2\"N 68°44'09.4\"O", 2], ["FDT 38 | Av. 7 con Calle 11, San Felipe, Yaracuy | 10°20'23.9\"N 68°44'13.4\"O", 1], ["FDT 39 | Av. Caracas con Av. 04, San Felipe, Yaracuy | 10°20'20.2\"N 68°44'05.9\"O", 1]]),
  access(15, 'Acceso · Carabobo', 'DIAGRAMA N° 15: RED DE ACCESO - ESTADO CARABOBO (NODO VALENCIA / OLT 12)', "NODO VALENCIA / OLT 12 | Av. Henry Ford, C.C. Paseo Las Industries, Miguel Peña, Valencia, Carabobo | 10°09'50.2\"N 67°57'37.6\"O", [["FDT 40 | Av. Henry Ford, C.C. Paseo Las Industrias, Valencia, Carabobo | 10°09'50.2\"N 67°57'37.6\"O", 2], ["FDT 41 | Av. Norte-Sur-9, Valencia, Carabobo | 10°09'41.6\"N 67°57'45.7\"O", 1], ["FDT 42 | Av. Norte-Sur-8, Valencia, Carabobo | 10°09'34.5\"N 67°57'49.9\"O", 1]]),
  access(16, 'Acceso · Aragua', 'DIAGRAMA N° 16: RED DE ACCESO - ESTADO ARAGUA (NODO MARACAY / OLT 13)', "NODO MARACAY / OLT 13 | Av. Constitución / Calle Mariño, C.C. Paseo Estación Central, Girardot, Aragua | 10°14'53.4\"N 67°36'07.3\"O", [["FDT 43 | Av. Constitución / Calle Mariño, Maracay, Aragua | 10°14'53.8\"N 67°36'07.6\"O", 2], ["FDT 44 | Calle Negro Primero / Calle Soublotte, Maracay, Aragua | 10°14'55.3\"N 67°36'10.5\"O", 1], ["FDT 45 | Calle Páez / Blvd Pérez Almarza, Maracay, Aragua | 10°14'58.9\"N 67°36'14.0\"O", 1]]),
  access(17, 'Acceso · Miranda', 'DIAGRAMA N° 17: RED DE ACCESO - ESTADO MIRANDA (NODO SUCRE / OLT 14)', "NODO SUCRE / OLT 14 | Calle Canteras de Miranda / Isaías Medina Angarita, Petare, Sucre, Miranda | 10°27'31.0\"N 66°48'04.3\"O", [["FDT 46 | Calle Chaguarama, Petare, Miranda | 10°27'40.5\"N 66°48'15.0\"O", 2], ["FDT 47 | Calle Isaías Medina Angarita, Petare, Miranda | 10°27'32.1\"N 66°48'09.8\"O", 1], ["FDT 48 | Calle Principal Mirador del Este, Petare, Miranda | 10°27'39.5\"N 66°48'11.6\"O", 1]]),
  access(18, 'Acceso · Distrito Capital', 'DIAGRAMA N° 18: RED DE ACCESO - DISTRITO CAPITAL (NODO LIBERTADOR / OLT 15)', "NODO LIBERTADOR / OLT 15 | Av. Principal de Propatria, C.C. Propatria, Santa Cruz, Libertador, Dto. Capital | 10°30'12.6\"N 66°57'10.6\"O", [["FDT 49 | Prolongación Av. 01, Propatria, Dtto Capital | 10°30'12.4\"N 66°57'13.4\"O", 2], ["FDT 50 | Av. 03 Norte, Propatria, Dtto Capital | 10°30'13.1\"N 66°57'21.1\"O", 1], ["FDT 51 | Bloque 02, Propatria, Dtto Capital | 10°30'09.9\"N 66°57'26.9\"O", 1]]),
  access(19, 'Acceso · Lara', 'DIAGRAMA N° 19: RED DE ACCESO - ESTADO LARA (NODO CARORA / OLT 16)', "NODO CARORA / OLT 16 | Av. El Estadio con Cristo Rey, Carora, Torres, Lara | 10°09'52.0\"N 70°04'50.3\"O", [["FDT 52 | Av. El Estadio con Cristo Rey, Carora, Lara | 10°09'55.0\"N 70°04'47.3\"O", 2], ["FDT 53 | Av. Cristo Rey, Carora, Lara | 10°09'49.9\"N 70°04'53.3\"O", 1], ["FDT 54 | Calle Barquisimeto con Calle 03, Carora, Lara | 10°09'46.7\"N 70°04'50.1\"O", 1]]),
];

function FiberSplitterIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="30" width="50" height="60" rx="5" fill="#FFFFFF" stroke="#1A5276" strokeWidth="4" />
      <polygon points="45,60 70,45 70,75" fill="#2E86C1" stroke="#1A5276" strokeWidth="2" />
      <line x1="10" y1="60" x2="35" y2="60" stroke="#1A5276" strokeWidth="4" />
      <line x1="85" y1="60" x2="110" y2="40" stroke="#1A5276" strokeWidth="3" />
      <line x1="85" y1="60" x2="110" y2="53" stroke="#1A5276" strokeWidth="3" />
      <line x1="85" y1="60" x2="110" y2="66" stroke="#1A5276" strokeWidth="3" />
      <line x1="85" y1="60" x2="110" y2="79" stroke="#1A5276" strokeWidth="3" />
    </svg>
  );
}

const kindMeta: Record<NodeKind, { label: string; icon: IconComponent; tone: string }> = {
  isp: { label: 'ISP / Proveedor', icon: Globe2, tone: 'isp' },
  core: { label: 'OLT / Nodo', icon: Server, tone: 'core' },
  fdt: { label: 'FDT', icon: FiberSplitterIcon, tone: 'fdt' },
  nap: { label: 'NAP', icon: Router, tone: 'nap' },
  onu: { label: 'ONU cliente', icon: House, tone: 'onu' },
};

function splitLabel(label: string) {
  const [heading, ...rest] = label.split(' | ');
  return { heading, details: rest.join(' | ') };
}

function NodeCard({ node, compact = false }: { node: DiagramNode; compact?: boolean }) {
  const meta = kindMeta[node.kind];
  const Icon = meta.icon;
  const { heading, details } = splitLabel(node.label);
  return (
    <div className={`node-wrap node-${node.kind} ${compact ? 'node-compact' : ''}`}>
      <div className="node-card">
        <div className="node-icon"><Icon size={compact ? 15 : 18} strokeWidth={1.8} /></div>
        <div className="node-copy">
          <div className="node-kind">{meta.label}</div>
          <div className="node-heading">{heading}</div>
          {details && <div className="node-details"><MapPin size={12} /> {details}</div>}
        </div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="node-children">
          {node.children.map((childNode, index) => <NodeCard key={`${childNode.label}-${index}`} node={childNode} compact={childNode.kind === 'onu'} />)}
        </div>
      )}
    </div>
  );
}

function App() {
  const [activeNumber, setActiveNumber] = useState(1);
  const [query, setQuery] = useState('');
  const [showLegend, setShowLegend] = useState(false);
  const [zoom, setZoom] = useState(100);
  const activeSheet = sheets[activeNumber - 1];
  const filteredSheets = useMemo(() => sheets.filter((sheet) => `${sheet.title} ${sheet.section}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const moveSheet = (direction: number) => setActiveNumber(Math.min(sheets.length, Math.max(1, activeNumber + direction)));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <img src="/logo.png" alt="Navegante Network" className="brand-logo" />
          <div><div className="brand-name">NAVEGANTE</div><div className="brand-sub">NETWORK, C.A.</div></div>
        </div>
        <div className="document-chip"><FileText size={15} /><span>ANEXOS TÉCNICOS</span><span className="chip-dot" /></div>
        <div className="sidebar-heading"><span>ÍNDICE DE LÁMINAS</span><span>19</span></div>
        <div className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar lámina..." /></div>
        <nav className="sheet-list">
          {filteredSheets.map((sheet) => (
            <button key={sheet.number} className={`sheet-item ${sheet.number === activeNumber ? 'active' : ''}`} onClick={() => setActiveNumber(sheet.number)}>
              <span className="sheet-num">{String(sheet.number).padStart(2, '0')}</span>
              <span className="sheet-info"><strong>{sheet.title.replace(`DIAGRAMA N° ${sheet.number}: `, '')}</strong><small>{sheet.section}</small></span>
            </button>
          ))}
          {filteredSheets.length === 0 && <div className="empty-search">No hay láminas que coincidan.</div>}
        </nav>
        <div className="sidebar-foot"><ShieldCheck size={15} /><span>Documento técnico controlado</span></div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="crumbs"><span>DOCUMENTACIÓN TÉCNICA</span><ChevronRight size={14} /><b>DIAGRAMAS DE RED FTTH</b></div>
          <div className="top-actions"><button className="icon-button" aria-label="Ayuda" onClick={() => setShowLegend(true)}><CircleHelp size={18} /></button><button className="outline-button" onClick={() => window.print()}><Printer size={16} /> Imprimir lámina</button></div>
        </header>
        <section className="workspace">
          <div className="sheet-header">
            <div><div className="eyebrow"><span className="eyebrow-line" /> {activeSheet.section}</div><h1>{activeSheet.title}</h1><p>{activeSheet.subtitle} <span className="separator">·</span> Navegante Network, C.A.</p></div>
            <div className="sheet-counter"><span>LÁMINA</span><strong>{String(activeSheet.number).padStart(2, '0')}</strong><small>/ 19</small></div>
          </div>
          <div className="toolbar">
            <div className="toolbar-left"><span className="toolbar-label"><Network size={15} /> Diagrama jerárquico</span><span className="status-dot" /> <span className="toolbar-muted">ANSI / ISO · FTTH</span></div>
            <div className="toolbar-right"><button className="tool-button" onClick={() => setZoom(Math.max(70, zoom - 10))}>−</button><span className="zoom-value">{zoom}%</span><button className="tool-button" onClick={() => setZoom(Math.min(130, zoom + 10))}>+</button><span className="toolbar-divider" /><button className="tool-button" onClick={() => setZoom(100)} aria-label="Restablecer zoom"><Maximize2 size={15} /></button><button className="legend-button" onClick={() => setShowLegend(true)}><Layers3 size={15} /> Simbología</button></div>
          </div>
          <div className="diagram-scroll"><div className="diagram-paper" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
            <img src="/logo.png" alt="Navegante Network" className="print-logo" />
            <div className="paper-meta"><span>ANEXOS TÉCNICOS · DIAGRAMAS DE RED FTTH</span><span>NN / FTTH / {String(activeSheet.number).padStart(2, '0')}</span></div>
            <div className={`diagram-canvas ${activeSheet.number === 1 ? 'national-canvas' : ''}`}>
              {activeSheet.nodes.map((node, index) => <NodeCard node={node} key={`${node.label}-${index}`} />)}
            </div>
            <div className="paper-footer"><span>Fuente: Inventario de red · Coordenadas geográficas WGS84</span><span>CONTROLADO · {String(activeSheet.number).padStart(2, '0')} / 19</span></div>
          </div></div>
          <div className="navigation-bar"><button className="nav-button" onClick={() => moveSheet(-1)} disabled={activeNumber === 1}><ChevronLeft size={17} /> Anterior</button><div className="nav-track"><span className="nav-current">{String(activeNumber).padStart(2, '0')}</span><div className="track"><div style={{ width: `${(activeNumber / 19) * 100}%` }} /></div><span>19</span></div><button className="nav-button next" onClick={() => moveSheet(1)} disabled={activeNumber === 19}>Siguiente <ChevronRight size={17} /></button></div>
        </section>
      </main>

      {showLegend && <div className="modal-backdrop" onClick={() => setShowLegend(false)}><div className="legend-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowLegend(false)}><X size={18} /></button><div className="modal-kicker">REFERENCIA GRÁFICA</div><h2>Simbología de red</h2><p>Convenciones utilizadas para representar la jerarquía de la infraestructura FTTH.</p><div className="legend-list">{Object.entries(kindMeta).map(([kind, meta]) => { const Icon = meta.icon; return <div className="legend-row" key={kind}><span className={`legend-icon ${meta.tone}`}><Icon size={17} /></span><span><strong>{meta.label}</strong><small>{kind === 'isp' ? 'Proveedor de conectividad' : kind === 'core' ? 'Nodo principal / terminación óptica' : kind === 'fdt' ? 'Terminal de distribución de fibra' : kind === 'nap' ? 'Punto de acceso de red' : 'Unidad óptica del cliente'}</small></span></div>; })}</div><div className="modal-note"><ArrowDown size={16} /> Las líneas conectan cada nivel de la jerarquía.</div></div></div>}
    </div>
  );
}

export default App;
