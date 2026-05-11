import { useState } from 'react';
import { T, glass } from '../tokens.js';
import { USER, SESSIONS } from '../data.js';

const MAX_VIDEOS = 5;

const VIDEO_TITLES_SUGERIDOS = [
  'Partido vs Talleres',
  'Entrenamiento táctico',
  'Goles de la temporada',
  'Jugadas destacadas',
  'Compacto temporada 2026',
];

const DURATIONS_MOCK = ['1:24', '0:58', '2:07', '3:15', '1:48'];

/* ─── Estado desactivado ─────────────────────────────────── */
function VitrinaOff({ onActivar }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '32px 28px', textAlign: 'center' }}>

      <div style={{ width: 72, height: 72, borderRadius: 22,
        background: `linear-gradient(135deg, ${T.cian}20 0%, ${T.bg3} 100%)`,
        border: `1.5px solid ${T.cian}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 32, marginBottom: 24 }}>
        🏆
      </div>

      <div style={{ fontFamily: T.exo, fontWeight: 800, fontSize: 22,
        color: T.white, marginBottom: 8 }}>
        Tu Vitrina
      </div>
      <div style={{ fontFamily: T.dm, fontSize: 13, color: T.muted,
        lineHeight: 1.7, marginBottom: 28, maxWidth: 280 }}>
        Activá tu vitrina y permití que scouts de todo el país vean tu perfil,
        métricas GPS reales y tus videos de jugadas.
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
        {[
          { icon: '📊', label: 'Tus métricas GPS/IMU en tiempo real' },
          { icon: '🎬', label: 'Hasta 5 videos de tus mejores jugadas' },
          { icon: '🔒', label: 'Podés desactivarla cuando quieras' },
          { icon: '🔔', label: 'Elitrax te avisa cuando un scout te contacta' },
        ].map((item, i) => (
          <div key={i} style={{ ...glass(10), padding: '11px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
            border: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontFamily: T.dm, fontSize: 12, color: T.muted }}>{item.label}</span>
          </div>
        ))}
      </div>

      <button onClick={onActivar} style={{
        width: '100%', padding: '15px', borderRadius: 14,
        background: `linear-gradient(135deg, ${T.cian}, #2EA8D6)`,
        border: 'none', fontFamily: T.exo, fontWeight: 700, fontSize: 15,
        color: T.white, cursor: 'pointer',
        boxShadow: `0 8px 24px rgba(70,199,240,0.30)`,
        letterSpacing: 0.5,
      }}>
        ACTIVAR MI VITRINA
      </button>

      <div style={{ fontFamily: T.dm, fontSize: 10, color: T.faint,
        marginTop: 14, lineHeight: 1.6, maxWidth: 260 }}>
        Al activar, tu nombre, posición, edad y métricas serán visibles para scouts
        verificados en la plataforma Elitrax.
      </div>
    </div>
  );
}

/* ─── Sección descripción ────────────────────────────────── */
function SeccionDescripcion({ desc, setDesc }) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(desc);

  const save = () => { setDesc(draft); setEditing(false); };
  const cancel = () => { setDraft(desc); setEditing(false); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: T.dm, fontSize: 11, color: T.muted, letterSpacing: 0.8 }}>
          DESCRIPCIÓN
        </span>
        {!editing && (
          <button onClick={() => { setDraft(desc); setEditing(true); }} style={{
            background: 'none', border: `1px solid ${T.border}`, borderRadius: 6,
            padding: '3px 10px', fontFamily: T.dm, fontSize: 10,
            color: T.cian, cursor: 'pointer',
          }}>
            {desc ? 'Editar' : '+ Agregar'}
          </button>
        )}
      </div>

      {editing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            maxLength={280}
            placeholder="Contá tu estilo de juego, tus fortalezas, lo que te hace diferente..."
            style={{
              background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${T.cian}55`,
              borderRadius: 10, padding: '12px 14px', color: T.white,
              fontFamily: T.dm, fontSize: 13, lineHeight: 1.7,
              resize: 'none', minHeight: 100, outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: T.dm, fontSize: 10, color: T.faint }}>
              {draft.length}/280
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={cancel} style={{
                background: 'none', border: `1px solid ${T.border}`, borderRadius: 8,
                padding: '6px 14px', fontFamily: T.dm, fontSize: 11,
                color: T.muted, cursor: 'pointer',
              }}>Cancelar</button>
              <button onClick={save} style={{
                background: T.cianDim, border: `1px solid ${T.cian}55`, borderRadius: 8,
                padding: '6px 14px', fontFamily: T.dm, fontSize: 11, fontWeight: 600,
                color: T.cian, cursor: 'pointer',
              }}>Guardar</button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ ...glass(10), padding: '12px 14px',
          border: `1px solid ${desc ? T.border : T.border}`,
          minHeight: 56, display: 'flex', alignItems: desc ? 'flex-start' : 'center' }}>
          {desc ? (
            <span style={{ fontFamily: T.dm, fontSize: 13, color: T.white,
              lineHeight: 1.7, fontStyle: 'italic' }}>
              "{desc}"
            </span>
          ) : (
            <span style={{ fontFamily: T.dm, fontSize: 12, color: T.faint, fontStyle: 'italic' }}>
              Sin descripción aún. Los scouts podrán leer sobre vos aquí.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Sección videos ─────────────────────────────────────── */
function SeccionVideos({ videos, setVideos }) {
  const [showModal, setShowModal] = useState(false);
  const [titulo,    setTitulo]    = useState('');
  const [deleting,  setDeleting]  = useState(null);

  const agregar = () => {
    if (!titulo.trim()) return;
    const nuevo = {
      id: Date.now(),
      title: titulo.trim(),
      duration: DURATIONS_MOCK[videos.length % DURATIONS_MOCK.length],
      thumb: videos.length,
    };
    setVideos(v => [...v, nuevo]);
    setTitulo('');
    setShowModal(false);
  };

  const eliminar = (id) => {
    setVideos(v => v.filter(x => x.id !== id));
    setDeleting(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: T.dm, fontSize: 11, color: T.muted, letterSpacing: 0.8 }}>
          VIDEOS ({videos.length}/{MAX_VIDEOS})
        </span>
        {videos.length < MAX_VIDEOS && (
          <button onClick={() => setShowModal(true)} style={{
            background: 'none', border: `1px solid ${T.border}`, borderRadius: 6,
            padding: '3px 10px', fontFamily: T.dm, fontSize: 10,
            color: T.naranja, cursor: 'pointer',
          }}>
            + Agregar video
          </button>
        )}
      </div>

      {videos.length === 0 ? (
        <div style={{ ...glass(10), padding: '22px', textAlign: 'center',
          border: `1px dashed ${T.border}` }}>
          <div style={{ fontSize: 24, opacity: 0.4, marginBottom: 8 }}>🎬</div>
          <div style={{ fontFamily: T.dm, fontSize: 12, color: T.faint }}>
            Agregá videos de tus jugadas para que los scouts te vean en acción
          </div>
          <button onClick={() => setShowModal(true)} style={{
            marginTop: 14, padding: '8px 20px', borderRadius: 8,
            background: T.naranjaDim, border: `1px solid ${T.naranja}55`,
            fontFamily: T.dm, fontSize: 11, fontWeight: 600,
            color: T.naranja, cursor: 'pointer',
          }}>
            Subir primer video
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {videos.map((v, i) => (
            <div key={v.id} style={{ ...glass(10), padding: '12px 14px',
              border: `1px solid ${T.border}`,
              display: 'flex', alignItems: 'center', gap: 12 }}>

              {/* thumb */}
              <div style={{ width: 52, height: 36, borderRadius: 8, flexShrink: 0,
                background: `linear-gradient(135deg, ${T.bg3} 0%, #0A1628 100%)`,
                border: `1px solid ${T.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${T.naranja}, #C94E1E)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 8 }}>▶</div>
                <span style={{ position: 'absolute', bottom: 2, right: 4,
                  fontFamily: T.mono, fontSize: 7, color: T.faint }}>
                  {v.duration}
                </span>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.dm, fontSize: 12, fontWeight: 600,
                  color: T.white, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {v.title}
                </div>
                <div style={{ fontFamily: T.dm, fontSize: 10, color: T.faint, marginTop: 2 }}>
                  Video {i + 1} · {v.duration}
                </div>
              </div>

              {deleting === v.id ? (
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => eliminar(v.id)} style={{
                    padding: '4px 10px', borderRadius: 6, border: `1px solid ${T.red}55`,
                    background: 'rgba(255,91,91,0.10)', fontFamily: T.dm, fontSize: 10,
                    color: T.red, cursor: 'pointer',
                  }}>Eliminar</button>
                  <button onClick={() => setDeleting(null)} style={{
                    padding: '4px 10px', borderRadius: 6, border: `1px solid ${T.border}`,
                    background: 'none', fontFamily: T.dm, fontSize: 10,
                    color: T.muted, cursor: 'pointer',
                  }}>No</button>
                </div>
              ) : (
                <button onClick={() => setDeleting(v.id)} style={{
                  background: 'none', border: 'none', flexShrink: 0,
                  color: T.faint, fontSize: 16, cursor: 'pointer', padding: '2px 6px',
                  lineHeight: 1,
                }}>×</button>
              )}
            </div>
          ))}

          {videos.length < MAX_VIDEOS && (
            <button onClick={() => setShowModal(true)} style={{
              ...glass(8), padding: '10px', border: `1px dashed ${T.border}`,
              fontFamily: T.dm, fontSize: 11, color: T.faint,
              cursor: 'pointer', textAlign: 'center',
              background: 'transparent',
            }}>
              + Agregar otro video ({videos.length}/{MAX_VIDEOS})
            </button>
          )}
        </div>
      )}

      {/* Modal agregar video */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          zIndex: 200, backdropFilter: 'blur(6px)',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            ...glass(20), width: '100%', padding: '24px 20px',
            borderRadius: '20px 20px 0 0',
            border: `1px solid ${T.borderHi}`,
            animation: 'fadeUp 0.25s ease both',
          }}>
            <div style={{ fontFamily: T.exo, fontWeight: 700, fontSize: 16,
              color: T.white, marginBottom: 6 }}>
              Agregar video
            </div>
            <div style={{ fontFamily: T.dm, fontSize: 11, color: T.muted,
              marginBottom: 20, lineHeight: 1.6 }}>
              Ingresá un título para tu video. Los scouts verán este nombre en tu perfil.
            </div>

            {/* Selector de título sugerido */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              {VIDEO_TITLES_SUGERIDOS.filter(s => !videos.some(v => v.title === s)).slice(0, 4).map(s => (
                <button key={s} onClick={() => setTitulo(s)} style={{
                  padding: '4px 10px', borderRadius: 20, flexShrink: 0,
                  border: `1px solid ${titulo === s ? T.naranja : T.border}`,
                  background: titulo === s ? T.naranjaDim : 'transparent',
                  fontFamily: T.dm, fontSize: 10,
                  color: titulo === s ? T.naranja : T.muted,
                  cursor: 'pointer',
                }}>{s}</button>
              ))}
            </div>

            <input
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Título del video..."
              autoFocus
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)',
                border: `1.5px solid ${titulo ? T.naranja + '55' : T.border}`,
                borderRadius: 10, padding: '11px 14px',
                color: T.white, fontFamily: T.dm, fontSize: 13,
                outline: 'none', marginBottom: 16,
              }}
            />

            {/* Zona de carga simulada */}
            <div style={{ ...glass(10), padding: '16px', marginBottom: 18,
              border: `1px dashed ${T.border}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 24, opacity: 0.5 }}>📁</span>
              <span style={{ fontFamily: T.dm, fontSize: 11, color: T.faint, textAlign: 'center' }}>
                Arrastrá tu video o tocá para seleccionar<br/>
                <span style={{ color: T.faint, fontSize: 10 }}>MP4, MOV · Máx. 500 MB</span>
              </span>
              <button style={{
                padding: '6px 16px', borderRadius: 8,
                background: T.naranjaDim, border: `1px solid ${T.naranja}44`,
                fontFamily: T.dm, fontSize: 11, color: T.naranja, cursor: 'pointer',
              }}>Seleccionar archivo</button>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setShowModal(false); setTitulo(''); }} style={{
                flex: 1, padding: '12px', borderRadius: 12,
                background: 'none', border: `1px solid ${T.border}`,
                fontFamily: T.dm, fontSize: 13, color: T.muted, cursor: 'pointer',
              }}>Cancelar</button>
              <button onClick={agregar} disabled={!titulo.trim()} style={{
                flex: 2, padding: '12px', borderRadius: 12,
                background: titulo.trim()
                  ? `linear-gradient(135deg, ${T.naranja}, #C94E1E)`
                  : 'rgba(255,255,255,0.06)',
                border: 'none',
                fontFamily: T.exo, fontWeight: 700, fontSize: 13,
                color: titulo.trim() ? T.white : T.faint,
                cursor: titulo.trim() ? 'pointer' : 'default',
                boxShadow: titulo.trim() ? '0 4px 14px rgba(243,108,58,0.25)' : 'none',
                transition: 'all 0.2s',
              }}>AGREGAR VIDEO</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Confirmación desactivar ────────────────────────────── */
function ModalDesactivar({ onConfirm, onCancel }) {
  return (
    <div onClick={onCancel} style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.80)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 300, backdropFilter: 'blur(8px)', padding: '24px',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        ...glass(18), width: '100%', padding: '28px 22px',
        border: `1px solid rgba(255,91,91,0.25)`,
        animation: 'fadeUp 0.22s ease both',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
          <div style={{ fontFamily: T.exo, fontWeight: 700, fontSize: 17,
            color: T.white, marginBottom: 8 }}>
            ¿Desactivar tu Vitrina?
          </div>
          <div style={{ fontFamily: T.dm, fontSize: 12, color: T.muted, lineHeight: 1.7 }}>
            Tu perfil dejará de ser visible para los scouts.
            Tus videos y descripción se guardarán para cuando la actives de nuevo.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={onConfirm} style={{
            width: '100%', padding: '13px', borderRadius: 12,
            background: 'rgba(255,91,91,0.12)', border: `1.5px solid ${T.red}55`,
            fontFamily: T.exo, fontWeight: 700, fontSize: 13,
            color: T.red, cursor: 'pointer',
          }}>SÍ, DESACTIVAR VITRINA</button>
          <button onClick={onCancel} style={{
            width: '100%', padding: '13px', borderRadius: 12,
            background: T.cianDim, border: `1.5px solid ${T.cian}44`,
            fontFamily: T.exo, fontWeight: 700, fontSize: 13,
            color: T.cian, cursor: 'pointer',
          }}>MANTENER ACTIVA</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Pantalla principal ─────────────────────────────────── */
export default function MiVitrinaScreen() {
  const [activa,       setActiva]       = useState(false);
  const [desc,         setDesc]         = useState('');
  const [videos,       setVideos]       = useState([]);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [justActivated, setJustActivated] = useState(false);

  // métricas del jugador (últimos datos GPS)
  const lastSession = SESSIONS[0];
  const initials = `${USER.name[0]}${USER.lastname[0]}`;

  const handleActivar = () => {
    setActiva(true);
    setJustActivated(true);
    setTimeout(() => setJustActivated(false), 3000);
  };

  const handleDesactivar = () => {
    setActiva(false);
    setShowConfirm(false);
  };

  if (!activa) {
    return <VitrinaOff onActivar={handleActivar} />;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative' }}>

      {/* Header */}
      <div style={{ padding: '20px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ fontFamily: T.exo, fontWeight: 700, fontSize: 22, color: T.white }}>
              Mi Vitrina
            </div>
            <div style={{ fontFamily: T.dm, fontSize: 11, color: T.muted, marginTop: 2 }}>
              Perfil público · scouts te están viendo
            </div>
          </div>
          {/* Status pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7,
            background: 'rgba(74,222,128,0.10)',
            border: `1px solid ${T.green}44`, borderRadius: 20,
            padding: '6px 12px' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%',
              background: T.green,
              boxShadow: `0 0 6px ${T.green}` }} />
            <span style={{ fontFamily: T.dm, fontSize: 11, fontWeight: 600, color: T.green }}>
              Activa
            </span>
          </div>
        </div>

        {/* Toast activación */}
        {justActivated && (
          <div style={{ ...glass(10), padding: '10px 14px', marginTop: 10, marginBottom: 4,
            border: `1px solid ${T.green}44`, background: 'rgba(74,222,128,0.06)',
            display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>🎉</span>
            <span style={{ fontFamily: T.dm, fontSize: 12, color: T.green, lineHeight: 1.5 }}>
              ¡Vitrina activada! Los scouts ya pueden ver tu perfil.
            </span>
          </div>
        )}
      </div>

      {/* Scroll body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 32px' }}>

        {/* Tarjeta identidad jugador */}
        <div style={{ ...glass(14), padding: '16px', marginBottom: 14,
          border: `1px solid ${T.borderHi}`,
          display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, flexShrink: 0,
            background: `linear-gradient(135deg, ${T.cian}55 0%, ${T.bg3} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.exo, fontWeight: 800, fontSize: 18, color: T.cian }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.exo, fontWeight: 700, fontSize: 16, color: T.white }}>
              {USER.name} {USER.lastname}
            </div>
            <div style={{ fontFamily: T.dm, fontSize: 11, color: T.muted, marginTop: 2 }}>
              Delantero · 19 años · Atl. Belgrano Sub20
            </div>
          </div>
          <div style={{ ...glass(8), padding: '4px 10px',
            border: `1px solid ${T.cian}33` }}>
            <span style={{ fontFamily: T.mono, fontSize: 10, color: T.cian }}>#9</span>
          </div>
        </div>

        {/* Métricas GPS (últimas sesión) */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: T.dm, fontSize: 11, color: T.muted,
            letterSpacing: 0.8, marginBottom: 10 }}>
            MÉTRICAS GPS · ÚLTIMA SESIÓN
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {[
              { label: 'Vel. máx.',  val: lastSession.maxSpeed, unit: 'km/h', color: T.naranja },
              { label: 'Distancia',  val: lastSession.distance, unit: 'km',   color: T.cian   },
              { label: 'Sprints',    val: lastSession.sprints,  unit: '',     color: T.cian   },
              { label: 'Aceleraciones', val: lastSession.acels, unit: '',     color: T.green  },
              { label: 'Saltos',     val: lastSession.jumps,    unit: '',     color: T.green  },
              { label: 'Duración',   val: lastSession.duration, unit: '',     color: T.yellow },
            ].map((m, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)',
                borderRadius: 10, padding: '11px 8px', textAlign: 'center',
                border: `1px solid ${T.border}` }}>
                <div style={{ fontFamily: T.mono, fontSize: 16, fontWeight: 700,
                  color: m.color, lineHeight: 1 }}>
                  {m.val}
                </div>
                <div style={{ fontFamily: T.dm, fontSize: 8, color: T.faint, marginTop: 2 }}>
                  {m.unit}
                </div>
                <div style={{ fontFamily: T.dm, fontSize: 9, color: T.muted, marginTop: 1 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: T.dm, fontSize: 10, color: T.faint,
            marginTop: 8, textAlign: 'right' }}>
            Actualizado automáticamente desde tus sesiones GPS
          </div>
        </div>

        {/* Descripción */}
        <div style={{ marginBottom: 18 }}>
          <SeccionDescripcion desc={desc} setDesc={setDesc} />
        </div>

        {/* Videos */}
        <div style={{ marginBottom: 24, position: 'relative' }}>
          <SeccionVideos videos={videos} setVideos={setVideos} />
        </div>

        {/* Zona de peligro */}
        <div style={{ ...glass(12), padding: '16px 18px',
          border: `1px solid rgba(255,91,91,0.18)`,
          background: 'rgba(255,91,91,0.03)' }}>
          <div style={{ fontFamily: T.dm, fontSize: 11, color: T.faint,
            letterSpacing: 0.8, marginBottom: 10 }}>PRIVACIDAD</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.dm, fontWeight: 600, fontSize: 13,
                color: T.white, marginBottom: 3 }}>
                Desactivar Vitrina
              </div>
              <div style={{ fontFamily: T.dm, fontSize: 11, color: T.muted, lineHeight: 1.5 }}>
                Tu perfil dejará de ser visible para los scouts. Podés reactivarla cuando quieras.
              </div>
            </div>
            <button onClick={() => setShowConfirm(true)} style={{
              flexShrink: 0, padding: '8px 14px', borderRadius: 10,
              background: 'rgba(255,91,91,0.10)', border: `1px solid ${T.red}44`,
              fontFamily: T.dm, fontWeight: 600, fontSize: 11,
              color: T.red, cursor: 'pointer',
            }}>Desactivar</button>
          </div>
        </div>

      </div>

      {/* Modal confirmar desactivar */}
      {showConfirm && (
        <ModalDesactivar
          onConfirm={handleDesactivar}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
