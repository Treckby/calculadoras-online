const VOCALES     = 'AEIOU'
const CONSONANTES = 'BCDFGHJKLMNÑPQRSTVWXYZ'

const PALABRAS_INCONVENIENTES = [
  'BACA','BAKA','BUEI','BUEY','CACA','CACO','CAGA','CAGO','CAKA','CAKO',
  'COGE','COGI','COJA','COJE','COJI','COJO','COLA','CULO','FALO','FETO',
  'GETA','GUEI','GUEY','JETA','JOTO','KACA','KACO','KAGA','KAGO','KAKA',
  'KAKO','KOGE','KOGI','KOJA','KOJE','KOJI','KOJO','KOLA','KULO','LELO',
  'LOCA','LOCO','LOKA','LOKO','MAME','MAMO','MEAR','MEAS','MEON','MIAR',
  'MION','MOCO','MOKO','MULA','MULO','NACA','NACO','PEDA','PEDO','PENE',
  'PIPI','PITO','POPO','PUTA','PUTO','QULO','RATA','ROBA','ROBE','ROBO',
  'RUIN','SENO','TETA','VACA','VAGA','VAGO','VAKA','VUEI','VUEY','WUEI','WUEY',
]

export interface CURPDatos {
  nombre:           string
  primerApellido:   string
  segundoApellido:  string
  fechaNacimiento:  string    // YYYY-MM-DD
  sexo:             'H' | 'M'
  estado:           string    // clave de 2 letras
}

const CLAVES_ESTADOS: Record<string, string> = {
  'Aguascalientes':      'AS', 'Baja California':       'BC', 'Baja California Sur':   'BS',
  'Campeche':            'CC', 'Chiapas':               'CS', 'Chihuahua':             'CH',
  'Ciudad de México':    'DF', 'Coahuila':              'CL', 'Colima':                'CM',
  'Durango':             'DG', 'Estado de México':      'MC', 'Guanajuato':            'GT',
  'Guerrero':            'GR', 'Hidalgo':               'HG', 'Jalisco':               'JC',
  'Michoacán':           'MN', 'Morelos':               'MS', 'Nayarit':               'NT',
  'Nuevo León':          'NL', 'Oaxaca':                'OC', 'Puebla':                'PL',
  'Querétaro':           'QT', 'Quintana Roo':          'QR', 'San Luis Potosí':       'SP',
  'Sinaloa':             'SL', 'Sonora':                'SR', 'Tabasco':               'TC',
  'Tamaulipas':          'TS', 'Tlaxcala':              'TL', 'Veracruz':              'VZ',
  'Yucatán':             'YN', 'Zacatecas':             'ZS', 'Extranjero':            'NE',
}

export const ESTADOS = Object.keys(CLAVES_ESTADOS)

function limpiar(str: string): string {
  return str.toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z\s]/g, '')
    .trim()
}

function primeraVocal(str: string, desde = 1): string {
  for (let i = desde; i < str.length; i++) {
    if (VOCALES.includes(str[i])) return str[i]
  }
  return 'X'
}

function primeraConsonante(str: string, desde = 1): string {
  for (let i = desde; i < str.length; i++) {
    if (CONSONANTES.includes(str[i])) return str[i]
  }
  return 'X'
}

function quitarArticulos(str: string): string {
  return str
    .replace(/^(DE LA|DE LOS|DE LAS|DEL|DE|LA|LOS|LAS|EL|Y) /i, '')
    .trim()
}

export function generarCURP(datos: CURPDatos): string {
  const { nombre, primerApellido, segundoApellido, fechaNacimiento, sexo, estado } = datos

  const ap1   = limpiar(quitarArticulos(primerApellido))
  const ap2   = limpiar(quitarArticulos(segundoApellido))
  const nom   = limpiar(nombre).split(/\s+/)
  // Si el primer nombre es compuesto y el primero es MARIA/JOSE, usar el segundo
  const nomUsar = (nom[0] === 'MARIA' || nom[0] === 'JOSE') && nom.length > 1 ? nom[1] : nom[0]

  const fecha = fechaNacimiento.replace(/-/g, '').slice(2)   // YYMMDD

  // Las 4 letras del apellido+nombre
  let letras =
    (ap1[0]         || 'X') +   // primera letra del primer apellido
    (primeraVocal(ap1)       ) + // primera vocal interna del primer apellido
    (ap2[0]         || 'X') +   // primera letra del segundo apellido
    (nomUsar[0]     || 'X')      // primera letra del nombre

  // Verificar palabras inconvenientes
  if (PALABRAS_INCONVENIENTES.includes(letras)) {
    letras = letras[0] + 'X' + letras.slice(2)
  }

  const claveEstado = CLAVES_ESTADOS[estado] ?? 'NE'

  // Consonantes internas
  const c1 = primeraConsonante(ap1)
  const c2 = primeraConsonante(ap2)
  const c3 = primeraConsonante(nomUsar)

  const curp = `${letras}${fecha}${sexo}${claveEstado}${c1}${c2}${c3}`

  return curp
}