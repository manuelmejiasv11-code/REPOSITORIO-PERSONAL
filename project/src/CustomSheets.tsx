import {
  Globe2,
  Router,
  Server,
  Network,
  Radio,
  Cable,
  Box,
  House,
  BatteryCharging,
  Zap,
  Wrench,
  FlaskConical,
  Tv,
  Sun,
  Plug,
  Cpu,
  MapPin,
} from 'lucide-react';
import { FiberSplitterIcon, ParabolicAntennaIcon, type IconComponent } from './icons';

export type CustomKind = 'architecture' | 'difusion';

type EquipoItem = { label: string; icon: IconComponent };

const tx: EquipoItem[] = [
  { label: 'ISP / Nube', icon: Globe2 },
  { label: 'Router de Borde', icon: Router },
  { label: 'Switch Core', icon: Server },
  { label: 'OLT (Cabecera)', icon: Network },
  { label: 'Kit GPON', icon: Cpu },
  { label: 'ODF (Distribuidor Óptico)', icon: Radio },
  { label: 'FDT (Splitter)', icon: FiberSplitterIcon },
  { label: 'NAP (Splitter)', icon: Cable },
  { label: 'ONU / Router Cliente', icon: House },
];

const respaldo: EquipoItem[] = [
  { label: 'Paneles Solares', icon: Sun },
  { label: 'Inversor', icon: Zap },
  { label: 'Baterías de Ciclo Profundo', icon: BatteryCharging },
  { label: 'UPS Online', icon: Plug },
];

const herramientas: EquipoItem[] = [
  { label: 'Fusionadora de Fibra Óptica', icon: Wrench },
  { label: 'OTDR', icon: FlaskConical },
];

type DifusionNodo = { estado: string; nodo: string; direccion: string; coords: string };

const difusionNodos: DifusionNodo[] = [
  { estado: 'ESTADO ZULIA', nodo: 'NODO PUERTOS DE ALTAGRACIA', direccion: 'Av. Nro. 5 con Calle Nro. 15, Altagracia, Miranda, Zulia', coords: "10°42'54.0\"N 71°31'15.6\"O" },
  { estado: 'ESTADO FALCÓN', nodo: 'NODO CHICHIRIVICHE', direccion: 'Av. Cuare con Calle Zamora, Chichiriviche, Monseñor Iturriza, Falcón', coords: "10°55'44.4\"N 68°16'30.0\"O" },
  { estado: 'DISTRITO CAPITAL', nodo: 'NODO LIBERTADOR', direccion: 'Av. Principal de Propatria, C.C. Propatria, Santa Cruz, Libertador, Dto. Capital', coords: "10°30'12.6\"N 66°57'10.6\"O" },
  { estado: 'ESTADO MIRANDA', nodo: 'NODO SUCRE', direccion: 'Calle Canteras de Miranda / Isaías Medina Angarita, Petare, Sucre, Miranda', coords: "10°27'31.0\"N 66°48'04.3\"O" },
  { estado: 'ESTADO TRUJILLO', nodo: 'NODO SANTA ISABEL', direccion: 'Carretera El Taladro, Santa Isabel, Andrés Bello, Trujillo', coords: "9°37'47.1\"N 70°48'30.8\"O" },
  { estado: 'ESTADO CARABOBO', nodo: 'NODO VALENCIA', direccion: 'Av. Henry Ford, C.C. Paseo Las Industrias, Miguel Peña, Valencia, Carabobo', coords: "10°09'50.2\"N 67°57'37.6\"O" },
  { estado: 'ESTADO YARACUY', nodo: 'NODO SAN FELIPE', direccion: 'Av. 5 Libertador, Centro Bazar Único, San Javier, San Felipe, Yaracuy', coords: "10°20'21.3\"N 68°44'09.1\"O" },
  { estado: 'ESTADO LARA', nodo: 'NODO CARORA', direccion: 'Av. El Estadio con Cristo Rey, Carora, Torres, Lara', coords: "10°09'52.0\"N 70°04'50.3\"O" },
  { estado: 'ESTADO ARAGUA', nodo: 'NODO MARACAY', direccion: 'Av. Constitución / Calle Mariño, C.C. Paseo Estación Central, Girardot, Aragua', coords: "10°14'53.4\"N 67°36'07.3\"O" },
];

function EquipoCard({ item }: { item: EquipoItem }) {
  const Icon = item.icon;
  return (
    <div className="equipo-card">
      <span className="equipo-icon"><Icon size={18} strokeWidth={1.7} /></span>
      <span className="equipo-label">{item.label}</span>
    </div>
  );
}

export function ArchitectureCanvas() {
  return (
    <div className="arch-canvas">
      <div className="arch-section">
        <div className="arch-section-title">SECCIÓN 1 · CADENA DE TRANSMISIÓN</div>
        <div className="arch-chain">
          {tx.map((item, i) => (
            <div className="arch-chain-node" key={`tx-${item.label}`}>
              <EquipoCard item={item} />
              {i < tx.length - 1 && <span className="arch-connector" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="arch-section">
        <div className="arch-section-title">SECCIÓN 2 · RESPALDO DE ENERGÍA</div>
        <div className="arch-backup">
          <div className="arch-backup-anchor"><EquipoCard item={tx[2]} /></div>
          <div className="arch-backup-link" aria-hidden="true">⇅</div>
          <div className="arch-backup-chain">
            <div className="arch-chain-node" key="bk-Paneles Solares">
              <EquipoCard item={respaldo[0]} />
            </div>
            <span className="arch-connector" aria-hidden="true">→</span>
            <div className="arch-chain-node" key="bk-Inversor">
              <EquipoCard item={respaldo[1]} />
            </div>
            <span className="arch-connector" aria-hidden="true">⇄</span>
            <div className="arch-chain-node" key="bk-Baterías">
              <EquipoCard item={respaldo[2]} />
            </div>
            <span className="arch-connector" aria-hidden="true">→</span>
            <div className="arch-chain-node" key="bk-UPS">
              <EquipoCard item={respaldo[3]} />
            </div>
          </div>
        </div>
      </div>

      <div className="arch-section">
        <div className="arch-section-title">SECCIÓN 3 · EQUIPOS DE INSTALACIÓN Y MEDICIÓN</div>
        <div className="arch-tools">
          <div className="arch-tools-heading"><Box size={13} /> Herramientas de Campo</div>
          <div className="arch-tools-row">
            {herramientas.map((item) => (
              <EquipoCard item={item} key={`tl-${item.label}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DifusionCanvas() {
  return (
    <div className="difusion-canvas">
      <div className="difusion-grid">
        {difusionNodos.map((nodo, i) => (
          <div className="difusion-cell" key={`dif-${nodo.nodo}-${i}`}>
            <span className="difusion-icon"><Tv size={26} strokeWidth={1.6} /></span>
            <span className="difusion-estado">{nodo.estado}</span>
            <span className="difusion-nodo">{nodo.nodo}</span>
            <span className="difusion-direccion"><MapPin size={11} /> {nodo.direccion}</span>
            <span className="difusion-coords">{nodo.coords}</span>
            <span className="difusion-antenna"><ParabolicAntennaIcon size={28} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}
