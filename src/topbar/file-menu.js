import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Dialog,
  Classes,
  Position,
  Menu,
  MenuItem,
  MenuDivider,
} from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import FaFileExport from '@meronex/icons/fa/FaFileExport';
import FaFileImport from '@meronex/icons/fa/FaFileImport';
import { downloadFile } from 'polotno/utils/download';

export const FileMenu = observer(({ store, project }) => {
  const inputRef = React.useRef();

  const [faqOpened, toggleFaq] = React.useState(false);
  return (
    <>
      <Popover2
        content={
          <Menu>
            {/* <MenuDivider title={t('toolbar.layering')} /> */}
            <MenuItem
              icon="plus"
              text="Crear novo deseño"
              onClick={() => {
                const ids = store.pages
                  .map((page) => page.children.map((child) => child.id))
                  .flat();
                const hasObjects = ids?.length;
                if (hasObjects) {
                  if (!window.confirm('Eliminar o deseño anterior?')) {
                    return;
                  }
                }
                const pagesIds = store.pages.map((p) => p.id);
                store.deletePages(pagesIds);
                store.addPage();
                project.id = '';
                project.save();
              }}
            />
            {/* {project.id !== 'local' && (
              <MenuItem
                icon="duplicate"
                text="Facer copia"
                onClick={() => {
                  project.duplicate();
                }}
              />
            )} */}
            <MenuDivider />
            <MenuItem
              // icon={<FaFileImport />}
              icon="folder-open"
              text="Abrir"
              onClick={() => {
                document.querySelector('#load-project').click();
              }}
            />
            <MenuItem
              // icon={<FaFileExport />}
              icon="floppy-disk"
              text="Gardar como..."
              onClick={() => {
                const json = store.toJSON();

                const url =
                  'data:text/json;base64,' +
                  window.btoa(
                    unescape(encodeURIComponent(JSON.stringify(json)))
                  );

                downloadFile(url, 'polotno.json');
              }}
            />

            <MenuDivider />
            <MenuItem
              text="Sobre este aplicativo"
              icon="info-sign"
              onClick={() => {
                toggleFaq(true);
              }}
            />
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
      >
        <Button minimal text="Arquivo" />
      </Popover2>
      <input
        type="file"
        id="load-project"
        accept=".json,.polotno"
        ref={inputRef}
        style={{ width: '180px', display: 'none' }}
        onChange={(e) => {
          var input = e.target;

          if (!input.files.length) {
            return;
          }

          var reader = new FileReader();
          reader.onloadend = function () {
            var text = reader.result;
            let json;
            try {
              json = JSON.parse(text);
            } catch (e) {
              alert('Can not load the project.');
            }

            if (json) {
              store.loadJSON(json);
              input.value = '';
            }
          };
          reader.onerror = function () {
            alert('Imposible abrir o proxecto.');
          };
          reader.readAsText(input.files[0]);
        }}
      />
      <Dialog
        icon="info-sign"
        onClose={() => toggleFaq(false)}
        title="Sobre CreaLab"
        isOpen={faqOpened}
        style={{
          width: '80%',
          maxWidth: '700px',
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <h2>Crealab</h2>
          <p>
           Este aplicativo utiliza Polotno. Non se permite o uso comercial.
          </p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => toggleFaq(false)}>Close</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
});
