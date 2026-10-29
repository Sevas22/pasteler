/**
 * Artículos del blog de Daliza Pastelería Fina.
 *
 * Reglas de contenido (SEO/GEO): respuesta directa al inicio, subtítulos con la pregunta que busca la gente,
 * preguntas frecuentes al final y enlaces internos a productos y sedes. No se publican precios ni tiempos de
 * entrega: eso lo confirma cada sede por WhatsApp.
 *
 * Dentro de los textos se pueden usar enlaces con la sintaxis [texto](/ruta).
 */

export type Bloque =
  | { t: "p"; x: string }
  | { t: "h2"; x: string }
  | { t: "ul"; x: string[] }
  | { t: "ol"; x: string[] }
  | { t: "nota"; x: string }

export type Articulo = {
  slug: string
  titulo: string
  /** Meta description (máx. ~160 caracteres). */
  descripcion: string
  categoria: string
  /** Respuesta corta al inicio del artículo (la lee primero el lector y también los buscadores/IA). */
  respuestaRapida: string
  fecha: string
  lecturaMin: number
  imagen: string
  imagenAlt: string
  /** Foto vertical con texto propio: en el artículo se muestra completa y en la tarjeta se recorta con `imagenEncuadre`. */
  imagenVertical?: boolean
  imagenEncuadre?: string
  cuerpo: Bloque[]
  faqs: { question: string; answer: string }[]
  relacionados: { href: string; label: string }[]
  /** Slugs de otros artículos recomendados al final. */
  siguientes: string[]
}

export const ARTICULOS: Articulo[] = [
  {
    slug: "halloween-postres-y-tortas-para-ninos-bogota",
    titulo: "Halloween con los niños: ideas de postres y tortas para celebrar en Bogotá",
    descripcion:
      "Ideas de postres, tortas y detalles dulces para celebrar Halloween con los niños en casa o en el colegio, y cómo hacer tu pedido en Daliza, Bogotá.",
    categoria: "Celebraciones",
    respuestaRapida:
      "Para celebrar Halloween con los niños funcionan mejor los postres fáciles de repartir: porciones individuales, una torta personalizada con papel de azúcar y algo cremoso o frutal para equilibrar tanto dulce. Pide con anticipación, cuéntale a la sede cuántos niños serán y si hay alergias, y escríbele por WhatsApp para confirmar disponibilidad y valor.",
    fecha: "2026-10-29",
    lecturaMin: 4,
    imagen: "/images/blog/halloween-los-ninos-tambien-celebran.webp",
    imagenAlt:
      "Niña disfrazada de payaso con un globo rojo, sosteniendo una caja de Daliza Pastelería Fina dentro de la tienda, con el mensaje Los niños también celebran",
    imagenVertical: true,
    imagenEncuadre: "50% 23%",
    cuerpo: [
      { t: "h2", x: "¿Por qué los niños son los protagonistas de Halloween?" },
      {
        t: "p",
        x: "El 31 de octubre es una de las fechas favoritas de los niños: disfraces, caritas pintadas, globos y, sobre todo, dulces. En Bogotá se celebra en casa, en el conjunto, en el colegio o en una reunión con amigos, y casi siempre hay un momento para compartir algo dulce.",
      },
      {
        t: "p",
        x: "Un buen postre hace que la fiesta se recuerde. No tiene que dar miedo: basta con que sea divertido, rico y fácil de compartir.",
      },
      { t: "h2", x: "¿Qué postres funcionan mejor para una fiesta de Halloween?" },
      {
        t: "ul",
        x: [
          "Porciones individuales: cada niño toma la suya sin cortar ni ensuciarse, ideal para el colegio o el conjunto. Mira la [repostería individual](/productos?servicio=reposteria).",
          "Una torta personalizada con papel de azúcar: puede llevar una imagen de Halloween, un nombre o un mensaje. Aquí te explicamos [cómo pedirla](/blog/torta-personalizada-papel-de-azucar-bogota).",
          "Cheesecakes y postres frutales: son suaves y cremosos, gustan a niños y adultos y compensan lo muy dulce. Explora las [tortas y pastelería](/productos?servicio=pasteleria).",
          "Algo de [panadería](/productos?servicio=panaderia) para los adultos que acompañan, para que no todo sea azúcar.",
        ],
      },
      { t: "h2", x: "¿Cómo armar una mesa dulce sin complicarte?" },
      {
        t: "ul",
        x: [
          "Elige una paleta de dos o tres colores (naranja, negro y rojo funcionan siempre) y repítela en globos, servilletas y decoración.",
          "Pon los postres a la altura de los niños y en porciones pequeñas, para que prueben de todo sin desperdiciar.",
          "Deja un rincón para fotos: los disfraces son parte de la fiesta.",
          "Si vas a regalar detalles dulces a los invitados, empácalos en cajas o bolsitas individuales.",
        ],
      },
      { t: "h2", x: "¿Qué debo tener en cuenta con los niños y los dulces?" },
      {
        t: "p",
        x: "Antes de pedir, pregunta a los papás si algún niño tiene alergias o restricciones y avísalo a la sede al hacer tu pedido. Calcula una porción por niño más algunas extra (en la [guía de porciones](/blog/cuantas-porciones-tiene-una-torta-que-tamano-pedir) te explicamos cómo) y, si la fiesta es larga, guarda la torta en la nevera hasta el momento de servir. Más consejos en [cómo conservar y transportar una torta](/blog/como-conservar-y-transportar-una-torta).",
      },
      {
        t: "nota",
        x: "Los postres y diseños disponibles para estas fechas pueden variar según la sede. Confirma por WhatsApp qué hay y con cuánta anticipación debes pedir.",
      },
      { t: "h2", x: "¿Cómo hago mi pedido para Halloween en Daliza?" },
      {
        t: "ol",
        x: [
          "Escoge la sede más cercana en [sedes y horarios](/tiendas).",
          "Escríbele por WhatsApp con la fecha, el número de niños y los sabores que prefieres.",
          "Si quieres una torta personalizada, envía la imagen de referencia o cuéntanos la idea.",
          "Confirma tu pedido con la sede y recógelo en la fecha acordada.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Con cuánta anticipación debo pedir un postre o una torta para Halloween?",
        answer:
          "Entre más pronto, mejor, sobre todo en fechas de mucha demanda como el 31 de octubre. Escríbele a tu sede por WhatsApp para confirmar disponibilidad.",
      },
      {
        question: "¿Pueden hacer una torta con tema de Halloween?",
        answer:
          "Podemos personalizar tortas con papel de azúcar con la imagen o el diseño que prefieras. Envía tu idea a la sede y te confirman si es posible y el valor.",
      },
      {
        question: "¿Qué postre es mejor para repartir en el colegio o el conjunto?",
        answer:
          "Los postres individuales, porque se reparten fácil y cada niño tiene su porción. Calcula uno por niño y algunos extra.",
      },
      {
        question: "¿Qué hago si un niño tiene alergias?",
        answer:
          "Avísale a la sede al hacer el pedido para que te indique los ingredientes del producto, y confírmalo con los papás antes de la fiesta.",
      },
    ],
    relacionados: [
      { href: "/galeria", label: "Tortas personalizadas de nuestra galería" },
      { href: "/productos?servicio=reposteria", label: "Postres y repostería individual" },
      { href: "/contacto", label: "Hacer tu pedido por WhatsApp" },
    ],
    siguientes: ["torta-personalizada-papel-de-azucar-bogota", "cuantas-porciones-tiene-una-torta-que-tamano-pedir"],
  },
  {
    slug: "torta-personalizada-papel-de-azucar-bogota",
    titulo: "Torta personalizada con papel de azúcar: cómo pedirla en Bogotá",
    descripcion:
      "Qué es el papel de azúcar, qué información necesitas para cotizar una torta personalizada en Bogotá y cómo lograr que quede tal cual la imaginas.",
    categoria: "Tortas personalizadas",
    respuestaRapida:
      "Una torta personalizada con papel de azúcar lleva una imagen comestible impresa (el nombre, un personaje, una foto o un diseño) sobre la cobertura. Para pedirla en Bogotá solo necesitas la fecha, el número de personas, el sabor y la imagen que quieres; escríbele a tu sede Daliza por WhatsApp y te confirmamos disponibilidad y valor.",
    fecha: "2026-10-16",
    lecturaMin: 5,
    imagen: "/images/galeria/tortas/torta-08.webp",
    imagenAlt: "Torta personalizada de Bluey con imagen de papel de azúcar y nombre, de Daliza Pastelería Fina",
    cuerpo: [
      { t: "h2", x: "¿Qué es el papel de azúcar?" },
      {
        t: "p",
        x: "El papel de azúcar (también llamado papel comestible u oblea de azúcar) es una lámina fina y comestible sobre la que se imprime una imagen con tintas aptas para alimentos. Se coloca sobre la cobertura de la torta y permite reproducir con mucho detalle un logo, una foto, un personaje o un mensaje de celebración.",
      },
      {
        t: "p",
        x: "Es la opción más usada cuando quieres una torta con un diseño muy específico: la imagen queda nítida y no depende de que alguien la dibuje a mano con crema.",
      },
      { t: "h2", x: "¿Qué información necesito para cotizar mi torta?" },
      { t: "p", x: "Para que la sede pueda confirmarte disponibilidad y valor rápido, ten a la mano estos datos:" },
      {
        t: "ul",
        x: [
          "Fecha y hora en que necesitas la torta, y en qué sede la recogerás.",
          "Número de personas, para recomendarte el tamaño adecuado.",
          "Sabor preferido (por ejemplo vainilla, chocolate, tres leches o una torta con cheesecake).",
          "La imagen o diseño que quieres: puede ser una foto de referencia o una idea que nos describas.",
          "El texto que debe llevar: nombre, edad o mensaje.",
        ],
      },
      { t: "h2", x: "¿Cómo logro que el diseño quede igual a mi idea?" },
      {
        t: "ol",
        x: [
          "Envía una imagen de referencia nítida, de buena resolución. Mientras mejor sea la imagen, mejor se ve impresa.",
          "Aclara qué es lo más importante del diseño (el personaje, los colores, el nombre) para que se priorice.",
          "Confirma el texto exacto, revisando ortografía y nombres propios antes de dar el visto bueno.",
          "Pregunta por el sabor del relleno y la cobertura: la imagen se ve mejor sobre una cobertura lisa y clara.",
        ],
      },
      {
        t: "nota",
        x: "En la sección de Galería puedes ver tortas personalizadas que hemos hecho y usarlas como inspiración antes de escribirnos.",
      },
      { t: "h2", x: "¿Dónde puedo pedir mi torta personalizada?" },
      {
        t: "p",
        x: "Puedes recoger tu pedido en nuestras sedes de Bosa (Carbonell, Naranjos y Piamonte) y en Ciudadela Colsubsidio. Cada sede tiene su propio WhatsApp: consulta las [sedes y horarios](/tiendas) y escribe a la más cercana a ti.",
      },
    ],
    faqs: [
      {
        question: "¿Qué es el papel de azúcar en una torta?",
        answer:
          "Es una lámina comestible impresa con una imagen o texto que se coloca sobre la torta para personalizarla con nombres, fotos, personajes o logos.",
      },
      {
        question: "¿Qué debo enviar para cotizar una torta personalizada?",
        answer:
          "La fecha, la sede donde la recogerás, el número de personas, el sabor, la imagen de referencia y el texto que debe llevar. Con eso la sede te confirma disponibilidad y valor por WhatsApp.",
      },
      {
        question: "¿Puedo ver ejemplos antes de pedir?",
        answer:
          "Sí. En la página de Galería hay fotos de tortas personalizadas de Daliza que puedes usar como referencia.",
      },
    ],
    relacionados: [
      { href: "/galeria", label: "Ver galería de tortas personalizadas" },
      { href: "/productos?servicio=pasteleria", label: "Tortas y pastelería" },
      { href: "/tiendas", label: "Sedes y WhatsApp" },
    ],
    siguientes: ["cuantas-porciones-tiene-una-torta-que-tamano-pedir", "como-conservar-y-transportar-una-torta"],
  },
  {
    slug: "cuantas-porciones-tiene-una-torta-que-tamano-pedir",
    titulo: "¿Cuántas porciones tiene una torta? Guía para elegir el tamaño",
    descripcion:
      "Calcula cuántas porciones necesitas según tus invitados y el tipo de evento, y aprende a elegir el tamaño de torta correcto para tu celebración.",
    categoria: "Guías",
    respuestaRapida:
      "Como regla general, calcula una porción por invitado y suma unas pocas más si habrá repetición o si es el único postre. Una torta redonda mediana rinde alrededor de 10 a 12 porciones; para más personas conviene una torta más grande o dos sabores. Es una guía: la sede te confirma tamaños exactos.",
    fecha: "2026-10-16",
    lecturaMin: 4,
    imagen: "/images/galeria/tortas/torta-11.webp",
    imagenAlt: "Torta de dos pisos con rosas rojas y número dorado para una celebración grande",
    cuerpo: [
      { t: "h2", x: "¿Cómo calculo las porciones para mi evento?" },
      {
        t: "p",
        x: "Parte del número de invitados. Si la torta es el único postre, cuenta una porción por persona y agrega entre un 10 % y un 20 % extra para quienes repiten. Si habrá otros postres o pasabocas dulces, puedes ajustar hacia abajo.",
      },
      {
        t: "ul",
        x: [
          "Cumpleaños infantil: cuenta también a los adultos que acompañan; casi todos quieren probar.",
          "Matrimonio, aniversario o evento formal: porciones más pequeñas y elegantes rinden más.",
          "Reunión familiar con otros postres: puedes calcular menos de una porción por persona.",
          "Torta con mucho relleno o cheesecake: son más contundentes, así que las porciones se sirven más pequeñas.",
        ],
      },
      { t: "h2", x: "¿Qué tamaño de torta debo pedir?" },
      {
        t: "p",
        x: "Los tamaños y las porciones exactas dependen de cada torta y de su altura, por eso la guía más segura es decirnos cuántas personas serán. A modo de referencia general:",
      },
      {
        t: "ul",
        x: [
          "Hasta 8 personas: torta pequeña o rebanadas individuales.",
          "De 10 a 15 personas: torta redonda mediana.",
          "De 20 personas en adelante: torta grande, torta de dos pisos, o una torta principal más postres individuales.",
        ],
      },
      {
        t: "nota",
        x: "Estos números son una referencia general, no una medida oficial de nuestro catálogo. Escríbenos con tu número de invitados y te recomendamos el tamaño.",
      },
      { t: "h2", x: "¿Conviene pedir dos sabores?" },
      {
        t: "p",
        x: "Si tus invitados son más de 20, una buena estrategia es una torta personalizada para la foto y el corte, acompañada de otra torta sencilla o de postres individuales para servir. Así todos tienen opciones y la torta principal luce completa en la mesa. Mira nuestras [tortas y postres](/productos?servicio=pasteleria) para combinar sabores.",
      },
    ],
    faqs: [
      {
        question: "¿Cuántas porciones rinde una torta mediana?",
        answer:
          "Como referencia general, una torta redonda mediana rinde entre 10 y 12 porciones. El número exacto depende del diseño y del tamaño de cada porción; confirma con tu sede.",
      },
      {
        question: "¿Cuántas porciones debo calcular por persona?",
        answer:
          "Una porción por invitado si la torta es el único postre, más un margen del 10 % al 20 % para quienes repiten.",
      },
      {
        question: "¿Cómo sé qué tamaño pedir si no estoy seguro?",
        answer:
          "Escríbenos por WhatsApp con el número de invitados y el tipo de evento, y te recomendamos el tamaño y el sabor.",
      },
    ],
    relacionados: [
      { href: "/productos?servicio=pasteleria", label: "Ver tortas y pastelería" },
      { href: "/productos?servicio=reposteria", label: "Postres y repostería individual" },
      { href: "/contacto", label: "Cotizar por WhatsApp" },
    ],
    siguientes: ["torta-personalizada-papel-de-azucar-bogota", "cheesecake-torta-tres-leches-o-torta-fria"],
  },
  {
    slug: "cheesecake-torta-tres-leches-o-torta-fria",
    titulo: "Cheesecake, tres leches o torta fría: ¿cuál elegir para tu celebración?",
    descripcion:
      "Diferencias entre cheesecake, torta tres leches y torta fría: textura, sabor y en qué ocasiones conviene cada una para acertar con tu pedido.",
    categoria: "Guías",
    respuestaRapida:
      "Elige cheesecake si buscas un postre cremoso y de sabor intenso (maracuyá, mora, arequipe); tres leches si quieres una torta húmeda, suave y muy dulce; y torta fría o con crema si prefieres algo ligero y fresco. Las tres se sirven bien frías y gustan a casi todos.",
    fecha: "2026-10-16",
    lecturaMin: 5,
    imagen: "/images/productos/cheesecake-de-maracuya.webp",
    imagenAlt: "Cheesecake de maracuyá de Daliza Pastelería Fina",
    cuerpo: [
      { t: "h2", x: "¿Qué es un cheesecake y cuándo conviene?" },
      {
        t: "p",
        x: "El cheesecake es una torta cremosa a base de queso crema sobre una base de galleta, usualmente coronada con una cobertura de fruta o dulce. Su textura es densa y cremosa, y su sabor es más intenso que el de una torta de bizcocho.",
      },
      {
        t: "p",
        x: "Es ideal para reuniones adultas, cenas y celebraciones donde quieres un postre elegante. Los sabores frutales como el [cheesecake de maracuyá](/productos/cheesecake-de-maracuya) aportan un contraste ácido que equilibra lo cremoso.",
      },
      { t: "h2", x: "¿Cómo es una torta tres leches?" },
      {
        t: "p",
        x: "La tres leches es un bizcocho esponjoso que se humedece con una mezcla de tres tipos de leche, y se cubre con crema. Resulta muy suave, jugosa y dulce, y se sirve fría. Es una de las favoritas en cumpleaños y reuniones familiares porque su sabor es familiar y agrada a niños y adultos.",
      },
      { t: "h2", x: "¿Y la torta fría o con crema?" },
      {
        t: "p",
        x: "Las tortas frías combinan capas de bizcocho con cremas y rellenos de fruta o dulce, y se cubren con crema de vainilla o chantilly. Son más ligeras, refrescantes y muy versátiles para decorar. Combina bien con rellenos de mora, maracuyá o melocotón.",
      },
      { t: "h2", x: "Comparativa rápida" },
      {
        t: "ul",
        x: [
          "Cheesecake: cremoso, denso, sabor intenso. Mejor para ocasiones elegantes y pocos invitados.",
          "Tres leches: húmeda, suave y dulce. Mejor para cumpleaños y reuniones familiares.",
          "Torta fría: ligera y fresca, muy decorable. Mejor para celebraciones grandes y diseños personalizados.",
        ],
      },
      {
        t: "nota",
        x: "Si dudas entre dos, cuéntanos cuántas personas serán y qué les gusta; te ayudamos a escoger. También puedes pedir una torta principal y postres individuales para tener variedad.",
      },
    ],
    faqs: [
      {
        question: "¿Cuál es la diferencia entre un cheesecake y una torta tres leches?",
        answer:
          "El cheesecake es cremoso y denso, hecho con queso crema sobre una base de galleta; la tres leches es un bizcocho esponjoso humedecido con leches y cubierto de crema.",
      },
      {
        question: "¿Qué torta es mejor para un cumpleaños infantil?",
        answer:
          "Las tortas tres leches y las tortas frías con crema suelen gustar más a los niños por su textura suave y su sabor dulce, y permiten decorarse con papel de azúcar.",
      },
      {
        question: "¿Estas tortas se sirven frías?",
        answer:
          "Sí. El cheesecake, la tres leches y la torta fría se conservan y se sirven refrigeradas, y se sacan un momento antes de servir.",
      },
    ],
    relacionados: [
      { href: "/productos/cheesecake-de-maracuya", label: "Cheesecake de maracuyá" },
      { href: "/productos/torta-con-cheesecake-de-maracuya", label: "Torta con cheesecake de maracuyá" },
      { href: "/productos?servicio=pasteleria", label: "Todas las tortas" },
    ],
    siguientes: ["como-conservar-y-transportar-una-torta", "cuantas-porciones-tiene-una-torta-que-tamano-pedir"],
  },
  {
    slug: "panaderia-colombiana-almojabana-pan-de-bono-resobados",
    titulo: "Panadería colombiana: almojábana, pan de bono, resobados y más para el desayuno",
    descripcion:
      "Conoce los clásicos de la panadería colombiana (almojábana, pan de bono, resobados, roscón de coco) y cómo disfrutarlos recién horneados en Bosa, Bogotá.",
    categoria: "Panadería",
    respuestaRapida:
      "Los clásicos de la panadería colombiana para el desayuno o las onces son la almojábana, el pan de bono, los resobados, el roscón de coco y los hojaldres. En Daliza horneamos pan artesanal y lo encuentras en la sede Panadería Carbonell y en nuestras otras sedes de Bosa.",
    fecha: "2026-10-16",
    lecturaMin: 4,
    imagen: "/images/productos/almojabana.webp",
    imagenAlt: "Almojábanas recién horneadas de Daliza Panadería en Bosa, Bogotá",
    cuerpo: [
      { t: "h2", x: "¿Qué panes colombianos no pueden faltar en el desayuno?" },
      {
        t: "p",
        x: "Colombia tiene una tradición panadera muy rica. Estos son los clásicos que más se piden para el desayuno, las onces o para compartir en familia:",
      },
      {
        t: "ul",
        x: [
          "[Almojábana](/productos/almojabana): pan de queso suave y ligeramente salado, ideal con café.",
          "[Pan de bono](/productos/pan-de-bono): esponjoso, de masa con queso y almidón, delicioso caliente.",
          "Resobados: dulces y suaves, perfectos para acompañar chocolate o café.",
          "[Roscón de coco](/productos/roscon-de-coco): masa dulce con coco, para quienes prefieren algo más dulce.",
          "Hojaldres: masa hojaldrada rellena de arequipe, bocadillo, queso o pollo, según la preferencia.",
        ],
      },
      { t: "h2", x: "¿Cómo disfrutar mejor el pan recién horneado?" },
      {
        t: "p",
        x: "Los panes de queso como la almojábana y el pan de bono saben mejor tibios. Si no los vas a comer al instante, caliéntalos unos minutos en el horno o en una sartén para recuperar su textura. Acompáñalos con café, chocolate caliente o agua de panela, como manda la costumbre.",
      },
      { t: "h2", x: "¿Dónde comprar pan artesanal en Bosa?" },
      {
        t: "p",
        x: "Tenemos una sede dedicada a la panadería, Panadería Carbonell, además del pan que puedes encontrar en nuestras otras sedes. Consulta los [horarios y direcciones](/tiendas) y escribe por WhatsApp si quieres separar un pedido para una reunión o desayuno especial.",
      },
      {
        t: "nota",
        x: "La disponibilidad de cada pan puede variar según la sede y el día. Si buscas algo en particular, confírmalo antes por WhatsApp.",
      },
    ],
    faqs: [
      {
        question: "¿Cuál es la diferencia entre almojábana y pan de bono?",
        answer:
          "Ambos llevan queso, pero la almojábana es más suave y ligeramente salada, mientras que el pan de bono es más esponjoso y usa almidón de yuca en la masa.",
      },
      {
        question: "¿Dónde puedo comprar pan artesanal en Bosa?",
        answer:
          "En Daliza Panadería Carbonell y en nuestras otras sedes de Bosa. Puedes consultar direcciones y horarios en la página de sedes.",
      },
      {
        question: "¿Puedo encargar pan para una reunión?",
        answer:
          "Sí. Escríbele a la sede por WhatsApp con lo que necesitas y la fecha, y te confirmamos disponibilidad.",
      },
    ],
    relacionados: [
      { href: "/productos?servicio=panaderia", label: "Ver toda la panadería" },
      { href: "/productos/almojabana", label: "Almojábana" },
      { href: "/tiendas/panaderia-carbonell", label: "Panadería Carbonell" },
    ],
    siguientes: ["cheesecake-torta-tres-leches-o-torta-fria", "torta-personalizada-papel-de-azucar-bogota"],
  },
  {
    slug: "como-conservar-y-transportar-una-torta",
    titulo: "Cómo conservar y transportar una torta sin que se dañe",
    descripcion:
      "Consejos prácticos para transportar tu torta en el carro, conservarla en la nevera y servirla en su punto, sin que se derrita ni se desarme.",
    categoria: "Consejos",
    respuestaRapida:
      "Transporta la torta sobre una superficie plana (el piso del carro o el baúl, nunca en el asiento inclinado), con el aire acondicionado puesto y sin frenazos. Una vez en casa, guárdala en la nevera y sácala unos minutos antes de servir.",
    fecha: "2026-10-16",
    lecturaMin: 4,
    imagen: "/images/galeria/tortas/torta-09.webp",
    imagenAlt: "Torta de bautizo decorada con ángel y estrellas doradas, lista para transportar",
    cuerpo: [
      { t: "h2", x: "¿Cómo transporto una torta en el carro?" },
      {
        t: "ol",
        x: [
          "Lleva la caja sobre una superficie plana y firme: el piso del carro, delante del asiento, o el baúl. Evita el asiento, que se inclina.",
          "Si hace calor, enciende el aire acondicionado unos minutos antes de subir la torta.",
          "Conduce con calma, frena despacio y toma las curvas suave. Pide a alguien que vaya cuidando la caja si es una torta grande.",
          "No pongas nada encima de la caja ni la dejes en un carro estacionado al sol.",
        ],
      },
      { t: "h2", x: "¿Cómo conservar la torta en casa?" },
      {
        t: "p",
        x: "Las tortas con crema, cheesecake, tres leches o rellenos de fruta deben guardarse en la nevera hasta el momento de servir. Cúbrelas con su caja o con un recipiente grande para que no absorban olores de otros alimentos.",
      },
      {
        t: "ul",
        x: [
          "Guarda la torta refrigerada si lleva crema, queso o fruta.",
          "Si es un cheesecake o una torta fría, mantenla en la nevera hasta poco antes de servir.",
          "Evita congelar tortas con papel de azúcar: la humedad puede afectar la imagen.",
          "Consume las porciones sobrantes dentro de los siguientes días y guárdalas siempre frías.",
        ],
      },
      { t: "h2", x: "¿Cuándo sacarla de la nevera para servir?" },
      {
        t: "p",
        x: "Saca la torta unos 15 a 30 minutos antes de servir para que gane sabor y textura, pero no la dejes a temperatura ambiente por horas, sobre todo si hace calor. Para cortar porciones limpias, usa un cuchillo largo y sumérgelo en agua caliente entre cada corte.",
      },
      {
        t: "nota",
        x: "Cada torta tiene sus propias recomendaciones según rellenos y cobertura. Al recogerla, pregunta en la sede cómo conservarla y por cuánto tiempo.",
      },
    ],
    faqs: [
      {
        question: "¿Cómo llevo una torta en el carro sin que se dañe?",
        answer:
          "Sobre una superficie plana (piso o baúl), con aire acondicionado, sin frenazos y sin nada encima de la caja.",
      },
      {
        question: "¿La torta debe guardarse en la nevera?",
        answer:
          "Si lleva crema, queso o fruta, sí: refrigérala y sácala unos minutos antes de servir. Pregunta en tu sede por las indicaciones específicas de tu torta.",
      },
      {
        question: "¿Cómo corto la torta en porciones limpias?",
        answer:
          "Con un cuchillo largo mojado en agua caliente y limpiado entre cada corte, sobre una torta bien fría.",
      },
    ],
    relacionados: [
      { href: "/productos?servicio=pasteleria", label: "Ver tortas y pastelería" },
      { href: "/tiendas", label: "Sedes para recoger tu pedido" },
      { href: "/contacto", label: "Resolver dudas por WhatsApp" },
    ],
    siguientes: ["cuantas-porciones-tiene-una-torta-que-tamano-pedir", "cheesecake-torta-tres-leches-o-torta-fria"],
  },
]

export function getArticulo(slug: string): Articulo | undefined {
  return ARTICULOS.find((a) => a.slug === slug)
}

export function formatearFecha(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })
}
