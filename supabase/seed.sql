-- Daliza — datos iniciales (migra el catálogo estático actual a Supabase).
-- Ejecutar una sola vez después de aplicar 20260922000000_init_schema.sql.
-- Todos los productos quedan asignados a las 4 sedes existentes por defecto;
-- ajusta la disponibilidad por sede desde /admin/productos.

insert into public.locations (slug, name, type, address, phone, whatsapp, hours, is_principal, maps_url, sort_order)
values
  ('bosa-carbonell', 'Bosa Carbonell', 'Sede Principal', 'Diag. 71 Sur No. 78A - 19', '310 8336425', '573108336425', 'Lun - Sáb: 8:00 AM - 7:00 PM', true,
   'https://www.google.com/maps/search/?api=1&query=Diag.+71+Sur+No.+78A+-+19+Bogot%C3%A1', 1),
  ('bosa-naranjos', 'Bosa Naranjos', 'Sucursal', 'Transv. 79D No. 73A - 19 Sur', '312 5169547', '573125169547', 'Lun - Sáb: 8:00 AM - 7:00 PM', false,
   'https://www.google.com/maps/search/?api=1&query=Transv.+79D+No.+73A+-+19+Sur+Bogot%C3%A1', 2),
  ('bosa-piamonte', 'Bosa Piamonte', 'Sucursal', 'Calle 68A Sur No. 79C - 10', '322 3940849', '573223940849', 'Lun - Sáb: 8:00 AM - 7:00 PM', false,
   'https://www.google.com/maps/search/?api=1&query=Calle+68A+Sur+No.+79C+-+10+Bogot%C3%A1', 3),
  ('ciudadela-colsubsidio', 'Ciudadela Colsubsidio', 'Sucursal', 'Cra. 113 No. 81 - 82', null, null, 'Lun - Sáb: 8:00 AM - 7:00 PM', false,
   'https://www.google.com/maps/search/?api=1&query=Cra.+113+No.+81+-+82+Bogot%C3%A1', 4)
on conflict (slug) do nothing;

insert into public.products (slug, name, description, description_long, servicio, categoria, image_url, extra_images, highlights, sort_order)
values
  ('pastel-tiramisu-daliza', 'Pastel estilo tiramisú',
   'Capas de bizcocho, crema mascarpone y cacao en retícula, fresas glaseadas y chocolate de adorno.',
   'Pastel redondo sobre base dorada, acabado con crema blanca y polvo de cacao en patrón de rombos. Lleva fresas enteras y un lazo de chocolate oscuro. Ideal para celebraciones y mesas dulces. Consulta porciones y personalización de mensaje o topper.',
   'pasteleria', 'tortas', '/images/producto-pastel-tiramisu-daliza.png',
   array['/images/producto-cheesecake-maracuya-daliza.png', '/images/producto-torta-mousse-chocolate-daliza.png'],
   array['Textura húmeda y cremosa', 'Decoración con cacao y fruta fresca', 'Presentación en base dorada', 'Pedido con antelación recomendada'],
   1),
  ('tartas-fruta-fresca', 'Tartas de fruta fresca',
   'Masa quebrada dorada, fruta de temporada glaseada y detalle de menta y flores comestibles.',
   'Dos tartas individuales sobre pizarra, rellenas con láminas de fruta amarilla en círculo y fresas en el centro. Presentación gourmet con azúcar glass y flores. Perfectas para brunch, coffee break o mesa dulce. Disponibles por unidad o bandeja según agenda.',
   'reposteria', 'tartas', '/images/producto-tartas-fruta-daliza.png',
   array['/images/producto-mousse-fresa-individual-daliza.png', '/images/producto-cheesecake-maracuya-daliza.png'],
   array['Fruta fresca glaseada', 'Base de masa quebrada artesanal', 'Presentación sobre pizarra', 'Opción para eventos y catering'],
   2),
  ('cheesecake-maracuya-daliza', 'Cheesecake de maracuyá',
   'Mousse amarillo con semillas de maracuyá, glaseado espejo, fresas y chocolate, listón decorativo.',
   'Cheesecake o mousse de maracuyá sobre base de chocolate, cubierta con gel brillante, fresas frescas y rizos de chocolate. Incluye cinta roja alrededor del pastel. Sabor cítrico equilibrado. Pide disponibilidad y tamaño (individual o familiar).',
   'pasteleria', 'tortas', '/images/producto-cheesecake-maracuya-daliza.png',
   array['/images/producto-pastel-tiramisu-daliza.png', '/images/producto-mousse-frutos-rojos-daliza.png'],
   array['Gel de maracuyá brillante', 'Base crocante de chocolate', 'Decoración con fresas y chocolate', 'Ideal para mesas elegantes'],
   3),
  ('brazo-de-reina-daliza', 'Brazo de reina',
   'Bizcocho enrollado, crema suave con trozos de fruta roja, fresas encima y azúcar glass.',
   'Rollo esponjoso con relleno cremoso y frutos rojos, espolvoreado con azúcar glass y decorado con fresas enteras. Textura ligera y presentación rústica-chic. Porción para compartir; consulta también formato para eventos.',
   'panaderia', 'especiales', '/images/producto-brazo-gitano-daliza.png',
   array['/images/producto-tartas-fruta-daliza.png', '/images/producto-mousse-fresa-individual-daliza.png'],
   array['Relleno cremoso con fruta', 'Acabado con azúcar glass', 'Horno del día o pedido programado', 'Corte y empaque para transporte'],
   4),
  ('torta-mousse-chocolate-daliza', 'Torta mousse de chocolate',
   'Tres capas de mousse y bizcocho, glaseado espejo de chocolate, fresas y decoración de chocolate.',
   'Torta redonda multicapa con alternancia de chocolate y crema, cubierta con ganache o glaseado brillante. Incluye fresas y pieza de chocolate con patrón. Sobre base dorada y mármol. Un clásico para amantes del chocolate; pregunta por diámetro y porciones.',
   'pasteleria', 'tortas', '/images/producto-torta-mousse-chocolate-daliza.png',
   array['/images/producto-mousse-frutos-rojos-daliza.png', '/images/producto-pastel-tiramisu-daliza.png'],
   array['Perfil de capas visibles', 'Glaseado brillante tipo espejo', 'Decoración con fresas', 'Presentación premium en base dorada'],
   5),
  ('mousse-fresa-individual', 'Mousse de fresa individual',
   'Mini torta en acetato, mousse rosa, cinta terciopelo, chocolate y fresas en la parte superior.',
   'Porción individual con capas de galleta, mousse de fresa y crema blanca, decorada con chocolate y fresas. Lazo rojo alrededor y base dorada festoneada. Ideal para regalo, mesa dulce o cierre de cena. Cajas disponibles por cantidad.',
   'reposteria', 'postres', '/images/producto-mousse-fresa-individual-daliza.png',
   array['/images/producto-torta-mousse-chocolate-daliza.png', '/images/producto-tartas-fruta-daliza.png'],
   array['Formato individual listo para servir', 'Decoración con fresas y chocolate', 'Base dorada y cinta decorativa', 'Pedidos por múltiplos para eventos'],
   6),
  ('mousse-frutos-rojos-daliza', 'Mousse de frutos rojos',
   'Acabado aterciopelado en tonos berries, topping de frutos rojos, fresas y chocolate blanco.',
   'Pastel cilíndrico con spray terciopelo morado-berry, compota brillante arriba, fresas y rizo de chocolate blanco rayado. Base dorada sobre mármol. Sabor intenso a frutos del bosque. Consulta alérgenos y versión sin ciertos ingredientes con antelación.',
   'pasteleria', 'postres', '/images/producto-mousse-frutos-rojos-daliza.png',
   array['/images/producto-cheesecake-maracuya-daliza.png', '/images/producto-mousse-fresa-individual-daliza.png'],
   array['Textura mousse y glaseado de frutos', 'Acabado terciopelo profesional', 'Decoración con fresas y chocolate', 'Presentación sobre mármol'],
   7)
on conflict (slug) do nothing;

-- Disponibilidad por defecto: todos los productos en las 4 sedes (ajustar luego en /admin/productos)
insert into public.product_locations (product_id, location_id)
select p.id, l.id from public.products p cross join public.locations l
on conflict do nothing;

insert into public.courses (slug, title, description, description_long, image_url, extra_images, duration, students, level, topics, highlights, sort_order)
values
  ('curso-basico-pasteleria', 'Curso Básico de Pastelería',
   'Aprende las técnicas fundamentales de la repostería: masas, cremas, decoración básica y más.',
   'Programa pensado para quien empieza desde cero o quiere ordenar conocimientos. Trabajamos en cocina con ingredientes reales: tipos de harina, azúcares, huevos y cómo obtener masas uniformes. Verás demostraciones y practicarás en mesa con acompañamiento del instructor. Al finalizar tendrás recetas base que podrás repetir en casa y criterios para corregir texturas o sabores. Incluye material de apoyo y recomendaciones de utensilios.',
   '/images/curso-basico.jpg',
   array['/images/producto-mousse-fresa-individual-daliza.png', '/images/producto-brazo-gitano-daliza.png'],
   '4 semanas', '8 máx.', 'Principiante',
   array['Masas básicas', 'Cremas y rellenos', 'Decoración con manga', 'Cupcakes y muffins'],
   array['Grupos reducidos y práctica guiada', 'Recetas base para aplicar en casa', 'Sesiones de repaso de técnicas clave', 'Certificado de participación al finalizar'],
   1),
  ('decoracion-avanzada-tortas', 'Decoración Avanzada de Tortas',
   'Domina el arte de la decoración profesional con fondant, flores de azúcar y técnicas avanzadas.',
   'Profundizamos en acabados de nivel pastelería: cobertura con fondant, volumen y estructura para tortas de varios pisos, flores modeladas y uso de color. Verás cómo planificar un diseño desde el boceto hasta la entrega, tiempos de secado y trucos para bordes limpios. Requiere haber trabajado antes con buttercream o haber completado un nivel básico; si tienes dudas, te orientamos antes de inscribirte.',
   '/images/curso-avanzado.jpg',
   array['/images/producto-mousse-frutos-rojos-daliza.png', '/images/producto-cheesecake-maracuya-daliza.png'],
   '6 semanas', '6 máx.', 'Avanzado',
   array['Fondant y pastillaje', 'Flores de azúcar', 'Técnicas de aerógrafo', 'Tortas de varios pisos'],
   array['Proyecto final tipo torta de evento', 'Técnicas de color y modelado', 'Introducción a estructuras seguras', 'Biblioteca de referencias y proveedores'],
   2),
  ('especialidades-francesas', 'Especialidades Francesas',
   'Sumérgete en el mundo de la pastelería francesa: macarons, éclairs, petit fours y más.',
   'Recorremos clásicos de la pâtisserie francesa con rigor técnico: merengues, masas laminadas ligeras, cremas y glaseados. El foco está en precisión de temperatura, tiempos de horno y presentación. Ideal si ya manejas recetas básicas y quieres subir el nivel. Las recetas se adaptan a ingredientes disponibles en Bogotá y te damos alternativas cuando haga falta.',
   '/images/curso-especial.jpg',
   array['/images/producto-cheesecake-maracuya-daliza.png', '/images/producto-tartas-fruta-daliza.png'],
   '5 semanas', '6 máx.', 'Intermedio',
   array['Macarons perfectos', 'Éclairs y profiteroles', 'Tartas francesas', 'Chocolatería básica'],
   array['Enfoque en técnica y presentación', 'Degustación y corrección en clase', 'Fichas de recetas y puntos de control', 'Opción de armar caja de minis para llevar'],
   3)
on conflict (slug) do nothing;

-- Para crear el primer administrador:
-- 1) Crea el usuario desde el Dashboard de Supabase (Authentication → Users → Add user), o en /admin/login con "¿No tienes cuenta?" si lo habilitas.
-- 2) Ejecuta, reemplazando el correo:
--    insert into public.admins (user_id)
--    select id from auth.users where email = 'correo@daliza.com'
--    on conflict do nothing;
