# Propuesta de Aplicación: Growl

### Erik López Jiménez

## Idea de la Aplicación

**Growl** es una aplicación web para buscar, explorar y guardar recetas de cocina personalizadas, diseñada para satisfacer a usuarios que buscan un enfoque saludable y personalizado para sus comidas. Utilizando la API de Edamam, Growl permite a los usuarios buscar recetas según sus preferencias de dieta, calorías e ingredientes. Además, la aplicación ofrece la funcionalidad de guardar recetas en favoritos y configurar preferencias de búsqueda para ofrecre una experiencia de usuario mas comoda.

## Audiencia Objetivo

Growl está diseñada para personas que buscan recetas específicas por motivos de salud, como aquellos interesados en dietas especiales (veganas, sin gluten, bajas en carbohidratos, etc.) o quienes desean controlar su consumo de calorías y nutrientes. También se enfoca en usuarios que prefieren una experiencia personalizada para guardar y administrar sus recetas favoritas y búsquedas. La aplicación beneficia sobre todo a personas con algun tipo de dieta especifica.

## Análisis de Mercado

Actualmente existen varias aplicaciones de recetas, como Yummly, Tasty y AllRecipes, que permiten a los usuarios buscar y guardar recetas, además de aplicar ciertos filtros básicos. Sin embargo, Growl se diferencia de ellas por su énfasis en la personalización avanzada y en la integración con la API de Edamam, que permite aplicar filtros detallados como las calorias, las dietas específicas y los ingredientes seleccionados.

### Valor Añadido de Growl

- **Personalización avanzada**: Filtros específicos por ingredientes, calorías y tipos de dietas.
- **Perfil de usuario**: Guardado de favoritos y preferencias de búsqueda.
- **Integración con API de Edamam**: Acceso a una base de datos de recetas extensa y especializada en nutrición.
  
## Funcionalidades Clave

1. **Búsqueda de recetas personalizada**: Los usuarios pueden buscar recetas con filtros avanzados (ingredientes, tipo de dieta, calorías).
2. **Guardado de recetas en favoritos**: Opción para marcar recetas favoritas y tenerlas siempre disponibles en su perfil.
3. **Preferencias de búsqueda**: Configuración de filtros predeterminados para que se apliquen automáticamente en cada sesión.

## Tecnologías a Utilizar

- **React con JS**: Para desarrollar una aplicación web interactiva y escalable.

- **React Router**: Para gestionar la navegación entre diferentes vistas, como el perfil, los resultados de búsqueda y los favoritos.

- **Local Storage**: Para gestionar las recetas gardadas en favoritos del usuario así como sus preferencias de búsqueda.

- **Edamam API**: Fuente principal para las búsquedas de recetas y los datos nutricionales. La API de Edamam permite aplicar filtros avanzados de nutrición y dieta.
