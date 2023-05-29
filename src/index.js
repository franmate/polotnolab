import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore } from 'polotno/model/store';
import { unstable_setRemoveBackgroundEnabled } from 'polotno/config';
import { Auth0Provider } from '@auth0/auth0-react';
import { createProject, ProjectContext } from './project';
import { SubscriptionProvider } from './subscription-context';

import './index.css';
import App from './App';
import './logger';
import { setTranslations } from 'polotno/config';
setTranslations({
  "toolbar": {
    "opacity": "Opacidade",
    "effects": "Efectos",
    "blur": "Desenfoque",
    "textBackground": "Fondo",
    "backgroundCornerRadius": "Raio de esquina",
    "backgroundOpacity": "Opacidade",
    "backgroundPadding": "Acolchado",
    "brightness": "Brillo",
    "sepia": "Sepia",
    "grayscale": "Escala de grises",
    "textStroke": "Trazo de texto",
    "shadow": "Sombra",
    "border": "Borde",
    "cornerRadius": "Raio de esquina",
    "position": "Posición",
    "layering": "Estratificación",
    "toForward": "Para avanzar",
    "up": "Arriba",
    "down": "Abaixo",
    "toBottom": "Ata abaixo",
    "alignLeft": "Aliñar á esquerda",
    "alignCenter": "Aliñar o centro",
    "alignRight": "Aliñar á dereita",
    "alignTop": "Aliñar a parte superior",
    "alignMiddle": "Aliñar ao medio",
    "alignBottom": "Aliñar a parte inferior",
    "flip": "Voltar",
    "flipHorizontally": "Xire horizontalmente",
    "flipVertically": "Xire verticalmente",
    "fitToBackground": "Axustar a páxina",
    "removeBackground": "Elimina o fondo",
    "removeBackgroundTitle": "Elimina o fondo da imaxe",
    "cancelRemoveBackground": "Cancelar",
    "confirmRemoveBackground": "Confirmar",
    "crop": "Recortar",
    "cropDone": "Feito",
    "cropCancel": "Cancelar",
    "removeClip": "Eliminar clip",
    "removeMask": "Elimina a máscara",
    "transparency": "Transparencia",
    "lockedDescription": "O obxecto está bloqueado. ",
    "unlockedDescription": "O obxecto está desbloqueado. ",
    "removeElements": "Eliminar elementos",
    "duplicateElements": "Elementos duplicados",
    "download": "Descargar",
    "saveAsImage": "Gardar como imaxe",
    "saveAsPDF": "Gardar como PDF",
    "lineHeight": "Altura da liña",
    "letterSpacing": "Espazo de letras",
    "offsetX": "Desplazamento X",
    "offsetY": "Desprazamento Y",
    "color": "Cor",
    "selectable": "Seleccionable",
    "draggable": "Arrastrable",
    "removable": "Desmontable",
    "resizable": "Redimensionable",
    "contentEditable": "Pode cambiar o contido",
    "styleEditable": "Pode cambiar de estilo",
    "alwaysOnTop": "Sempre enriba",
    "showInExport": "Mostrar en exportación",
    "ungroupElements": "Desagrupar",
    "groupElements": "Grupo",
    "lineSize": "Tamaño da liña"
  },
  "workspace": {
    "noPages": "Aínda non hai páxinas...",
    "addPage": "Engadir páxina",
    "removePage": "Eliminar páxina",
    "duplicatePage": "Páxina duplicada",
    "moveUp": "Móvete",
    "moveDown": "Baixar"
  },
  "scale": {
    "reset": "Restablecer"
  },
  "error": {
    "removeBackground": "Ops! "
  },
  "sidePanel": {
    "templates": "Plantillas",
    "searchTemplatesWithSameSize": "Mostrar modelos co mesmo tamaño",
    "searchPlaceholder": "Busca...",
    "otherFormats": "Outros formatos",
    "noResults": "Sen resultados",
    "error": "Produciuse un erro ao cargar...",
    "text": "Texto",
    "uploadFont": "Cargar tipo de letra",
    "myFonts": "Fontes",
    "photos": "Fotos",
    "elements": "Figuras",
    "shapes": "Formas",
    "lines": "Liñas",
    "upload": "Subir imaxe",
    "uploadImage": "Cargar imaxe",
    "uploadTip": "Queres cargar as túas propias imaxes?",
    "background": "Fondo",
    "resize": "Dimensións",
    "layers": "capas",
    "layersTip": "Elementos da túa páxina activa:",
    "noLayers": "Non hai elementos na páxina...",
    "namePlaceholder": "Escribe o nome do elemento...",
    "useMagicResize": "Usa o cambio de tamaño máxico",
    "width": "Anchura",
    "height": "Altura",
    "magicResizeDescription": "O cambio de tamaño máxico cambiará automaticamente o tamaño e moverá todos os elementos do lenzo",
    "headerText": "Cabeceira",
    "createHeader": "Crear cabeceira",
    "subHeaderText": "Subcabezado",
    "createSubHeader": "Crear subencabezado",
    "bodyText": "Texto do corpo",
    "createBody": "Crear texto do corpo"
  }
});
if (window.location.host !== 'studio.polotno.com') {
  console.log(
    `%cWelcome to Polotno Studio! Thanks for your interest in the project!
This repository has many customizations from the default version Polotno SDK.
I don't recommend to use it as starting point. 
Instead, you can start from any official demos, e.g.: https://polotno.com/docs/demo-full-editor 
or direct sandbox: https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-demo?from-embed.
But feel free to use this repository as a reference for your own project and to learn how to use Polotno SDK.`,
    'background: rgba(54, 213, 67, 1); color: white; padding: 5px;'
  );
}

const store = createStore({ key: '5IrEmvVeDnk-NkKs8msU' });
window.store = store;
store.addPage();

const project = createProject({ store });
window.project = project;

const root = ReactDOM.createRoot(document.getElementById('root'));

const AUTH_DOMAIN = 'polotno-studio.eu.auth0.com';
const PRODUCTION_ID = process.env.REACT_APP_AUTH0_ID;
const LOCAL_ID = process.env.REACT_APP_AUTH0_ID;

const isLocalhost =
  typeof window !== undefined && window.location.href.indexOf('localhost') >= 0;
const ID = isLocalhost ? LOCAL_ID : PRODUCTION_ID;
const REDIRECT = isLocalhost
  ? 'http://localhost:3000'
  : 'https://studio.polotno.com';

root.render(
  <ProjectContext.Provider value={project}>
    <Auth0Provider domain={AUTH_DOMAIN} clientId={ID} redirectUri={REDIRECT}>
      <SubscriptionProvider>
        <App store={store} />
      </SubscriptionProvider>
    </Auth0Provider>
  </ProjectContext.Provider>
);
